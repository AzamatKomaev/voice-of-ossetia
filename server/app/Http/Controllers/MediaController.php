<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Storage;
use Illuminate\Contracts\Filesystem\FileNotFoundException;

class MediaController extends Controller
{
    /**
     * @param Request $request
     * @return \Illuminate\Http\Response|string
     */
    public function get(Request $request)
    {
        try {
            return Storage::disk('local')->get(env('APP_ENV') . '/' . $request->query('url'));
        } catch (FileNotFoundException $err) {
            return Response::make(['message' => 'File not found'], 404);
        }
    }
}
