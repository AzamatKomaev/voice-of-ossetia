<?php

namespace App\Http\Controllers;

use App\Http\Requests\PostRequest;
use App\Http\Resources\PostResource;
use App\Models\Post;
use App\Models\PostFile;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Auth;

class PostController extends Controller
{
    /**
     * Set up middlewares.
     */
    public function __construct()
    {
        $middlewareActions = ['store', 'update', 'destroy'];
        $this->middleware('auth:sanctum')->only($middlewareActions);
        $this->middleware('is_active')->only($middlewareActions);
    }

    /**
     * Get all posts.
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index()
    {
        $posts = Post::orderBy('created_at', 'DESC')->filter()->get();
        return PostResource::collection($posts);
    }

    /**
     * Create a post.
     * @param PostRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(PostRequest $request)
    {
        $data = $request->validated();
        $data['user_id'] = Auth::user()->id;
        $post = Post::create($data);
        if ($request->hasFile('files')) {
            foreach ($request->file('files') as $file) {
                $postFile = new PostFile();
                $postFile->path = $file->store(env('APP_ENV') . '/posts');
                $postFile->post_id = $post->id;
                $postFile->save();
            }
        }
        $resource = new PostResource($post);
        return $resource->response()->setStatusCode(201);
    }

    /**
     * @param $id
     * @return PostResource
     */
    public function show($id)
    {
        $post = Post::findOrFail($id);
        return new PostResource($post);
    }

    /**
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        $post = Post::findOrFail($id);
        $user = Auth::user();

        if ($user->cannot('delete', $post)) {
            return Response::json([
                'user_id' => $user->id,
                'post__user_id' => $post->user_id
            ], 403);
        }

        $post->delete();
        return Response::json([], 204);
    }
}
