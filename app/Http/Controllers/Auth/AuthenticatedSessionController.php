<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\User;
use App\Models\Client;
use Illuminate\Support\Facades\Hash;

class AuthenticatedSessionController extends Controller
{
    /**
     * Show the login page.
     */
    public function create(Request $request): Response
    {
        return Inertia::render('auth/login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => $request->session()->get('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */

    public function store(Request $request)
    {
        $request->validate([
            'login' => [
                'required',
                'string',
                'max:255',
                function ($attribute, $value, $fail) {
                    $isEmail = filter_var($value, FILTER_VALIDATE_EMAIL);
                    $isCcp = preg_match('/^\d{1,10}$/', $value);
                    if (!$isEmail && !$isCcp) {
                        $fail('يرجى إدخال بريد إلكتروني صحيح أو رقم CCP صالح.');
                    }
                }
            ],
            'password' => 'required|string|min:8',
            'remember' => 'nullable|boolean',
        ], [
            'login.required' => 'حقل تسجيل الدخول مطلوب.',
            'password.required' => 'كلمة المرور مطلوبة.',
            'password.min' => 'كلمة المرور يجب أن تحتوي على 8 أحرف على الأقل.',
        ]);

        $login = $request->input('login');
        $password = $request->input('password');

        // ✅ Case 1: login via email
        if (filter_var($login, FILTER_VALIDATE_EMAIL)) {
            if (!Auth::attempt(['email' => $login, 'password' => $password], $request->boolean('remember'))) {
                throw ValidationException::withMessages([
                    'login' => 'هذه البيانات لا تتطابق مع سجلاتنا.',
                ]);
            }
        }
        // ✅ Case 2: login via CCP number
        else {
            $client = Client::where('ccp', $login)->first();

            if (!$client) {
                throw ValidationException::withMessages([
                    'login' => 'هذه البيانات لا تتطابق مع سجلاتنا.',
                ]);
            }

            $user = $client->user;

            if (!$user || !Hash::check($password, $user->password)) {
                throw ValidationException::withMessages([
                    'login' => 'هذه البيانات لا تتطابق مع سجلاتنا.',
                ]);
            }

            Auth::login($user, $request->boolean('remember'));
        }

        // ✅ Role check: block non-clients
        if ($request->user()->role !== 'client') {
            Auth::logout();
            $request->session()->invalidate();
            $request->session()->regenerateToken();

            throw ValidationException::withMessages([
                'login' => 'هذه البيانات لا تتطابق مع سجلاتنا.',
            ]);
        }

        $request->session()->regenerate();

        return redirect()->intended(route('dashboard', absolute: false));
    }




    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }
}
