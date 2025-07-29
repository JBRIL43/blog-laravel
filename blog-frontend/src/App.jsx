import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

import PostDetails from "./pages/PostDetails";
import NewPost from "./pages/NewPost";
import ViewPosts from "./pages/ViewPosts";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/posts" element={<ViewPosts />} />
                <Route path="/posts/:id" element={<PostDetails />} />
                <Route path="/new" element={<NewPost />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
