<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Services\PostService;
use App\Models\Post;

class PostController extends Controller
{
    protected $postService;

    public function __construct(PostService $postService)
    {
        $this->postService = $postService;
    }

    // Query (Read)
    public function index()
    {
        return $this->postService->getAllPosts();
    }

    // Query (Read)
    public function show($id)
    {
        return Post::with(['comments.user'])->findOrFail($id);
    }

    // Command (Write)
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'body' => 'required|string',
            'category' => 'nullable|string|max:255',
        ]);

        return $this->postService->createPost([
            'title' => $request->title,
            'body' => $request->body,
            'user_id' => Auth::id(),
            'category' => $request->category,
        ]);
    }

    // Command (Write)
    public function update(Request $request, $id)
    {
        $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'body' => 'sometimes|required|string',
        ]);

        return $this->postService->updatePost($id, $request->only(['title', 'body']));
    }

    // Command (Write)
    public function destroy($id)
    {
        $this->postService->deletePost($id);
        return response()->json(['message' => 'Post deleted']);
    }

    // Command: Increment views
    public function incrementViews($id)
    {
        $post = $this->postService->incrementViews($id);
        return response()->json($post);
    }

    // Command: Increment likes
    public function incrementLikes($id)
    {
        $post = $this->postService->incrementLikes($id);
        return response()->json($post);
    }
}
