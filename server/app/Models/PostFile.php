<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PostFile extends Model
{
    use HasFactory;

    protected $fillable = ['path', 'post_id'];
    protected $table = 'postfiles';

    /**
     * Get a post related to the file.
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function post()
    {
        return $this->belongsTo(Post::class);
    }

    /**
     * Save several files.
     * @param $files
     * @param int $postId
     * @return void
     */
    public static function saveFiles($files, int $postId): void
    {
        foreach ($files as $file) {
            $postFile = new PostFile();
            $postFile->path = $file->store(env('APP_ENV') . '/posts');
            $postFile->post_id = $postId;
            $postFile->save();
        }
    }
}
