<?php

namespace Tests\Feature;

use App\Models\Category;
use App\Models\Post;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class PostTest extends TestCase
{
    protected Category $category;

    protected function setUp(): void
    {
        parent::setUp();
        Storage::disk('local')->deleteDirectory('testing/posts');
        $this->category = Category::create([
            'name' => 'First Category',
            'description' => 'Category for testing.',
            'avatar' => 'some/path.png'
        ]);
    }

    /**
     * Test how setUp was worked.
     * @return void
     */
    public function test_set_up_data()
    {
        $category = Category::first();
        $this->assertEquals($category->id, $this->category->id);
        $this->assertDatabaseHas('categories', $this->category->toArray());
    }

    /**
     * Test creation post without auth header with token.
     * @return void
     */
    public function test_creation_post_without_authorization()
    {
        $user = $this->setUpUser();
        $postData = $this->setUpData(Post::factory()->make()->toArray(), [
            'category_id' => $this->category->id,
            'user_id'     => $user->id
        ]);
        $postResponse = $this->postJson(route('posts.store'), $postData);
        $postResponse->assertStatus(401);
        $this->assertDatabaseMissing('posts', $postData);
    }

    /**
     * Test creation post by inactive user (is_active=false).
     * @return void
     */
    public function test_creation_post_by_inactive_user()
    {
        $user = $this->setUpUser();
        $postData = $this->setUpData(Post::factory()->make()->toArray(), [
            'category_id' => $this->category->id,
            'user_id'     => $user->id
        ]);
        $postResponse = $this->postJson(route('posts.store'), $postData, [
            'Authorization' => 'Bearer ' . $this->getAuthToken($user)
        ]);
        $postResponse->assertStatus(403);
        $this->assertEquals('The user is not active.', $postResponse->json()['error']);
        $this->assertDatabaseMissing('posts', $postData);
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
     * Test creation post with invalid files in body (only images available) where one of files is really image.
     * @return void
     */
    public function test_creation_post_with_invalid_file_types()
    {
        $user = $this->setUpUser(['is_active' => true]);
        $fileNames = ['image.jpg', 'test.exe', 'document.pdf'];
        $files = $this->setUpFiles($fileNames);
        $postData = $this->setUpData(Post::factory()->make()->toArray(), [
            'category_id' => $this->category->id,
            'user_id'     => $user->id,
            'files'       => $files
        ]);
        $postResponse = $this->postJson(route('posts.store'), $postData, [
            'Authorization' => 'Bearer ' . $this->getAuthToken($user)
        ]);
        $postResponse->assertStatus(422);
        $responseErrors = $postResponse->json()['errors'];
        $this->assertCount(2, $responseErrors);
        $this->assertArrayHasKey('files.1', $responseErrors);
        $this->assertArrayHasKey('files.2', $responseErrors);
        $this->assertEquals('Поле files.1 должно быть изображением.', $responseErrors['files.1'][0]);
        $this->assertEquals('Поле files.2 должно быть изображением.', $responseErrors['files.2'][0]);
        unset($postData['files']);
        $this->assertDatabaseMissing('posts', $postData);
    }

    /**
     * Test creation post with limit of posts (>10).
     * @return void
     */
    public function test_creation_post_with_limit_of_posts()
    {
        $user = $this->setUpUser(['is_active' => true]);
        $fileNames = [
            'first.jpg',
            'second.png',
            'third.jpg',
            'fourth.jpg',
            'fifth.png',
            'sixth.png'
        ];
        $files = $this->setUpFiles($fileNames);
        $postData = $this->setUpData(Post::factory()->make()->toArray(), [
            'category_id' => $this->category->id,
            'user_id'     => $user->id,
            'files'       => $files
        ]);
        $postResponse = $this->postJson(route('posts.store'), $postData, [
            'Authorization' => 'Bearer ' . $this->getAuthToken($user)
        ]);
        $postResponse->assertStatus(422);
        $responseErrors = $postResponse->json()['errors'];
        $this->assertCount(1, $responseErrors);
        $this->assertArrayHasKey('files', $responseErrors);
        $this->assertEquals(
            'Поле files не может содержать больше 5 элемент(-ов)(-а).',
            $responseErrors['files'][0]
        );
        unset($postData['files']);
        $this->assertDatabaseMissing('posts', $postData);
    }

    /**
     * Test creation post with valid data.
     * @return void
     */
    public function test_successful_creation_post()
    {
        $user = $this->setUpUser(['is_active' => true]);
        $fileNames = [
            'first.jpg',
            'second.png',
            'third.jpg',
            'fourth.jpg',
            'fifth.png'
        ];
        $files = $this->setUpFiles($fileNames);
        $postData = $this->setUpData(Post::factory()->make()->toArray(), [
            'category_id' => $this->category->id,
            'user_id'     => $user->id,
            'files'       => $files
        ]);
        $postResponse = $this->postJson(route('posts.store'), $postData, [
            'Authorization' => 'Bearer ' . $this->getAuthToken($user)
        ]);
        $postResponse->assertStatus(201);
        $this->assertArrayHasKey('user', $postResponse->json());
        $this->assertArrayHasKey('category', $postResponse->json());
        $this->assertArrayHasKey('files', $postResponse->json());
        $this->assertEquals($user->id, $postResponse->json()['user']['id']);
        $this->assertEquals($this->category->id, $postResponse->json()['category']['id']);
        $this->assertCount(count($fileNames), $postResponse->json()['files']);
        foreach ($postResponse->json()['files'] as $file) {
            Storage::disk('local')->assertExists($file['path']);
        }
        unset($postData['files']);
        $this->assertDatabaseHas('posts', $postData);
    }

    /**
     * Test deletion a post without providing auth token.
     * @return void
     */
    public function test_deletion_post_without_authorization()
    {
        $user = $this->setUpUser(['is_active' => true]);
        $postData = $this->setUpData(Post::factory()->make()->toArray(), [
            'category_id' => $this->category->id,
            'user_id'     => $user->id
        ]);
        $post = Post::create($postData);
        $postResponse = $this->delete(route('posts.destroy', [$post->id]), [], []);
        $postResponse->assertStatus(401);
        $this->assertDatabaseHas('posts', $postData);
    }

    /**
     * Test deletion a post by not its creator.
     * @return void
     */
    public function test_deletion_post_not_by_creator()
    {
        $creator = $this->setUpUser(['is_active' => true]);
        $notCreator = $this->setUpUser(['is_active' => true]);
        $postData = $this->setUpData(Post::factory()->make()->toArray(), [
            'category_id' => $this->category->id,
            'user_id'     => $creator->id
        ]);
        $post = Post::create($postData);
        $deleteResponse = $this->delete(route('posts.destroy', [$post->id]), [], [
            'Authorization' => 'Bearer ' . $this->getAuthToken($notCreator)
        ]);
        $deleteResponse->assertStatus(403);
        $this->assertDatabaseHas('posts', $postData);
    }

    /**
     * Test deletion a post by its creator.
     * @return void
     */
    public function test_deletion_post_by_creator()
    {
        $user = $this->setUpUser(['is_active' => true]);
        $postData = $this->setUpData(Post::factory()->make()->toArray(), [
            'category_id' => $this->category->id,
            'user_id'     => $user->id
        ]);
        $post = Post::create($postData);
        $deleteResponse = $this->delete(route('posts.destroy', [$post->id]), [], [
            'Authorization' => 'Bearer ' . $this->getAuthToken($user)
        ]);
        $deleteResponse->assertStatus(204);
        $this->assertDatabaseMissing('posts', $postData);
    }

    /**
     * Test deletion post by superuser.
     * @return void
     */
    public function test_deletion_post_by_superuser()
    {
        $creator = $this->setUpUser(['is_active' => true]);
        $superuser = $this->setUpUser(['is_active' => true, 'is_superuser' => true]);
        $postData = $this->setUpData(Post::factory()->make()->toArray(), [
            'category_id' => $this->category->id,
            'user_id'     => $creator->id
        ]);
        $post = Post::create($postData);
        $postResponse = $this->delete(route('posts.destroy', [$post->id]), [], [
            'Authorization' => 'Bearer ' . $this->getAuthToken($superuser)
        ]);
        $postResponse->assertStatus(204);
        $this->assertDatabaseMissing('posts', $postData);
    }
}
