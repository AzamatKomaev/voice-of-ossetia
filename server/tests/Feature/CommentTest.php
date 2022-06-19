<?php

namespace Tests\Feature;

use App\Models\Category;
use App\Models\Post;
use App\Models\User;
use Tests\TestCase;

class CommentTest extends TestCase
{
    protected Category $category;
    protected User $postCreator;
    protected Post $post;

    protected function setUp(): void
    {
        parent::setUp();
        $this->category = Category::create([
            'name' => 'First Category',
            'description' => 'Category for testing',
            'avatar' => 'some/path.png'
        ]);
        $this->postCreator = $this->setUpUser();
        $postData = $this->setUpPostData(Post::factory()->make()->toArray(), [
            'category_id' => $this->category->id,
            'user_id'     => $this->postCreator->id
        ]);
        $this->post = Post::create($postData);
    }

    /**
     * Test how setUp was worked.
     * @return void
     */
    public function test_set_up()
    {
        $category = Category::first();
        $user = User::first();
        $post = Post::first();
        $this->assertEquals($category->id, $this->category->id);
        $this->assertEquals($user->id, $this->postCreator->id);
        $this->assertEquals($post->id, $this->post->id);
        $this->assertEquals($post->user_id, $user->id);
    }

    /**
     * Test creation comment without auth header with token.
     * @return void
     */
    public function test_creation_comment_without_authorization()
    {
        $commentCreator = $this->setUpUser();

    }
}
