<?php

namespace App\Custom;

use Illuminate\Support\Facades\Http;

class CaptchaService
{
    /**
     * Verify user response for captcha.
     * @param string $captchaResponse
     * @return bool
     */
    public static function verifyUser(string $captchaResponse): bool
    {
        $response = Http::post(' https://www.google.com/recaptcha/api/siteverify', [
            'secret' => env('CAPTCHA_SERVER_KEY'),
            'response' => $captchaResponse
        ]);
        return ($response->ok() && $response->json('success'));
    }
}
