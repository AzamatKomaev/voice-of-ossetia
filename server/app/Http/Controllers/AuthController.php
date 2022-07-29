<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateUserRequest;
use App\Models\ActivationToken;
use App\Services\AuthService;
use App\Services\CaptchaService;
use App\Http\Requests\LoginRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use App\Http\Requests\RegistrationRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    /**
     * Create new user.
     * @param RegistrationRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function create(RegistrationRequest $request): \Illuminate\Http\JsonResponse
    {
        $data = $request->validated();

        if ( !CaptchaService::verifyUser($data['captcha_response']) ) {
            return Response::json([
                'message' => 'The given data was invalid.',
                'errors' => ['captcha_response' => ['Капча не валидна. ']]
            ], 422);
        }

        $data['password'] = Hash::make($data['password']);
        $user = User::create($data);
        return Response::json($user, 201);
    }

    /**
     * Update user.
     * @param UpdateUserRequest $request
     * @return JsonResponse
     */
    public function update(UpdateUserRequest $request): UserResource
    {
        $user = AuthService::updateUser(Auth::user(), $request->validated());
        return new UserResource($user);
    }

    /**
     * Login a user (create a token).
     * @param LoginRequest $request
     * @return  \Illuminate\Http\JsonResponse
     */
    public function login(LoginRequest $request): \Illuminate\Http\JsonResponse
    {
        $name = $request->validated()['name'];
        $password = $request->validated()['password'];

        if ( !CaptchaService::verifyUser($request->validated()['captcha_response']) ) {
            return Response::json([
                'message' => 'The given data was invalid.',
                'errors' => ['captcha_response' => ['Капча не валидна. ']]
            ], 422);
        }

        if ( !Auth::attempt(['name' => $name, 'password' => $password]) ) {
            return Response::json([
                'message' => 'The given data was invalid.',
                'errors' => ['non_field_errors' => ['Логин или пароль не валиден. ']]
            ], 422);
        }
        $token = Auth::user()->createToken('API Token');
        return Response::json(['token' => $token->plainTextToken], 201);
    }

    /**
     * Log out user (delete all tokens).
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout(): \Illuminate\Http\JsonResponse
    {
        $user = Auth::user();
        $user->tokens()->delete();
        return Response::json(['token' => 'All tokens were deleted successfully.'], 204);
    }

    /**
     * @param Request $request
     * @param string $token
     * @return \Illuminate\Http\JsonResponse
     */
    public function activate_user(Request $request, string $uuid): \Illuminate\Http\JsonResponse
    {
        $activationToken = ActivationToken::where('token', $uuid)->get();
        if (!$activationToken->first()) {
            return Response::json(['token' => 'The token does not exists.'], 404);
        }
        $user = $activationToken->first()->user;
        $user->is_active = true;
        $user->save();
        $activationToken->first()->delete();
        return Response::json([], 204);
    }



    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function getMe(): \Illuminate\Http\JsonResponse
    {
        $resource = new UserResource(Auth::user());
        return $resource->response()->setStatusCode(200);
    }
}
