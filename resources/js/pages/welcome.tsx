import { Head, Link, usePage } from "@inertiajs/react";
import { dashboard, login, register } from "@/routes";
import { type SharedData } from "@/types";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Menu, LogIn, UserPlus, LayoutDashboard, LogOut } from "lucide-react";
import {
    FaHandHoldingUsd,
    FaUniversity,
    FaHeartbeat,
    FaUmbrellaBeach,
    FaEllipsisH,
} from "react-icons/fa";

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    const services = [
        {
            label: "قروض اجتماعية",
            icon: <FaHandHoldingUsd className="text-xl" />,
            color: "bg-green-100 text-green-600",
        },
        {
            label: "منح ومساعدات",
            icon: <FaUniversity className="text-xl" />,
            color: "bg-blue-100 text-blue-600",
        },
        {
            label: "علاج واستشفاء",
            icon: <FaHeartbeat className="text-xl" />,
            color: "bg-red-100 text-red-500",
        },
        {
            label: "رحلات واصطياف",
            icon: <FaUmbrellaBeach className="text-xl" />,
            color: "bg-yellow-100 text-yellow-500",
        },
    ];

    return (
        <>
            <Head title="الخدمات الاجتماعية لولاية عنابة" />
            <div className="min-h-screen flex flex-col bg-gray-50">
                {/* Header */}
                <header className="w-full bg-white border-b shadow-sm">
                    <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
                        {/* Logo + name */}
                        <div className="flex items-center gap-2">
                            <img src="/assets/images/cwoste23-logo.png" className="size-16" alt="CWOSTE 23 Logo" />
                            <div className="flex flex-col">
                                <h1 className="text-3xl font-bold">CWOSTE 23</h1>
                                <p className="text-xs">اللجنة الولائية للخدمات الاجتماعية لولاية عنابة</p>
                            </div>
                        </div>

                        {/* Desktop auth */}
                        <nav className="hidden md:flex items-center gap-3">
                            {auth.user ? (
                                <Link href={dashboard()}>
                                    <Button className="bg-green-600 hover:bg-green-700 flex items-center gap-2">
                                        <LayoutDashboard className="h-4 w-4" />
                                        لوحة التحكم
                                    </Button>
                                </Link>
                            ) : (
                                <>
                                    <Link href={login()}>
                                        <Button
                                            variant="outline"
                                            className="border-green-600 text-green-600 hover:bg-green-50 flex items-center gap-2"
                                        >
                                            <LogIn className="h-4 w-4 rotate-180" />
                                            تسجيل الدخول
                                        </Button>
                                    </Link>
                                    <Link href={register()}>
                                        <Button className="bg-green-600 hover:bg-green-700 flex items-center gap-2">
                                            <UserPlus className="h-4 w-4" />
                                            إنشاء حساب
                                        </Button>
                                    </Link>
                                </>
                            )}
                        </nav>

                        {/* Mobile auth (shadcn dropdown) */}
                        <div className="md:hidden">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" size="icon" className="border-gray-300">
                                        <Menu className="h-5 w-5" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-44">
                                    {auth.user ? (
                                        <DropdownMenuItem asChild>
                                            <Link
                                                href={dashboard()}
                                                className="w-full flex items-center gap-2"
                                            >
                                                <LayoutDashboard className="h-4 w-4" />
                                                لوحة التحكم
                                            </Link>
                                        </DropdownMenuItem>
                                    ) : (
                                        <>
                                            <DropdownMenuItem asChild>
                                                <Link
                                                    href={login()}
                                                    className="w-full flex items-center gap-2"
                                                >
                                                    <LogIn className="h-4 w-4 rotate-180" />
                                                    تسجيل الدخول
                                                </Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem asChild>
                                                <Link
                                                    href={register()}
                                                    className="w-full flex items-center gap-2"
                                                >
                                                    <UserPlus className="h-4 w-4" />
                                                    إنشاء حساب
                                                </Link>
                                            </DropdownMenuItem>
                                        </>
                                    )}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </header>

                {/* Main */}
                <main className="flex-1 max-w-6xl mx-auto px-6 py-10 lg:py-16 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                    {/* Left: title + services */}
                    <div className="order-2 lg:order-1">
                        <h1 className="text-3xl font-bold text-gray-900 mb-3">
                            الخدمات الاجتماعية لولاية عنابة
                        </h1>
                        <p className="text-gray-600 text-lg mb-8">
                            دعم اجتماعي ومادي لموظفي قطاع التربية: قروض، منح، علاج، رحلات.
                        </p>

                        {/* Services */}
                        <div className="grid grid-cols-2 gap-4">
                            {services.map((s, i) => (
                                <div
                                    key={i}
                                    className="bg-white rounded-lg shadow-sm p-4 flex flex-col items-center text-center gap-2 lg:items-center lg:justify-center transition"
                                >
                                    <div
                                        className={`w-12 h-12 rounded-full flex items-center justify-center ${s.color}`}
                                    >
                                        {s.icon}
                                    </div>
                                    <span className="font-medium text-gray-700">{s.label}</span>
                                </div>
                            ))}

                        </div>
                    </div>

                    {/* Right: image (focus top) */}
                    <div className="order-1 lg:order-2">
                        <div className="rounded-xl overflow-hidden shadow-lg">
                            <img
                                src="/assets/images/cwoste-annaba.jpg"
                                alt="مقر اللجنة الولائية للخدمات الاجتماعية"
                                className="w-full h-80 md:h-[420px] object-cover object-top"
                            />
                        </div>
                    </div>
                </main>

                {/* Footer */}
                <footer className="bg-white border-t mt-10">
                    <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between text-sm text-gray-500">
                        <p>© {new Date().getFullYear()} CWOSTE 23 - جميع الحقوق محفوظة</p>
                        <div className="flex gap-4 mt-3 md:mt-0">
                            <a href="#" className="hover:text-green-600">
                                سياسة الخصوصية
                            </a>
                            <a href="#" className="hover:text-green-600">
                                الشروط والأحكام
                            </a>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
