<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Services\CommentService;

class CommentController extends Controller
{
    protected $commentService;

    public function __construct(CommentService $commentService)
    {
        $this->commentService = $commentService;
    }

    // Command (Write)
    public function store(Request $request, $postId)
    {
        $request->validate([
            'body' => 'required|string',
        ]);

        $comment = $this->commentService->addCommentToPost($postId, [
            'body' => $request->body,
            'user_id' => Auth::id(),
        ]);

        return response()->json($comment, 201);
    }

    // Query (Read)
    public function index($postId)
    {
        return $this->commentService->getCommentsByPost($postId);
    }
}
