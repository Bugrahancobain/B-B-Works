"use client";

import React from "react";
import { FaChevronDown } from "react-icons/fa";
import "./blog.css";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function BlogClient({ blogs, locale }) {
    const t = useTranslations("BlogPage");

    const formatDate = (dateString) => {
        try {
            return new Date(dateString).toISOString().split("T")[0];
        } catch (error) {
            console.warn("Invalid date format:", dateString);
            return "";
        }
    };

    const sanitizeContent = (content) => {
        return content ? content.trim().substring(0, 50) + "..." : "";
    };

    return (
        <div>
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
                                <img src={blog.image} alt={`B&B_${blog.title[locale] || "default"}`} />
                                <div className="blogCardContent">
                                    <h3>{blog.title[locale]}</h3>
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: sanitizeContent(blog.content?.[locale]),
                                        }}
                                    />
                                    <div>
                                        <span>{formatDate(blog.dateAdded)}</span>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>

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
                                    <img src={blog.image} alt={`B&B_${blog.title[locale] || "default"}`} />
                                    <div>
                                        <h4>{blog.title[locale]}</h4>
                                        <span>{formatDate(blog.dateAdded)}</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                    <div className="blogSidebarBanner">
                        <img
                            src="https://picsum.photos/300/300"
                            alt={`B&B_${t("bannerAlt")}`}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}