import React from "react";
import { adminRTDB } from "../../../../firebaseAdmin";
import BlogDetailClient from "./BlogDetailClient";

export async function fetchBlogsAndCurrent(id) {
    try {
        // Tüm blogları ve mevcut blogu çek
        const snapshot = await adminRTDB.ref("blogs").once("value");
        const data = snapshot.val();
        const blogs = data
            ? Object.entries(data).map(([id, blog]) => ({ id, ...blog }))
            : [];

        // Mevcut blogu bulun
        const currentBlog = blogs.find((blog) => blog.id === id);

        // Tarihe göre sıralayın
        blogs.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));

        return { blogs, currentBlog };
    } catch (error) {
        console.error("Error fetching blogs:", error);
        return { blogs: [], currentBlog: null };
    }
}

export default async function BlogDetailPage({ params }) {
    const { id, locale } = params;
    const { blogs, currentBlog } = await fetchBlogsAndCurrent(id);

    if (!currentBlog) {
        // Eğer blog bulunamazsa 404 veya yönlendirme yapabilirsiniz
        return <p>Blog not found.</p>;
    }

    return (
        <BlogDetailClient
            blog={currentBlog}
            blogs={blogs}
            locale={locale}
        />
    );
}