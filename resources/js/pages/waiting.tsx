import { Head, Link } from '@inertiajs/react';
import ClientWaitingLayout from '@/layouts/client-waiting-layout';
import { LuSquarePen, LuTriangleAlert, LuCircleCheck, LuFileText, LuUser, LuBriefcase, LuMail, LuPhone, LuCalendar, LuCreditCard } from "react-icons/lu";
import { BellPlus, Check, CheckCircle, Loader, Mail, Search, Sparkles, Upload } from "lucide-react";
import { motion } from "framer-motion";

interface UserData {
    ccp: string;
    email: string;
    lastName: string;
    firstName: string;
    phone: string;
    gender: string;
    dateOfBirth: string;
    maritalStatus: string;
    nbChildren: number;
    jobStatus: string;
    jobTitle: string;
    personalImage: string | null;
    files: string[];
}

export default function Waiting() {
    // Fake data for demonstration
    const userData: UserData = {
        ccp: "123456789012345",
        email: "john.doe@example.com",
        lastName: "Doe",
        firstName: "John",
        phone: "+213 123 456 789",
        gender: "ذكر",
        dateOfBirth: "1990-05-15",
        maritalStatus: "متزوج",
        nbChildren: 2,
        jobStatus: "موظف",
        jobTitle: "أستاذ التعليم الثانوي",
        personalImage: null,
        files: ["شهادة عمل أو شهادة الإحالة على التقاعد.pdf", "صك بريدي.pdf"]
    };

    // Get initials for avatar
    const getInitials = (firstName: string, lastName: string) => {
        return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('ar-EG');
    };

    return (
        <ClientWaitingLayout>
            <Head title="حسابك قيد المراجعة" />

            <div className="p-6 max-w-4xl mx-auto space-y-6">
                {/* ✅ Success Alert */}
                <div className="relative overflow-hidden bg-gradient-to-br from-green-600 via-green-500 to-emerald-600 rounded-2xl p-6 shadow-2xl md:p-8">
                    {/* Decorative background elements */}
                    <div className="absolute inset-0 opacity-12">
                        <div className="absolute top-4 right-4 w-20 h-20 bg-green-100 rounded-full blur-xl"></div>
                        <div className="absolute bottom-6 left-6 w-16 h-16 bg-emerald-100 rounded-full blur-lg"></div>
                        <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-green-200 rounded-full blur-md"></div>
                    </div>

                    {/* Animated sparkles */}
                    <div className="absolute top-6 right-6 text-green-200 opacity-60">
                        <Sparkles className="h-5 w-5 animate-pulse" />
                    </div>
                    <div className="absolute bottom-8 left-8 text-emerald-200 opacity-40">
                        <Sparkles className="h-4 w-4 animate-pulse delay-700" />
                    </div>

                    {/* Main content */}
                    <div className="relative z-10 flex items-start gap-6 md:px-6">

                        {/* Text content */}
                        <div className="flex-1">
                            <div className="flex flex-col md:flex-row items-center gap-3 mb-4">
                                {/* Success icon with glow effect */}
                                <div className="relative p-2 rounded-full shadow-lg mb-2 md:mb-0">
                                    <LuCircleCheck className="h-12 w-12 text-white md:h-6 md:w-6" />
                                </div>
                                <h3 className="font-bold text-white text-[22px] md:text-2xl tracking-wide">
                                    تم إنشاء حسابك بنجاح! 🎉
                                </h3>
                            </div>

                            <p className="text-green-100 text-base leading-relaxed opacity-90">
                                تم تسجيل معلوماتك الأساسية بنجاح. بياناتك قيد المراجعة من قبل الإدارة، سيتم إشعارك عبر البريد الإلكتروني فور اكتمال المراجعة.
                            </p>
                        </div>
                    </div>

                    {/* Subtle border glow */}
                    <div className="absolute inset-0 rounded-2xl border border-green-400 border-opacity-20 pointer-events-none"></div>
                </div>

                {/* Right side */}
                <div className="p-10">

                    <div className="space-y-4 mb-8">
                        <AnimatedInfoBox
                            icon={<Check className="w-5 h-5" />}
                            title="تم استلام ملفاتك بنجاح"
                            text="جميع المستندات المطلوبة قد تم رفعها"
                            color="green"
                            delay={0}
                        />
                        <AnimatedInfoBox
                            icon={<Loader className="w-5 h-5 animate-spin" />}
                            title="جاري مراجعة بياناتك"
                            text="الفريق الإداري يفحص معلوماتك بدقة"
                            color="amber"
                            delay={0.2}
                        />
                        <AnimatedInfoBox
                            icon={<BellPlus className="w-5 h-5" />}
                            title="في انتظار الموافقة النهائية"
                            text="سيصلك إشعار عند اكتمال العملية"
                            color="purple"
                            delay={0.4}
                        />
                    </div>

                    <div className="bg-gray-100 p-4 rounded-xl text-center text-sm text-gray-700">
                        لأي استفسار، لا تتردد في{" "}
                        <Link href="/contact" className="text-green-600 hover:underline font-medium">
                            الاتصال بنا
                        </Link>
                    </div>
                </div>

            {/* Progress Section */}
            <section className="container mx-auto px-4 py-12">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl font-bold text-center text-green-700 mb-8">
                        مراحل المراجعة
                    </h2>
                    <div className="flex justify-between items-center mb-4">
                        <Step icon={<Upload className="w-6 h-6" />} label="رفع الملفات" active />
                        <Step icon={<Search className="w-6 h-6" />} label="مراجعة البيانات" active pulse />
                        <Step icon={<CheckCircle className="w-6 h-6" />} label="الموافقة" />
                    </div>
                </div>
            </section>
            </div>
        </ClientWaitingLayout>
    );
}

/* Animated InfoBox */
function AnimatedInfoBox({
    icon,
    title,
    text,
    color,
    delay = 0,
}: {
    icon: React.ReactNode;
    title: string;
    text: string;
    color: "green" | "amber" | "purple";
    delay?: number;
}) {
    const colors: any = {
        green: "bg-green-50 text-green-600",
        amber: "bg-amber-50 text-amber-600",
        purple: "bg-purple-50 text-purple-600",
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay }}
            className={`flex items-center p-4 rounded-xl shadow-sm ${colors[color]} bg-opacity-50`}
        >
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow me-4">
                {icon}
            </div>
            <div>
                <h4 className="font-medium text-gray-800">{title}</h4>
                <p className="text-xs text-gray-600">{text}</p>
            </div>
        </motion.div>
    );
}

/* Step with optional pulse */
function Step({
    icon,
    label,
    active,
    pulse,
}: {
    icon: React.ReactNode;
    label: string;
    active?: boolean;
    pulse?: boolean;
}) {
    return (
        <motion.div
            animate={pulse ? { scale: [1, 1.1, 1] } : {}}
            transition={pulse ? { repeat: Infinity, duration: 2 } : {}}
            className="flex flex-col items-center flex-1"
        >
            <div
                className={`w-16 h-16 rounded-full flex items-center justify-center shadow-lg ${
                    active ? "bg-green-500 text-white" : "bg-gray-300 text-gray-500"
                }`}
            >
                {icon}
            </div>
            <p className="mt-2 text-sm font-medium">{label}</p>
        </motion.div>
    );
}
