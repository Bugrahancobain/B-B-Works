"use client";

import React from "react";
import { FaHeart, FaTwitter, FaFacebook, FaEnvelope, FaLink, FaChevronDown, FaChevronRight, FaChevronLeft } from "react-icons/fa";
import Link from "next/link";
import { useTranslations } from "next-intl";
import "./blogDetail.css";

function BlogDetailClient({ blog, blogs, locale }) {
    const t = useTranslations("BlogDetailPage");

    const [likes, setLikes] = React.useState(0);
    const [isLiked, setIsLiked] = React.useState(false);

    const currentUrl = typeof window !== "undefined" ? window.location.href : "";

    // Mevcut blogun indeksini bul
    const currentIndex = blogs.findIndex((b) => b.id === blog.id);

    // Bir önceki ve bir sonraki blogu hesapla
    const previousBlog = currentIndex > 0 ? blogs[currentIndex - 1] : null;
    const nextBlog = currentIndex < blogs.length - 1 ? blogs[currentIndex + 1] : null;

    const handleLike = () => {
        setLikes((prev) => (isLiked ? prev - 1 : prev + 1));
        setIsLiked(!isLiked);
    };

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
                <img className="blogDetailsBanner" src={blog.image} alt={`B&B_${blog.title[locale]}`} />
                <div className="blogDetailHeaderDiv">
                    <h1>{blog.title[locale]}</h1>
                    <ul>
                        <li className="blogDetailsProfile">
                            <img src="#" alt="B&B" />
                            <span>B&B</span>
                        </li>
                        <li>
                            <span>{new Intl.DateTimeFormat(locale, { dateStyle: "medium" }).format(new Date(blog.dateAdded))}</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="blogDetailContent">
                <div
                    style={{ lineHeight: "1.5" }}
                    dangerouslySetInnerHTML={{ __html: blog.content?.[locale] }}
                />

                <div className="social-container">
                    <div className="like-button" onClick={handleLike}>
                        <FaHeart className={`heart-icon ${isLiked ? "liked" : ""}`} />
                        <span className="like-count">{likes}</span>
                        <span>{t("likeButton")}</span>
                    </div>

                    <div className="share-buttons">
                        <button onClick={() => handleShare("twitter")} className="share-button twitter">
                            <FaTwitter />
                        </button>
                        <button onClick={() => handleShare("facebook")} className="share-button facebook">
                            <FaFacebook />
                        </button>
                        <button onClick={() => handleShare("email")} className="share-button email">
                            <FaEnvelope />
                        </button>
                        <button onClick={() => handleShare("link")} className="share-button link">
                            <FaLink />
                        </button>
                    </div>
                </div>
            </div>

            <div className="previousNextBlogContainer">
                <div className="previousNextBlogContent">
                    {previousBlog && (
                        <div className="previousBlog">
                            <Link href={`/${locale}/blog/${previousBlog.id}`}>
                                <img src={previousBlog.image} alt={`B&B_${previousBlog.title[locale]}`} />
                                <h4>{previousBlog.title[locale]}</h4>
                            </Link>
                        </div>
                    )}
                    {nextBlog && (
                        <div className="nextBlog">
                            <Link href={`/${locale}/blog/${nextBlog.id}`}>
                                <img src={nextBlog.image} alt={`B&B_${nextBlog.title[locale]}`} />
                                <h4>{nextBlog.title[locale]}</h4>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default BlogDetailClient;