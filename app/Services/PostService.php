<?php

namespace App\Services;

use App\Repositories\PostRepositoryInterface;

class PostService
{
    protected $posts;

    public function __construct(PostRepositoryInterface $posts)
    {
        $this->posts = $posts;
    }

    public function getAllPosts()
    {
        return $this->posts->all();
    }

    public function getPost($id)
    {
        return $this->posts->find($id);
    }

    public function createPost(array $data)
    {
        return $this->posts->create($data);
    }

    public function updatePost($id, array $data)
    {
        return $this->posts->update($id, $data);
    }

    public function deletePost($id)
    {
        return $this->posts->delete($id);
    }
}
