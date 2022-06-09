<?php

namespace Tests;

use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Foundation\Testing\TestCase as BaseTestCase;
use function PHPUnit\Framework\arrayHasKey;

abstract class TestCase extends BaseTestCase
{
    use CreatesApplication, DatabaseTransactions;

    /**
     * Default headers for each sent request.
     * @var string[]
     */
    protected $defaultHeaders = [
        'Accept' => 'application/json'
    ];

    protected function getAuthToken(array $data)
    {
        $responseJson = $this->postJson(route('auth.login'), $data)->json();

        if (!array_key_exists('token', $responseJson)) {
            return null;
        }

        return $responseJson['token'];
    }
}
