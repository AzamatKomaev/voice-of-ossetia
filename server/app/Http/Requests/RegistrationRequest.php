<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class RegistrationRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name'        => ['required', 'max:255', 'unique:users'],
            'email'       => ['required', 'max:255', 'unique:users', 'email'],
            'password'    => ['required', 'min:8', 'max:255'],
            'locality'    => ['required', 'max:255'],
            'age'         => ['nullable', 'integer'],
            'first_name'  => ['nullable', 'max:255'],
            'last_name'   => ['nullable', 'max:255'],
            'description' => ['nullable'],
        ];
    }
}
