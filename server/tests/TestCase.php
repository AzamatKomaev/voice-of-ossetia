<?php

namespace Tests;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Foundation\Testing\TestCase as BaseTestCase;

abstract class TestCase extends BaseTestCase
{
    use CreatesApplication, DatabaseTransactions;

    // Default user password used in UserFactory.
    protected string $defaultPassword = 'password123';

    // Default headers for each sent request.
    protected $defaultHeaders = [
        'Accept' => 'application/json'
    ];

    /**
     * Set up user.
     * @param $updateData
     * @return \Illuminate\Database\Eloquent\Collection|\Illuminate\Database\Eloquent\Model
     */
    protected function setUpUser($updateData=null): Model
    {
        $user = User::factory()->create();
        if ($updateData) {
            $user->update($updateData);
        }
        $user->password = $this->defaultPassword;
        return $user;
    }

    /**
     * Get auth token for user.
     * @param Model|User $user
     * @return string
     */
    protected function getAuthToken(Model $user): string
    {
        $token = $user->createToken('API Token')->plainTextToken;
        return $token;
    }
}
