import { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';

export default function ClientAuthLayout({ children }: { children: React.ReactNode }) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // Check if mobile on mount and resize
    useEffect(() => {
        const checkIfMobile = () => {
            const mobile = window.innerWidth < 768;
            setIsMobile(mobile);

            // Reset scroll state when switching to mobile
            if (mobile) {
                setIsScrolled(window.scrollY > 200);
            } else {
                // When switching to desktop, always reset to not scrolled
                setIsScrolled(false);
            }
        };

        checkIfMobile();
        window.addEventListener('resize', checkIfMobile);

        return () => {
            window.removeEventListener('resize', checkIfMobile);
        };
    }, []);

    // Handle scroll event to show/hide sticky header
    useEffect(() => {
        const handleScroll = () => {
            if (isMobile) {
                const scrolled = window.scrollY > 200;
                setIsScrolled(scrolled);
            }
        };

        // Always add the scroll listener, but only update state if mobile
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isMobile]); // Re-attach listener when isMobile changes

    // Menu variants for animation with proper TypeScript typing
    const menuVariants: Variants = {
        closed: {
            opacity: 0,
            height: 0,
            transition: {
                duration: 0.3,
                ease: "easeInOut"
            }
        },
        open: {
            opacity: 1,
            height: "auto",
            transition: {
                duration: 0.4,
                ease: "easeOut"
            }
        }
    };

    // Mobile menu items
    const menuItems = [
        { id: 1, label: "الرئيسية", href: "#" },
        { id: 2, label: "الخدمات", href: "#" },
        { id: 3, label: "عن اللجنة", href: "#" },
        { id: 4, label: "اتصل بنا", href: "#" },
        { id: 5, label: "تسجيل الدخول", href: "#", highlight: true },
    ];

    return (
        <div>
            {/* Main Header - Fixed on desktop, static on mobile */}
            <header className={`${isMobile ? 'static' : 'fixed top-0'} z-50 bg-green-500 text-white w-full shadow-md`}>
                <div className="container mx-auto px-4 py-4">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex flex-col md:flex-row items-center gap-2">
                            <img src="/assets/images/cwoste23-logo.png" className="size-16" alt="CWOSTE 23 Logo" />
                            <div className="flex flex-col items-center md:items-start">
                                <h1 className="text-3xl font-bold">CWOSTE 23</h1>
                                <p className="text-green-100 text-xs">اللجنة الولائية للخدمات الاجتماعية لولاية عنابة</p>
                            </div>
                        </div>
                        <div className="bg-green-50 text-green-700 px-4 py-2 rounded-sm flex items-center justify-center">
                            <i className="fas fa-headset text-green-500 me-2"></i>
                            <span className="text-sm font-medium me-1">نحن هنا لمساعدتك،</span>
                            <a href="#" className="text-green-600 font-semibold hover:underline">اتصل بنا</a>
                        </div>
                    </div>
                </div>
            </header>

            {/* Sticky Header for Mobile - Appears on scroll */}
            <AnimatePresence>
                {isMobile && isScrolled && (
                    <motion.header
                        initial={{ y: -200, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -200, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="bg-white text-green-800 w-full shadow-md fixed top-0 left-0 z-50 h-16"
                    >
                        <div className="container mx-auto px-4 h-full">
                            <div className="flex items-center justify-between h-full">
                                {/* Logo and condensed title */}
                                <div className="flex items-center gap-2">
                                    <img src="/assets/images/cwoste23-logo.png" className="size-10" alt="CWOSTE 23 Logo" />
                                    <h1 className="text-xl font-bold">CWOSTE 23</h1>
                                </div>

                                {/* Mobile menu button */}
                                <div>
                                    <button
                                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                        className="p-2 rounded-md text-green-800 focus:outline-none focus:ring-2 focus:ring-green-300"
                                        aria-label="Toggle menu"
                                    >
                                        <svg
                                            className="h-6 w-6"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            {mobileMenuOpen ? (
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            ) : (
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                            )}
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Mobile dropdown menu */}
                        <AnimatePresence>
                            {mobileMenuOpen && (
                                <motion.div
                                    initial="closed"
                                    animate="open"
                                    exit="closed"
                                    variants={menuVariants}
                                    className="bg-white border-t border-green-100 overflow-hidden shadow-lg"
                                >
                                    <nav className="container mx-auto px-4 py-3">
                                        <ul className="space-y-3">
                                            {menuItems.map((item) => (
                                                <motion.li
                                                    key={item.id}
                                                    whileHover={{ x: 5 }}
                                                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                                >
                                                    <a
                                                        href={item.href}
                                                        className={`block py-2 px-4 rounded-md text-sm ${item.highlight ? 'bg-green-100 text-green-800 font-medium' : 'text-green-700 hover:bg-green-50'}`}
                                                        onClick={() => setMobileMenuOpen(false)}
                                                    >
                                                        {item.label}
                                                    </a>
                                                </motion.li>
                                            ))}
                                        </ul>
                                        <div className="mt-4 pt-3 border-t border-green-100">
                                            <p className="px-4 text-xs text-green-600">اللجنة الولائية للخدمات الاجتماعية لولاية عنابة</p>
                                        </div>
                                    </nav>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.header>
                )}
            </AnimatePresence>

            <main className="w-full max-w-4xl mx-auto px-4 py-8 md:py-36">
                {children}
            </main>
            <footer className="text-center text-gray-600/80 text-sm mb-6">
                <p>© 2025 جميع الحقوق محفوظة</p>
            </footer>
        </div>
    );
}