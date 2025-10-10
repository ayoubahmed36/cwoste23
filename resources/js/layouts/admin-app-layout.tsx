import React, { useState, useEffect, useRef } from 'react';
import NotificationDropdown from '@/components/notification-dropdown';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
    ChevronDown,
    LogOut,
    Settings,
    User as UserIcon,
} from "lucide-react";

import {
    Collapsible,
    CollapsibleTrigger,
    CollapsibleContent,
} from "@/components/ui/collapsible";
import { Link, useForm, usePage } from '@inertiajs/react';

type AuthedUser = {
    id: number;
    name: string;
    email: string;
    image?: string | null;
};

type Notification = {
    id: number;
    title: string;
    message: string;
    is_read: boolean;
    created_at: string;
};

type PageProps = {
    auth: { user: AuthedUser };
    notifications: Notification[];   // ✅ new
    unreadCount: number;
};


export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const { props } = usePage<PageProps>();
    const user = props.auth?.user;
    const { notifications, unreadCount } = props;
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [smallScreen, setSmallScreen] = useState(false);
    const [hover, setHover] = useState(false);
    const [firstRender, setFirstRender] = useState(true);

    useEffect(() => {
        const handleResize = () => {
            setSmallScreen(window.innerWidth < 1024);
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        setFirstRender(false);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const toggleMenu = () => {
        if (smallScreen) {
            setMobileMenuOpen(!mobileMenuOpen);
        } else {
            setSidebarCollapsed(!sidebarCollapsed);
        }
    };

    const handleSidebarHover = () => {
        if (sidebarCollapsed && !smallScreen) {
            setHover(true);
        }
    };

    const handleSidebarLeave = () => {
        setHover(false);
    };

    const logout = useForm({});
    const handleLogout = (e: React.FormEvent) => {
        e.preventDefault();
        logout.post("/admin/logout");
    };

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

    const getSidebarClass = () => {
        let className = "sidebar fixed top-0 inset-inline-start z-50 h-full bg-white border-e border-gray-200 transition-all duration-200 ease-in-out";

        if (smallScreen && !mobileMenuOpen) {
            className += " translate-x-full";
        } else if (mobileMenuOpen) {
            className += " translate-x-0";
        }

        if (hover || !sidebarCollapsed || smallScreen) {
            className += " w-64";
        } else if (!smallScreen && sidebarCollapsed && !hover) {
            className += " w-16";
        }

        return className;
    };

    const getContentClass = () => {
        let className = "min-h-[calc(100vh-4rem)] transition-all duration-200 ease-in-out";

        if (smallScreen) {
            className += " ms-0";
        } else if (!smallScreen && sidebarCollapsed) {
            className += " ms-16";
        } else {
            className += " ms-64";
        }

        return className;
    };

    const getHeaderClass = () => {
        let className = "w-[calc(100%-16rem)] fixed top-0 inset-inline-start h-16 bg-white border-b border-gray-200 shadow-sm";

        if (smallScreen) {
            className = "w-full fixed top-0 inset-inline-start h-16 bg-white border-b border-gray-200 shadow-sm";
        } else if (!smallScreen && sidebarCollapsed) {
            className = "w-[calc(100%-4rem)] fixed top-0 inset-inline-start h-16 bg-white border-b border-gray-200 shadow-sm";
        }

        return className;
    };

    const getSidebarHeaderClass = () => {
        let className = "flex items-center h-16 overflow-hidden";

        if (!smallScreen && sidebarCollapsed && !hover) {
            className += " justify-center gap-0";
        }

        if (smallScreen || !sidebarCollapsed || hover) {
            className += " px-4 justify-start gap-2";
        }

        return className;
    };

    const getNavItemClass = (isActive = false) => {
        let className = "flex flex-1 items-center px-3 py-2 rounded-md text-nowrap";

        if (isActive) {
            className += " text-green-600 bg-green-50";
        } else {
            className += " text-gray-500 hover:bg-gray-100";
        }

        if (!smallScreen && sidebarCollapsed && !hover) {
            className += " justify-center w-9 h-9 p-0";
        }

        return className;
    };

    const getNavTextClass = () => {
        let className = "sidebar-text mr-3";

        if (!smallScreen && sidebarCollapsed && !hover) {
            className += " hidden";
        }

        return className;
    };

    return (
        <div className="bg-gray-100/50">

            {
                !firstRender && (
                    <>
                        {smallScreen && mobileMenuOpen && (
                            <div
                                className="fixed inset-0 z-40 bg-black bg-black/60 transition-opacity duration-200 ease-linear"
                                onClick={() => setMobileMenuOpen(false)}
                            ></div>
                        )}

                        <div>
                            {/* Sidebar */}
                            <div
                                className={getSidebarClass()}
                                onMouseEnter={handleSidebarHover}
                                onMouseLeave={handleSidebarLeave}
                            >
                                {/* Sidebar Header */}
                                <div className={getSidebarHeaderClass()}>
                                    <img src="/assets/images/cwoste23-logo.png" alt="" className="w-10 h-10" />
                                    <div className="text-gray-500">
                                        <h1 className={`text-xl font-semibold text-nowrap ${!smallScreen && sidebarCollapsed && !hover ? 'hidden' : ''}`}>
                                            خدمات 23
                                        </h1>
                                    </div>
                                </div>

                                {/* Sidebar Navigation */}
                                <nav className={`h-[calc(100%-8rem)] p-4 ${sidebarCollapsed && !smallScreen ? 'overflow-y-hidden' : 'overflow-y-auto'} overflow-x-hidden`}>
                                    <ul className="space-y-2">
                                        <li className="flex justify-center">
                                            {/* Dashboard */}
                                            <a href="#" className={getNavItemClass(true)}>
                                                <i className="fas fa-home text-base"></i>
                                                <span className={`${getNavTextClass()} font-medium`}>الرئيسية</span>
                                            </a>
                                        </li>

                                        <li className="flex justify-center">
                                            {/* Documents management */}
                                            <a href="#" className={getNavItemClass()}>
                                                <i className="fas fa-user text-base"></i>
                                                <span className={getNavTextClass()}>إدارة العملاء</span>
                                            </a>
                                        </li>

                                        <li className="flex justify-center">
                                            {/* Documents management */}
                                            <a href="#" className={getNavItemClass()}>
                                                <i className="fas fa-file text-base"></i>
                                                <span className={getNavTextClass()}>إدارة الوثائق</span>
                                            </a>
                                        </li>

                                        <li className="flex justify-center">
                                            {/* Services management */}
                                            <a href="#" className={getNavItemClass()}>
                                                <i className="fas fa-list text-base"></i>
                                                <span className={getNavTextClass()}>إدارة الخدمات</span>
                                            </a>
                                        </li>

                                        <li className="flex justify-center">
                                            {/* Users Management */}
                                            <a href="#" className={getNavItemClass()}>
                                                <i className="fas fa-users text-base"></i>
                                                <span className={getNavTextClass()}>إدارة المستخدمين</span>
                                            </a>
                                        </li>
                                    </ul>
                                </nav>

                                {/* Sidebar Footer */}
                                <div className="h-16 border-t border-gray-200"></div>
                            </div>

                            {/* Content */}
                            <div className={getContentClass()}>
                                {/* Header */}
                                <header className={getHeaderClass()}>
                                    <div className="flex h-full items-center justify-between px-4">
                                        <div className="flex items-center">
                                            <button
                                                onClick={toggleMenu}
                                                className="w-8 h-8 rounded-lg text-gray-600 bg-gray-50 hover:text-green-600 hover:bg-green-50 border border-gray-200 hover:border-gray-300 transition-colors"
                                            >
                                                <i className="fas fa-bars text-sm"></i>
                                            </button>
                                            <h1 className="text-xl font-bold mr-4 text-gray-700">لوحة التحكم</h1>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <NotificationDropdown
                                                notifications={notifications}
                                                unreadCount={unreadCount}
                                            />
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
                                        </div>
                                    </div>
                                </header>

                                {/* Dashboard Content */}
                                <main className="flex-1 overflow-y-auto p-6 mt-16">
                                    {children}
                                </main>
                            </div>
                        </div>
                    </>
                )
            }


        </div>
    );
}