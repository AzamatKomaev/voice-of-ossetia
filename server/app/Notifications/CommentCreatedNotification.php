<?php

namespace App\Notifications;

use App\Models\Comment;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Notification;

class CommentCreatedNotification extends Notification implements ShouldQueue
{
    use Queueable;

    private User $sender;
    private User $receiver;
    private Comment $comment;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($comment)
    {
        $this->sender = $comment->user;
        $this->receiver = $comment->post->user;
        $this->comment = $comment;
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
        return "Пользователь {$this->sender->name} добавил к вашему посту {$this->comment->post->title} " .
             "комментарий " . $this->comment->description;
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
