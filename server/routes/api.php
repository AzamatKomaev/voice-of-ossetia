<?php

use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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

Route::get('media/', [\App\Http\Controllers\MediaController::class, 'get'])->middleware('cors');

Route::prefix('auth')->group(function () {
    Route::middleware('auth:sanctum')
        ->get('/me', [AuthController::class, 'getMe'])
        ->name('auth.me');
    Route::middleware('auth:sanctum')
        ->delete('/logout', [AuthController::class, 'logout'])
        ->name('auth.logout');
    Route::middleware('auth:sanctum')
        ->patch('/update', [AuthController::class, 'update'])
        ->name('auth.update');

    Route::delete('/activate/{uuid}', [AuthController::class, 'activate_user'])->name('auth.activate');
    Route::post('/create', [AuthController::class, 'create'])->name('auth.create');
    Route::post('/login', [AuthController::class, 'login'])->name('auth.login');
});

Route::apiResource('categories', \App\Http\Controllers\CategoryController::class, [
    'index' => 'categories.index',
    'show'  => 'categories.show',
    'store' => 'categories.store'
]);
Route::apiResource('posts', \App\Http\Controllers\PostController::class, [
    'index'   => 'posts.index',
    'show'    => 'posts.show',
    'store'   => 'posts.store',
    'destroy' => 'posts.destroy'
]);
Route::apiResource('comments', \App\Http\Controllers\CommentController::class, [
    'index'   => 'comments.index',
    'show'    => 'comments.show',
    'store'   => 'comments.store',
    'destroy' => 'comments.destroy'
]);
Route::apiResource('notifications', \App\Http\Controllers\NotificationController::class, [
    'index'   => 'notifications.index',
    'show'    => 'notifications.show',
    'store'   => 'notifications.store',
    'destroy' => 'notifications.destroy'
]);
Route::apiResource('users', \App\Http\Controllers\UserController::class, [
    'index'   => 'users.index',
    'show'    => 'users.show'
]);
Route::apiResource('subscriptions', \App\Http\Controllers\SubscriptionController::class);
