import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
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

            {/* Logo and Nav */}
            <div className="flex items-center gap-2 mb-8 mt-8">
                <span className="text-3xl font-extrabold text-blue-400 animate-pulse">
                    &#128218;
                </span>
                <span className="text-2xl font-bold text-white tracking-tight">
                    ModernBlog<span className="text-purple-400">Articles</span>
                </span>
            </div>

            {/* Animated Heading */}
            <h1 className="text-5xl md:text-6xl font-extrabold text-white text-center mb-4 animate-fadeInUp">
                Where Ideas{" "}
                <span className="text-purple-400">Come to Life</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-200 text-center mb-8 max-w-2xl animate-fadeInUp delay-100">
                Discover insightful articles, connect with passionate writers,
                and join a community of learners exploring the latest in
                technology, design, and innovation.
            </p>
            <div className="flex space-x-4 mb-12 animate-fadeInUp delay-200">
                <Link
                    to="/login"
                    className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full font-semibold shadow-lg hover:scale-105 hover:from-purple-500 hover:to-blue-500 transition-transform duration-300"
                >
                    Sign In
                </Link>
                <Link
                    to="/register"
                    className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-semibold shadow-lg hover:scale-105 hover:from-pink-500 hover:to-purple-500 transition-transform duration-300"
                >
                    Get Started
                </Link>
            </div>

            {/* Stats Section */}
            <div className="flex flex-wrap justify-center gap-8 mb-16 animate-fadeInUp delay-300">
                <div className="bg-white/10 rounded-xl px-8 py-6 text-center text-white shadow-lg">
                    <div className="text-2xl font-bold mb-1">500+</div>
                    <div className="text-sm uppercase tracking-wider">
                        Articles
                    </div>
                </div>
                <div className="bg-white/10 rounded-xl px-8 py-6 text-center text-white shadow-lg">
                    <div className="text-2xl font-bold mb-1">50+</div>
                    <div className="text-sm uppercase tracking-wider">
                        Writers
                    </div>
                </div>
                <div className="bg-white/10 rounded-xl px-8 py-6 text-center text-white shadow-lg">
                    <div className="text-2xl font-bold mb-1">10K+</div>
                    <div className="text-sm uppercase tracking-wider">
                        Comments
                    </div>
                </div>
                <div className="bg-white/10 rounded-xl px-8 py-6 text-center text-white shadow-lg">
                    <div className="text-2xl font-bold mb-1">100K+</div>
                    <div className="text-sm uppercase tracking-wider">
                        Monthly Readers
                    </div>
                </div>
            </div>

            {/* Featured Section Placeholder */}
            <div className="w-full max-w-3xl mx-auto animate-fadeInUp delay-400">
                <h2 className="text-2xl font-bold text-white mb-4">
                    Featured Articles
                </h2>
                <div className="bg-white/10 rounded-lg p-8 text-white text-center">
                    <span className="italic">
                        Coming soon: hand-picked articles from our top writers!
                    </span>
                </div>
            </div>

            {/* Custom Animations */}
            <style>{`
                @keyframes fadeInUp {
                    0% { opacity: 0; transform: translateY(40px); }
                    100% { opacity: 1; transform: translateY(0); }
                }
                .animate-fadeInUp { animation: fadeInUp 1s cubic-bezier(.4,0,.2,1) both; }
                .animate-fadeInUp.delay-100 { animation-delay: .1s; }
                .animate-fadeInUp.delay-200 { animation-delay: .2s; }
                .animate-fadeInUp.delay-300 { animation-delay: .3s; }
                .animate-fadeInUp.delay-400 { animation-delay: .4s; }
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

export default Home;
