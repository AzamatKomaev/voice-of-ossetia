<?php

namespace Tests\Feature;

use App\Models\User;
use Tests\TestCase;

class UserTest extends TestCase
{

    protected function setUp(): void
    {
        parent::setUp();
        $adminData = $this->setUpData(User::factory()->make()->toArray(), [
            'password' => 'admin12345',
            'is_superuser' => true,
            'is_active' => true
        ]);
        User::create($adminData);
    }

    /**
     * Test creation user with empty request body.
     * @return void
     */
    public function test_creation_user_with_empty_data()
    {
        $response = $this->postJson(route('auth.create'), []);
        $response->assertStatus(422);
        $responseErrors = $response->json()['errors'];
        $this->assertCount(4, $responseErrors);
        $this->assertEquals('Поле name не может быть пустым.', $responseErrors['name'][0]);
        $this->assertEquals('Поле email не может быть пустым.', $responseErrors['email'][0]);
        $this->assertEquals('Поле password не может быть пустым.', $responseErrors['password'][0]);
        $this->assertEquals('Поле locality не может быть пустым.', $responseErrors['locality'][0]);
    }

    /**
     * Test creation user with invalid request body.
     * @return void
     */
    public function test_creation_user_with_invalid_data()
    {
        $userData = $this->setUpData(User::factory()->make()->toArray(), [
            'email'    => 'invalid_email',
            'password' => 'less',
            'age'      => 'invalid ager'
        ]);
        $response = $this->postJson(route('auth.create'), $userData);
        $response->assertStatus(422);
        $responseErrors = $response->json()['errors'];
        $this->assertCount(3, $responseErrors);
        $this->assertEquals('В данное поле следует вписать валидный почтовый адрес.', $responseErrors['email'][0]);
        $this->assertEquals('Поле password должно содержать больше 8 символов.', $responseErrors['password'][0]);
        $this->assertEquals('Поле age должно быть числом.', $responseErrors['age'][0]);
    }

    /**
     * Test creation user with existing email and name.
     * @return void
     */
    public function test_creation_user_with_existing_data()
    {
        $userData = $this->setUpData(User::factory()->make()->toArray(), [
            'password' => 'normal_pwd'
        ]);
        User::create($userData);
        $response = $this->postJson(route('auth.create'), $userData);
        $response->assertStatus(422);
        $responseErrors = $response->json()['errors'];
        $this->assertCount(2, $responseErrors);
        $this->assertEquals('The name has already been taken.', $responseErrors['name'][0]);
        $this->assertEquals('The email has already been taken.', $responseErrors['email'][0]);
    }

    /**
     * Test successful creation user.
     * @return void
     */
    public function test_successful_creation_user()
    {
        $userData = $this->setUpData(User::factory()->make()->toArray(), [
            'password' => 'normal_pwd'
        ]);
        $response = $this->postJson(route('auth.create'), $userData);
        dd($response->json());
    }


    /**
     * Test log in user without data.
     * @return void
     */
    public function test_login_user_without_data()
    {
        $response = $this->postJson(route('auth.login'));
        $response->assertStatus(422);
        $responseErrors = $response->json()['errors'];
        $this->assertCount(2, $responseErrors);
        $this->assertEquals('Поле name не может быть пустым.', $responseErrors['name'][0]);
        $this->assertEquals('Поле password не может быть пустым.', $responseErrors['password'][0]);
    }

    /**
     * Test getting current user without auth token.
     * @return void
     */
    public function test_getting_user_without_token()
    {
        $response = $this->get(route('auth.me'));
        $response->assertStatus(401);
        $this->assertEquals('Unauthenticated.', $response->json()['message']);
    }

    /**
     * Test log in user and getting data about him.
     * @return void
     */
    public function test_login_and_getting_data_about_user()
    {
        $userData = $this->setUpData(User::factory()->make()->toArray(), [
            'password' => '123456789'
        ]);
        $user = User::create($userData);
        $response = $this->get(route('auth.me'), [
            'Authorization' => 'Bearer ' . $this->getAuthToken($user)
        ]);
        $response->assertStatus(200);
        $responseJson = $response->json();
        $this->assertEquals($user->id, $responseJson['id']);
        $this->assertFalse($responseJson['is_active']);
        $this->assertFalse($responseJson['is_superuser']);
    }
}
