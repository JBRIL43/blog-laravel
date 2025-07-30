import React, { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setPosts } from "../features/postsSlice";

const categories = [
    "Technology",
    "React",
    "Design",
    "TypeScript",
    "Backend",
    "CSS",
];

const NewPost = () => {
    const [title, setTitle] = useState("");
    const [excerpt, setExcerpt] = useState("");
    const [body, setBody] = useState("");
    const [category, setCategory] = useState("");
    const [tags, setTags] = useState([]);
    const [tagInput, setTagInput] = useState("");
    const [coverImage, setCoverImage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleAddTag = () => {
        if (tagInput && !tags.includes(tagInput)) {
            setTags([...tags, tagInput]);
            setTagInput("");
        }
    };

    const handleRemoveTag = (tag) => {
        setTags(tags.filter((t) => t !== tag));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            const token = localStorage.getItem("token");
            await api.post(
                "/posts",
                { title, body, category, excerpt, tags, coverImage },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            const postsRes = await api.get("/posts", {
                headers: { Authorization: `Bearer ${token}` },
            });
            dispatch(setPosts(postsRes.data));
            navigate("/posts");
        } catch (err) {
            setError(err.response?.data?.error || "Failed to create post");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-gray-900 px-4 py-10 flex justify-center">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-8 animate-fadeInUp"
            >
                {/* Article Content */}
                <div className="md:col-span-2 bg-white/10 rounded-2xl shadow-xl p-8 flex flex-col gap-6">
                    <h2 className="text-3xl font-bold text-white mb-2">
                        Create New Article
                    </h2>
                    <p className="text-gray-300 mb-4">
                        Share your knowledge and insights with the community
                    </p>
                    <div>
                        <label className="block text-white mb-2 font-semibold">
                            Title
                        </label>
                        <input
                            type="text"
                            placeholder="Enter your article title..."
                            className="w-full px-4 py-2 rounded-lg bg-white/20 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-white mb-2 font-semibold">
                            Excerpt
                        </label>
                        <textarea
                            placeholder="Write a brief description of your article..."
                            className="w-full px-4 py-2 rounded-lg bg-white/20 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 min-h-[60px]"
                            value={excerpt}
                            onChange={(e) => setExcerpt(e.target.value)}
                        />
                    </div>
                    {/* Markdown toolbar placeholder */}
                    <div className="flex gap-2 mb-2">
                        <button
                            type="button"
                            className="bg-white/10 text-white px-2 py-1 rounded hover:bg-white/20"
                            title="Bold"
                        >
                            <b>B</b>
                        </button>
                        <button
                            type="button"
                            className="bg-white/10 text-white px-2 py-1 rounded hover:bg-white/20"
                            title="Italic"
                        >
                            <i>I</i>
                        </button>
                        <button
                            type="button"
                            className="bg-white/10 text-white px-2 py-1 rounded hover:bg-white/20"
                            title="List"
                        >
                            • List
                        </button>
                        <button
                            type="button"
                            className="bg-white/10 text-white px-2 py-1 rounded hover:bg-white/20"
                            title="Code"
                        >{`</>`}</button>
                        <button
                            type="button"
                            className="bg-white/10 text-white px-2 py-1 rounded hover:bg-white/20"
                            title="Link"
                        >
                            🔗
                        </button>
                    </div>
                    <div>
                        <label className="block text-white mb-2 font-semibold">
                            Content
                        </label>
                        <textarea
                            placeholder="Write your article content here... You can use Markdown formatting."
                            className="w-full px-4 py-2 rounded-lg bg-white/20 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 min-h-[180px]"
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                            required
                        />
                        <div className="text-xs text-gray-400 mt-1">
                            Supports Markdown formatting. Use <b>**bold**</b>,{" "}
                            <i>*italic*</i>, <code>[links](url)</code>, etc.
                        </div>
                    </div>
                </div>

                {/* Publish Settings */}
                <div className="flex flex-col gap-6">
                    <div className="bg-white/10 rounded-2xl shadow-xl p-6">
                        <h3 className="text-lg font-semibold text-white mb-4">
                            Publish Settings
                        </h3>
                        <div className="mb-4">
                            <label className="block text-white mb-2">
                                Category
                            </label>
                            <select
                                className="w-full px-4 py-2 rounded-lg bg-white/20 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                required
                            >
                                <option value="">Select a category</option>
                                {categories.map((cat) => (
                                    <option key={cat} value={cat}>
                                        {cat}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="block text-white mb-2">
                                Tags
                            </label>
                            <div className="flex gap-2 mb-2">
                                <input
                                    type="text"
                                    placeholder="Add a tag"
                                    className="flex-1 px-3 py-2 rounded bg-white/20 text-white focus:outline-none"
                                    value={tagInput}
                                    onChange={(e) =>
                                        setTagInput(e.target.value)
                                    }
                                    onKeyDown={(e) =>
                                        e.key === "Enter"
                                            ? (e.preventDefault(),
                                              handleAddTag())
                                            : null
                                    }
                                />
                                <button
                                    type="button"
                                    className="bg-blue-500 text-white px-3 rounded hover:bg-blue-600"
                                    onClick={handleAddTag}
                                >
                                    Add
                                </button>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="bg-indigo-200 text-indigo-800 px-2 py-1 rounded-full text-xs flex items-center"
                                    >
                                        {tag}
                                        <button
                                            type="button"
                                            className="ml-1 text-indigo-600 hover:text-red-500"
                                            onClick={() => handleRemoveTag(tag)}
                                        >
                                            ×
                                        </button>
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="block text-white mb-2">
                                Cover Image URL
                            </label>
                            <input
                                type="url"
                                placeholder="https://example.com/image"
                                className="w-full px-3 py-2 rounded bg-white/20 text-white focus:outline-none"
                                value={coverImage}
                                onChange={(e) => setCoverImage(e.target.value)}
                            />
                            {/* Optional: Add image upload button here */}
                            <button
                                type="button"
                                className="mt-2 w-full bg-white/10 text-white py-2 rounded hover:bg-white/20"
                            >
                                Upload Image
                            </button>
                        </div>
                        <div className="flex gap-2 mt-6">
                            <button
                                type="button"
                                className="flex-1 py-2 bg-white/20 text-white rounded font-semibold hover:bg-white/30"
                                disabled={loading}
                            >
                                Save as Draft
                            </button>
                            <button
                                type="submit"
                                className="flex-1 py-2 bg-gradient-to-r from-indigo-500 to-pink-500 text-white rounded font-semibold shadow-lg hover:from-indigo-600 hover:to-pink-600 transition-colors disabled:opacity-60"
                                disabled={loading}
                            >
                                {loading ? "Publishing..." : "Publish Article"}
                            </button>
                        </div>
                    </div>
                    {/* Writing Tips */}
                    <div className="bg-white/10 rounded-2xl shadow-xl p-6">
                        <h3 className="text-lg font-semibold text-white mb-4">
                            Writing Tips
                        </h3>
                        <div className="text-sm text-gray-300 mb-2">
                            <b>Great titles are:</b>
                            <ul className="list-disc ml-5">
                                <li>Clear and descriptive</li>
                                <li>Between 6-13 words</li>
                                <li>Include relevant keywords</li>
                            </ul>
                        </div>
                        <div className="text-sm text-gray-300">
                            <b>Engaging content:</b>
                            <ul className="list-disc ml-5">
                                <li>Start with a hook</li>
                                <li>Use subheadings</li>
                                <li>Include examples</li>
                                <li>End with a call-to-action</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </form>
            <style>{`
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(40px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInUp { animation: fadeInUp 1s cubic-bezier(.4,0,.2,1) both; }
      `}</style>
        </div>
    );
};

export default NewPost;
