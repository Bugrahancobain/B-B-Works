"use client";

import React, { useEffect } from "react";
import { FaHeart, FaTwitter, FaFacebook, FaEnvelope, FaLink, FaChevronDown } from "react-icons/fa";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useLikes } from "../../../../useLikes";
import "./serviceDetail.css";

export default function ServiceDetailClient({ locale, service, services }) {
    const t = useTranslations("OurServicesDetailsPage");
    const { likesCount, isLiked, handleToggleLike } = useLikes("services", service.id);


    const currentIndex = services.findIndex((s) => s.id === service.id);
    const previousService = currentIndex > 0 ? services[currentIndex - 1] : null;
    const nextService = currentIndex < services.length - 1 ? services[currentIndex + 1] : null;


    const handleShare = (platform) => {
        const currentUrl = typeof window !== "undefined" ? window.location.href : "";
        switch (platform) {
            case "twitter":
                window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(service.title[locale])}&url=${currentUrl}`, "_blank");
                break;
            case "facebook":
                window.open(`https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`, "_blank");
                break;
            case "email":
                window.location.href = `mailto:?subject=${encodeURIComponent(service.title[locale])}&body=${currentUrl}`;
                break;
            case "link":
                navigator.clipboard.writeText(currentUrl);
                alert(t("linkCopied"));
                break;
            default:
                break;
        }
    };
    useEffect(() => {
        if (!localStorage.getItem("deviceId")) {
            const newDeviceId = `device-${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
            localStorage.setItem("deviceId", newDeviceId);
        }
    }, []);

    return (
        <div className="serviceDetailPage">
            <div className="serviceDetailImageHeader">
                <img className="serviceDetailsBanner" src={service.image} alt={`B&B_${service.title[locale]}`} />
                <div className="serviceDetailHeaderDiv">
                    <h1>{service.title[locale]}</h1>
                    <ul>
                        <li className="serviceDetailsProfile">
                            <img src="#" alt="B&B" />
                            <span>B&B</span>
                        </li>
                        <li>
                            <span>{new Date(service.dateAdded).toLocaleDateString(locale)}</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="serviceDetailContent">
                <div
                    style={{ lineHeight: "1.6" }}
                    dangerouslySetInnerHTML={{ __html: service.details?.[locale] }}
                />

            </div>
            <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
                <div className="social-container">
                    <div className="like-button" onClick={handleToggleLike}>
                        <FaHeart className={`heart-icon ${isLiked ? "liked" : ""}`} />
                        <span className="like-count">{likesCount || 0}</span>
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

            <div style={{ fontSize: "40px", marginBottom: "50px", textAlign: "center" }}>
                <h2 style={{ margin: "20px" }}>{t("youMayAlsoLike")}</h2>
                <FaChevronDown />
            </div>
            <div className="previousNextServiceContainer">
                {previousService && (
                    <div className="previousService">
                        <Link href={`/${locale}/ourServices/${previousService.id}`} className="serviceLink">
                            <img src={previousService.image} alt={`B&B_${previousService.title[locale]}`} className="serviceImage" />
                            <div>
                                <h4 className="serviceTitle">{previousService.title[locale]}</h4>
                                <div
                                    className="serviceExcerpt"
                                    dangerouslySetInnerHTML={{
                                        __html: previousService.shortDescription?.[locale]?.substring(0, 150) + "...",
                                    }}
                                />
                            </div>
                        </Link>
                    </div>
                )}
                {nextService && (
                    <div className="nextService">
                        <Link href={`/${locale}/ourServices/${nextService.id}`} className="serviceLink">
                            <img src={nextService.image} alt={`B&B_${nextService.title[locale]}`} className="serviceImage" />
                            <div>
                                <h4 className="serviceTitle">{nextService.title[locale]}</h4>
                                <div
                                    className="serviceExcerpt"
                                    dangerouslySetInnerHTML={{
                                        __html: nextService.shortDescription?.[locale]?.substring(0, 150) + "...",
                                    }}
                                />
                            </div>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}