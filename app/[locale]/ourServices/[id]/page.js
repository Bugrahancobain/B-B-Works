"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { realtimeDb } from "../../../../firebase"; // Firebase bağlantısı
import { ref, onValue } from "firebase/database";
import { FaHeart, FaTwitter, FaFacebook, FaEnvelope, FaLink, FaChevronLeft, FaChevronRight, FaChevronDown } from "react-icons/fa";
import Link from "next/link";
import { useTranslations } from "next-intl";

import "./serviceDetail.css";

function ServiceDetailPage({ params }) {
    const resolvedParams = React.use(params);
    const id = resolvedParams?.id; // Hizmet ID'si
    const locale = resolvedParams?.locale || "en"; // Varsayılan dil 'en'
    const t = useTranslations("OurServicesDetailsPage");


    const router = useRouter();
    const [service, setService] = useState(null);
    const [services, setServices] = useState([]); // Tüm hizmetler
    const [likes, setLikes] = useState(0);
    const [isLiked, setIsLiked] = useState(false); // Kullanıcı beğeni durumu
    const currentUrl = typeof window !== "undefined" ? window.location.href : "";

    useEffect(() => {
        // Belirli hizmeti çek
        const serviceRef = ref(realtimeDb, `services/${id}`);
        onValue(serviceRef, (snapshot) => {
            const data = snapshot.val();
            if (!data) {
                router.push(`/${locale}/ourServices`);
            } else {
                setService(data);
            }
        });
    }, [id, locale, router]);

    useEffect(() => {
        // Tüm hizmetleri çek
        const servicesRef = ref(realtimeDb, "services");
        onValue(servicesRef, (snapshot) => {
            const data = snapshot.val();
            const servicesArray = data
                ? Object.entries(data).map(([id, service]) => ({ id, ...service }))
                : [];
            servicesArray.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
            setServices(servicesArray);
        });
    }, []);

    if (!service) {
        return <p>{t("loading")}</p>;
    }

    // Mevcut hizmetin indeksini bul
    const currentIndex = services.findIndex((s) => s.id === id);
    const previousService = currentIndex > 0 ? services[currentIndex - 1] : null;
    const nextService = currentIndex < services.length - 1 ? services[currentIndex + 1] : null;

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
        <div className="serviceDetailPage">
            <div className="serviceDetailImageHeader">
                <img className="serviceDetailsBanner" src={service.image} alt={service.title[locale]} />
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
                <div style={{ lineHeight: "1.5" }} dangerouslySetInnerHTML={{ __html: service.details?.[locale] }} />

                <div className="social-container">
                    <div className="like-button" onClick={handleLike}>
                        <FaHeart className={`heart-icon ${isLiked ? "liked" : ""}`} />
                        <span className="like-count">{likes}</span>
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
                {nextService && (
                    <div className="nextService">
                        <Link href={`/${locale}/ourServices/${nextService.id}`} className="serviceLink">
                            <img src={nextService.image} alt={nextService.title[locale]} className="serviceImage" />
                            <div>
                                <h4 className="serviceTitle">{nextService.title[locale]}</h4>
                                <div className="serviceExcerpt" dangerouslySetInnerHTML={{ __html: nextService.shortDescription?.[locale]?.substring(0, 150) + "..." }} />
                            </div>
                            <div style={{ display: "flex", alignItems: "center", textAlign: "center", justifyContent: "center" }}>
                                <FaChevronLeft />
                                <h3>{t("previousService")}</h3>
                            </div>
                        </Link>

                    </div>
                )}
                {previousService && (
                    <div className="previousService">

                        <Link href={`/${locale}/ourServices/${previousService.id}`} className="serviceLink">
                            <img src={previousService.image} alt={previousService.title[locale]} className="serviceImage" />
                            <div>
                                <h4 className="serviceTitle">{previousService.title[locale]}</h4>
                                <div className="serviceExcerpt" dangerouslySetInnerHTML={{ __html: previousService.shortDescription?.[locale]?.substring(0, 150) + "..." }} />
                            </div>
                            <div style={{ display: "flex", alignItems: "center", textAlign: "center", justifyContent: "center" }}>
                                <h3>{t("nextService")}</h3>
                                <FaChevronRight />
                            </div>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ServiceDetailPage;