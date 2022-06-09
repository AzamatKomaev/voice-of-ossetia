<?php

namespace Tests\Feature;

use App\Models\Category;
use Tests\Feature\TestData\UserTestData;
use Tests\TestCase;

class PostTest extends TestCase
{
    protected UserTestData $userData;
    protected Category $category;

    protected function setUp(): void
    {
        parent::setUp();
        $this->userData = new UserTestData();
        $this->category = Category::create([
            'name'        => 'First Category',
            'description' => 'Category for testing.',
            'avatar'      => 'some/path.png'
        ]);
    }

    /**
     * Test how UserTestData works.
     * @return void
     */
    public function test_set_up_data()
    {
        $users = $this->userData->getUsers();
        $this->assertCount(2, $users);
        $this->category->name = 'First Category';
    }

    /**
     * Test creating post without auth header with token.
     * @return void
     */
    public function test_creating_post_without_authorization()
    {
        $postResponse = $this->postJson(route('posts.store'),
            [
                'title' => 'Post1',
                'description' => 'Post1 Description',
                'location'    => 'Vladikavkaz',
                'category_id' => $this->category->id
            ],
            [
                'Authorization' => 'Bearer ' . $this->getAuthToken($this->userData->jsonData[0])
            ]
        );
        $postResponse->assertStatus(401);
    }

    public function test_creating_post_without_data()
    {

    }
}
