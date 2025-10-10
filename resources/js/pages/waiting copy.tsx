import { Head, Link } from "@inertiajs/react";
import ClientWaitingLayout from "@/layouts/client-waiting-layout";
import { Clock, Check, Shield, Mail, Upload, Search, CheckCircle, Loader, BellPlus } from "lucide-react";
import { motion } from "framer-motion";

export default function Waiting() {
    return (
        <ClientWaitingLayout>
            <Head title="حسابك قيد المراجعة" />

            <main className="flex-grow flex items-center justify-center py-12 px-4 bg-gradient-to-tr from-green-50 to-green-100">
                <div className="max-w-5xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden">
                    <div className="md:flex">
                        {/* Left side */}
                        <div className="md:w-2/5 bg-gradient-to-b from-green-500 to-green-700 p-10 text-white flex flex-col justify-center items-center">
                            <motion.div
                                className="mb-6"
                                animate={{ rotate: [0, 360] }}
                                transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                            >
                                <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center">
                                    <motion.div
                                        className="w-24 h-24 bg-white/30 rounded-full flex items-center justify-center"
                                        animate={{ scale: [1, 1.1, 1] }}
                                        transition={{ repeat: Infinity, duration: 2 }}
                                    >
                                        <Clock className="w-12 h-12 text-white" />
                                    </motion.div>
                                </div>
                            </motion.div>

                            <h2 className="text-2xl font-bold mb-2">جاري المراجعة</h2>
                            <div className="flex gap-1 text-xl">
                                <motion.span
                                    animate={{ y: [0, -6, 0] }}
                                    transition={{ repeat: Infinity, duration: 1 }}
                                >
                                    .
                                </motion.span>
                                <motion.span
                                    animate={{ y: [0, -6, 0] }}
                                    transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
                                >
                                    .
                                </motion.span>
                                <motion.span
                                    animate={{ y: [0, -6, 0] }}
                                    transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}
                                >
                                    .
                                </motion.span>
                            </div>
                        </div>

                        {/* Right side */}
                        <div className="md:w-3/5 p-10">
                            <div className="text-center mb-8">
                                <h2 className="text-3xl font-bold text-green-700">شكراً لتسجيلك!</h2>
                                <p className="text-gray-600 mt-2">
                                    طلبك قيد المعالجة وسيتم مراجعته قريباً
                                </p>
                            </div>

                            <div className="bg-blue-50 border-r-4 border-blue-500 p-6 rounded-lg mb-8 shadow-sm text-right">
                                <div className="flex items-start">
                                    <div className="flex-shrink-0 bg-blue-100 p-3 rounded-full">
                                        <Mail className="w-5 h-5 text-blue-600" />
                                    </div>
                                    <div className="mr-4">
                                        <h3 className="text-lg font-medium text-blue-800">ماذا يحدث الآن؟</h3>
                                        <p className="text-blue-700 mt-2 text-sm">
                                            بياناتك قيد المراجعة من قبل الإدارة. هذه العملية قد تستغرق من 24 إلى 48 ساعة.
                                            سيتم إشعارك عبر البريد الإلكتروني فور اكتمال المراجعة.
                                        </p>
                                    </div>
                                </div>
                            </div>

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
                    </div>
                </div>
            </main>

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
