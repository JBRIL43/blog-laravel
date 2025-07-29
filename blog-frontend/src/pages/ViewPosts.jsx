import React, { useEffect, useState } from "react";
import api from "../services/api";
import { Link, useNavigate } from "react-router-dom";

const ViewPosts = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
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
            } catch (err) {
                setError("Failed to load posts");
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, [navigate]);

    return (
        <div className="max-w-2xl mx-auto py-8">
            <h1 className="text-3xl font-bold mb-6">All Posts</h1>
            {loading && <div>Loading...</div>}
            {error && <div className="text-red-500 mb-4">{error}</div>}
            <ul>
                {posts.map((post) => (
                    <li
                        key={post.id}
                        className="mb-4 p-4 border rounded shadow"
                    >
                        <Link
                            to={`/posts/${post.id}`}
                            className="text-xl font-semibold text-blue-600 hover:underline"
                        >
                            {post.title}
                        </Link>
                        <div className="text-gray-600 mt-2">
                            {post.body?.slice(0, 100)}...
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ViewPosts;
