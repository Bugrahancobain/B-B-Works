import React from "react";
import { adminRTDB } from "../../../../firebaseAdmin";
import BlogDetailClient from "./BlogDetailClient";

export async function fetchBlogData(id) {
    try {
        // Tekil blogu al
        const blogSnapshot = await adminRTDB.ref(`blogs/${id}`).once("value");
        const blog = blogSnapshot.val();

        // Tüm blogları al
        const blogsSnapshot = await adminRTDB.ref("blogs").once("value");
        const blogsData = blogsSnapshot.val();
        const blogs = blogsData
            ? Object.entries(blogsData).map(([id, blog]) => ({ id, ...blog }))
            : [];

        // Blogları tarihe göre sıralama
        blogs.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));

        return { blog, blogs };
    } catch (error) {
        console.error("Error fetching blog data:", error);
        return { blog: null, blogs: [] };
    }
}

export default async function BlogDetailPage({ params }) {
    const { id } = params; // Blog ID
    const locale = params?.locale || "en"; // Varsayılan dil
    const { blog, blogs } = await fetchBlogData(id);

    // Eğer blog yoksa 404 dönebiliriz
    if (!blog) {
        return <div>Blog not found</div>;
    }

    return (
        <BlogDetailClient
            blog={blog}
            blogs={blogs}
            locale={locale}
        />
    );
}