<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\ClientController;
use App\Http\Controllers\Admin\AdminDashboardController;
use Inertia\Inertia;

Route::middleware(['auth', 'role:admin'])->prefix('admin')->name('admin.')->group(function () {
   Route::get('/', [AdminDashboardController::class, 'index'])->name('dashboard');
   Route::resource('clients', ClientController::class);
});