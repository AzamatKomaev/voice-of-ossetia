<?php

namespace App\Observers;

use App\Models\User;
use App\Notifications\UserRegistrationNotification;
use Illuminate\Support\Facades\Notification;

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
        Notification::send($user, (new UserRegistrationNotification($user))->delay(60));
    }
}
