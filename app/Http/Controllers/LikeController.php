<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Like;
use App\Models\Post;

class LikeController extends Controller
{
    public function like($postId)
    {
        $userId = Auth::id();
        if (Like::where('user_id', $userId)->where('post_id', $postId)->exists()) {
            return response()->json(['message' => 'Already liked'], 409);
        }
        Like::create([
            'user_id' => $userId,
            'post_id' => $postId,
        ]);
        // Optionally increment the likes count on posts table for fast sorting
        Post::where('id', $postId)->increment('likes');
        return response()->json(['message' => 'Liked']);
    }

    public function unlike($postId)
    {
        $userId = Auth::id();
        $like = Like::where('user_id', $userId)->where('post_id', $postId)->first();
        if ($like) {
            $like->delete();
            Post::where('id', $postId)->decrement('likes');
            return response()->json(['message' => 'Unliked']);
        }
        return response()->json(['message' => 'Not liked'], 404);
    }

    public function hasLiked($postId)
    {
        $userId = Auth::id();
        $liked = Like::where('user_id', $userId)->where('post_id', $postId)->exists();
        return response()->json(['liked' => $liked]);
    }
}
