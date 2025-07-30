<?php

namespace App\Repositories;


use App\Models\Post;

class PostRepository implements PostRepositoryInterface
{
    public function all()
    {
        return Post::with('user')->get();
    }

    public function find($id)
    {
        return Post::with('comments.user')->findOrFail($id);
    }

    public function create(array $data)
    {
        return Post::create($data);
    }

    public function update($id, array $data)
    {
        $post = Post::findOrFail($id);
        $post->update($data);
        return $post;
    }

    public function delete($id)
    {
        $post = Post::findOrFail($id);
        $post->delete();
        return true;
    }
    public function incrementViews($id)
    {
        $post = Post::findOrFail($id);
        $post->increment('views');
        return $post;
    }

    public function incrementLikes($id)
    {
        $post = Post::findOrFail($id);
        $post->increment('likes');
        return $post;
    }
}