<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Models\User;
use App\Http\Requests\RegistrationRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    /**
     * Create new user.
     * @param RegistrationRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function create(RegistrationRequest $request)
    {
        $data = $request->validated();
        $data['password'] = Hash::make($data['password']);
        $user = User::create($data);
        return Response::json($user, 201);
    }

    /**
     * Login a user.
     * @param LoginRequest $request
     * @return \Illuminate\Http\JsonResponse|void
     */
    public function login(LoginRequest $request)
    {
        if (!Auth::attempt($request->validated()))
        {
            return Response::json(['error' => 'Invalid name or password.'], 400);
        }

        $token = Auth::user()->createToken('API Token')->plainTextToken;
        return Response::json(['token' => $token], 201);
    }

    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function getMe()
    {
        $user = Auth::user();
        return Response::json($user);
    }

    public function getAllUsers(RegistrationRequest $request)
    {
        $users = User::get();
        return Response::json($users);
    }
}
