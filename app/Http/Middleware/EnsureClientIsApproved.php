<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

class EnsureClientIsApproved
{
    public function handle($request, Closure $next)
    {
        if (Auth::check() && Auth::user()->role === 'client' && Auth::user()->registration_status !== 'approved') {
            return redirect()->route('client.waiting');
        }

        return $next($request);
    }
}
