import { useForm, Head } from '@inertiajs/react';
import ClientAuthLayout from '@/layouts/client-auth-layout';
import { login } from '@/routes';
import InputIcon from '@/components/cwoste/inputs/input-icon';
import { LuMail } from 'react-icons/lu';
import TextLink from '@/components/text-link';

interface ForgotPasswordProps {
    status?: string;
}

export default function ForgotPassword({ status }: ForgotPasswordProps) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/forgot-password');
    };

    return (
        <ClientAuthLayout>
            <Head title="نسيت كلمة المرور" />

            <div className="max-w-lg mx-auto rounded-lg bg-white shadow-sm border border-gray-200 flex flex-col">
                <div className="bg-white py-6 px-6 rounded-t-lg flex items-center justify-center gap-4 border-b">
                    <div className="bg-green-50 w-16 h-16 flex items-center justify-center rounded-full text-green-500">
                        <i className="fas fa-unlock-alt text-2xl"></i>
                    </div>
                    <div>
                        <h2 className="text-gray-800 font-bold text-xl">نسيت كلمة المرور</h2>
                        <p className="text-gray-500 text-sm mt-1">
                            أدخل بريدك الإلكتروني لتصلك رسالة إعادة التعيين
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    {status && (
                        <div className="mb-4 text-center text-sm font-medium text-green-600">
                            {status}
                        </div>
                    )}

                    <InputIcon
                        label="البريد الإلكتروني"
                        placeholder="example@domain.com"
                        type="email"
                        required
                        icon={<LuMail className="size-5" />}
                        value={data.email}
                        onChange={(value) => setData('email', value)}
                        error={errors.email}
                    />

                    <div className="pt-6 border-t border-gray-200">
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full py-3 rounded-md bg-green-500 text-white font-medium hover:bg-green-600 transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                        >
                            {processing ? (
                                <i className="fas fa-spinner fa-spin"></i>
                            ) : (
                                <i className="fas fa-paper-plane"></i>
                            )}
                            <span>إرسال رابط إعادة التعيين</span>
                        </button>
                    </div>

                    <p className="text-sm text-center">
                        أو يمكنك العودة إلى{' '}
                        <TextLink href={login()} className="text-green-500 hover:underline font-medium">
                            تسجيل الدخول
                        </TextLink>
                    </p>
                </form>
            </div>
        </ClientAuthLayout>
    );
}
