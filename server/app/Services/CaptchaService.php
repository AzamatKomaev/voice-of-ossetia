<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class CaptchaService
{
    public static function verifyUser(string $captchaResponse): bool
    {
        if (!config('app.check_captcha')) {
            return true;
        }

        $response = Http::post('https://www.google.com/recaptcha/api/siteverify' .
            '?secret=' . config('app.captcha_key') .
            '&response=' . $captchaResponse
        );
        return ($response->ok() && $response->json('success'));
    }
}

