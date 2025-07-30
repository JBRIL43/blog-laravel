import React, { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api";
import { useSelector, useDispatch } from "react-redux";
import { setComments, setLoading, setError } from "../features/commentsSlice";

const PostDetails = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [commentInput, setCommentInput] = useState("");
    const [commentLoading, setCommentLoading] = useState(false);
    const { comments, loading, error } = useSelector((state) => state.comments);
    const dispatch = useDispatch();
    const { token, user } = useSelector((state) => state.auth);
    const incrementedRef = useRef(false);

    // Increment view count on mount and fetch post/comments
    useEffect(() => {
        const fetchPostAndComments = async () => {
            if (incrementedRef.current) return; // Prevent double increment
            incrementedRef.current = true;
            dispatch(setLoading(true));
            try {
                // Increment views (publicly)
                await api.post(
                    `/posts/${id}/increment-views`,
                    {},
                    token
                        ? { headers: { Authorization: `Bearer ${token}` } }
                        : undefined
                );
                const res = await api.get(`/posts/${id}`);
                setPost(res.data);
                dispatch(setComments(res.data.comments || []));
            } catch (error) {
                dispatch(setError("Failed to load post details"));
            } finally {
                dispatch(setLoading(false));
            }
        };
        fetchPostAndComments();
    }, [id, dispatch, token]);

    // Like handler
    const handleLike = async () => {
        try {
            await api.post(
                `/posts/${id}/increment-likes`,
                {},
                token
                    ? { headers: { Authorization: `Bearer ${token}` } }
                    : undefined
            );
            const res = await api.get(`/posts/${id}`);
            setPost(res.data);
        } catch {}
    };

    // Add comment handler
    const handleAddComment = async (e) => {
        e.preventDefault();
        if (!commentInput.trim()) return;
        setCommentLoading(true);
        try {
            await api.post(
                `/posts/${id}/comments`,
                { body: commentInput },
                {
                    headers: {
                        Authorization: `Bearer ${
                            token || localStorage.getItem("token")
                        }`,
                    },
                }
            );
            const res = await api.get(`/posts/${id}`);
            setPost(res.data);
            dispatch(setComments(res.data.comments || []));
            setCommentInput("");
        } catch {
        } finally {
            setCommentLoading(false);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="text-red-500 mb-4">{error}</div>;
    if (!post) return null;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-gray-900 px-2 py-8 flex justify-center">
            <div className="w-full max-w-2xl mx-auto">
                {/* Breadcrumb */}
                <div className="mb-4">
                    <Link
                        to="/posts"
                        className="text-indigo-300 hover:underline text-xs font-semibold"
                    >
                        ← Back to Articles
                    </Link>
                </div>
                {/* Title & Meta */}
                <div className="mb-2 flex items-center gap-2">
                    <span className="bg-indigo-100 text-indigo-800 text-xs font-semibold px-3 py-1 rounded-full">
                        {post.category || "General"}
                    </span>
                </div>
                <h1 className="text-2xl md:text-3xl font-extrabold text-white mb-2">
                    {post.title}
                </h1>
                <p className="text-gray-300 mb-2">{post.excerpt}</p>
                <div className="flex items-center gap-4 mb-4 text-xs text-gray-400">
                    <span className="flex items-center gap-1">
                        <svg
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <circle cx="12" cy="12" r="10" />
                        </svg>
                        {post.user?.name || post.author || "Unknown"}
                    </span>
                    <span>
                        {post.createdAt
                            ? new Date(post.createdAt).toLocaleDateString()
                            : post.created_at
                            ? new Date(post.created_at).toLocaleDateString()
                            : ""}
                    </span>
                    <span>{post.readTime || "5 min read"}</span>
                    <span>{post.views || 0} views</span>
                    <span>{post.likes || 0} likes</span>
                </div>
                {/* Like & Share */}
                <div className="flex items-center gap-3 mb-4">
                    <button
                        onClick={handleLike}
                        className="flex items-center gap-1 text-pink-400 hover:text-pink-600 font-semibold focus:outline-none"
                    >
                        <svg
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M14 10h4.764a2 2 0 011.789 2.894l-3.764 7.528A2 2 0 0115 22H9a2 2 0 01-1.789-1.106l-3.764-7.528A2 2 0 014.236 10H9m5 0V5a3 3 0 00-6 0v5m6 0H9"
                            />
                        </svg>
                        {post.likes || 0} Like
                        {(post.likes || 0) !== 1 ? "s" : ""}
                    </button>
                    {/* Add share button if needed */}
                </div>
                {/* Cover Image */}
                <div className="mb-8 flex justify-center">
                    {post.coverImage ? (
                        <img
                            src={post.coverImage}
                            alt="cover"
                            className="rounded-xl w-full max-w-md object-cover bg-white/10"
                            style={{ minHeight: 180, maxHeight: 240 }}
                        />
                    ) : (
                        <div className="w-full max-w-md h-40 bg-white/10 rounded-xl flex items-center justify-center">
                            <svg
                                className="w-16 h-16 text-indigo-200 opacity-50"
                                fill="none"
                                viewBox="0 0 48 48"
                            >
                                <rect
                                    width="48"
                                    height="48"
                                    rx="24"
                                    fill="currentColor"
                                />
                                <path
                                    d="M16 32l8-8 8 8"
                                    stroke="#fff"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <circle
                                    cx="24"
                                    cy="20"
                                    r="4"
                                    stroke="#fff"
                                    strokeWidth="2"
                                />
                            </svg>
                        </div>
                    )}
                </div>
                {/* Article Content */}
                <div className="prose prose-invert max-w-none text-lg text-gray-100 mb-8">
                    {/* If using markdown, render here */}
                    {post.body}
                </div>
                {/* About Author */}
                <div className="bg-white/10 rounded-xl p-4 mb-8 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-indigo-400/40 to-blue-200/20 flex items-center justify-center text-indigo-400 font-bold shadow text-lg">
                        {post.user?.name?.[0] || post.author?.[0] || "?"}
                    </div>
                    <div>
                        <div className="font-semibold text-white">
                            {post.user?.name || post.author || "Unknown"}
                        </div>
                        <div className="text-xs text-gray-300">
                            {post.user?.bio || "No bio provided."}
                        </div>
                    </div>
                </div>
                {/* Comments */}
                <div className="mt-8">
                    <h2 className="text-xl font-semibold text-white mb-4">
                        Comments ({comments.length})
                    </h2>
                    {/* Comment input */}
                    {token ? (
                        <form
                            onSubmit={handleAddComment}
                            className="flex items-center gap-2 mb-6"
                        >
                            <input
                                type="text"
                                className="flex-1 px-4 py-2 rounded-lg bg-white/20 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                placeholder="Share your thoughts..."
                                value={commentInput}
                                onChange={(e) =>
                                    setCommentInput(e.target.value)
                                }
                                disabled={commentLoading}
                            />
                            <button
                                type="submit"
                                className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors disabled:opacity-60"
                                disabled={
                                    commentLoading || !commentInput.trim()
                                }
                            >
                                {commentLoading ? "Posting..." : "Post Comment"}
                            </button>
                        </form>
                    ) : (
                        <div className="mb-6 text-gray-300">
                            <span className="italic">
                                Log in to add a comment.
                            </span>
                        </div>
                    )}
                    {/* Comment list */}
                    <ul className="space-y-3">
                        {comments.length === 0 && (
                            <li className="text-gray-400 italic">
                                No comments yet. Be the first to comment!
                            </li>
                        )}
                        {[...comments]
                            .sort(
                                (a, b) =>
                                    new Date(a.created_at) -
                                    new Date(b.created_at)
                            ) // chronological order (oldest first)
                            .map((comment) => (
                                <li
                                    key={comment.id}
                                    className="bg-white/10 border border-indigo-400/10 rounded-xl px-4 py-3 text-gray-200 flex items-start gap-3"
                                >
                                    <span className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-400/40 to-blue-200/20 flex items-center justify-center text-indigo-400 font-bold shadow text-sm mt-1">
                                        {comment.user?.name?.[0] || "?"}
                                    </span>
                                    <div>
                                        <div className="font-semibold text-white text-sm">
                                            {comment.user?.name || "Anonymous"}
                                            <span className="ml-2 text-xs text-gray-400">
                                                {comment.created_at
                                                    ? new Date(
                                                          comment.created_at
                                                      ).toLocaleDateString()
                                                    : ""}
                                            </span>
                                        </div>
                                        <div className="text-gray-200">
                                            {comment.body}
                                        </div>
                                    </div>
                                </li>
                            ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default PostDetails;
