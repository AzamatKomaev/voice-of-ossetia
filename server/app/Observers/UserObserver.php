<?php

namespace App\Observers;

use App\Models\ActivationToken;
use App\Models\User;
use App\Notifications\UserCreatedNotification;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Str;

class UserObserver
{
    /**
     * Handle the User "created" event.
     *
     * @param  \App\Models\User  $user
     * @return void
     */
    public function created(User $user)
    {
        $uuid = (string) Str::uuid();
        $activationToken = new ActivationToken();
        $activationToken->token = $uuid;
        $activationToken->user_id = $user->id;
        $activationToken->save();
        Notification::send($user, (new UserCreatedNotification($user, $uuid))->delay(60));
    }
}
