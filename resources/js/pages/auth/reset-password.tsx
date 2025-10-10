import { useForm, Head } from '@inertiajs/react';
import ClientAuthLayout from '@/layouts/client-auth-layout';
import InputIcon from '@/components/cwoste/inputs/input-icon';
import InputPassword from '@/components/cwoste/inputs/input-password';
import InputError from '@/components/input-error';
import { LuMail } from 'react-icons/lu';

interface ResetPasswordProps {
    token: string;
    email: string;
}

export default function ResetPassword({ token, email }: ResetPasswordProps) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token,
        email,
        password: '',
        password_confirmation: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/reset-password', {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <ClientAuthLayout>
            <Head title="إعادة تعيين كلمة المرور" />

            <div className="max-w-lg mx-auto rounded-lg bg-white shadow-sm border border-gray-200 flex flex-col">
                <div className="bg-white py-6 px-6 rounded-t-lg flex items-center justify-center gap-4 border-b">
                    <div className="bg-green-50 w-16 h-16 flex items-center justify-center rounded-full text-green-500">
                        <i className="fas fa-key text-2xl"></i>
                    </div>
                    <div>
                        <h2 className="text-gray-800 font-bold text-xl">إعادة تعيين كلمة المرور</h2>
                        <p className="text-gray-500 text-sm mt-1">من فضلك أدخل كلمة المرور الجديدة</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    <InputIcon
                        label="البريد الإلكتروني"
                        type="email"
                        value={data.email}
                        icon={<LuMail className="size-5" />}
                        disabled
                        readOnly
                        error={errors.email}
                    />

                    <InputPassword
                        label="كلمة المرور الجديدة"
                        placeholder="********"
                        required
                        value={data.password}
                        onChange={(value) => setData('password', value)}
                        error={errors.password}
                    />

                    <InputPassword
                        label="تأكيد كلمة المرور"
                        placeholder="********"
                        required
                        value={data.password_confirmation}
                        onChange={(value) => setData('password_confirmation', value)}
                        error={errors.password_confirmation}
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
                                <i className="fas fa-check-circle"></i>
                            )}
                            <span>تأكيد إعادة التعيين</span>
                        </button>
                    </div>
                </form>
            </div>
        </ClientAuthLayout>
    );
}
