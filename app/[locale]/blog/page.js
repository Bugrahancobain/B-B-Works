import React from "react";
import { adminRTDB } from "../../../firebaseAdmin";
import BlogClient from "./BlogClient"; // İstemci bileşeni

// Firebase'den blogları ve sıralanmış haliyle veriyi al
export async function fetchBlogs() {
    try {
        const blogsSnapshot = await adminRTDB.ref("blogs").once("value");
        const blogsData = blogsSnapshot.val();

        const blogs = blogsData
            ? Object.entries(blogsData).map(([id, blog]) => ({ id, ...blog }))
            : [];

        // Tarihe göre sıralama
        blogs.sort((a, b) => {
            const dateA = new Date(a.dateAdded).getTime();
            const dateB = new Date(b.dateAdded).getTime();
            return dateB - dateA;
        });

        return blogs;
    } catch (error) {
        console.error("Error fetching blogs:", error);
        return [];
    }
}

export default async function BlogPage({ params }) {
    const locale = params?.locale || "en"; // Varsayılan dil
    const blogs = await fetchBlogs(); // Blog verilerini al

    return (
        <BlogClient
            blogs={blogs}
            locale={locale}
        />
    );
}