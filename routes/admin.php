<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\ClientController;
use App\Http\Controllers\Admin\AdminDashboardController;
use Inertia\Inertia;

Route::middleware(['auth', 'role:admin'])->group(function () {
   Route::get('/admin', [AdminDashboardController::class, 'index'])->name('admin.dashboard');
});

Route::resource('admin/clients', ClientController::class);