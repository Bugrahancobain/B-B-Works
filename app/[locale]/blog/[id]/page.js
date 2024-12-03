"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Next.js router'ını kullan
import { ref, onValue } from "firebase/database";
import { realtimeDb } from "../../../../firebase";
import { FaHeart, FaTwitter, FaFacebook, FaEnvelope, FaLink, FaChevronDown, FaChevronRight, FaChevronLeft } from "react-icons/fa";
import Link from "next/link";
import { useTranslations } from "next-intl";
import "./blogDetail.css";

function BlogDetailPage({ params }) {
    const router = useRouter();
    const resolvedParams = React.use(params); // `params` çözülüyor
    const locale = resolvedParams.locale || "en"; // Varsayılan dil 'en'
    const id = resolvedParams?.id; // Hizmet ID'si
    const t = useTranslations("BlogDetailPage");

    const [blog, setBlog] = useState(null); // Tekil blog
    const [blogs, setBlogs] = useState([]); // Tüm bloglar
    const [likes, setLikes] = useState(0);
    const [isLiked, setIsLiked] = useState(false); // Kullanıcının beğenip beğenmediği
    const currentUrl = typeof window !== "undefined" ? window.location.href : ""; // Dinamik olarak mevcut URL

    useEffect(() => {
        // Belirli bir blogu çek
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

    useEffect(() => {
        // Tüm blogları çek
        const blogsRef = ref(realtimeDb, "blogs");
        onValue(blogsRef, (snapshot) => {
            const data = snapshot.val();
            const blogsArray = data
                ? Object.entries(data).map(([id, blog]) => ({ id, ...blog }))
                : [];
            blogsArray.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
            setBlogs(blogsArray);
        });
    }, []);

    if (!blog) {
        return <div>Loading...</div>; // Veri yüklenirken gösterilecek
    }

    // Mevcut blogun indeksini bul
    const currentIndex = blogs.findIndex((b) => b.id === id);

    // Bir önceki ve bir sonraki blogu hesapla
    const previousBlog = currentIndex > 0 ? blogs[currentIndex - 1] : null;
    const nextBlog = currentIndex < blogs.length - 1 ? blogs[currentIndex + 1] : null;

    const handleLike = () => {
        if (isLiked) {
            setLikes((prevLikes) => prevLikes - 1);
        } else {
            setLikes((prevLikes) => prevLikes + 1);
        }
        setIsLiked(!isLiked);
    };

    // Paylaşım işlevi
    const handleShare = (platform) => {
        switch (platform) {
            case "twitter":
                window.open(`https://twitter.com/intent/tweet?text=Check+this+out!&url=${currentUrl}`, "_blank");
                break;
            case "facebook":
                window.open(`https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`, "_blank");
                break;
            case "email":
                window.location.href = `mailto:?subject=Check this out&body=${currentUrl}`;
                break;
            case "link":
                navigator.clipboard.writeText(currentUrl);
                alert("Link copied to clipboard!");
                break;
            default:
                break;
        }
    };

    return (
        <div className="blogDetailPage">
            {/* Üst Kısım: Blog Detayları */}
            <div className="blogDetailImageHeader">
                <img className="blogDetailsBanner" src={blog.image} alt={blog.title[locale]} />
                <div className="blogDetailHeaderDiv">
                    <h1>{blog.title[locale]}</h1>
                    <ul>
                        <li className="blogDetailsProfile">
                            <img src="#" alt="B&B" />
                            <span>B&B</span>
                        </li>
                        <li>
                            <span>{new Date(blog.dateAdded).toLocaleDateString(locale)}</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="blogDetailContent">
                <div style={{ lineHeight: "1.5" }}
                    dangerouslySetInnerHTML={{ __html: blog.content?.[locale] }}
                />

                <div className="social-container">
                    {/* Beğenme Butonu */}
                    <div className="like-button" onClick={handleLike}>
                        <FaHeart className={`heart-icon ${isLiked ? "liked" : ""}`} />
                        <span className="like-count">{likes}</span>
                        <span>{t("likeButton")}</span>
                    </div>

                    {/* Paylaşım Butonları */}
                    <div className="share-buttons">
                        <button className="share-button twitter" onClick={() => handleShare("twitter")} aria-label={t("shareButtons.twitter")}>
                            <FaTwitter />
                        </button>
                        <button className="share-button facebook" onClick={() => handleShare("facebook")} aria-label={t("shareButtons.facebook")}>
                            <FaFacebook />
                        </button>
                        <button className="share-button email" onClick={() => handleShare("email")} aria-label={t("shareButtons.email")}>
                            <FaEnvelope />
                        </button>
                        <button className="share-button link" onClick={() => handleShare("link")} aria-label={t("shareButtons.copyLink")}>
                            <FaLink />
                        </button>
                    </div>
                </div>
            </div>

            {/* Alt Kısım: Bir Önceki ve Bir Sonraki Blog */}
            <div style={{ fontSize: "40px", marginBottom: "50px", textAlign: "center" }}>
                <h2 style={{ margin: "20px" }}>{t("header")}</h2>
                <FaChevronDown />
            </div>

            <div className="previousNextBlogContainer">
                <div className="previousNextBlogContent">
                    {nextBlog && (
                        <div className="nextBlog">
                            <div style={{ display: "flex", alignItems: "center", textAlign: "center", justifyContent: "center" }}>
                                <FaChevronLeft />
                                <h3>{t("previousPost")}</h3>
                            </div>
                            <Link href={`/${locale}/blog/${nextBlog.id}`} className="blogLink">
                                <img src={nextBlog.image} alt={nextBlog.title[locale]} className="blogImage" />
                                <h4 className="blogTitle">{nextBlog.title[locale]}</h4>
                                <div className="blogExcerpt" dangerouslySetInnerHTML={{ __html: nextBlog.content?.[locale]?.substring(0, 50) + "..." }} />
                            </Link>
                        </div>
                    )}
                    {previousBlog && (
                        <div className="previousBlog">
                            <div style={{ display: "flex", alignItems: "center", textAlign: "center", justifyContent: "center" }}>
                                <h3>{t("nextPost")}</h3>
                                <FaChevronRight />
                            </div>
                            <Link href={`/${locale}/blog/${previousBlog.id}`} className="blogLink">
                                <img src={previousBlog.image} alt={previousBlog.title[locale]} className="blogImage" />
                                <div>
                                    <h4 className="blogTitle">{previousBlog.title[locale]}</h4>
                                    <div className="blogExcerpt" dangerouslySetInnerHTML={{ __html: previousBlog.content?.[locale]?.substring(0, 50) + "..." }} />
                                </div>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default BlogDetailPage;