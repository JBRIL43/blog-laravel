<?php

namespace App\Repositories;

use App\Models\Comment;
use App\Models\Post;

class CommentRepository implements CommentRepositoryInterface
{
    public function createForPost($postId, array $data)
    {
        $post = Post::findOrFail($postId);
        return $post->comments()->create($data);
    }

    public function getByPost($postId)
    {
        $post = Post::findOrFail($postId);
        return $post->comments()->with('user')->get();
    }
}