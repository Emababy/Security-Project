<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Traits\ApiResponse;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\Admin;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    use ApiResponse;
    public function admin_login(LoginRequest $loginRequest)
    {
        try {
            $adminData = $loginRequest->validated();
            $adminLogged = null;
            $admins = Admin::all();

            foreach ($admins as $admin) {
                try {
                    if (Crypt::decryptString($admin->email) == $adminData["email"]) {
                        $adminLogged = $admin;
                        break;
                    }
                } catch (\Illuminate\Contracts\Encryption\DecryptException $e) {
                    continue;
                }
            }

            if ($adminLogged && Hash::check($adminData["password"], $adminLogged->password)) {
                Auth::guard('admin')->login($adminLogged);
                return $this->JsonResponse(200, 'Logged in!', $this->create_new_token_admin());
            } else {
                return $this->JsonResponse(401, 'Invalid credentials');
            }
        } catch (\Exception $e) {
            return $this->JsonResponse(500, 'Internal server error');
        }
    }
    public function user_register(RegisterRequest $request)
    {
        $user = User::create([
            'name' => Crypt::encryptString($request->name),
            'email' => Crypt::encryptString($request->email),
            'phone' => Crypt::encryptString($request->phone),
            'password' => $request->password,
            'address' => Crypt::encryptString($request->address)
        ]);
        return $this->JsonResponse(201, 'User Registerd successfully!', $this->create_new_token_user(false, $user));
    }
    public function user_login(LoginRequest $loginRequest)
    {
        $userData = $loginRequest->validated();
        $users = User::all();
        $userLogged = null;

        foreach ($users as $user) {
            if (Crypt::decryptString($user->email) == $userData["email"]) {
                $userLogged = $user;
                break;
            }
        }

        if ($userLogged && Hash::check($userData["password"], $userLogged->password)) {
            Auth::guard('user')->login($userLogged);
            return $this->JsonResponse(200, 'Logged in!', $this->create_new_token_user());
        } else {
            return $this->JsonResponse(401, 'You are not authorized');
        }
    }
    private function create_new_token_admin()
    {
        $user = Auth::guard('admin')->user();
        // Customize payload
        $payload = [
            'sub' => $user->id,
            'name' => Crypt::decryptString($user->name),
            'email' => Crypt::decryptString($user->email),
            'role' => $user->role
        ];

        //Generate token with customized payload
        $token = JWTAuth::claims($payload)->fromUser($user);

        return [
            'token' => $token,
            'token_type' => 'bearer',
            'expires_at' => auth()->factory()->getTTL() * 60,
        ];
    }
    private function create_new_token_user($logged = true, $uesrData = null)
    {
        $user = $logged ? Auth::guard('user')->user() : $uesrData;
        //Customize payload
        $payload = [
            'sub' => $user->id,
            'name' => Crypt::decryptString($user->name),
            'email' => Crypt::decryptString($user->email),
            'phone' => Crypt::decryptString($user->phone),
            'address' => Crypt::decryptString($user->address),
            'role' => 'user'
        ];

        //Generate token with customized payload
        $token = JWTAuth::claims($payload)->fromUser($user);

        return [
            'token' => $token,
            'token_type' => 'bearer',
            'expires_at' => auth()->factory()->getTTL() * 60,
        ];
    }
    public function logout()
    {
        auth('user')->logout();
        return $this->JsonResponse(200, 'User logged out successfully');
    }
    public function adminLogout()
    {
        auth('admin')->logout();
        return $this->JsonResponse(200, 'Admin loggedout successfully');
    }
}
