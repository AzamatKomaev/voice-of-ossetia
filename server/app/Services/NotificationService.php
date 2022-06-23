<?php

namespace App\Custom;

use App\Models\User;

class NotificationService {
    private User $user;
    private string $notificationType;

    /**
     * @param $user
     * @param $notificationType
     */
    public function __construct($user, $notificationType) {
        $this->user = $user;
        $this->notificationType = $notificationType;
    }

    /**
     * Mark selected notifications as read.
     * @return void
     */
    public function markAsRead() {
        $this->user->unreadNotifications()->where('type', $this->notificationType)->update(['read_at' => now()]);
    }

    /**
     * Get selected notification.
     * @return mixed
     */
    public function get() {
        return $this->user->notifications()->where('type', $this->notificationType)->get();
    }

    /**
     * Delete selected notifications.
     * @return void
     */
    public function delete() {
        $this->user->notifications()->where('type', $this->notificationType)->delete();
    }
}
