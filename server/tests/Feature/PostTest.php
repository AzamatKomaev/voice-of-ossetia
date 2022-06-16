<?php

namespace Tests\Feature;

use App\Models\Category;
use App\Models\Post;
use Tests\TestCase;

class PostTest extends TestCase
{
    protected Category $category;

    protected function setUpPostData(array $postData, int $categoryId, int $userId): array
    {
        $postData['category_id'] = $categoryId;
        $postData['user_id'] = $userId;
        return $postData;
    }

    protected function setUp(): void
    {
        parent::setUp();
        $this->category = Category::create([
            'name' => 'First Category',
            'description' => 'Category for testing.',
            'avatar' => 'some/path.png'
        ]);
    }

    /**
     * Test how UserTestData works.
     * @return void
     */
    public function test_set_up_data()
    {
        $user = $this->setUpUser()->toArray();
        $this->assertArrayHasKey('id', $user);
        $this->category->name = 'First Category';
    }

    /**
     * Test creation post without auth header with token.
     * @return void
     */
    public function test_creation_post_without_authorization()
    {
        $user = $this->setUpUser();
        $postData = $this->setUpPostData(Post::factory()->make()->toArray(), $this->category->id, $user->id);
        $postResponse = $this->postJson(route('posts.store'), $postData);
        $postResponse->assertStatus(401);
    }

    /**
     * Test creation post with inactive user (is_active=false).
     * @return void
     */
    public function test_creation_post_by_inactive_user()
    {
        $user = $this->setUpUser();
        $postData = $this->setUpPostData(Post::factory()->make()->toArray(), $this->category->id, $user->id);
        $postResponse = $this->postJson(route('posts.store'), $postData, [
            'Authorization' => 'Bearer ' . $this->getAuthToken($user)
        ]);
        $postResponse->assertStatus(403);
        $this->assertEquals('The user is not active.', $postResponse->json()['error']);
    }

    /**
     * Testing creation post without any data.
     * @return void
     */
    public function test_creation_post_without_data()
    {
        $user = $this->setUpUser(['is_active' => true]);
        $postResponse = $this->postJson(route('posts.store'), [], [
            'Authorization' => 'Bearer ' . $this->getAuthToken($user)
        ]);
        $postResponse->assertStatus(422);
        $this->assertEquals('The given data was invalid.', $postResponse->json()['message']);
        $fields = ['title', 'description', 'location', 'category_id'];
        foreach ($fields as $field) {
            $this->assertArrayHasKey($field, $postResponse->json()['errors']);
            $this->assertEquals(
                'Поле ' . str_replace('_', ' ', $field) . ' не может быть пустым.',
                $postResponse->json()['errors'][$field][0]
            );
        }
    }

    /**
     * Test creation user with valid data.
     * @return void
     */
    public function test_successful_creation_post()
    {
        $user = $this->setUpUser(['is_active' => true]);
        $postData = $this->setUpPostData(Post::factory()->make()->toArray(), $this->category->id, $user->id);
        $postResponse = $this->postJson(route('posts.store'), $postData, [
            'Authorization' => 'Bearer ' . $this->getAuthToken($user)
        ]);
        $postResponse->assertStatus(201);
        $this->assertArrayHasKey('user', $postResponse->json());
        $this->assertArrayHasKey('category', $postResponse->json());
        $this->assertIsArray($postResponse->json()['user']);
        $this->assertIsArray($postResponse->json()['category']);
    }

    /**
     * Test deletion a post by not its creator.
     * @return void
     */
    public function test_deletion_post_not_by_creator()
    {
        $creatorUser = $this->setUpUser(['is_active' => true]);
        $notCreatorUser = $this->setUpUser(['is_active' => true]);
        $postData = $this->setUpPostData(Post::factory()->make()->toArray(), $this->category->id, $creatorUser->id);
        $post = Post::create($postData);
        $deleteResponse = $this->delete(route('posts.destroy', [$post->id]), [], [
            'Authorization' => 'Bearer ' . $this->getAuthToken($notCreatorUser)
        ]);
        $deleteResponse->assertStatus(403);
    }

    /**
     * Test deletion a post by its creator.
     * @return void
     */
    public function test_deletion_post_by_creator()
    {
    }
}
