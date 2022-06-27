<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Models\User;
use App\Http\Requests\RegistrationRequest;
use App\Notifications\UserRegistrationNotification;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Notification;
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
     * Login a user (create a token).
     * @param LoginRequest $request
     * @return  \Illuminate\Http\JsonResponse
     */
    public function login(LoginRequest $request)
    {
        if (!Auth::attempt($request->validated()))
        {
            return Response::json([
                'message' => 'The given data was invalid.',
                'errors' => [
                    'non_field_errors' => ['Логин или пароль не валиден. ']
                ]
            ], 422);
        }
        $token = Auth::user()->createToken('API Token');
        return Response::json(['token' => $token->plainTextToken], 201);
    }

    /**
     * Log out user (delete all tokens).
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        $user = Auth::user();
        $user->tokens()->delete();
        return Response::json(['token' => 'All tokens were deleted successfully. '], 204);
    }

    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function getMe()
    {
        $user = Auth::user();
        return Response::json($user);
    }
}
