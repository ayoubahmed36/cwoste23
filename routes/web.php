<?php

use App\Http\Controllers\ImageController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Client\Auth\RegisterController;
use App\Http\Controllers\ClientReviewController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/profile-image/{user}', [ImageController::class, 'profileImage'])
    ->name('profile.image')
    ->middleware(['auth', 'verified']);
});

Route::middleware(['auth', 'verified', 'client.approved'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

Route::middleware(['auth', 'verified', 'role:client'])->group(function () {
    Route::get('/waiting', function () {
        return Inertia::render('waiting');
    })->name('client.waiting');
});

// Temp fornow
Route::prefix('clients/{client}')->group(function () {
    Route::get('/reviews', [ClientReviewController::class, 'index'])->name('reviews.index');
    Route::get('/reviews/latest', [ClientReviewController::class, 'latest'])->name('reviews.latest');
    Route::post('/reviews', [ClientReviewController::class, 'store'])->name('reviews.store');
});

Route::get('/reviews/{review}', [ClientReviewController::class, 'show'])->name('reviews.show');


// Temp routes
Route::get('/register-tests', function () {
    return Inertia::render('auth/register-tests');
})->name('register-tests');


require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
require __DIR__.'/admin.php';
require __DIR__.'/notifications.php';

