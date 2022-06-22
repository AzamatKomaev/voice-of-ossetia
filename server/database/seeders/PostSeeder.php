<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PostSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        for ($i=0; $i < 5; $i++) {
            $userId = User::first()->id;
            $categoryId = Category::all()[0]->id;
            $data = Post::factory()->make()->toArray();
            $data['user_id'] = $userId;
            $data['category_id'] = $categoryId;
            Post::create($data);
        }
    }
}
