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
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection|\Illuminate\Http\Response
     */
    public function index()
    {
        $posts = Post::orderBy('created_at', 'DESC')->filter()->cursorPaginate(12);
        if (!$posts->items()) {
            return Response::make([], 204);
        }
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
            PostFile::saveFiles($request->file('files'), $post->id);
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
            return Response::json(['message' => 'You cannot delete the post.'], 403);
        }
        $post->delete();
        return Response::json([], 204);
    }
}
