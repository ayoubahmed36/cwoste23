import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LuBellRing } from "react-icons/lu";
import { router } from '@inertiajs/react';

type Notification = {
    id: number;
    sender_id: number;
    receiver_id: number;
    submission_id: number | null;
    type: string;
    message: string;
    is_read: boolean;
    created_at: string;
};

interface NotificationDropdownProps {
    notifications: Notification[];
    unreadCount: number;
}

export default function NotificationDropdown({
    notifications,
    unreadCount,
}: NotificationDropdownProps) {

    const handleNotificationClick = (notification: Notification) => {
        // Mark as read using the backend route
        if (!notification.is_read) {
            router.patch(`/notifications/${notification.id}/read`, {}, {
                preserveScroll: true,
                preserveState: false,
                onSuccess: () => {
                    // Navigate after marking as read
                    if (notification.submission_id) {
                        router.visit(`/admin/clients/${notification.submission_id}/edit`);
                    }
                }
            });
        } else {
            // Already read, just navigate
            if (notification.submission_id) {
                router.visit(`/admin/clients/${notification.submission_id}/edit`);
            }
        }
    };

    const markAllAsRead = () => {
        router.patch('/notifications/read-all', {}, {
            preserveScroll: true,
            preserveState: false,
        });
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

            <DropdownMenuContent
                align="start"
                sideOffset={5}
                alignOffset={-10}
                collisionPadding={16}
                className="w-84"
            >
                <div className="flex items-center justify-between px-4 py-2 border-b">
                    <h3 className="font-semibold text-base">الإشعارات</h3>
                    {unreadCount > 0 && (
                        <Button
                            size="sm"
                            onClick={markAllAsRead}
                            className="text-xs px-2 py-1 h-auto font-medium bg-green-500 hover:bg-green-600 transition cursor-pointer"
                        >
                            تعليم الكل كمقروء
                        </Button>
                    )}
                </div>

                <div className="max-h-96 overflow-y-auto">
                    {notifications.length === 0 ? (
                        <div className="p-6 text-center text-muted-foreground">لا توجد إشعارات</div>
                    ) : (
                        notifications.map((n) => (
                            <div
                                key={n.id}
                                className={`flex flex-col p-3 border-b cursor-pointer transition-all duration-200 hover:bg-muted/30 ${!n.is_read ? 'bg-blue-50 border-s-4 border-s-blue-500' : ''
                                    }`}
                                onClick={() => handleNotificationClick(n)}
                            >
                                <div className="flex justify-between items-start gap-1">
                                    <div className="space-y-1 flex-1">
                                        <div className="flex items-center gap-2">
                                            {!n.is_read && (
                                                <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" />
                                            )}
                                            <p className="text-sm font-medium">
                                                {n.type === 'registration_submitted'
                                                    ? 'طلب تسجيل جديد'
                                                    : 'إشعار إداري'}
                                            </p>
                                        </div>
                                        <p className="text-xs text-muted-foreground leading-relaxed">
                                            {n.message}
                                        </p>
                                    </div>
                                </div>
                                <p className="text-xs text-gray-600">
                                    {new Intl.DateTimeFormat('ar-EG', {
                                        weekday: 'long',
                                        year: 'numeric',
                                        month: '2-digit',
                                        day: '2-digit',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        hour12: true,
                                        numberingSystem: 'latn',
                                    }).format(new Date(n.created_at))}
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
