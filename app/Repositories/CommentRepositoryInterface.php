<?php

namespace App\Repositories;

interface CommentRepositoryInterface
{
    public function createForPost($postId, array $data);
    public function getByPost($postId);
}