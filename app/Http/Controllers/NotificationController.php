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
        // TODO: implement
    }

    /**
     * GET /notifications/unread
     * List only unread notifications.
     */
    public function unread(Request $request)
    {
        // TODO: implement
    }

    /**
     * GET /notifications/{notification}
     * Show a single notification (you may mark as read here later).
     */
    public function show(Notification $notification)
    {
        // TODO: implement
    }

    /**
     * PATCH /notifications/{notification}/read
     * Mark a single notification as read.
     */
    public function markAsRead(Notification $notification, Request $request)
    {
        // TODO: implement
    }

    /**
     * PATCH /notifications/read-all
     * Mark all notifications as read for the logged-in user.
     */
    public function markAllAsRead(Request $request)
    {
        // TODO: implement
    }

    /**
     * DELETE /notifications/{notification}
     * Delete a single notification.
     */
    public function destroy(Notification $notification)
    {
        // TODO: implement
    }

    /**
     * DELETE /notifications/clear
     * Delete all notifications for the logged-in user.
     */
    public function clear(Request $request)
    {
        // TODO: implement
    }
}
