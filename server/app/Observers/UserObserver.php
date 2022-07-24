<?php

namespace App\Observers;

use App\Models\ActivationToken;
use App\Models\User;
use App\Notifications\UserActivatedNotification;
use App\Notifications\UserCreatedNotification;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Str;

class UserObserver
{
    public function updated(User $user)
    {
        if ($user->isDirty('is_active') && $user->is_active) {
            Notification::send($user, (new UserActivatedNotification($user))->delay(60));
        }
    }

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
