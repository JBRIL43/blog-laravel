import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
            <h1 className="text-4xl font-bold mb-6">Welcome to the Blog App</h1>
            <p className="mb-8 text-lg">
                Please login or register to view and create posts.
            </p>
            <div className="flex space-x-4">
                <Link
                    to="/login"
                    className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    Login
                </Link>
                <Link
                    to="/register"
                    className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                    Register
                </Link>
            </div>
        </div>
    );
};

export default Home;
