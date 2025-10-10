import { Head, useForm } from '@inertiajs/react';
import ClientAuthLayout from '@/layouts/client-auth-layout';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface VerifyEmailProps {
    status?: string; // e.g. "verification-link-sent"
}

export default function VerifyEmail({ status }: VerifyEmailProps) {
    const resend = useForm({});
    const logout = useForm({});
    const [justSent, setJustSent] = useState(false);

    const handleResend = (e: React.FormEvent) => {
        e.preventDefault();
        resend.post('/email/verification-notification', {
            onSuccess: () => setJustSent(true),
        });
    };

    const handleLogout = (e: React.FormEvent) => {
        e.preventDefault();
        logout.post('/logout');
    };

    const linkSent = justSent || status === 'verification-link-sent';

    return (
        <ClientAuthLayout>
            <Head title="تأكيد البريد الإلكتروني" />

            <div className="max-w-lg mx-auto rounded-lg bg-white shadow-sm border border-gray-200 flex flex-col">
                {/* Header */}
                <div className="bg-white py-6 px-6 rounded-t-lg flex items-center justify-center gap-4 border-b">
                    <div className="bg-green-50 w-16 h-16 flex items-center justify-center rounded-full text-green-500">
                        <i className="fas fa-envelope-open-text text-2xl"></i>
                    </div>
                    <div>
                        <h2 className="text-gray-800 font-bold text-xl">تأكيد البريد الإلكتروني</h2>
                        <p className="text-gray-500 text-sm mt-1">
                            لقد أرسلنا رابط تأكيد إلى بريدك الإلكتروني. يرجى التحقق من بريدك.
                        </p>
                    </div>
                </div>

                {/* Body */}
                <div className="p-8 space-y-6">
                    {linkSent && (
                        <div className="rounded-md border border-green-200 bg-green-50 text-green-700 px-4 py-3 text-sm">
                            تم إرسال رابط تحقق جديد إلى بريدك الإلكتروني.
                        </div>
                    )}

                    <p className="text-gray-700 text-sm leading-6">
                        إذا لم يصلك البريد خلال عدة دقائق، يمكنك إعادة إرسال رابط التحقق بالضغط على الزر أدناه.
                    </p>

                    <form onSubmit={handleResend} className="space-y-4">
                        <Button
                            type="submit"
                            disabled={resend.processing}
                            className="w-full bg-green-500 hover:bg-green-600 transition-all duration-300 cursor-pointer rounded-md"
                        >
                            <i className="fas fa-paper-plane ml-2"></i>
                            إعادة إرسال رابط التحقق
                        </Button>
                    </form>

                    <div className="pt-6 border-t border-gray-200 flex items-center justify-between">
                        <span className="text-sm text-gray-600">
                            أدخلت بريدًا خاطئًا؟ قم بتسجيل الخروج لتغيير البريد.
                        </span>
                        <form onSubmit={handleLogout}>
                            <Button
                                type="submit"
                                disabled={logout.processing}
                                className="bg-green-500 hover:bg-green-600 transition-all duration-300 cursor-pointer rounded-md"
                            >
                                تسجيل الخروج
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </ClientAuthLayout>
    );
}
