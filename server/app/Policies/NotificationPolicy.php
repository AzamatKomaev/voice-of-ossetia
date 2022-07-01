<?php

namespace App\Policies;

use App\Models\Notification;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class NotificationPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can delete the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Notification  $notification
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function delete(User $user, Notification $notification)
    {
        return $user->is_superuser || $user->id === $notification->notifiable_id;
    }
}
