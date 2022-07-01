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

    /**
     * Create superuser.
     * @return void
     */
    protected function setUp(): void
    {
        parent::setUp();
        $this->admin = User::factory()->create([
            'password' => 'admin12345',
            'is_superuser' => true,
            'is_active' => true
        ]);

    }

    // Default headers for each sent request.
    protected $defaultHeaders = [
        'Accept' => 'application/json'
    ];

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
     * Get auth token for user.
     * @param Model|User $user
     * @return string
     */
    protected function getAuthToken(Model $user): string
    {
        return $user->createToken('API Token')->plainTextToken;
    }
}
