<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

class UserTest extends TestCase
{
    use DatabaseTransactions;

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
        $response = $this->postJson(route('auth.create'), []);
        $response->assertStatus(422);
        $responseJson = $response->json();
        $errors = $responseJson['errors'];
        $this->assertEquals('The given data was invalid.', $responseJson['message']);
        $this->assertCount(4, $errors);
        $this->assertEquals('Поле name не может быть пустым.', $errors['name'][0]);
        $this->assertEquals('Поле email не может быть пустым.', $errors['email'][0]);
        $this->assertEquals('Поле password не может быть пустым.', $errors['password'][0]);
        $this->assertEquals('Поле locality не может быть пустым.', $errors['locality'][0]);
    }

    /**
     * Test creating user with invalid request body.
     * @return void
     */
    public function test_creating_user_with_invalid_data()
    {
        $response = $this->postJson(route('auth.create'), [
            'name'        => 'admin',
            'email'       => 'invalid_email',
            'password'    => 'less',
            'locality'    => 'Vladikavkaz',
            'age'         => 'Invalid age',
            'first_name'  => 'Azamat',
            'last_name'   => 'Komaev',
            'description' => 'Lol iam cool.'
        ]);
        $response->assertStatus(422);
        $responseJson = $response->json();
        $errors = $responseJson['errors'];
        $this->assertEquals('The given data was invalid.', $responseJson['message']);
        $this->assertCount(3, $errors);
        $this->assertEquals('В данное поле следует вписать валидный почтовый адрес.', $errors['email'][0]);
        $this->assertEquals('Поле password должно содержать больше 8 символов.', $errors['password'][0]);
        $this->assertEquals('Поле age должно быть числом.', $errors['age'][0]);
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
        $response1 = $this->postJson(route('auth.create'), $data);
        $response1->assertStatus(201);
        $response2 = $this->postJson(route('auth.create'), $data);
        $response2->assertStatus(422);
        $responseJson = $response2->json();
        $errors = $responseJson['errors'];
        $this->assertEquals('The given data was invalid.', $responseJson['message']);
        $this->assertCount(2, $errors);
        $this->assertEquals('The name has already been taken.', $errors['name'][0]);
        $this->assertEquals('The email has already been taken.', $errors['email'][0]);
    }


    /**
     * Test log in user without data.
     * @return void
     */
    public function test_login_user_without_data()
    {
        $response = $this->postJson(route('auth.login'));
        $response->assertStatus(422);
        $responseData = $response->json();
        $errors = $responseData['errors'];
        $this->assertEquals('The given data was invalid.', $responseData['message']);
        $this->assertCount(2, $errors);
        $this->assertEquals('Поле name не может быть пустым.', $errors['name'][0]);
        $this->assertEquals('Поле password не может быть пустым.', $errors['password'][0]);
    }

    /**
     * Test getting current user without auth token.
     * @return void
     */
    public function test_getting_user_without_token()
    {
        $response = $this->get(route('auth.me'));
        $response->assertStatus(401);
        $responseJson = $response->json();
        $this->assertEquals('Unauthenticated.', $responseJson['message']);
    }

    /**
     * Test log in user and getting data about him.
     * @return void
     */
    public function test_login_and_getting_data_about_user()
    {
        $data = [
            'name'     => 'admin',
            'email'    => 'adminmail@mail.ru',
            'password' => 'normal_pwd',
            'locality' => 'Beslan'
        ];
        $creatingUserResponse = $this->postJson(route('auth.create'), $data);
        $creatingUserResponse->assertStatus(201);

        $authUserResponse = $this->postJson(route('auth.login'), $data);
        $authUserResponse->assertStatus(201);
        $authToken = $authUserResponse->json()['token'];
        $this->assertIsString($authToken);

        $userResponse = $this->get(route('auth.me'), [
            'Authorization' => 'Bearer ' . $authToken
        ]);
        $userResponse->assertStatus(200);
        $userDataResponse = $userResponse->json();

        foreach (array_keys($data) as $key)
        {
            if ($key === 'password') continue;
            $this->assertEquals($data[$key], $userDataResponse[$key]);
        }
    }
}
