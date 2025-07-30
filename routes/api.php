<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\CommentController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Public: anyone can view posts
Route::apiResource('posts', PostController::class)->only(['index', 'show']);

// Protected: only authenticated users can create/update/delete posts or add comments
Route::middleware('auth:api')->group(function () {
    Route::apiResource('posts', PostController::class)->except(['index', 'show']);
    Route::post('posts/{post}/comments', [CommentController::class, 'store']);
    Route::post('posts/{post}/increment-views', [PostController::class, 'incrementViews']);
    Route::post('posts/{post}/like', [App\Http\Controllers\LikeController::class, 'like']);
    Route::post('posts/{post}/unlike', [App\Http\Controllers\LikeController::class, 'unlike']);
    Route::get('posts/{post}/has-liked', [App\Http\Controllers\LikeController::class, 'hasLiked']);
});
