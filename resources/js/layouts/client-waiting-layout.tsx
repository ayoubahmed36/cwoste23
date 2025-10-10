import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm, usePage, Link } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, LogOut, User as UserIcon, Settings, Clock } from "lucide-react";

type AuthedUser = {
    id: number;
    name: string;
    email: string;
    image?: string | null;
};

type PageProps = {
    auth: { user: AuthedUser };
};

export default function ClientWaitingLayout({
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

    const renderAvatar = (size = "h-8 w-8 text-[11px]") => {
        if (user?.id) {
            return (
                <img
                    src={`/profile-image/${user.id}`}
                    alt={user.name}
                    className={`${size} rounded-full object-cover border-2 border-white shadow-sm`}
                    onError={(e) => {
                        // Fallback to initials if image fails to load
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                    }}
                />
            );
        }

        const initials = user?.name
            ? user.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()
                .slice(0, 2)
            : "م";

        return (
            <div
                className={`${size} rounded-full bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center font-semibold text-green-700 border-2 border-white shadow-sm`}
            >
                {initials}
            </div>
        );
    };

    return (
        <div className="bg-gray-50 min-h-screen flex flex-col">
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
                            الخدمات الاجتماعية، ولاية عنابة
                        </p>
                    </div>
                </div>

                {/* Profile dropdown */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="ghost"
                            className="flex items-center gap-2 px-2 py-5.5 hover:bg-green-50 transition-colors"
                        >
                            {renderAvatar()}
                            <span className="text-sm font-medium text-gray-700 hidden md:block">
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
                            <Link href="/settings/profile" className="flex items-center gap-2">
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
            </header>

            {children}
        </div>
    );
}
