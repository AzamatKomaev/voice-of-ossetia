<?php

return [
    'required' => 'Поле :attribute не может быть пустым.',
    'email' => 'В данное поле следует вписать валидный почтовый адрес.',
    'image' => 'Поле :attribute должно быть изображением.',
    'integer' => 'Поле :attribute должно быть числом.',
    'min' => [
        'numeric' => 'Поле :attribute должно содержать больше :min цифр.',
        'file' => 'The :attribute must be at least :min kilobytes.',
        'string' => 'Поле :attribute должно содержать больше :min символов.',
        'array' => 'The :attribute must have at least :min items.',
    ],
];
