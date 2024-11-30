"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Next.js router'ını kullan
import { ref, onValue } from "firebase/database";
import { realtimeDb } from "../../../../firebase";
import "./blogDetail.css";

function BlogDetailPage({ params }) {
    const router = useRouter();
    const resolvedParams = React.use(params); // params Promise olduğu için çözümleniyor
    const { id, locale } = resolvedParams; // Blog ID ve dil bilgisi
    const [blog, setBlog] = useState(null);

    useEffect(() => {
        const blogRef = ref(realtimeDb, `blogs/${id}`);

        onValue(blogRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setBlog(data);
            } else {
                // Eğer blog bulunamazsa ana sayfaya yönlendirme
                router.push(`/${locale}/blog`);
            }
        });
    }, [id, locale, router]);

    if (!blog) {
        return <div>Loading...</div>; // Veri yüklenirken gösterilecek
    }

    return (
        <div className="blogDetailPage">
            <div className="blogDetailHeader">
                <img src={blog.image} alt={blog.title[locale]} />
                <h1>{blog.title[locale]}</h1>
                <span>{blog.dateAdded}</span>
            </div>
            <div className="blogDetailContent">
                <p>{blog.content?.[locale]}</p>
            </div>
        </div>
    );
}

export default BlogDetailPage;