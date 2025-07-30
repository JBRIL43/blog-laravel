import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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

    // Increment view count on mount
    useEffect(() => {
        const fetchPostAndComments = async () => {
            dispatch(setLoading(true));
            try {
                // Increment views
                await api.post(
                    `/posts/${id}/increment-views`,
                    {},
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
            } catch (error) {
                console.log(error);
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
                {
                    headers: {
                        Authorization: `Bearer ${
                            token || localStorage.getItem("token")
                        }`,
                    },
                }
            );
            // Refresh post data
            const res = await api.get(`/posts/${id}`);
            setPost(res.data);
        } catch {
            // Optionally show error
        }
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
            // Refresh comments
            const res = await api.get(`/posts/${id}`);
            setPost(res.data);
            dispatch(setComments(res.data.comments || []));
            setCommentInput("");
        } catch {
            // Optionally show error
        } finally {
            setCommentLoading(false);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="text-red-500 mb-4">{error}</div>;
    if (!post) return null;

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-900 to-gray-900 px-4 py-10 relative overflow-hidden">
            {/* Animated background blobs */}
            <div className="absolute top-0 left-0 w-full h-full -z-10 pointer-events-none">
                <div
                    className="absolute w-80 h-80 bg-indigo-500 opacity-20 rounded-full blur-3xl animate-blob1"
                    style={{ top: "-4rem", left: "-4rem" }}
                />
                <div
                    className="absolute w-80 h-80 bg-blue-400 opacity-20 rounded-full blur-3xl animate-blob2"
                    style={{ top: "8rem", right: "-4rem" }}
                />
                <div
                    className="absolute w-80 h-80 bg-pink-400 opacity-20 rounded-full blur-3xl animate-blob3"
                    style={{ bottom: "-4rem", left: "25%" }}
                />
            </div>
            <div className="w-full max-w-2xl bg-white/10 rounded-3xl shadow-2xl p-8 md:p-12 border-2 border-indigo-400/20 animate-fadeInUp">
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-indigo-400/40 to-blue-200/20 flex items-center justify-center text-2xl text-indigo-400 font-bold shadow-lg">
                        {post.user?.name?.[0] || post.author?.[0] || "?"}
                    </div>
                    <div className="flex flex-col">
                        <span className="font-semibold text-white text-lg">
                            {post.user?.name || post.author || "Unknown Author"}
                        </span>
                        <span className="text-xs text-gray-300">
                            {post.createdAt
                                ? new Date(post.createdAt).toLocaleDateString(
                                      undefined,
                                      {
                                          year: "numeric",
                                          month: "short",
                                          day: "numeric",
                                      }
                                  )
                                : post.created_at
                                ? new Date(post.created_at).toLocaleDateString(
                                      undefined,
                                      {
                                          year: "numeric",
                                          month: "short",
                                          day: "numeric",
                                      }
                                  )
                                : ""}
                        </span>
                    </div>
                    <span className="ml-auto bg-indigo-100 text-indigo-800 text-xs font-semibold px-3 py-1 rounded-full">
                        {post.category || "General"}
                    </span>
                </div>
                <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-4 drop-shadow-lg">
                    {post.title}
                </h1>
                <div className="flex items-center gap-6 mb-6">
                    <span className="flex items-center gap-1 text-indigo-200">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                            />
                        </svg>
                        {post.views || 0} views
                    </span>
                    <button
                        onClick={handleLike}
                        className="flex items-center gap-1 text-pink-400 hover:text-pink-600 font-semibold focus:outline-none"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
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
                </div>
                <div className="prose prose-invert max-w-none text-lg text-gray-100 mb-8">
                    {post.body}
                </div>
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
                        {comments.map((comment) => (
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
            <style>{`
                @keyframes fadeInUp {
                    0% { opacity: 0; transform: translateY(40px); }
                    100% { opacity: 1; transform: translateY(0); }
                }
                .animate-fadeInUp { animation: fadeInUp 1s cubic-bezier(.4,0,.2,1) both; }
                @keyframes blob1 {
                    0%, 100% { transform: scale(1) translate(0, 0); }
                    50% { transform: scale(1.1) translate(30px, 20px); }
                }
                @keyframes blob2 {
                    0%, 100% { transform: scale(1) translate(0, 0); }
                    50% { transform: scale(1.1) translate(-20px, 30px); }
                }
                @keyframes blob3 {
                    0%, 100% { transform: scale(1) translate(0, 0); }
                    50% { transform: scale(1.1) translate(20px, -20px); }
                }
                .animate-blob1 { animation: blob1 12s infinite ease-in-out; }
                .animate-blob2 { animation: blob2 14s infinite ease-in-out; }
                .animate-blob3 { animation: blob3 16s infinite ease-in-out; }
            `}</style>
        </div>
    );
};

export default PostDetails;
