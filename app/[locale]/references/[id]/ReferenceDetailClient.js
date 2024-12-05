"use client";

import React, { useEffect } from "react";
import { FaTwitter, FaFacebook, FaInstagram, FaChevronDown, FaEnvelope, FaHeart, FaLink, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { useTranslations } from "next-intl";
import Link from "next/link";
import "./referenceDetail.css";
import { useLikes } from "../../../../useLikes";


function ReferenceDetailClient({ reference, references, locale }) {
    const { likesCount, isLiked, handleToggleLike } = useLikes("references", reference.id);
    const t = useTranslations("ReferencesDetailsPage");
    const currentUrl = typeof window !== "undefined" ? window.location.href : "";

    // Mevcut referansın indeksini bul
    const currentIndex = references.findIndex((ref) => ref.id === reference.id);

    // Bir önceki ve bir sonraki referans
    const previousReference = currentIndex > 0 ? references[currentIndex - 1] : null;
    const nextReference = currentIndex < references.length - 1 ? references[currentIndex + 1] : null;

    useEffect(() => {
        if (!localStorage.getItem("deviceId")) {
            const newDeviceId = `device-${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
            localStorage.setItem("deviceId", newDeviceId);
        }
    }, []);
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
        <div>
            <div className="referenceDetailsHeaderDiv">
                <h1>{reference.companyName}</h1>
                <FaChevronDown />
            </div>
            <div className="SidebarCenterClass">
                <div className="referenceDetailPage">
                    <div className="referenceSidebar">
                        <div className="referenceSidebarSection displayNoneClass">
                            <h3>{reference.companyName}</h3>
                        </div>
                        <div className="displayNoneClass"
                            style={{ color: "grey" }}
                            dangerouslySetInnerHTML={{ __html: reference.details?.[locale]?.substring(0, 200) + "..." }}
                        />
                        <div className="referenceSidebarDetails">
                            <div>
                                <h3>{t("sector")}:</h3>
                                <p>{reference.sector[locale]}</p>
                            </div>
                            <div>
                                <h3>{t("workingDate")}:</h3>
                                <p>{new Date(reference.dateAdded).toISOString().split("T")[0]}</p>
                            </div>
                            <div className="referenceDetailIcons">
                                {reference.instagram && (
                                    <a href={reference.instagram} target="_blank" rel="noopener noreferrer">
                                        <FaInstagram />
                                    </a>
                                )}
                                {reference.facebook && (
                                    <a href={reference.facebook} target="_blank" rel="noopener noreferrer">
                                        <FaFacebook />
                                    </a>
                                )}
                                {reference.twitter && (
                                    <a href={reference.twitter} target="_blank" rel="noopener noreferrer">
                                        <FaTwitter />
                                    </a>
                                )}
                                {reference.email && (
                                    <a href={`mailto:${reference.email}`} target="_blank" rel="noopener noreferrer">
                                        <IoIosMail />
                                    </a>
                                )}
                                {reference.website && (
                                    <a href={reference.website} target="_blank" rel="noopener noreferrer">
                                        <FaLink />
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                    <div style={{ width: "66%", fontSize: "18px" }}>
                        <div className="referenceDetailHeader">
                            <img src={reference.image} alt={`B&B_${reference.companyName}`} />
                        </div>
                        <div style={{ lineHeight: "1.6" }} dangerouslySetInnerHTML={{ __html: reference.details?.[locale] }} />

                    </div>
                </div>

            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <div className="social-container">
                    <div className="like-button" onClick={handleToggleLike}>
                        <FaHeart className={`heart-icon ${isLiked ? "liked" : ""}`} />
                        <span className="like-count">{likesCount || 0}</span>
                    </div>
                    <div className="share-buttons">
                        <button className="share-button twitter" onClick={() => handleShare("twitter")} aria-label="Share on Twitter">
                            <FaTwitter />
                        </button>
                        <button className="share-button facebook" onClick={() => handleShare("facebook")} aria-label="Share on Facebook">
                            <FaFacebook />
                        </button>
                        <button className="share-button email" onClick={() => handleShare("email")} aria-label="Share via Email">
                            <FaEnvelope />
                        </button>
                        <button className="share-button link" onClick={() => handleShare("link")} aria-label="Copy Link">
                            <FaLink />
                        </button>
                    </div>
                </div>
            </div>
            <div>
                <div className="previousNextReferenceContainer">
                    <div className="previousNextReferenceContent">
                        {previousReference && (
                            <div className="previousReference">
                                <div style={{ display: "flex", alignItems: "center", textAlign: "center", justifyContent: "center" }}>
                                    <FaChevronLeft />
                                    <h3>{t("previousReference")}</h3>
                                </div>
                                <Link href={`/${locale}/references/${previousReference.id}`} className="ReferenceLink">
                                    <img src={previousReference.image} alt={`B&B_${previousReference.companyName}`} className="ReferenceImage" />
                                    <div>
                                        <h4 className="ReferenceTitle">{previousReference.companyName}</h4>
                                        <div className="referenceExcerpt" dangerouslySetInnerHTML={{ __html: previousReference.details?.[locale]?.substring(0, 50) + "..." }} />
                                    </div>
                                </Link>
                            </div>
                        )}
                        {nextReference && (
                            <div className="nextReference">
                                <div style={{ display: "flex", alignItems: "center", textAlign: "center", justifyContent: "center" }}>
                                    <h3>{t("nextReference")}</h3>
                                    <FaChevronRight />
                                </div>
                                <Link href={`/${locale}/references/${nextReference.id}`} className="ReferenceLink">
                                    <img src={nextReference.image} alt={`B&B_${nextReference.companyName}`} className="ReferenceImage" />
                                    <div>
                                        <h4 className="ReferenceTitle">{nextReference.companyName}</h4>
                                        <div className="referenceExcerpt" dangerouslySetInnerHTML={{ __html: nextReference.details?.[locale]?.substring(0, 50) + "..." }} />
                                    </div>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ReferenceDetailClient;