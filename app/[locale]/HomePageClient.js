"use client";

import React, { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import CountUp from "react-countup";
import { IoIosMail } from "react-icons/io";
import "./HomePage.css";
import Company from "../../components/Company";

export default function HomePageClient({ locale, services, blogs }) {
    const t = useTranslations("HomePage");

    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const [isVisible, setIsVisible] = useState(false);
    const [isVisibleEx, setIsVisibleEx] = useState(false);
    const referenceCount = 10; // SSR veya ayrı bir sorgudan alabilirsiniz
    const peopleCount = referenceCount * 23;

    const bars = [
        { title: "Design", percentage: 90 },
        { title: "Branding", percentage: 80 },
        { title: "Web Design", percentage: 98 },
    ];

    useEffect(() => {
        const handleMouseMove = (e) => {
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;

            const offsetX = (centerX - e.clientX) * 0.01;
            const offsetY = (centerY - e.clientY) * 0.01;

            setOffset({ x: offsetX, y: offsetY });
        };

        const handleScroll = () => {
            const barsDiv = document.querySelector(".homePageBarsDiv");
            const exsDiv = document.querySelector(".servicesPageExperiences");

            if (barsDiv) {
                const rectBars = barsDiv.getBoundingClientRect();
                if (rectBars.top < window.innerHeight - 100 && rectBars.bottom >= 0) {
                    setIsVisible(true);
                }
            }

            if (exsDiv) {
                const rectExs = exsDiv.getBoundingClientRect();
                if (rectExs.top < window.innerHeight - 100 && rectExs.bottom >= 0) {
                    setIsVisibleEx(true);
                }
            }
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div className="homePageMain">
            <div className="homePageFirstDiv">
                <div className="homePageFirstContextDiv">
                    <h2>{t("headerTitle")}</h2>
                    <h4>{t("headerDescription")}</h4>
                    <Link href={`/${locale}/aboutUs`}>
                        <div className="homePageLink">{t("aboutUs")}</div>
                    </Link>
                </div>
                <div className="homePageImgDiv">
                    <div
                        className="homePageFirstImgDiv"
                        style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
                    >
                        <img
                            style={{ width: "700px", height: "400px" }}
                            src="https://panda.axiomthemes.com/wp-content/uploads/2021/11/image-1-copyright.svg"
                            alt="B&B"
                        />
                    </div>
                </div>
            </div>
            <Company />
            <div className="homePageServicesDivMain">
                <h4>{t("ourServicesTitle")}</h4>
                <h2>{t("ourServicesSubtitle")}</h2>
                <div className="homePageServicesDiv">
                    {services.map((service) => (
                        <Link
                            key={service.id}
                            href={`/${locale}/ourServices/${service.id}`}
                            style={{ textDecoration: "none", color: "inherit" }}
                        >
                            <div className="homePageServicesCardBox">
                                <div className="homePageSericesImageDiv">
                                    <img
                                        src={service.image}
                                        alt={`B&B_${service.title[locale]}`}
                                    />
                                </div>
                                <div className="homePageServicesHeaders">
                                    <h3>{service.title[locale]}</h3>
                                    <div
                                        style={{ color: "grey", marginTop: "10px" }}
                                        dangerouslySetInnerHTML={{
                                            __html: service.shortDescription?.[locale]?.substring(0, 75) + "...",
                                        }}
                                    />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
                <Link href={`/${locale}/ourServices`}>
                    <div className="homePageServicesLink">{t("moreFeatures")}</div>
                </Link>
            </div>
            <div className="homePageBlogDiv">
                <div className="homePageBlogHeader">
                    <h3>{t("blogTitle")}</h3>
                    <h2>{t("blogSubtitle")}</h2>
                </div>
                <div className="homePageBlogBoxes">
                    {blogs.map((blog) => (
                        <Link
                            key={blog.id}
                            href={`/${locale}/blog/${blog.id}`}
                            style={{ textDecoration: "none", color: "inherit" }}
                        >
                            <div className="homePageBlogBox">
                                <img
                                    className="homePageBlogImage"
                                    src={blog.image}
                                    alt={`B&B_${blog.title[locale]}`}
                                />
                                <div className="homePageBlogDate">
                                    <span>
                                        {new Intl.DateTimeFormat(locale, { dateStyle: "medium" }).format(
                                            new Date(blog.dateAdded)
                                        )}
                                    </span>
                                </div>
                                <h3 className="homePageBlogTitle">{blog.title[locale]}</h3>
                            </div>
                        </Link>
                    ))}
                </div>
                <Link href={`/${locale}/blog`}>
                    <div className="homePageServicesLink">{t("viewAllArticles")}</div>
                </Link>
            </div>
        </div>
    );
}