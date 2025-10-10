import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useForm, usePage } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    ChevronDown,
    Bell,
    Search,
    LogOut,
    Settings,
    User as UserIcon,
} from "lucide-react";
import {
    Collapsible,
    CollapsibleTrigger,
    CollapsibleContent,
} from "@/components/ui/collapsible";

type AuthedUser = {
    id: number;
    name: string;
    email: string;
    image?: string | null;
};

type PageProps = {
    auth: { user: AuthedUser };
};

export default function ClientAppLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { props } = usePage<PageProps>();
    const user = props.auth?.user;

    const logout = useForm({});
    const handleLogout = (e: React.FormEvent) => {
        e.preventDefault();
        logout.post("/logout");
    };

    // close menu on ESC
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") setIsMenuOpen(false);
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, []);

    // close menu when resizing to large screen
    useEffect(() => {
        const onResize = () => {
            if (window.innerWidth >= 768) setIsMenuOpen(false);
        };
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);

    // user avatar
    const renderAvatar = (size = "h-8 w-8 text-[11px]") => {
        if (user?.image) {
            return (
                <img
                    src={user.image}
                    alt={user.name}
                    className={`${size} rounded-full object-cover`}
                />
            );
        }
        const initials = user?.name
            ? user.name
                .split(" ")
                .map((n) => n[0])
                .join(" ")
                .toUpperCase()
            : "م";
        return (
            <div
                className={`${size} rounded-full bg-green-100 flex items-center justify-center font-semibold text-green-600`}
            >
                {initials}
            </div>
        );
    };

    return (
        <div className="bg-gray-50">
            <header className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50 flex justify-between items-center h-20 px-4 sm:px-6 lg:px-8">
                {/* Logo */}
                <div className="flex items-center gap-2">
                    <img
                        src="/assets/images/cwoste23-logo.png"
                        alt="cwoste23-logo"
                        className="h-14"
                    />
                    <div>
                        <h1 className="text-lg font-bold text-gray-800">CWOSTE 23</h1>
                        <p className="text-xs text-gray-500">
                            اللجنة الولائية للخدمات الاجتماعية لولاية عنابة
                        </p>
                    </div>
                </div>

                {/* Desktop nav */}
                <nav className="hidden md:flex gap-6">
                    <Link
                        href="/dashboard"
                        className="px-3 py-2 text-sm font-medium border-b-2 text-green-600 border-green-500"
                    >
                        <i className="fas fa-tachometer-alt text-base me-2"></i>
                        لوحة التحكم
                    </Link>
                    <Link
                        href="/services"
                        className="px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 border-b-2 border-transparent"
                    >
                        <i className="fas fa-plus-circle text-base me-2"></i>
                        الخدمات
                    </Link>
                    <Link
                        href="/orders"
                        className="px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 border-b-2 border-transparent"
                    >
                        <i className="fas fa-file-alt text-base me-2"></i>
                        الطلبات
                    </Link>
                </nav>

                {/* Right side */}
                <div className="flex items-center gap-4">
                    {/* Search */}
                    <Button
                        variant="outline"
                        className="hidden md:flex w-10 h-10 p-0 text-gray-600 hover:text-green-600"
                    >
                        <Search className="w-4 h-4" />
                    </Button>

                    {/* Notifications */}
                    <div className="relative hidden md:block">
                        <Button
                            variant="outline"
                            className="w-10 h-10 p-0 text-gray-600 hover:text-green-600"
                        >
                            <Bell className="w-4 h-4" />
                        </Button>
                        <span className="absolute -top-1 -start-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                            3
                        </span>
                    </div>

                    {/* Profile dropdown desktop */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                className="hidden md:flex items-center gap-2 px-2 py-5.5 hover:bg-green-50 transition-colors"
                            >
                                {renderAvatar()}
                                <span className="text-sm font-medium text-gray-700">
                                    {user?.name ?? "مستخدم"}
                                </span>
                                <ChevronDown className="w-4 h-4 text-gray-400" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56">
                            <DropdownMenuLabel>
                                <div className="flex flex-col">
                                    <span className="font-medium">{user?.name ?? "مستخدم"}</span>
                                    <span className="text-xs text-muted-foreground">
                                        {user?.email}
                                    </span>
                                </div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild>
                                <Link href="/profile" className="flex items-center gap-2">
                                    <UserIcon className="w-4 h-4" />
                                    الصفحة الشخصية
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link href="/settings" className="flex items-center gap-2">
                                    <Settings className="w-4 h-4" />
                                    الإعدادات
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild>
                                <form onSubmit={handleLogout} className="w-full">
                                    <button
                                        type="submit"
                                        disabled={logout.processing}
                                        className="w-full flex items-center gap-2 text-start"
                                    >
                                        <LogOut className="w-4 h-4" />
                                        تسجيل الخروج
                                    </button>
                                </form>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {/* Mobile toggle */}
                    <Button
                        variant="ghost"
                        className="md:hidden p-2 text-gray-600 hover:text-green-600"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? (
                            <i className="fas fa-times text-lg"></i>
                        ) : (
                            <i className="fas fa-bars text-lg"></i>
                        )}
                    </Button>
                </div>
            </header>

            {/* Mobile overlay + sheet */}
            <AnimatePresence>
                {isMenuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            key="backdrop"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="fixed inset-0 z-40 bg-black/30"
                            onClick={() => setIsMenuOpen(false)}
                        />
                        {/* Sheet */}
                        <motion.div
                            key="sheet"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                            className="md:hidden bg-white border-t border-gray-200 fixed top-20 inset-x-0 z-50 shadow-lg"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="px-3 pt-3 pb-4 space-y-1">
                                <Link
                                    href="/dashboard"
                                    className="flex items-center px-3 py-2 text-base font-medium rounded-md text-green-600 bg-green-50"
                                >
                                    <i className="fas fa-home text-base me-2"></i>
                                    الرئيسية
                                </Link>
                                <Link
                                    href="/orders"
                                    className="flex items-center px-3 py-2 text-base font-medium rounded-md text-gray-600 hover:bg-green-50"
                                >
                                    <i className="fas fa-file-alt text-base me-2"></i>
                                    طلباتي
                                </Link>
                                <Link
                                    href="/services/new"
                                    className="flex items-center px-3 py-2 text-base font-medium rounded-md text-gray-600 hover:bg-green-50"
                                >
                                    <i className="fas fa-plus-circle text-base me-2"></i>
                                    طلب جديد
                                </Link>
                                {/* Notifications */}
                                <Link
                                    href="/notifications"
                                    className="relative flex items-center px-3 py-2 text-base font-medium rounded-md text-gray-600 hover:bg-green-50"
                                >
                                    <i className="fas fa-bell text-base me-2"></i>
                                    الإشعارات
                                    <span className="absolute start-3 top-2 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                                        3
                                    </span>
                                </Link>

                                {/* Collapsible profile section */}
                                <Collapsible>
                                    <CollapsibleTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            className="w-full flex items-center justify-between px-3 py-6 mt-2 rounded-md hover:bg-green-50"
                                        >
                                            <div className="flex items-center gap-3 text-start">
                                                {renderAvatar("h-6 w-6 text-[8px] p-2")}
                                                <div>
                                                    <div className="font-medium text-gray-800">{user?.name ?? "مستخدم"}</div>
                                                    <div className="text-xs text-gray-500">{user?.email}</div>
                                                </div>
                                            </div>
                                            <ChevronDown className="w-4 h-4 text-gray-400" />
                                        </Button>
                                    </CollapsibleTrigger>

                                    <CollapsibleContent className="mt-2 space-y-1 border-t border-gray-100 pt-2 CollapsibleContent">
                                        <Link
                                            href="/profile"
                                            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 rounded-md hover:bg-gray-50"
                                        >
                                            <UserIcon className="w-4 h-4 text-gray-500" />
                                            الصفحة الشخصية
                                        </Link>
                                        <Link
                                            href="/settings"
                                            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 rounded-md hover:bg-gray-50"
                                        >
                                            <Settings className="w-4 h-4 text-gray-500" />
                                            الإعدادات
                                        </Link>
                                        <form onSubmit={handleLogout}>
                                            <button
                                                type="submit"
                                                disabled={logout.processing}
                                                className="flex items-center gap-2 w-full text-start px-4 py-2 text-sm text-gray-700 rounded-md hover:bg-gray-50 hover:text-red-600"
                                            >
                                                <LogOut className="w-4 h-4 text-gray-500" />
                                                تسجيل الخروج
                                            </button>
                                        </form>
                                    </CollapsibleContent>
                                </Collapsible>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>


            {children}
        </div>
    );
}
