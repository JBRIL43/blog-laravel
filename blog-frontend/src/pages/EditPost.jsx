import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import api from "../services/api";

const EditPost = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { token } = useSelector((state) => state.auth);
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [category, setCategory] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchPost = async () => {
            setLoading(true);
            try {
                const res = await api.get(`/posts/${id}`);
                setTitle(res.data.title);
                setBody(res.data.body);
                setCategory(res.data.category || "");
            } catch {
                setError("Failed to load post");
            } finally {
                setLoading(false);
            }
        };
        fetchPost();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            await api.put(
                `/posts/${id}`,
                { title, body, category },
                {
                    headers: {
                        Authorization: `Bearer ${
                            token || localStorage.getItem("token")
                        }`,
                    },
                }
            );
            navigate("/posts");
        } catch {
            setError("Failed to update post");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 to-blue-900">
            <form
                onSubmit={handleSubmit}
                className="bg-white/10 p-10 rounded-3xl shadow-2xl w-full max-w-lg animate-fadeInUp"
            >
                <h2 className="text-3xl font-bold text-white mb-8 text-center">
                    Edit Post
                </h2>
                {error && <div className="text-red-400 mb-4">{error}</div>}
                <div className="mb-6">
                    <label className="block text-white mb-2">Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-4 py-2 rounded-lg bg-white/20 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        required
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-white mb-2">Category</label>
                    <input
                        type="text"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full px-4 py-2 rounded-lg bg-white/20 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    />
                </div>
                <div className="mb-8">
                    <label className="block text-white mb-2">Body</label>
                    <textarea
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        className="w-full px-4 py-2 rounded-lg bg-white/20 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 min-h-[120px]"
                        required
                    />
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-indigo-600 text-white rounded-full font-semibold shadow-lg hover:bg-indigo-700 transition-colors disabled:opacity-60"
                >
                    {loading ? "Updating..." : "Update Post"}
                </button>
            </form>
        </div>
    );
};

export default EditPost;
