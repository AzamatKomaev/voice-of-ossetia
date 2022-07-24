<?php

namespace App\Notifications;

use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class UserActivatedNotification extends Notification
{
    use Queueable;

    private $sender;
    private User $receiver;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($receiver)
    {
        $this->sender = User::getSuperuser() ?? 'System';
        $this->receiver = $receiver;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['database'];
    }

    protected function getText(): string
    {
        return 'Ваш аккаунт был успешно подтвержден! ' .
            'Теперь вы можете создавать посты и оставлять комментарий под постами других пользователей сайта!';
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        return [
            'sender' => $this->sender,
            'receiver' => $this->receiver,
            'text' => $this->getText()
        ];
    }
}
