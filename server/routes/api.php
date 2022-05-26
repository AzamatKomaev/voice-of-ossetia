<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::prefix('auth')->group(function () {
    Route::middleware('auth:sanctum')->get('/me', [AuthController::class, 'getMe']);
    Route::middleware('auth:sanctum')->delete('/logout', [AuthController::class, 'logout']);
    Route::post('/create', [AuthController::class, 'create']);
    Route::post('/login', [AuthController::class, 'login']);
});

Route::apiResource('categories', \App\Http\Controllers\CategoryController::class);
Route::apiResource('posts', \App\Http\Controllers\PostController::class);
