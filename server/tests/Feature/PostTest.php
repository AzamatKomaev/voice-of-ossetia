<?php

namespace Tests\Feature;

use App\Models\Category;
use App\Models\Post;
use App\Models\User;
use Tests\TestCase;

class PostTest extends TestCase
{
    protected Category $category;

    protected function setUpPostData(array $postData, int $categoryId, int $userId): array {
        $postData['category_id'] = $categoryId;
        $postData['user_id'] = $userId;
        return $postData;
    }

    protected function setUp(): void
    {
        parent::setUp();
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
        $user = User::factory()->create();
        $this->assertArrayHasKey('id', $user);
        $this->category->name = 'First Category';
    }

    /**
     * Test creation post without auth header with token.
     * @return void
     */
    public function test_creation_post_without_authorization()
    {
        $user = User::factory()->create();
        $postResponse = $this->postJson(route('posts.store'), [
            'title'       => 'PostTitle',
            'description' => 'PostDescription',
            'user_id'     => $user->getAttribute('id'),
            'category_id' => $this->category->id
        ]);
        $postResponse->assertStatus(401);
    }

    /**
     * Test creation post with inactive user (is_active=false).
     * @return void
     */
    public function test_creation_post_by_inactive_user()
    {
        $user = User::factory()->create();
        $userData = $this->getUserDataJson($user);
        $postData = $this->setUpPostData(Post::factory()->make()->toArray(), $this->category->id, $userData['id']);
        $postResponse = $this->postJson(route('posts.store'),$postData, [
            'Authorization' => 'Bearer ' . $this->getAuthToken($userData)
        ]);
        $postResponse->assertStatus(403);
        $this->assertEquals('The user is not active.', $postResponse->json()['error']);
    }

    public function test_creation_post_without_data()
    {
        $user = User::factory()->create();
        $user->is_active = true;
        $user->save();
        $userData = $this->getUserDataJson($user);
        $postResponse = $this->postJson(route('posts.store'), [], [
            'Authorization' => 'Bearer ' . $this->getAuthToken($userData)
        ]);
        $postResponse->assertStatus(422);
        $this->assertEquals('The given data was invalid.', $postResponse->json()['message']);

    }
}
