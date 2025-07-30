import React, { useEffect, useState } from "react";
import api from "../services/api";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";

const ViewPosts = () => {

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [likedPosts, setLikedPosts] = useState({});
    const [likeLoading, setLikeLoading] = useState({});
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");
    const [sort, setSort] = useState("latest");
    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    const categories = [
        "All",
        "Technology",
        "React",
        "Design",
        "TypeScript",
        "Backend",
        "CSS",
    ];
    const sortOptions = [
        { label: "Latest", value: "latest" },
        { label: "Most Viewed", value: "views" },
        { label: "Most Liked", value: "likes" },
    ];

    // Filtering and sorting logic
    const filteredPosts = posts
        .filter((post) => {
            const matchesSearch =
                post.title.toLowerCase().includes(search.toLowerCase()) ||
                post.body.toLowerCase().includes(search.toLowerCase()) ||
                post.user?.name?.toLowerCase().includes(search.toLowerCase());
            const matchesCategory =
                category === "All" || post.category === category;
            return matchesSearch && matchesCategory;
        })
        .sort((a, b) => {
            if (sort === "latest") {
                return new Date(b.created_at) - new Date(a.created_at);
            }
            if (sort === "views") {
                return (b.views || 0) - (a.views || 0);
            }
            if (sort === "likes") {
                return (b.likes || 0) - (a.likes || 0);
            }
            return 0;
        });

    useEffect(() => {
        if (!token) {
            navigate("/login");
            return;
        }
        const fetchPosts = async () => {
            try {
                const res = await api.get("/posts", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setPosts(res.data);

                // Check which posts are liked by the user
                const likedState = {};
                await Promise.all(
                    res.data.map(async (post) => {
                        try {
                            const likedRes = await api.get(
                                `/posts/${post.id}/has-liked`,
                                {
                                    headers: {
                                        Authorization: `Bearer ${token}`,
                                    },
                                }
                            );
                            likedState[post.id] = likedRes.data.liked;
                        } catch {
                            likedState[post.id] = false;
                        }
                    })
                );
                setLikedPosts(likedState);
            } catch (err) {
                setError("Failed to load posts");
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, [navigate, token]);

    const handleLikeToggle = async (postId) => {
        setLikeLoading((prev) => ({ ...prev, [postId]: true }));
        try {
            // Toggle like: if already liked, unlike; else like
            if (likedPosts[postId]) {
                await api.post(
                    `/posts/${postId}/unlike`,
                    {},
                    { headers: { Authorization: `Bearer ${token}` } }
                );
            } else {
                await api.post(
                    `/posts/${postId}/like`,
                    {},
                    { headers: { Authorization: `Bearer ${token}` } }
                );
            }
            // Refresh posts and liked state
            const res = await api.get("/posts", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setPosts(res.data);

            // Refresh liked state for this post
            const likedRes = await api.get(`/posts/${postId}/has-liked`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setLikedPosts((prev) => ({
                ...prev,
                [postId]: likedRes.data.liked,
            }));
        } catch (err) {
            // Optionally show error
        } finally {
            setLikeLoading((prev) => ({ ...prev, [postId]: false }));
        }
    };

    if (loading)
        return <div className="text-center text-white py-10">Loading...</div>;
    if (error) return <div className="text-red-500 mb-4">{error}</div>;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-gray-900 px-4 py-12">
            <div className="max-w-7xl mx-auto">
                
                {/* Modern Search & Filter Bar */}
                <div className="flex flex-col md:flex-row items-center gap-4 mb-8">
                    <div className="flex-1 flex items-center bg-white/5 rounded-lg px-4 py-2">
                        <svg
                            className="w-5 h-5 text-gray-400 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
                            />
                        </svg>
                        <input
                            type="text"
                            placeholder="Search articles, tags, or authors..."
                            className="bg-transparent outline-none text-white w-full"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <select
                        className="bg-white/5 text-white rounded-lg px-4 py-2 focus:outline-none"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        {categories.map((cat) => (
                            <option key={cat} value={cat}>
                                {cat}
                            </option>
                        ))}
                    </select>
                    <select
                        className="bg-white/5 text-white rounded-lg px-4 py-2 focus:outline-none"
                        value={sort}
                        onChange={(e) => setSort(e.target.value)}
                    >
                        {sortOptions.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                                {opt.label}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-3xl font-extrabold text-white">
                        All Articles{" "}
                        <span className="text-indigo-300 text-lg font-normal">
                            ({filteredPosts.length} articles)
                        </span>
                    </h2>
                    <button
                        onClick={() => navigate("/new")}
                        className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-semibold px-5 py-2 rounded-lg shadow-lg hover:from-indigo-600 hover:to-pink-600 transition-colors"
                    >
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 4v16m8-8H4"
                            />
                        </svg>
                        Add Article
                    </button>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredPosts.map((post) => (
                        <div
                            key={post.id}
                            className="bg-white/10 rounded-2xl shadow-xl border border-indigo-400/10 hover:scale-[1.02] transition-transform duration-200 flex flex-col overflow-hidden"
                        >
                            {/* Category badge and image placeholder */}
                            <div className="flex justify-between items-center p-4">
                                <span className="bg-indigo-100 text-indigo-800 text-xs font-semibold px-3 py-1 rounded-full">
                                    {post.category || "General"}
                                </span>
                            </div>
                            <div className="flex items-center justify-center bg-white/5 h-40">
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
                            {/* Title and excerpt */}
                            <div className="flex-1 flex flex-col px-6 pt-4 pb-2">
                                <Link to={`/posts/${post.id}`}>
                                    <h3 className="text-lg font-bold text-white mb-2 line-clamp-2">
                                        {post.title}
                                    </h3>
                                    <p className="text-gray-200 mb-4 line-clamp-2">
                                        {post.body?.slice(0, 120)}...
                                    </p>
                                </Link>
                            </div>
                            {/* Author, date, views, likes */}
                            <div className="flex items-center justify-between px-6 pb-4">
                                <div className="flex items-center gap-2">
                                    <span className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-400/40 to-blue-200/20 flex items-center justify-center text-indigo-400 font-bold shadow text-sm">
                                        {post.user?.name?.[0] || "?"}
                                    </span>
                                    <span className="text-gray-100 text-sm font-medium">
                                        {post.user?.name || "Unknown"}
                                    </span>
                                </div>
                                <div className="flex flex-col items-end gap-1">
                                    <span className="text-xs text-gray-400">
                                        {post.created_at
                                            ? new Date(
                                                  post.created_at
                                              ).toLocaleDateString()
                                            : ""}
                                    </span>
                                    <div className="flex items-center gap-3">
                                        <span className="flex items-center gap-1 text-indigo-200 text-xs">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-4 w-4"
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
                                            onClick={() =>
                                                handleLikeToggle(post.id)
                                            }
                                            disabled={likeLoading[post.id]}
                                            className={`flex items-center gap-1 text-xs font-semibold focus:outline-none transition-colors ${
                                                likedPosts[post.id]
                                                    ? "text-pink-400"
                                                    : "text-gray-300 hover:text-pink-400"
                                            }`}
                                            title={
                                                likedPosts[post.id]
                                                    ? "Unlike"
                                                    : "Like"
                                            }
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-4 w-4"
                                                fill={
                                                    likedPosts[post.id]
                                                        ? "currentColor"
                                                        : "none"
                                                }
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M11.049 2.927C11.343 2.362 11.925 2 12.5 2c1.378 0 2.5 1.122 2.5 2.5 0 .575-.227 1.096-.596 1.464L12 12l-2.404-5.036A2.493 2.493 0 0112.5 4.5c.575 0 1.096.227 1.464.596z"
                                                />
                                            </svg>
                                            {likeLoading[post.id]
                                                ? "..."
                                                : (post.likes || 0) +
                                                  " like" +
                                                  ((post.likes || 0) !== 1
                                                      ? "s"
                                                      : "")}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ViewPosts;
