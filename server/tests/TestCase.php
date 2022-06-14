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

    //Default headers for each sent request.
    protected $defaultHeaders = [
        'Accept' => 'application/json'
    ];

    /**
     * Get user data json.
     * @param User $user
     * @return array
     */
    protected function getUserDataJson(Model $user): array {
        $userJson = $user->toArray();
        $userJson['password'] = $this->defaultPassword;
        return $userJson;
    }

    /**
     * Get auth token.
     * @param array $data
     * @return mixed|null
     */
    protected function getAuthToken(array $data)
    {
        $responseJson = $this->postJson(route('auth.login'), $data)->json();

        if (!array_key_exists('token', $responseJson)) {
            return null;
        }

        return $responseJson['token'];
    }
}
