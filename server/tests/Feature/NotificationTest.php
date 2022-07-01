<?php

namespace Tests\Feature;

use App\Custom\NotificationService;
use App\Models\Notification;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Mockery\Matcher\Not;
use Tests\TestCase;

class NotificationTest extends TestCase
{
    protected $user;

    protected function setUp(): void
    {
        parent::setUp();
        $this->user = User::factory()->create(['is_active' => true]);
    }

    /**
     * Test getting notifications without authorization.
     * @return void
     */
    public function test_getting_notifications_without_authorization()
    {
        $response = $this->get(route('notifications.index'));
        $response->assertStatus(401);
    }

    /**
     * Test getting a notification as not its receiver.
     * @return void
     */
    public function test_getting_notification_by_not_its_receiver()
    {
        $notReceiver = User::factory()->create();
        $notification = Notification::factory()->create(['notifiable_id' => $this->user->id]);
        $response = $this->get(route('notifications.show', [$notification->id]), [
            'Authorization' => 'Bearer ' . $this->getAuthToken($notReceiver)
        ]);
        $response->assertStatus(404);
    }

    /**
     * Test getting a notification and marking it as read after request.
     * @return void
     */
    public function test_getting_notification_and_marking_it_as_read()
    {
        $notification = Notification::factory()->create(['notifiable_id' => $this->user->id]);
        $this->assertNull($notification->read_at);
        $response = $this->get(route('notifications.show', [$notification->id]), [
            'Authorization' => 'Bearer ' . $this->getAuthToken($this->user)
        ]);
        $response->assertStatus(200);
        $this->assertNotNull($response->json()['read_at']);
    }

    /**
     * Test successful getting notifications.
     * @return void
     */
    public function test_successful_getting_notifications()
    {
        $notifications = Notification::factory()->count(5)->create(['notifiable_id' => $this->user->id]);
        $this->assertCount(5, $notifications);
        $response = $this->get(route('notifications.index'), [
            'Authorization' => 'Bearer ' . $this->getAuthToken($this->user)
        ]);
        $response->assertStatus(200);
        $this->assertCount(6, $response->json()['data']);
        foreach ($notifications as $notification) {
            $this->assertDatabaseHas('notifications', $notification->toArray());
        }
    }

    /**
     * Test deletion a notification as guest (without providing auth header).
     * @return void
     */
    public function test_deletion_notification_without_authorization()
    {
        $notification = Notification::factory()->create(['notifiable_id' => $this->user->id]);
        $response = $this->delete(route('notifications.destroy', [$notification->id]), [], []);
        $response->assertStatus(401);
        $this->assertDatabaseHas('notifications', $notification->toArray());
    }

    /**
     * Test deletion notification not its receiver.
     * @return void
     */
    public function test_deletion_notification_by_not_its_receiver()
    {
        $notReceiver = User::factory()->create(['is_active' => true]);
        $notification = Notification::factory()->create(['notifiable_id' => $this->user->id]);
        $response = $this->delete(route('notifications.destroy', [$notification->id]), [], [
            'Authorization' => 'Bearer ' . $this->getAuthToken($notReceiver)
        ]);
        $response->assertStatus(403);
    }
}
