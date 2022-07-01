<?php

namespace App\Http\Controllers;

use App\Custom\NotificationService;
use App\Http\Resources\NotificationResource;
use App\Models\Notification;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class NotificationController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum');
    }

    /**
     *
     */
    public function index()
    {
        $user = Auth::user();
        $notifications = $user->notifications()->orderByRaw('read_at DESC NULLS LAST')->cursorPaginate(12);
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
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
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
