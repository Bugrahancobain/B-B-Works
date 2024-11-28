"use client";

import React, { useState, useEffect } from "react";
import { realtimeDb } from "../../../firebase";
import { ref, onValue } from "firebase/database";
import { FaChevronDown } from "react-icons/fa";
import "./blog.css";

function BlogPage({ params }) {
    const [blogs, setBlogs] = useState([]);

    const resolvedParams = React.use(params); // `params` çözülüyor
    const locale = resolvedParams.locale || "en"; // Varsayılan dil 'en'

    // Firebase'den blog verilerini çekme
    useEffect(() => {
        const blogsRef = ref(realtimeDb, "blogs");
        onValue(blogsRef, (snapshot) => {
            const data = snapshot.val();
            const blogsArray = data
                ? Object.entries(data).map(([id, blog]) => ({ id, ...blog }))
                : [];
            // Tarihe göre sıralama
            blogsArray.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
            setBlogs(blogsArray);
        });
    }, []);

    return (
        <div>
            {/* Main Content */}
            <div className="blogPageHeaderDiv">
                <h1>Blog List</h1>
                <FaChevronDown />
            </div>
            <div className="blogPageMain">
                <div className="blogMain">
                    {blogs.map((blog) => (
                        <div key={blog.id} className="blogCard">
                            <img src={blog.image} alt={blog.title[locale]} />
                            <div className="blogCardContent">
                                <h3>{blog.title[locale]}</h3>
                                <p>{blog.content?.[locale]?.substring(0, 50)}...</p>
                                <div>
                                    <span>{blog.dateAdded}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Sidebar */}
                <div className="blogSidebar">
                    <div className="blogSidebarSection">
                        <h3>Recent Posts</h3>
                        {blogs.slice(0, 2).map((blog) => (
                            <div key={blog.id} className="blogSidebarCard">
                                <img src={blog.image} alt={blog.title[locale]} />
                                <div>
                                    <h4>{blog.title[locale]}</h4>
                                    <span>{blog.dateAdded}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="blogSidebarBanner">
                        <img
                            src="https://picsum.photos/200"
                            alt="Banner Ad"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BlogPage;