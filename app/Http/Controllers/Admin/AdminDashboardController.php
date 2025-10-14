<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use App\Models\Notification;

class AdminDashboardController extends Controller
{
    public function index()
    {
        // $user = auth()->user();

        // $notifications = Notification::with(['sender', 'submission'])
        //     ->where('receiver_id', $user->id)
        //     ->orderByDesc('created_at')
        //     ->take(10)
        //     ->get();

        // return Inertia::render('admin/dashboard', [
        //     'notifications' => $notifications,
        //     'unreadCount' => $notifications->where('is_read', false)->count()
        // ]);
        return Inertia::render('admin/dashboard');
    }
}
