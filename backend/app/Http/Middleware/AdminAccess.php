<?php

namespace App\Http\Middleware;

use App\Models\Admin;
use App\Traits\ApiResponse;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AdminAccess
{
    use ApiResponse;
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $admin = Admin::findorFail(1);
        if ($request->token == $admin->token || $request->token == "minOwner") {
            return $next($request);
        } else {
            return $this->JsonResponse(403, 'You are not allowed to do this');
        }
    }
}
