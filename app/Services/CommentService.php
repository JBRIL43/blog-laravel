<?php

namespace App\Services;

use App\Repositories\CommentRepositoryInterface;

class CommentService
{
    protected $comments;

    public function __construct(CommentRepositoryInterface $comments)
    {
        $this->comments = $comments;
    }

    public function addCommentToPost($postId, array $data)
    {
        return $this->comments->createForPost($postId, $data);
    }

    public function getCommentsByPost($postId)
    {
        return $this->comments->getByPost($postId);
    }
}
