<?php

namespace Tests;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Foundation\Testing\TestCase as BaseTestCase;
use Illuminate\Http\UploadedFile;

abstract class TestCase extends BaseTestCase
{
    use CreatesApplication, DatabaseTransactions;

    protected $admin;

    protected function setUp(): void
    {
        parent::setUp();
        $adminData = $this->setUpData(User::factory()->make()->toArray(), [
            'password' => 'admin12345',
            'is_superuser' => true,
            'is_active' => true
        ]);
        $this->admin = User::create($adminData);
    }

    // Default user password used in UserFactory.
    protected string $defaultPassword = 'password123';

    // Default headers for each sent request.
    protected $defaultHeaders = [
        'Accept' => 'application/json'
    ];

    /**
     * Set up post data.
     * @param array $data
     * @param array $updatedData
     * @return array
     */
    protected function setUpData(array $data, array $updatedData): array
    {
        foreach ($updatedData as $key => $value) {
            $data[$key] = $value;
        }
        return $data;
    }

    /**
     * Set up files for request.
     * @param array $fileNames
     * @return array
     */
    protected function setUpFiles(array $fileNames): array
    {
        $files = [];
        foreach ($fileNames as $fileName) {
            $files[] = UploadedFile::fake()->create($fileName);
        }
        return $files;
    }

    /**
     * Set up user.
     * @param $updateData
     * @return \Illuminate\Database\Eloquent\Collection|\Illuminate\Database\Eloquent\Model|User
     */
    protected function setUpUser($updateData=null): User
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
