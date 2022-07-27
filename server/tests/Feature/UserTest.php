<?php

namespace Tests\Feature;

use App\Models\ActivationToken;
use App\Models\User;
use Tests\TestCase;

class UserTest extends TestCase
{
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
        $userData = User::factory()->make([
            'email'    => 'invalid_email',
            'age'      => 'invalid ager'
        ])->toArray();
        $userData['password'] = 'less';
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
        $user = User::factory()->create();
        $userData = $user->toArray();
        $userData['password'] = 'password123';
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
        $userData = User::factory()->make()->toArray();
        $userData['password'] = 'password123';
        $response = $this->postJson(route('auth.create'), $userData);
        $response->assertStatus(201);
        $this->assertDatabaseHas('users', ['name' => $userData['name'], 'email' => $userData['email']]);
        $this->assertDatabaseHas('activation_tokens', ['user_id' => $response->json('id')]);
    }

    public function test_activation_user()
    {
        $user = User::factory()->create();
        $this->assertDatabaseHas('activation_tokens', ['user_id' => $user->id]);
        $activationToken = ActivationToken::where('user_id', $user->id)->get()->first();
        $response = $this->delete(route('auth.activate', [$activationToken->token]));
        $response->assertStatus(204);
        $user = User::find($user->id);
        $this->assertTrue($user->is_active);
        $this->assertDatabaseMissing('activation_tokens', ['user_id' => $user->id]);
    }

    /**
     * Test notifications after creation user.
     * @return void
     */
    public function test_getting_notifications_after_creation_user()
    {
        $user = User::factory()->create();
        $userNotifications = $user->notifications;
        $this->assertCount(1, $userNotifications);
        $this->assertEquals($this->admin->id, $userNotifications[0]['data']['sender']['id']);
        $this->assertEquals($user->id, $userNotifications[0]['data']['receiver']['id']);
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
        $this->assertCount(3, $responseErrors);
        $this->assertEquals('Поле name не может быть пустым.', $responseErrors['name'][0]);
        $this->assertEquals('Поле password не может быть пустым.', $responseErrors['password'][0]);
        $this->assertEquals('Поле captcha response не может быть пустым.', $responseErrors['captcha_response'][0]);
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
        $user = User::factory()->create();
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
