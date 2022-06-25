<?php

namespace App\Notifications;

use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;

class UserRegistrationNotification extends Notification
{
    use Queueable;

    private User $sender;
    private User $receiver;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($receiver)
    {
        $query = User::where('is_superuser', true)->get();
        $this->sender = $query ? $query[0] : User::all()->last();
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
            'text' => 'Доброго времени суток, ' . $this->receiver->name . '! ' .
                      'Я рад видеть вас на своем сайте! Ваша учетная запись пока не активна. ' .
                      'Наберитесь терпения и подождите пока я вам отпишу. ' .
                      'Я постараюсь как можно скорее сделать вас полноценным юзером данного сайта! ' .
                      'Если же все таки я вам не написал, вы можете написать мне на почту ' .
                      'azamatkomaev@mail.ru. Спасибо за понимание :).'
        ];
    }
}
