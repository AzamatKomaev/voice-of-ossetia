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

    /**
     * Get text for the notification.
     * @return string
     */
    protected function getText(): string
    {
        return 'Доброго времени суток, ' . $this->receiver->name . '! ' .
            'Я рад видеть вас на своем сайте! Ваша учетная запись пока не активна. ' .
            'Наберитесь терпения и подождите пока я вам отпишу. ' .
            'Я постараюсь как можно скорее сделать вас полноценным юзером данного сайта! ' .
            'Если же все таки я вам не написал, вы можете написать мне на почту ' .
            'azamatkomaev@mail.ru. Спасибо за понимание :).';
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
