<?php

namespace Tests\Feature\TestData;

use App\Models\User;

class UserTestData
{
    protected array $users;

    public array $jsonData = [
        [
            'name' => 'User1',
            'email' => 'user1@mail.ru',
            'locality' => 'Beslan',
            'password' => 'password12345'
        ],
        [
            'name' => 'User2',
            'email' => 'user2@mail.ru',
            'locality' => 'Beslan',
            'password' => 'password12345'
        ]
    ];

    public function __construct()
    {
        foreach ($this->jsonData as $data) {
            $user = User::create($data);
            $this->users[] = $user;
        }
    }

    /**
     * Get all users.
     * @return array
     */
    public function getUsers()
    {
        return $this->users;
    }
}
