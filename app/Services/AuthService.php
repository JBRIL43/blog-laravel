<?php

namespace App\Services;

use App\Repositories\UserRepositoryInterface;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthService
{
    protected $users;

    public function __construct(UserRepositoryInterface $users)
    {
        $this->users = $users;
    }

    // Register (Command)
    public function register(array $data)
    {
        $user = $this->users->create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
        ]);
        $token = JWTAuth::fromUser($user);
        return ['user' => $user, 'token' => $token];
    }

    // Login (Command)
    public function login(array $credentials)
    {
        if (!$token = JWTAuth::attempt($credentials)) {
            return null;
        }
        return $token;
    }
}
