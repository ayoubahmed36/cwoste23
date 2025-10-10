<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Client;
use App\Models\Notification;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Auth\Events\Registered;
use Illuminate\Support\Facades\Auth;

class RegisteredUserController extends Controller
{
    /**
     * Show the registration page.
     */
    public function create()
    {
        $documents = DB::table('required_document_registration')
            ->join('required_documents', 'required_document_registration.required_document_id', '=', 'required_documents.id')
            ->select('required_documents.id', 'required_documents.description')
            ->get();

        return Inertia::render('auth/register', [
            'documents' => $documents,
        ]);
    }

    public function preview(Request $request)
    {
        $validated = $request->validate([
            'ccp' => ['required', 'numeric', 'digits_between:1,10', 'unique:clients,ccp'],
            'email' => ['required', 'email', 'unique:users,email'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
            'password_confirmation' => ['required', 'same:password'],

            // personalImage is optional (nullable)
            'personalImage' => ['nullable', 'image', 'mimes:jpg,jpeg,png,gif', 'max:2048'], // max 2MB

            'lastName' => ['required', 'string', 'min:2', 'max:100'],
            'firstName' => ['required', 'string', 'min:2', 'max:100'],
            'phone' => ['required', 'string', 'unique:clients,phone'],
            'dateOfBirth' => ['required', 'date', 'before_or_equal:-20 years'],
            'gender' => ['required', 'in:ذكر,انثى'],
            'maritalStatus' => ['required', 'in:أعزب,متزوج'],
            'nbChildren' => ['required', 'integer', 'min:0', 'max:20'],
            'jobStatus' => ['required', 'in:موظف,متقاعد'],
            'jobTitle' => ['required', 'string', 'min:2', 'max:150'],
            'workInstitution' => ['required', 'string', 'min:2', 'max:150'],

            // ✅ documents validation for PDFs
            'documents' => ['required', 'array'],
            'documents.*.id' => ['required', 'integer', 'exists:required_documents,id'],
            'documents.*.description' => ['required', 'string', 'max:255'],
            'documents.*.file' => ['required', 'file', 'mimes:pdf', 'max:1024'],

        ], $this->errorMessages());

        return redirect()->route('register')->with('preview', true);

    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request)
    {
        // 1) Validate - personalImage is optional
        $validated = $request->validate([
            'ccp' => ['required', 'numeric', 'digits_between:1,10', 'unique:clients,ccp'],
            'email' => ['required', 'email', 'unique:users,email'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
            'password_confirmation' => ['required', 'same:password'],

            // personalImage is optional (nullable)
            'personalImage' => ['nullable', 'image', 'mimes:jpg,jpeg,png,gif', 'max:2048'], // max 2MB

            'lastName' => ['required', 'string', 'min:2', 'max:100'],
            'firstName' => ['required', 'string', 'min:2', 'max:100'],
            'phone' => ['required', 'string', 'unique:clients,phone'],
            'dateOfBirth' => ['required', 'date', 'before_or_equal:-20 years'],
            'gender' => ['required', 'in:ذكر,انثى'],
            'maritalStatus' => ['required', 'in:أعزب,متزوج'],
            'nbChildren' => ['required', 'integer', 'min:0', 'max:20'],
            'jobStatus' => ['required', 'in:موظف,متقاعد'],
            'jobTitle' => ['required', 'string', 'min:2', 'max:150'],
            'workInstitution' => ['required', 'string', 'min:2', 'max:150'],

            // ✅ documents validation for PDFs
            'documents' => ['required', 'array'],
            'documents.*.id' => ['required', 'integer', 'exists:required_documents,id'],
            'documents.*.description' => ['required', 'string', 'max:255'],
            'documents.*.file' => ['required', 'file', 'mimes:pdf', 'max:1024'],
        ], $this->errorMessages());

        $proofPath = null;
        $chequePath = null;
        $imagePath = null;

        try {
            DB::beginTransaction();

            // 2) Handle personal image upload (optional)
            if ($request->hasFile('personalImage')) {
                $imageFile = $request->file('personalImage');
                $imageName = 'profile_' . time() . '_' . $validated['ccp'] . '.' . $imageFile->getClientOriginalExtension();
                // Store in private disk
                $imagePath = $imageFile->storeAs("cwoste_uploads/profiles/{$validated['ccp']}", $imageName, 'private');
            }

            // 3) Create user
            $userData = [
                'name' => $validated['firstName'] . ' ' . $validated['lastName'],
                'email' => $validated['email'],
                'password' => $validated['password'],
                'role' => 'client',
            ];

            // Only add image path if image was uploaded
            if ($imagePath) {
                $userData['image'] = $imagePath;
            }

            $user = User::create($userData);

            // 4) Store files privately (order per your UI)
            $proofPath = $request->file('files')[0]->store("cwoste_uploads/clients/{$user->id}/registration/certificate", 'private');
            $chequePath = $request->file('files')[1]->store("cwoste_uploads/clients/{$user->id}/registration/cheque", 'private');

            $validated['dateOfBirth'] = \Carbon\Carbon::parse($validated['dateOfBirth'])->toDateString();

            //dd($validated);

            // 5) Create client
            Client::create([
                'user_id' => $user->id,
                'ccp' => $validated['ccp'],
                'last_name' => $validated['lastName'],
                'first_name' => $validated['firstName'],
                'phone' => $validated['phone'],
                'date_of_birth' => $validated['dateOfBirth'],
                'gender' => $validated['gender'],
                'marital_status' => $validated['maritalStatus'],
                'nb_children' => $validated['nbChildren'],
                'job_status' => $validated['jobStatus'],
                'job_title' => $validated['jobTitle'],
                'work_institution' => $validated['workInstitution'],
                'proof_certificate' => $proofPath,
                'postal_cheque' => $chequePath,
            ]);

            $admin = User::where('role', 'admin')->first();

            $message = $validated['gender'] === 'ذكر' ? 'قام العميل' : ' قامت العميلة';

            if ($admin) {
                Notification::create([
                    'user_id' => $admin->id, // المستلم = المسؤول
                    'title' => 'تسجيل عميل جديد',
                    'message' => "{$message} {$validated['firstName']} {$validated['lastName']} بالتسجيل وهو في انتظار المراجعة والموافقة.",
                    'data' => json_encode([
                        'user_id' => $user->id,
                        'client_ccp' => $validated['ccp'],
                        'email' => $validated['email'],
                        'status' => 'pending',
                    ]),
                ]);
            }

            DB::commit();

            event(new Registered($user));
            Auth::login($user);
            return redirect()->intended(route('dashboard', absolute: false));

        } catch (\Throwable $e) {
            DB::rollBack();

            // cleanup any saved files
            if ($proofPath)
                Storage::disk('private')->delete($proofPath);
            if ($chequePath)
                Storage::disk('private')->delete($chequePath);
            if ($imagePath)
                Storage::disk('private')->delete($imagePath);

            report($e);
            return back()
                ->withErrors(['general' => $e->getMessage()])
                ->withInput();
        }
    }

    private function errorMessages(): array
    {
        return [
            // ccp
            'ccp.required' => 'رقم CCP مطلوب.',
            'ccp.numeric' => 'رقم CCP يجب أن يحتوي على أرقام فقط.',
            'ccp.digits_between' => 'رقم CCP يجب أن يكون بين 1 و 10 أرقام.',
            'ccp.unique' => 'رقم CCP مستخدم بالفعل.',

            // email
            'email.required' => 'البريد الإلكتروني مطلوب.',
            'email.email' => 'يرجى إدخال بريد إلكتروني صالح.',
            'email.unique' => 'هذا البريد الإلكتروني مستخدم بالفعل.',

            // password
            'password.required' => 'كلمة المرور مطلوبة.',
            'password.min' => 'كلمة المرور يجب أن تتكون من 8 أحرف على الأقل.',
            'password.confirmed' => 'تأكيد كلمة المرور غير متطابق.',
            'password_confirmation.required' => 'تأكيد كلمة المرور مطلوب.',
            'password_confirmation.same' => 'كلمة المرور وتأكيدها غير متطابقين.',

            // personalImage - Optional
            'personalImage.image' => 'الملف يجب أن يكون صورة.',
            'personalImage.mimes' => 'صيغة الصورة يجب أن تكون: jpg, jpeg, png, أو gif.',
            'personalImage.max' => 'حجم الصورة يجب ألا يتجاوز 2 ميغابايت.',

            // names
            'lastName.required' => 'اللقب مطلوب.',
            'lastName.min' => 'اللقب يجب أن يحتوي على حرفين على الأقل.',
            'lastName.max' => 'اللقب يجب ألا يتجاوز 100 حرف.',
            'firstName.required' => 'الاسم مطلوب.',
            'firstName.min' => 'الاسم يجب أن يحتوي على حرفين على الأقل.',
            'firstName.max' => 'الاسم يجب ألا يتجاوز 100 حرف.',

            // phone
            'phone.required' => 'رقم الهاتف مطلوب.',
            'phone.unique' => 'رقم الهاتف مستخدم بالفعل.',

            // gender
            'gender.required' => 'الجنس مطلوب.',
            'gender.in' => 'يرجى اختيار الجنس: ذكر أو أنثى.',

            // dateOfBirth (note: date_format + before_or_equal)
            'dateOfBirth.required' => 'تاريخ الميلاد مطلوب.',
            'dateOfBirth.date_format' => 'صيغة التاريخ يجب أن تكون يوم/شهر/سنة (مثال: 31/12/2000).',
            'dateOfBirth.before_or_equal' => 'يجب أن يكون عمرك 20 سنة على الأقل.',

            // maritalStatus
            'maritalStatus.required' => 'الحالة الاجتماعية مطلوبة.',
            'maritalStatus.in' => 'يرجى اختيار الحالة الاجتماعية: أعزب أو متزوج.',

            // nbChildren
            'nbChildren.required' => 'عدد الأطفال مطلوب.',
            'nbChildren.integer' => 'عدد الأطفال يجب أن يكون رقماً صحيحاً.',
            'nbChildren.min' => 'عدد الأطفال لا يمكن أن يكون سالباً.',
            'nbChildren.max' => 'عدد الأطفال يجب ألا يتجاوز 20.',

            // jobStatus / jobTitle / workInstitution
            'jobStatus.required' => 'الحالة الوظيفية مطلوبة.',
            'jobStatus.in' => 'يرجى اختيار الحالة الوظيفية: موظف أو متقاعد.',
            'jobTitle.required' => 'يرجى إدخال اسم الوظيفة.',
            'jobTitle.min' => 'اسم الوظيفة يجب أن يحتوي على حرفين على الأقل.',
            'jobTitle.max' => 'اسم الوظيفة يجب ألا يتجاوز 150 حرفاً.',
            'workInstitution.required' => 'يرجى إدخال اسم المؤسسة.',
            'workInstitution.min' => 'اسم المؤسسة يجب أن يحتوي على حرفين على الأقل.',
            'workInstitution.max' => 'اسم المؤسسة يجب ألا يتجاوز 150 حرفاً.',

            // documents    
            'documents.required' => 'الوثائق مطلوبة.',
            'documents.array' => 'الوثائق يجب أن تكون في شكل مصفوفة.',

            // id
            'documents.*.id.required' => 'معرّف الوثيقة مطلوب.',
            'documents.*.id.integer' => 'معرّف الوثيقة يجب أن يكون رقماً صحيحاً.',
            'documents.*.id.exists' => 'الوثيقة المحددة غير صالحة أو غير موجودة في قاعدة البيانات.',

            // description
            'documents.*.description.required' => 'وصف الوثيقة مطلوب.',
            'documents.*.description.string' => 'وصف الوثيقة يجب أن يكون نصاً صالحاً.',
            'documents.*.description.max' => 'وصف الوثيقة يجب ألا يتجاوز 255 حرفاً.',

            // file (PDF)
            'documents.*.file.required' => 'الملف مطلوب.',
            'documents.*.file.file' => 'يجب رفع ملف صالح.',
            'documents.*.file.mimes' => 'يجب أن يكون ملف الوثيقة بصيغة PDF فقط.',
            'documents.*.file.max' => 'يجب ألا يتجاوز حجم ملف الوثيقة 1 ميغابايت.',

        ];
    }
}