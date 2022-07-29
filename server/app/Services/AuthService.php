<?php

namespace App\Services;

use Illuminate\Contracts\Auth\Authenticatable;

class AuthService
{
    /**
     * Update user fields if values are not nulls.
     * @param Authenticatable $user
     * @param array $validatedData
     * @return Authenticatable
     */
    public static function updateUser(Authenticatable $user, array $validatedData): Authenticatable
    {
        foreach ($validatedData as $key=>$value) {
            if (!$value) continue;
            $user[$key] = $value;
        }
        $user->save();
        return $user;
    }
}
