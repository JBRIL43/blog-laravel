// Example: Header.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
    const { user } = useSelector((state) => state.auth);

    const handleLogout = () => {
        localStorage.removeItem("token");
        // Optionally: dispatch(logoutUser());
        window.location.replace("/login");
    };

    return (
        <header className="bg-[#181f2a] px-6 py-3 flex items-center justify-between shadow">
            <div className="flex items-center gap-8">
                <Link to="/" className="flex items-center gap-2">
                    <span className="bg-indigo-400/30 rounded-full p-2">
                        <svg
                            className="w-6 h-6 text-indigo-300"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 4v16m8-8H4"
                            />
                        </svg>
                    </span>
                    <span className="font-extrabold text-xl text-white">
                        <span className="text-indigo-400">Modern</span>Blog
                    </span>
                </Link>
            </div>
            <div className="flex items-center gap-4">
                <nav className="hidden md:flex gap-6 text-gray-200 font-medium text-sm">
                    <Link to="/posts" className="hover:text-indigo-400">
                        Articles
                    </Link>
                    <Link to="/categories" className="hover:text-indigo-400">
                        Categories
                    </Link>
                    <Link to="/authors" className="hover:text-indigo-400">
                        Authors
                    </Link>
                    <Link to="/about" className="hover:text-indigo-400">
                        About
                    </Link>
                </nav>
            </div>
            <div className="flex items-center gap-3">
                {/* Theme toggle placeholder */}
                {/* <button  className="ml-2 text-gray-400 hover:text-indigo-400">
                    <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 3v1m0 16v1m8.66-13.66l-.71.71M4.05 19.07l-.71.71M21 12h-1M4 12H3m16.66 5.66l-.71-.71M4.05 4.93l-.71-.71"
                        />
                    </svg>
                </button> */}
                {!localStorage.length ? (
                    <>
                        <Link
                            to="/login"
                            className="text-white px-4 py-1 rounded hover:bg-white/10 transition"
                        >
                            Sign In
                        </Link>
                        <Link
                            to="/register"
                            className="bg-gradient-to-r from-indigo-500 to-pink-500 text-white px-4 py-1 rounded-full font-semibold ml-2 shadow hover:from-indigo-600 hover:to-pink-600 transition"
                        >
                            Get Started
                        </Link>
                    </>
                ) : (
                    <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-400/40 to-blue-200/20 flex items-center justify-center text-indigo-400 font-bold shadow text-sm">
                            {localStorage.getItem("user")?.name?.charAt(0)}
                        </span>
                        <span className="text-white font-semibold">
                            {localStorage.getItem("user")?.name}
                        </span>
                        <button
                            onClick={handleLogout}
                            className="ml-2 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition"
                        >
                            Log Out
                        </button>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
