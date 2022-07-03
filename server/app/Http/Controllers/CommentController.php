<?php

namespace App\Http\Controllers;

use App\Http\Requests\CommentRequest;
use App\Http\Resources\CommentResource;
use App\Models\Comment;
use Illuminate\Support\Facades\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CommentController extends Controller
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
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection|\Illuminate\Http\Response
     */
    public function index()
    {
        $comments = Comment::filter()->cursorPaginate(15);
        if (!$comments->items()) {
            return Response::make([], 204);
        }
        return CommentResource::collection($comments);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  CommentRequest  $request
     * @return CommentResource
     */
    public function store(CommentRequest $request)
    {
        $data = $request->validated();
        $data['user_id'] = Auth::user()->id;
        $comment = Comment::create($data);
        return new CommentResource($comment);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return CommentResource
     */
    public function show($id)
    {
        $comment = Comment::findOrFail($id);
        return new CommentResource($comment);
    }

    /**
     * @param $id
     * @return \Illuminate\Http\JsonResponse|void
     */
    public function destroy($id)
    {
        $comment = Comment::findOrFail($id);
        $user = Auth::user();
        if ($user->cannot('delete', $comment)) {
            return Response::json(['message' => 'You cannot delete the comment.'], 403);
        }
        $comment->delete();
        return Response::json([], 204);
    }
}
