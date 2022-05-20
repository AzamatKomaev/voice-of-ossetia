<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class UserTest extends TestCase
{
    use DatabaseTransactions;
    /**
     * AuthController routes.
     * @var array|string[]
     */
    protected array $authRoutes = [
        'create' => '/api/auth/create',
        'login'  => '/api/auth/login',
        'logout' => '/api/auth/logout',
        'me'     => '/api/auth/me'
    ];

    /**
     * Default headers for each sent request.
     * @var string[]
     */
    protected $defaultHeaders = [
        'Accept' => 'application/json'
    ];

    /**
     * Test creating user with empty request body.
     * @return void
     */
    public function test_creating_user_with_empty_data()
    {
        $response = $this->postJson($this->authRoutes['create'], []);
        $responseJson = $response->json();
        $errors = $responseJson['errors'];
        $response->assertStatus(422);
        $this->assertEquals('The given data was invalid.', $responseJson['message']);
        $this->assertCount(4, $errors);
        $this->assertEquals('The name field is required.', $errors['name'][0]);
        $this->assertEquals('The email field is required.', $errors['email'][0]);
        $this->assertEquals('The password field is required.', $errors['password'][0]);
        $this->assertEquals('The locality field is required.', $errors['locality'][0]);
    }

    /**
     * Test creating user with invalid request body.
     * @return void
     */
    public function test_creating_user_with_invalid_data()
    {
        $response = $this->postJson($this->authRoutes['create'], [
            'name'        => 'admin',
            'email'       => 'invalid_email',
            'password'    => 'less',
            'locality'    => 'Vladikavkaz',
            'age'         => 'Invalid age',
            'first_name'  => 'Azamat',
            'last_name'   => 'Komaev',
            'description' => 'Lol iam cool.'
        ]);
        $responseJson = $response->json();
        $errors = $responseJson['errors'];
        $response->assertStatus(422);
        $this->assertEquals('The given data was invalid.', $responseJson['message']);
        $this->assertCount(3, $errors);
        $this->assertEquals('The email must be a valid email address.', $errors['email'][0]);
        $this->assertEquals('The password must be at least 8 characters.', $errors['password'][0]);
        $this->assertEquals('The age must be an integer.', $errors['age'][0]);
    }

    /**
     * Test creating user with existing email and name.
     * @return void
     */
    public function test_creating_user_with_existing_data()
    {
        $data = [
            'name'     => 'admin',
            'email'    => 'adminmail@mail.ru',
            'password' => 'normal_pwd',
            'locality' => 'Beslan'
        ];

        $response1 = $this->postJson($this->authRoutes['create'], $data);
        $response1->assertStatus(201);
        $response2 = $this->postJson($this->authRoutes['create'], $data);
        $responseJson = $response2->json();
        $errors = $responseJson['errors'];
        $response2->assertStatus(422);
        $this->assertEquals('The given data was invalid.', $responseJson['message']);
        $this->assertCount(2, $errors);
        $this->assertEquals('The name has already been taken.', $errors['name'][0]);
        $this->assertEquals('The email has already been taken.', $errors['email'][0]);
    }
}
