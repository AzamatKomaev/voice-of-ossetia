<?php

namespace App\Notifications;

use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Notification;

class UserCreatedNotification extends Notification implements ShouldQueue
{
    use Queueable;

    private $sender;
    private User $receiver;
    private string $token;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($receiver, $token)
    {
        $this->sender = User::getSuperuser() ?? 'System';
        $this->receiver = $receiver;
        $this->token = $token;
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

    /**
     * Get text for the notification.
     * @return string
     */
    protected function getText(): string
    {
        return 'Доброго времени суток, ' . $this->receiver->name . '! ' .
            'Я рад видеть вас на своем сайте! Ваша учетная запись пока не активна. ' .
            'Мы выслали на указанную вами почту сообщение с указаниями для подтверждения вашего аккаунта. ' .
            'Вам следует подтвердить почту, иначе ваш аккаунт будет удален в течений 24 часов.';
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable): array
    {
        return [
            'sender' => $this->sender,
            'receiver' => $this->receiver,
            'text' => $this->getText()
        ];
    }
}
