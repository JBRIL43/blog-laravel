import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

import PostDetails from "./pages/PostDetails";
import NewPost from "./pages/NewPost";
import ViewPosts from "./pages/ViewPosts";
import EditPost from "./pages/EditPost";
import Header from "./components/Header";

const App = () => {
    return (
        
        <BrowserRouter>
            <Header></Header>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/posts" element={<ViewPosts />} />
                <Route path="/posts/:id" element={<PostDetails />} />
                <Route path="/new" element={<NewPost />} />
                <Route path="/edit/:id" element={<EditPost />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
