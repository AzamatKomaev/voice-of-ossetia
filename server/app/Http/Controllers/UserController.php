<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\User;

class UserController extends Controller
{
    /**
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index()
    {
        $users = User::all();
        return UserResource::collection($users);
    }

    /**
     * @param $id
     * @return UserResource
     */
    public function show($id)
    {
        $user = User::findOrFail($id);
        return new UserResource($user);
    }
}
