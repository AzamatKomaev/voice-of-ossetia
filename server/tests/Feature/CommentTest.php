<?php

namespace Tests\Feature;

use App\Models\Category;
use App\Models\Comment;
use App\Models\Post;
use App\Models\User;
use Tests\TestCase;

class CommentTest extends TestCase
{
    protected Category $category;
    protected $postCreator;
    protected $post;

    protected function setUp(): void
    {
        parent::setUp();
        $this->category = Category::create([
            'name' => 'First Category',
            'description' => 'Category for testing',
            'avatar' => 'some/path.png'
        ]);
        $this->postCreator = User::factory()->create(['is_active' => true]);
        $this->post = Post::factory()->create([
            'category_id' => $this->category->id,
            'user_id' => $this->postCreator->id
        ]);
    }

    /**
     * Test how setUp was worked.
     * @return void
     */
    public function test_set_up()
    {
        $category = Category::first();
        $user = User::where('name', $this->postCreator->name)->get();
        $post = Post::where('title', $this->post->title)->get();
        $this->assertNotEmpty($user);
        $this->assertNotEmpty($post);
        $this->assertEquals($category->id, $this->category->id);
        $this->assertEquals($user[0]->id, $this->postCreator->id);
        $this->assertEquals($post[0]->id, $this->post->id);
        $this->assertEquals($post[0]->user_id, $user[0]->id);
    }

    /**
     * Test creation comment without auth header with token.
     * @return void
     */
    public function test_creation_comment_without_authorization()
    {
        $commentCreator = User::factory()->create(['is_active' => true]);
        $commentData = Comment::factory()->make([
            'user_id' => $commentCreator->id,
            'post_id' => $this->post->id
        ])->toArray();
        $commentResponse = $this->postJson(route('comments.store'), $commentData);
        $commentResponse->assertStatus(401);
        $this->assertDatabaseMissing('comments', $commentData);
    }

    /**
     * Test creation comment by inactive user (is_active=false).
     * @return void
     */
    public function test_creation_comment_by_inactive_user()
    {
        $commentCreator = User::factory()->create();
        $commentData = Comment::factory()->make([
            'user_id' => $commentCreator->id,
            'post_id' => $this->post->id
        ])->toArray();
        $commentResponse = $this->postJson(route('comments.store'), $commentData, [
            'Authorization' => 'Bearer ' . $this->getAuthToken($commentCreator)
        ]);
        $commentResponse->assertStatus(403);
        $this->assertEquals('The user is not active.', $commentResponse->json()['error']);
        $this->assertDatabaseMissing('comments', $commentData);
    }

    /**
     * Test creation comment without any data.
     * @return void
     */
    public function test_creation_comment_without_data()
    {

        $commentCreator = User::factory()->create(['is_active' => true]);
        $commentResponse = $this->postJson(route('comments.store'), [], [
            'Authorization' => 'Bearer ' . $this->getAuthToken($commentCreator)
        ]);
        $commentResponse->assertStatus(422);
        $responseErrors = $commentResponse->json()['errors'];
        $this->assertArrayHasKey('description', $responseErrors);
        $this->assertArrayHasKey('post_id', $responseErrors);
        $this->assertEquals('Поле description не может быть пустым.', $responseErrors['description'][0]);
        $this->assertEquals('Поле post id не может быть пустым.', $responseErrors['post_id'][0]);
    }

    /**
     * Test creation comment with valid data.
     * @return void
     */
    public function test_successful_creation_comment()
    {
        $commentCreator = User::factory()->create(['is_active' => true]);
        $commentData = Comment::factory()->make([
            'user_id' => $commentCreator->id,
            'post_id' => $this->post->id
        ])->toArray();
        $commentResponse = $this->postJson(route('comments.store'), $commentData, [
            'Authorization' => 'Bearer ' . $this->getAuthToken($commentCreator)
        ]);
        $this->assertArrayHasKey('user', $commentResponse->json());
        $this->assertArrayHasKey('post', $commentResponse->json());
        $this->assertEquals($commentCreator->id, $commentResponse->json()['user']['id']);
        $this->assertEquals($this->post->id, $commentResponse->json()['post']['id']);
        $this->assertDatabaseHas('comments', $commentData);
    }

