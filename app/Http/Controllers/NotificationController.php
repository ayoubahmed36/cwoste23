<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    /**
     * GET /notifications
     * List all notifications for the logged-in user.
     */
    public function index(Request $request)
    {
        $notifications = Notification::where('receiver_id', auth()->id())
            ->orderByDesc('created_at')
            ->paginate(20);

        // TODO: Create admin/notifications/index.tsx page
        // return inertia('admin/notifications/index', [
        //     'notifications' => $notifications
        // ]);
    }

    /**
     * GET /notifications/unread
     * List only unread notifications.
     */
    public function unread(Request $request)
    {
        $notifications = Notification::where('receiver_id', auth()->id())
            ->where('is_read', false)
            ->orderByDesc('created_at')
            ->get();

        return response()->json($notifications);
    }

    /**
     * GET /notifications/{notification}
     * Show a single notification (you may mark as read here later).
     */
    public function show(Notification $notification)
    {
        // Authorize: user can only view their own notifications
        if ($notification->receiver_id !== auth()->id()) {
            abort(403, 'Unauthorized action.');
        }

        // TODO: Create admin/notifications/show.tsx page
        // return inertia('admin/notifications/show', [
        //     'notification' => $notification
        // ]);
    }

    /**
     * PATCH /notifications/{notification}/read
     * Mark a single notification as read.
     */
    public function markAsRead(Notification $notification, Request $request)
    {
        // Authorize: user can only mark their own notifications as read
        if ($notification->receiver_id !== auth()->id()) {
            abort(403, 'Unauthorized action.');
        }

        $notification->update(['is_read' => true]);

        return back();
    }

    /**
     * PATCH /notifications/read-all
     * Mark all notifications as read for the logged-in user.
     */
    public function markAllAsRead(Request $request)
    {
        Notification::where('receiver_id', auth()->id())
            ->where('is_read', false)
            ->update(['is_read' => true]);

        return back();
    }

    /**
     * DELETE /notifications/{notification}
     * Delete a single notification.
     */
    public function destroy(Notification $notification)
    {
        // Authorize: user can only delete their own notifications
        if ($notification->receiver_id !== auth()->id()) {
            abort(403, 'Unauthorized action.');
        }

        $notification->delete();

        return back();
    }

    /**
     * DELETE /notifications/clear
     * Delete all notifications for the logged-in user.
     */
    public function clear(Request $request)
    {
        Notification::where('receiver_id', auth()->id())->delete();

        return back();
    }
}
