import React, { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToken } from "../features/authSlice";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            const res = await api.post("/login", { email, password });
            localStorage.setItem("token", res.data.token);
            dispatch(setToken(res.data.token));
            navigate("/posts");
        } catch (err) {
            setError(err.response?.data?.error || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-900 via-purple-900 to-gray-900 overflow-hidden">
            {/* Animated background blobs */}
            <div className="absolute top-0 left-0 w-full h-full -z-10">
                <div
                    className="absolute w-96 h-96 bg-purple-600 opacity-30 rounded-full mix-blend-multiply filter blur-3xl animate-blob1"
                    style={{ top: "-6rem", left: "-6rem" }}
                />
                <div
                    className="absolute w-96 h-96 bg-blue-500 opacity-30 rounded-full mix-blend-multiply filter blur-3xl animate-blob2"
                    style={{ top: "10rem", right: "-6rem" }}
                />
                <div
                    className="absolute w-96 h-96 bg-pink-500 opacity-30 rounded-full mix-blend-multiply filter blur-3xl animate-blob3"
                    style={{ bottom: "-6rem", left: "20%" }}
                />
            </div>

            <div className="flex items-center gap-2 mb-8 mt-8">
                <span className="text-3xl font-extrabold text-blue-400 animate-pulse">
                    &#128218;
                </span>
                <span className="text-2xl font-bold text-white tracking-tight">
                    ModernBlog<span className="text-purple-400">Articles</span>
                </span>
            </div>

            <form
                onSubmit={handleSubmit}
                className="bg-white/10 p-8 rounded-xl shadow-lg w-full max-w-sm backdrop-blur-md animate-fadeInUp"
            >
                <h2 className="text-2xl font-bold mb-6 text-white">Sign In</h2>
                {error && (
                    <div className="mb-4 text-red-400 font-semibold">
                        {error}
                    </div>
                )}
                <input
                    type="email"
                    placeholder="Email"
                    className="w-full mb-4 p-2 border border-blue-300 rounded bg-white/80 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="w-full mb-4 p-2 border border-blue-300 rounded bg-white/80 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 rounded-full font-semibold shadow-lg hover:scale-105 transition-transform duration-300"
                    disabled={loading}
                >
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>

            {/* Custom Animations */}
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

export default Login;
