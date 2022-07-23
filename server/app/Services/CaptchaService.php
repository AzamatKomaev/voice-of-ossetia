<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class CaptchaService
{
    public static function verifyUser(string $captchaResponse): bool
    {
        if (!env('CHECK_CAPTCHA')) {
            return true;
        }

        $response = Http::post('https://www.google.com/recaptcha/api/siteverify' .
            '?secret=' . env('CAPTCHA_SERVER_KEY') .
            '&response=' . $captchaResponse
        );
        return ($response->ok() && $response->json('success'));
    }
}

