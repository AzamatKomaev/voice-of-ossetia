<?php

namespace App\Http\Controllers;

use App\Http\Resources\NotificationResource;
use App\Models\Notification;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Auth;

class NotificationController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum');
    }

    /**
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection|\Illuminate\Http\Response
     */
    public function index()
    {
        $user = Auth::user();
        $notifications = $user->notifications()->orderByRaw('read_at DESC, created_at DESC')->paginate(15);
        if (!$notifications->items()) {
            return Response::make([], 204);
        }
        return NotificationResource::collection($notifications);
    }

    /**
     * @param string $id
     * @return NotificationResource
     */
    public function show(string $id)
    {
        $notification = Auth::user()->notifications()->findOrFail($id);
        $notification->markAsRead();
        return new NotificationResource($notification);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  string  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        $notification = Notification::findOrFail($id);
        $user = Auth::user();
        if ($user->cannot('delete', $notification)) {
            return Response::json(['message' => 'You cannot delete the notification.'], 403);
        }
        $notification->delete();
        return Response::json([], 204);
    }
}
