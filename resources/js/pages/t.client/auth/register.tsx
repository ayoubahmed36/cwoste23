import { Head, useForm } from '@inertiajs/react';
import GuestLayout from '@/layouts/client-auth-layout';
import InputNumber from '@/components/cwoste/inputs/input-number';
import { LuMail, LuSend, LuBriefcaseBusiness } from "react-icons/lu";
import InputIcon from '@/components/cwoste/inputs/input-icon';
import InputPassword from '@/components/cwoste/inputs/input-password';
import InputSelect from '@/components/cwoste/inputs/input-select';
import PdfUploader from '@/components/pdf-uploader';
import { useState } from 'react';
import InputSelectDate from '@/components/cwoste/inputs/input-select-date';
import { Checkbox } from '@/components/ui/checkbox';

export default function Register() {

    // 🔹 Labels for files
    const uploadLabels = [
        "شهادة عمل أو شهادة الإحالة على التقاعد",
        "صك بريدي",
    ];

    // 🔹 Files state (same length as labels)
    const [files, setFiles] = useState<(File | null)[]>(Array(uploadLabels.length).fill(null));

    const { data, setData, errors, post, processing } = useForm({
        ccp: '',
        email: '',
        password: '',
        password_confirmation: '',

        lastName: '',
        firstName: '',
        phone: '',
        gender: '',
        dateOfBirth: '',
        maritalStatus: '',
        nbChildren: 0,
        jobStatus: '',
        jobTitle: '',
        files: Array(uploadLabels.length).fill(null) as (File | null)[],
    });

    const handleFileChange = (index: number, file: File | null) => {
        const updated = [...files];
        updated[index] = file;
        setFiles(updated);
        setData("files", updated);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        post("/client/register", {
            forceFormData: true, // 👈 important for file uploads
        })
    };

    console.log(errors);
    return (
        <GuestLayout>
            <Head title="إنشاء حساب جديد" />

            <div className="rounded-lg bg-white shadow-sm border border-gray-200">



            <div className="bg-white py-6 px-6 rounded-t-lg flex items-center justify-center gap-4 border-b">
                    <div className="bg-green-50 w-16 h-16 flex items-center justify-center rounded-full text-green-500">
                        <i className="fas fa-user-plus text-2xl"></i>
                    </div>
                    <div>
                        <h2 className="text-gray-800 font-bold text-xl">إنشاء حساب جديد</h2>
                        <p className="text-gray-500 text-sm mt-1">سجل حساب جديد</p>
                    </div>
                </div>

            <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-8">

                {/* 🟢 معلومات الحساب */}
                <div className="flex flex-col gap-5">
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                            <i className="fas fa-info-circle text-green-600"></i>
                        </div>
                        <h2 className="text-xl font-bold text-gray-800">معلومات الحساب</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 bg-gray-100/50 rounded-md p-5 py-10 border border-gray-200">
                        <InputIcon label="رقم ال CCP" placeholder="أدخل رقم ال CCP" type="text" required icon={<LuSend className="size-5" />} value={data.ccp} onChange={(value) => setData('ccp', value)} error={errors.ccp} />
                        <InputIcon label="الايميل" placeholder="example@domain.com" type="email" required icon={<LuMail className='size-5' />} value={data.email} onChange={(value) => setData('email', value)} error={errors.email} />
                        <InputPassword label="كلمة السر" placeholder="كلمة السر" required value={data.password} onChange={(value) => setData('password', value)} error={errors.password} />
                        <InputPassword label="تأكيد كلمة السر" placeholder="تأكيد كلمة السر" required value={data.password_confirmation} onChange={(value) => setData('password_confirmation', value)} error={errors.password_confirmation} />
                    </div>
                </div>

                {/* 🟦 المعلومات الشخصية */}
                <div className="flex flex-col gap-5">
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center ml-3">
                            <i className="fas fa-user text-blue-600"></i>
                        </div>
                        <h2 className="text-xl font-bold text-gray-800">المعلومات الشخصية</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <InputIcon label="اللقب" placeholder="أدخل اللقب" type="text" required value={data.lastName} onChange={(value) => setData('lastName', value)} error={errors.lastName} />
                        <InputIcon label="الاسم" placeholder="أدخل الاسم" type="text" required value={data.firstName} onChange={(value) => setData('firstName', value)} error={errors.firstName} />
                        <InputIcon label="رقم الهاتف" placeholder="أدخل رقم الهاتف" type="text" required value={data.phone} onChange={(value) => setData('phone', value)} error={errors.phone} />
                        <InputSelectDate label="تاريخ الميلاد" value={data.dateOfBirth} onChange={(value) => setData('dateOfBirth', value)} required error={errors.dateOfBirth} />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        <InputSelect label="الجنس" options={['ذكر', 'انثى']} required value={data.gender} onChange={(value) => setData('gender', value)} placeholder="اختر الجنس" error={errors.gender} />
                        <InputSelect label="الحالة الاجتماعية" options={['أعزب', 'متزوج']} required value={data.maritalStatus} onChange={(value) => setData('maritalStatus', value)} placeholder="اختر الحالة الاجتماعية" error={errors.maritalStatus} />
                        <InputNumber label="عدد الأطفال" value={data.nbChildren} onChange={(value) => setData('nbChildren', value)} error={errors.nbChildren} required />
                    </div>
                </div>

                {/* 🟧 المعلومات الوظيفية */}
                <div className="flex flex-col gap-5">
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                            <i className="fas fa-briefcase text-amber-600"></i>
                        </div>
                        <h2 className="text-xl font-bold text-gray-800">المعلومات الوظيفية</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 bg-gray-100/50 rounded-md p-5 py-10 border border-gray-200">
                        {/* 🔹 you can still keep these job fields if needed */}
                        <InputSelect label="الحالة الوظيفية" options={['موظف', 'متقاعد']} required value={data.jobStatus} onChange={(value) => setData('jobStatus', value)} placeholder='اختر الحالة الوظيفية' error={errors.jobStatus} />
                        <InputIcon label="اسم الوظيفة" placeholder="مثال: أستاذ التعليم الثانوي" type="text" required icon={<LuBriefcaseBusiness className='size-5' />} value={data.jobTitle} onChange={(value) => setData('jobTitle', value)} error={errors.jobTitle} disabled={data.jobStatus !== 'موظف'} />
                    </div>
                </div>

                {/* 🟣 رفع الملفات */}
                <div className="flex flex-col gap-5">
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                            <i className="fas fa-file-upload text-purple-600"></i>
                        </div>
                        <h2 className="text-xl font-bold text-gray-800">رفع الملفات</h2>
                    </div>

                    <div className="space-y-5">
                        {uploadLabels.map((label, index) => {
                            const fileError = (errors as Record<string, string>)[`files.${index}`];
                            return (
                                <div key={index}>
                                    <PdfUploader
                                        maxSize={1}
                                        label={label}
                                        file={files[index]}
                                        onFileChange={(file) => handleFileChange(index, file)}
                                    />
                                    {fileError && (
                                        <p className="text-destructive text-sm mt-1">{fileError}</p>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="flex items-center">
                    {/* <input id="terms" type="checkbox" className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500" required /> */}
                    <Checkbox id="terms" required />
                    <label htmlFor="terms" className="mr-2 text-sm font-medium text-gray-700">أوافق على <a href="#" className="text-green-600 hover:underline">الشروط والأحكام</a> و <a href="#" className="text-green-600 hover:underline">سياسة الخصوصية</a></label>
                </div>

                {/* Submit */}
                <div className="pt-6 border-t border-gray-200">
                    <button type="submit" className="w-full py-3 rounded-md bg-green-500 text-white font-medium hover:bg-green-600 transition-all duration-300 shadow-md hover:shadow-lg">
                        <i className="fas fa-user-plus ml-2"></i> إنشاء حساب
                    </button>
                </div>
                <p className="text-sm text-center">لديك حساب بالفعل؟ <a href="#" className="text-green-500 hover:underline font-medium">سجل الدخول هنا</a></p>
            </form>
            </div>
        </GuestLayout>
    );
}
