<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\NotificationController;

Route::middleware('auth')->prefix('notifications')->group(function () {
    Route::get('/', [NotificationController::class, 'index'])->name('notifications.index');
    Route::get('/unread', [NotificationController::class, 'unread'])->name('notifications.unread');

    // Actions before the {notification} wildcard to avoid conflicts
    Route::patch('/read-all', [NotificationController::class, 'markAllAsRead'])->name('notifications.markAllAsRead');
    Route::delete('/clear', [NotificationController::class, 'clear'])->name('notifications.clear');

    Route::get('/{notification}', [NotificationController::class, 'show'])->name('notifications.show');
    Route::patch('/{notification}/read', [NotificationController::class, 'markAsRead'])->name('notifications.markAsRead');
    Route::delete('/{notification}', [NotificationController::class, 'destroy'])->name('notifications.destroy');
});
