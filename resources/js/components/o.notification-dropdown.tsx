import { useState } from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LuBellRing } from "react-icons/lu";

export default function NotificationDropdown() {
    const [notifications, setNotifications] = useState([
        {
            id: 1,
            title: "رسالة جديدة مستلمة",
            description: "لديك رسالة جديدة من أحمد",
            time: "منذ 5 دقائق",
            unread: true
        },
        {
            id: 2,
            title: "عملية دفع ناجحة",
            description: "تمت معالجة عملية الدفع الخاصة بك",
            time: "منذ ساعة",
            unread: true
        },
        {
            id: 3,
            title: "تذكير بالاجتماع",
            description: "اجتماع الفريق الساعة 2:00 مساءً",
            time: "منذ 3 ساعات",
            unread: false
        }
    ]);

    const unreadCount = notifications.filter(notif => notif.unread).length;

    const markAsRead = (id: number) => {
        setNotifications(notifications.map(notif => 
            notif.id === id ? { ...notif, unread: false } : notif
        ));
    };

    const markAllAsRead = () => {
        setNotifications(notifications.map(notif => ({ ...notif, unread: false })));
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative h-10 w-10 rounded-full">
                    <LuBellRing className="h-5 w-5" />
                    {unreadCount > 0 && (
                        <Badge 
                            variant="destructive" 
                            className="absolute -top-0.5 -right-0.5 h-4 w-4 min-w-4 flex items-center justify-center p-0 text-[10px]"
                        >
                            {unreadCount > 9 ? '9+' : unreadCount}
                        </Badge>
                    )}
                </Button>
            </DropdownMenuTrigger>
            
            <DropdownMenuContent align="start" className="" sideOffset={5} alignOffset={-10} collisionPadding={16}>
                <div className="flex items-center justify-between w-80 px-4 py-2 border-b">
                    <h3 className="font-semibold text-base">الإشعارات</h3>
                    {unreadCount > 0 && (
                        <Button       
                            size="sm" 
                            className="text-xs px-2 py-1 h-auto font-medium bg-green-500 hover:bg-green-600 transition cursor-pointer"
                        >
                            تعليم الكل كمقروء
                        </Button>
                    )}
                </div>
                
                <div className="max-h-96 overflow-y-auto">
                    {notifications.length === 0 ? (
                        <div className="p-6 text-center text-muted-foreground">
                            لا توجد إشعارات
                        </div>
                    ) : (
                        notifications.map((notification) => (
                            <div
                                key={notification.id}
                                className={`p-3 border-b cursor-pointer transition-all duration-200 hover:bg-muted/30 ${
                                    notification.unread ? 'bg-blue-50 border-s-4 border-s-blue-500' : ''
                                }`}
                                onClick={() => markAsRead(notification.id)}
                            >
                                <div className="flex justify-between items-start gap-1">
                                    <div className="space-y-1 flex-1">
                                        <div className="flex items-center gap-2">
                                            {notification.unread && (
                                                <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" />
                                            )}
                                            <p className="text-sm font-medium">
                                                {notification.title}
                                            </p>
                                        </div>
                                        <p className="text-xs text-muted-foreground leading-relaxed">
                                            {notification.description}
                                        </p>
                                    </div>
                                </div>
                                <p className="text-xs text-muted-foreground text-left">
                                    {notification.time}
                                </p>
                            </div>
                        ))
                    )}
                </div>
                
                <div className="border-t">
                    <Button variant="ghost" className="w-full justify-center text-sm">
                        عرض جميع الإشعارات
                    </Button>
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}