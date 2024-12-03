"use client";

import React, { useState, useEffect } from "react";
import { realtimeDb } from "../../../firebase";
import { ref, onValue } from "firebase/database";
import { FaChevronDown } from "react-icons/fa";
import "./blog.css";
import { useTranslations } from "next-intl";
import Link from "next/link";

function BlogPage({ params }) {
    const [blogs, setBlogs] = useState([]);

    const resolvedParams = React.use(params); // `params` çözülüyor
    const locale = resolvedParams.locale || "en"; // Varsayılan dil 'en'

    const t = useTranslations("BlogPage");

    // Firebase'den blog verilerini çekme
    useEffect(() => {
        const blogsRef = ref(realtimeDb, "blogs");
        onValue(blogsRef, (snapshot) => {
            const data = snapshot.val();
            const blogsArray = data
                ? Object.entries(data).map(([id, blog]) => ({ id, ...blog }))
                : [];
            // Tarihe göre sıralama
            blogsArray.sort((a, b) => {
                const dateA = new Date(a.dateAdded).getTime(); // ISO 8601 formatını `new Date` ile çöz
                const dateB = new Date(b.dateAdded).getTime();

                if (!isNaN(dateA) && !isNaN(dateB)) {
                    return dateB - dateA; // En son eklenen en başa
                } else {
                    console.warn("Invalid date format detected:", a.dateAdded, b.dateAdded);
                    return 0; // Tarih formatı hatalıysa sıralama değişmez
                }
            });

            setBlogs(blogsArray);
        });
    }, []);

    return (
        <div>
            {/* Main Content */}
            <div className="blogPageHeaderDiv">
                <h1>{t("header")}</h1>
                <FaChevronDown />
            </div>
            <div className="blogPageMain">
                <div className="blogMain">
                    {blogs.map((blog) => (
                        <div key={blog.id}>
                            <Link
                                className="blogCard"
                                style={{ color: "black", width: "800px" }}
                                href={`/${locale}/blog/${blog.id}`}
                            >
                                <img src={blog.image} alt={blog.title[locale]} />
                                <div className="blogCardContent">
                                    <h3>{blog.title[locale]}</h3>
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: blog.content?.[locale]?.substring(0, 50) + "..."
                                        }}
                                    />
                                    <div>
                                        <span>
                                            {new Date(blog.dateAdded).toLocaleDateString(locale)}
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>

                {/* Sidebar */}
                <div className="blogSidebar">
                    <div className="blogSidebarSection">
                        <h3>{t("recentPosts")}</h3>
                        {blogs.slice(0, 2).map((blog) => (
                            <Link
                                key={blog.id}
                                style={{ color: "black", width: "100%" }}
                                href={`/${locale}/blog/${blog.id}`}
                            >
                                <div className="blogSidebarCard">
                                    <img src={blog.image} alt={blog.title[locale]} />
                                    <div>
                                        <h4>{blog.title[locale]}</h4>
                                        <span>
                                            {new Date(blog.dateAdded).toLocaleDateString(locale)}
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                    <div className="blogSidebarBanner">
                        <img
                            src="https://picsum.photos/300/300"
                            alt={t("bannerAlt")}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BlogPage;