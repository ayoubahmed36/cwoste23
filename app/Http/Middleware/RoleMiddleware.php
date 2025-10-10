<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RoleMiddleware
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next, ...$roles): Response
    {
        // If not logged in → send to correct login page
        if (! auth()->check()) {
            $loginRoute = in_array('admin', $roles, true)
                ? 'admin.login'   // if admin route → go to admin login
                : 'login';        // else go to client login

            return redirect()->route($loginRoute);
        }

        $user = $request->user();

        // If user role is allowed → let them in
        if (in_array($user->role, $roles, true)) {
            return $next($request);
        }

        // Wrong role → send them back to their own dashboard
        $redirectRoute = $user->role === 'admin'
            ? 'admin.dashboard'
            : 'dashboard';

        return redirect()
            ->route($redirectRoute)
            ->with('error', 'You are not authorized to access this area');
    }
}
