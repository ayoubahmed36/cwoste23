import { useForm, Head } from '@inertiajs/react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import ClientAuthLayout from '@/layouts/client-auth-layout'; // ✅ reuse your existing layout
import CInput from '@/components/cwoste/c-input';

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

export default function AdminLogin({ status, canResetPassword }: LoginProps) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '', // ✅ only email now
        password: '',
        remember: false,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Hit your admin login route (POST /admin/login)
        post('/admin/login', {
            onFinish: () => reset('password'),
        });
    };

    return (
        <ClientAuthLayout>
            <Head title="تسجيل دخول المشرف" />

            <div className="max-w-md w-full mx-auto bg-white rounded-lg shadow-md overflow-hidden">
                <div className="px-6 py-8">
                    <div className="flex flex-col items-center mb-6">
                        <div className="bg-green-50 w-16 h-16 flex items-center justify-center rounded-full text-green-500 mb-4">
                            <i className="fas fa-user-shield text-2xl"></i>
                        </div>
                        <h2 className="text-xl font-bold text-gray-800">تسجيل دخول المشرف</h2>
                        <p className="text-sm text-gray-500 mt-1">
                            ادخل بريدك الإلكتروني وكلمة المرور للوصول إلى لوحة التحكم
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* ✅ email only */}

                        <CInput
                            label="البريد الإلكتروني"
                            placeholder="example@domain.com"
                            type="email"
                            required
                            icon="lucide:mail"
                            value={data.email}
                            onChange={(value) => setData('email', value)}
                            dir='ltr'
                            error={errors.email}
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

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Checkbox
                                    id="remember"
                                    name="remember"
                                    checked={data.remember}
                                    onCheckedChange={(checked) => setData('remember', !!checked)}
                                />
                                <Label htmlFor="remember">تذكرني</Label>
                            </div>
                            {canResetPassword && (
                                <a href="#" className="text-sm text-green-500 hover:underline">
                                    نسيت كلمة المرور؟
                                </a>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full py-3 rounded-md bg-green-500 text-white font-medium hover:bg-green-600 transition-all duration-300"
                        >
                            <i className="fas fa-sign-in-alt ml-2 rotate-180"></i> دخول
                        </button>
                    </form>
                </div>
            </div>
        </ClientAuthLayout>
    );
}
