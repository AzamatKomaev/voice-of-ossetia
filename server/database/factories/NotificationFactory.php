<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class NotificationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'id' => (string) Str::uuid(),
            'type' => 'App\\Notifications\\SomeNotificationType',
            'notifiable_type' => 'App\\Models\\User',
            'data' => 'some_json_data'
        ];
    }
}
