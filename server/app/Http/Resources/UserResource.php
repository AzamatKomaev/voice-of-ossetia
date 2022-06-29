<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id'                 => $this->id,
            'name'               => $this->name,
            'email'              => $this->email,
            'locality'           => $this->locality,
            'age'                => $this->age,
            'first_name'         => $this->first_name,
            'last_name'          => $this->last_name,
            'description'        => $this->description,
            'is_active'          => $this->is_active,
            'is_superuser'       => $this->is_superuser,
            'avatar'             => $this->avatar,
            'notification_count' => $this->unreadNotifications()->count(),
            'email_verified_at'  => $this->email_verified_at,
            'created_at'         => $this->created_at,
            'updated_at'         => $this->updated_at
        ];
    }
}
