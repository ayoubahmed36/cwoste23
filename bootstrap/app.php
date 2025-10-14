<?php

use App\Http\Middleware\HandleAppearance;
use App\Http\Middleware\HandleInertiaRequests;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
        then: function () {
            Route::middleware('web')
                ->group(base_path('routes/documents.php'));
        }
    )
    ->withMiddleware(function (Middleware $middleware) {


        $middleware->alias([
            'role' => \App\Http\Middleware\RoleMiddleware::class,
            'client.approved' => \App\Http\Middleware\EnsureClientIsApproved::class,
        ]);

        $middleware->redirectGuestsTo(function (Request $request) {
            if ($request->is('admin')) {
               return route('admin.login');  
            }
            return route('login');
        });

        $middleware->redirectUsersTo(function (Request $request) {
            return match(auth()->user()->role) {
                'admin' => route('admin.dashboard'),
                'client' => route('dashboard'),
                default => route('dashboard'),
            };
        });
    
        $middleware->encryptCookies(except: ['appearance', 'sidebar_state']);

        $middleware->web(append: [
            HandleAppearance::class,
            HandleInertiaRequests::class,
            AddLinkHeadersForPreloadedAssets::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();
