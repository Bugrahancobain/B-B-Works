"use client";
import React, { useEffect, useState } from "react";
import "./about.css";
import { FaChevronDown } from "react-icons/fa";
import Company from "../../../components/Company";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function AboutPage({ params }) {
    const [offset, setOffset] = useState({ x: 0, y: 0 });

    // Doğrudan params nesnesini kullan
    const locale = params?.locale || "en"; // Varsayılan dil 'en'
    const t = useTranslations("AboutPage");

    useEffect(() => {
        const handleMouseMove = (e) => {
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;

            const offsetX = (centerX - e.clientX) * 0.01;
            const offsetY = (centerY - e.clientY) * 0.01;

            setOffset({ x: offsetX, y: offsetY });
        };

        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    return (
        <div className="aboutPageMain">
            <div className="aboutPageHeaderDiv">
                <h1>{t("header")}</h1>
                <FaChevronDown />
            </div>
            <div className="aboutFirstDiv">
                <div className="aboutImgDiv">
                    <div
                        className="aboutFirstImgDiv"
                        style={{
                            transform: `translate(${offset.x}px, ${offset.y}px)`,
                        }}
                    >
                        <img
                            style={{
                                width: "700px",
                                height: "500px",
                                objectFit: "contain",
                            }}
                            src="https://panda.axiomthemes.com/wp-content/uploads/2021/11/image-5-copyright.png"
                            alt="B&B"
                        />
                    </div>
                </div>
                <div className="aboutFirstContextDiv">
                    <h3>{t("header")}</h3>
                    <h2 className="aboutFirstContextDivh2">{t("firstSection.title")}</h2>
                    <h4 className="aboutFirstContextDivh4">{t("firstSection.subtitle")}</h4>
                    <div className="aboutPageTopCommit">
                        <div className="aboutPageTopCommitFirst">
                            <img
                                src="https://www.svgrepo.com/show/263552/magnifying-glass-search.svg"
                                alt="B&B_Magnifying_Glass"
                            />
                            <div style={{ marginLeft: "20px" }}>
                                <h2>{t("firstSection.commitments.creativeDesign.title")}</h2>
                                <h4>{t("firstSection.commitments.creativeDesign.description")}</h4>
                            </div>
                        </div>
                        <div className="aboutPageTopCommitSecond">
                            <img
                                src="https://www.svgrepo.com/show/263504/trophy.svg"
                                alt="B&B_award"
                            />
                            <div style={{ marginLeft: "20px" }}>
                                <h2>{t("firstSection.commitments.endlessPossibilities.title")}</h2>
                                <h4>{t("firstSection.commitments.endlessPossibilities.description")}</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Company />
            <div className="aboutFirstDiv">
                <div className="aboutImgDiv">
                    <div
                        className="aboutFirstImgDiv"
                        style={{
                            transform: `translate(${offset.x}px, ${offset.y}px)`,
                        }}
                    >
                        <img
                            style={{
                                width: "700px",
                                height: "500px",
                                objectFit: "contain",
                            }}
                            src="https://panda.axiomthemes.com/wp-content/uploads/2021/11/image-4-copyright.png"
                            alt="B&B"
                        />
                    </div>
                </div>
                <div className="aboutFirstContextDiv">
                    <h3>{t("secondSection.header")}</h3>
                    <h2 className="aboutFirstContextDivh2">{t("secondSection.title")}</h2>
                    <h4 className="aboutFirstContextDivh4">{t("secondSection.subtitle")}</h4>
                    <div className="aboutPageTopCommit">
                        <div className="aboutPageTopCommitFirst">
                            <h2 style={{ color: "grey", marginRight: "10px" }}>{t("secondSection.commitments.possibilities.number")}</h2>
                            <h2>{t("secondSection.commitments.possibilities.title")}</h2>
                        </div>
                        <hr className="hrClass" />
                        <div className="aboutPageTopCommitSecond">
                            <h2 style={{ color: "grey", marginRight: "10px" }}>{t("secondSection.commitments.optimization.number")}</h2>
                            <h2>{t("secondSection.commitments.optimization.title")}</h2>
                        </div>
                        <Link href={`/${locale}/ourServices`}>
                            <div className="aboutPageServicesLink">{t("secondSection.discoverNow")}</div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}