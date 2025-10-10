import { useForm, Head } from '@inertiajs/react';

import TextLink from '@/components/text-link';
import ClientAuthLayout from '@/layouts/client-auth-layout';
import { request } from '@/routes/password';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import CInput from '@/components/cwoste/c-input';

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
    const { data, setData, post, processing, errors, reset } = useForm({
        login: '',       // ✅ changed from "email" to "login"
        password: '',
        remember: false,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        post('login', {
            onFinish: () => reset('password'), // clear password
        });
    };

    return (
        <ClientAuthLayout>
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

                <form onSubmit={handleSubmit} className="p-8 space-y-6">

                    {/* ✅ now accepts email OR CCP */}

                    <CInput 
                        label="البريد الالكتروني أو رقم CCP"
                        placeholder="example@domain.com / 1234567890"
                        type="text"
                        required
                        icon="lucide:mail"
                        value={data.login}
                        onChange={(value) => setData('login', value)}
                        dir='ltr'
                        error={errors.login}
                    />

                    <CInput
                        label="كلمة السر"
                        placeholder="••••••••"
                        required
                        type="password"
                        icon="lucide:lock"
                        value={data.password}
                        onChange={(value) => setData('password', value)}
                        dir="ltr"
                        error={errors.password}
                    />
                    
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-2">
                            <Checkbox
                                id="remember"
                                className="data-[state=checked]:border-green-600 data-[state=checked]:bg-green-600 data-[state=checked]:text-white"
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
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full py-3 rounded-md bg-green-500 text-white font-medium hover:bg-green-600 transition-all duration-300 shadow-md hover:shadow-lg"
                        >
                            <i className="fas fa-sign-in-alt ml-2 rotate-180"></i> تسجيل الدخول
                        </button>
                    </div>
                    <p className="text-sm text-center">
                        ليس لديك حساب؟{' '}
                        <a href="#" className="text-green-500 hover:underline font-medium">
                            سجل الآن
                        </a>
                    </p>
                </form>
            </div>
        </ClientAuthLayout>
    );
}
