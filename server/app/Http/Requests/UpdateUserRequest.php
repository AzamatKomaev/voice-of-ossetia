<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateUserRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'first_name'  => ['nullable', 'max:255'],
            'last_name'   => ['nullable', 'max:255'],
            'description' => ['nullable'],
            'locality'    => ['nullable', 'max:255'],
            'age'         => ['nullable', 'integer'],
            'avatar'      => ['nullable', 'image:jpeg,jpg,png']
        ];
    }
}
