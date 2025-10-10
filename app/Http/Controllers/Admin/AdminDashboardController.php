<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class AdminDashboardController extends Controller
{
    public function index()
    {
        $user = auth()->user();

        // Get latest 10 notifications for the logged-in admin
        $notifications = $user->notifications()
            ->latest()
            ->take(10)
            ->get();

        // Count unread notifications
        $unreadCount = $user->notifications()
            ->where('is_read', false)
            ->count();

        return Inertia::render('admin/dashboard', [
            'notifications' => $notifications,
            'unreadCount'   => $unreadCount,
        ]);
    }
}
