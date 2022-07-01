<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
    use HasFactory;

    /**
     * Actually ID is uuid (string), not integer.
     * @var string[]
     */
    protected $casts = [
        'id' => 'string'
    ];

    protected $fillable = ['type', 'notifiable_type', 'data'];
}