    /**
     * Test deletion a comment without providing auth token.
     * @return void
     */
    public function test_deletion_comment_without_authorization()
    {
        $commentCreator = User::factory()->create(['is_active' => true]);
        $comment = Comment::factory()->create([
            'user_id' => $commentCreator->id,
            'post_id' => $this->post->id
        ]);
        $commentResponse = $this->delete(route('comments.destroy', [$comment->id]), [], []);
        $commentResponse->assertStatus(401);
        $this->assertDatabaseHas('comments', ['id' => $comment->id]);
    }

    /**
     * Test deletion a comment by not its creator.
     * @return void
     */
    public function test_deletion_post_not_by_creator()
    {
        $commentCreator = User::factory()->create(['is_active' => true]);
        $notCommentCreator = User::factory()->create(['is_active' => true]);
        $comment = Comment::factory()->create([
            'user_id' => $commentCreator->id,
            'post_id' => $this->post->id
        ]);
        $commentResponse = $this->delete(route('comments.destroy', [$comment->id]), [], [
            'Authorization' => 'Bearer ' . $this->getAuthToken($notCommentCreator)
        ]);
        $commentResponse->assertStatus(403);
        $this->assertDatabaseHas('comments', ['id' => $comment->id]);
    }

    /**
     * Test deletion a comment by its creator.
     * @return void
     */
    public function test_deletion_comment_by_its_creator()
    {
        $commentCreator = User::factory()->create(['is_active' => true]);
        $comment = Comment::factory()->create([
            'user_id' => $commentCreator->id,
            'post_id' => $this->post->id
        ]);
        $commentResponse = $this->delete(route('comments.destroy', [$comment->id]), [], [
            'Authorization' => 'Bearer ' . $this->getAuthToken($commentCreator)
        ]);
        $commentResponse->assertStatus(204);
        $this->assertDatabaseMissing('comments', ['id' => $comment->id]);
    }

    /**
     * Test deletion a comment by post creator.
     * @return void
     */
    public function test_deletion_comment_by_post_creator()
    {
        $commentCreator = User::factory()->create(['is_active' => true]);
        $comment = Comment::factory()->create([
            'user_id' => $commentCreator->id,
            'post_id' => $this->post->id
        ]);
        $commentResponse = $this->delete(route('comments.destroy', [$comment->id]), [], [
            'Authorization' => 'Bearer ' . $this->getAuthToken($this->postCreator)
        ]);
        $commentResponse->assertStatus(204);
        $this->assertDatabaseMissing('comments', ['id' => $comment->id]);
    }

    public function test_deletion_comment_by_superuser()
    {
        $commentCreator = User::factory()->create(['is_active' => true]);
        $superuser = User::factory()->create(['is_active' => true, 'is_superuser' => true]);
        $comment = Comment::factory()->create([
            'user_id' => $commentCreator->id,
            'post_id' => $this->post->id
        ]);
        $commentResponse = $this->delete(route('comments.destroy', [$comment->id]), [], [
            'Authorization' => 'Bearer ' . $this->getAuthToken($superuser)
        ]);
        $commentResponse->assertStatus(204);
        $this->assertDatabaseMissing('comments', ['id' => $comment->id]);
    }

    /**
     * Test sending and getting notification via model after creation comment.
     * @return void
     */
    public function test_sending_and_getting_notifications_via_model_after_creation_comment()
    {
        $commentCreator = User::factory()->create(['is_active' => true]);
        $comment = Comment::factory()->create([
            'user_id' => $commentCreator->id,
            'post_id' => $this->post->id
        ]);
        $this->assertNotNull($comment);
        $commentCreatorNotifications = $this->postCreator->notifications;
        $this->assertNotEmpty($commentCreatorNotifications);
        $this->assertEquals($this->postCreator->id, $commentCreatorNotifications->last()['notifiable_id']);
        $this->assertEquals($commentCreator->id, $commentCreatorNotifications->last()['data']['sender']['id']);
        $this->assertEquals($this->postCreator->id, $commentCreatorNotifications->last()['data']['receiver']['id']);
    }
}
