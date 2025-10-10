import { useForm, Head } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import GuestLayout from '@/layouts/client-auth-layout';
import { register } from '@/routes';
import { request } from '@/routes/password';
import InputIcon from '@/components/cwoste/inputs/input-icon';
import { LuMail } from 'react-icons/lu';
import InputPassword from '@/components/cwoste/inputs/input-password';


interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        post('login.store', {
            onFinish: () => reset('password'), // clear password on success/failure
        });
    };

    return (
        <GuestLayout>
            <Head title="تسجيل الدخول" />

            <div className="max-w-lg mx-auto rounded-lg bg-white shadow-sm border border-gray-200 flex flex-col">

                <div className="bg-white py-6 px-6 rounded-t-lg flex items-center justify-center gap-4 border-b">
                    <div className="bg-green-50 w-16 h-16 flex items-center justify-center rounded-full text-green-500">
                        <i className="fas fa-user-lock text-2xl"></i>
                    </div>
                    <div>
                        <h2 className="text-gray-800 font-bold text-xl">تسجيل الدخول</h2>
                        <p className="text-gray-500 text-sm mt-1">سجل الدخول للوصول إلى حسابك</p>
                    </div>
                </div>

                <form className="p-8 space-y-6">


                    <InputIcon label="البريد الالكتروني أو رقم CCP" placeholder="example@domain.com أو 123456789" type="email" required icon={<LuMail className='size-5' />} value={data.email} onChange={(value) => setData('email', value)} error={errors.email} />


                    <InputPassword label="كلمة السر" placeholder="كلمة السر" required value={data.password} onChange={(value) => setData('password', value)} error={errors.password} />


                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-2">
                            <Checkbox
                                id="remember"
                                name="remember"
                                checked={data.remember}
                                onCheckedChange={(checked) => setData('remember', !!checked)}
                                tabIndex={3}
                            />
                            <Label htmlFor="remember">تذكرني</Label>
                        </div>
                        {canResetPassword && (
                            <TextLink href={request()} className="text-sm" tabIndex={5}>
                                نسيت كلمة المرور؟
                            </TextLink>
                        )}
                    </div>

                    <div className="pt-6 border-t border-gray-200">
                        <button type="submit" className="w-full py-3 rounded-md bg-green-500 text-white font-medium hover:bg-green-600 transition-all duration-300 shadow-md hover:shadow-lg">
                            <i className="fas fa-sign-in-alt ml-2 rotate-180"></i> تسجيل الدخول
                        </button>
                    </div>
                    <p className="text-sm text-center">ليس لديك حساب؟ <a href="#" className="text-green-500 hover:underline font-medium">سجل الآن</a></p>
                </form>
            </div>

            {/* <form onSubmit={handleSubmit} className="rounded-lg bg-white shadow-sm border border-gray-200 p-6 flex flex-col gap-8 max-w-xl mx-auto">
                <div className="grid gap-6">
                    <div className="grid gap-2">
                        <InputIcon label="الايميل" placeholder="example@domain.com" type="email" required icon={<LuMail className='size-5' />} value={data.email} onChange={(value) => setData('email', value)} error={errors.email} />
                    </div>

                    <div className="grid gap-2">

                        <InputPassword label="كلمة السر" placeholder="كلمة السر" required value={data.password} onChange={(value) => setData('password', value)} error={errors.password} />

                    </div>

                    {canResetPassword && (
                        <TextLink href={request()} className="ml-auto text-sm" tabIndex={5}>
                            نسيت كلمة المرور؟
                        </TextLink>
                    )}

                    <div className="flex items-center space-x-3">
                        <Checkbox
                            id="remember"
                            name="remember"
                            checked={data.remember}
                            onCheckedChange={(checked) => setData('remember', !!checked)}
                            tabIndex={3}
                        />
                        <Label htmlFor="remember">تذكرني</Label>
                    </div>


                    <div className="pt-6 border-t border-gray-200">
                        <button type="submit" className="w-full py-3 rounded-md bg-green-500 text-white font-medium hover:bg-green-600 transition-all duration-300 shadow-md hover:shadow-lg">
                            <i className="fas fa-sign-in-alt ml-2 rotate-180"></i> تسجيل الدخول
                        </button>
                    </div>
                    <p className="text-sm text-center">ليس لديك حساب؟ <a href="#" className="text-green-500 hover:underline font-medium">سجل الآن</a></p>
                </div>


            </form >

            {status && (
                <div className="mb-4 text-center text-sm font-medium text-green-600">{status}</div>
            )
            } */}
        </GuestLayout >
    );
}
