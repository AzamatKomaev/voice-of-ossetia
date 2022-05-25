<?php

namespace App\Http\Controllers;

use Intervention\Image\Facades\Image;

class MediaController extends Controller
{
    /**
     * @param string $dir, string $path
     * @return mixed
     */
    public function get(string $dir, string $path) {
        return Image::make(storage_path() . '/app/' . $dir . '/' .  $path)->response();
    }
}
