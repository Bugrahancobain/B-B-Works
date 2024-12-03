"use client";

import React, { useEffect, useState } from "react";
import "./ourServices.css";
import { FaChevronDown, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import CountUp from "react-countup";
import { ref, onValue } from "firebase/database";
import { realtimeDb } from "../../../firebase";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";
import Company from "../../../components/Company";
import { useTranslations } from "next-intl";

function Page({ params }) {
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const [referenceCount, setReferenceCount] = useState(0);
    const [services, setServices] = useState([]);
    const [isVisible, setIsVisible] = useState(false);

    const t = useTranslations("OurServicesPage");
    const resolvedParams = React.use(params);
    const locale = resolvedParams?.locale || "en"; // Varsayılan dil 'en'


    useEffect(() => {
        const handleScroll = () => {
            const exsDiv = document.querySelector(".servicesPageExperiences");

            if (exsDiv) {
                const rectBars = exsDiv.getBoundingClientRect();
                if (rectBars.top < window.innerHeight - 100 && rectBars.bottom >= 0) {
                    setIsVisible(true);
                }
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

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

    useEffect(() => {
        const referencesRef = ref(realtimeDb, "references");
        onValue(referencesRef, (snapshot) => {
            const data = snapshot.val();
            const count = data ? Object.keys(data).length : 0;
            setReferenceCount(count);
        });
    }, []);

    const peopleCount = referenceCount * 23;

    useEffect(() => {
        const servicesRef = ref(realtimeDb, "services");
        onValue(servicesRef, (snapshot) => {
            const data = snapshot.val();
            const servicesArray = data
                ? Object.entries(data).map(([id, service]) => ({ id, ...service }))
                : [];
            setServices(servicesArray);
        });
    }, []);

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        nextArrow: <CustomNextArrow />,
        prevArrow: <CustomPrevArrow />,
    };

    return (
        <div className="servicesPageMain">
            <div className="servicesHeader">
                <h1>{t("servicesHeader")}</h1>
                <FaChevronDown />
            </div>
            <div className="servicesFirstDiv">
                <div className="servicesImgDiv">
                    <div
                        className="servicesFirstImgDiv"
                        style={{
                            transform: `translate(${offset.x}px, ${offset.y}px)`,
                        }}
                    >
                        <img
                            style={{
                                width: "700px",
                                height: "400px",
                            }}
                            src="https://panda.axiomthemes.com/wp-content/uploads/2021/11/image-2-copyright.svg"
                            alt="B&B"
                        />
                    </div>
                    <div
                        className="servicesSecondImgDiv"
                        style={{
                            transform: `translate(${-offset.x}px, ${-offset.y}px)`,
                        }}
                    >
                        <img
                            src="https://panda.axiomthemes.com/wp-content/uploads/2021/11/plan-copyright.svg"
                            alt="B&B"
                        />
                    </div>
                </div>
                <div className="servicesFirstContextDiv">
                    <h3>{t("ourServices")}</h3>
                    <h2>{t("expertsReady")}</h2>
                    <h4>{t("description")}</h4>
                    <div className="servicesPageExperiences">
                        <div className="servicesPageExperience">
                            <h4>{t("experience")}</h4>
                            <h2>
                                {isVisible ? <CountUp start={0} end={referenceCount} duration={2} /> : 0}+
                            </h2>
                        </div>
                        <div className="servicesPagePeople">
                            <h4>{t("people")}</h4>
                            <h2>
                                {isVisible ? <CountUp start={0} end={peopleCount} duration={2} /> : 0}+
                            </h2>
                        </div>
                    </div>
                </div>
            </div>
            <div className="servicesSlider">
                <Slider {...sliderSettings}>
                    {services.map((service) => (
                        <div key={service.id} className="servicesShowDiv">
                            <Link href={`/${locale}/ourServices/${service.id}`}>
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        position: "relative",
                                        height: "100%",
                                        cursor: "pointer",
                                    }}
                                >
                                    <img src={service.image} alt={service.title[locale]} />
                                    <div>
                                        <h3>{service.title[locale]}</h3>
                                        <div style={{ color: "grey" }} dangerouslySetInnerHTML={{ __html: service.shortDescription?.[locale]?.substring(0, 100) + "..." }} />
                                    </div>
                                    <div className="readMoreContainer">
                                        <span className="readMoreText">{t("readMore")}</span>
                                        <span className="arrowIcon">→</span>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </Slider>
            </div>
            <div className="servicesAboutFirstDiv">
                <div className="servicesAboutFirstContextDiv">
                    <h3>{t("whoWeAre")}</h3>
                    <h2>{t("expertsReady")}</h2>
                    <h4>{t("description")}</h4>
                    <Link href={`/${locale}/aboutUs`}>
                        <div className="servicesAboutLink">{t("discoverUs")}</div>
                    </Link>
                </div>
                <div className="servicesAboutImgDiv">
                    <div
                        className="servicesAboutFirstImgDiv"
                        style={{
                            transform: `translate(${offset.x}px, ${offset.y}px)`,
                        }}
                    >
                        <img
                            style={{
                                width: "700px",
                                height: "400px",
                            }}
                            src="https://panda.axiomthemes.com/wp-content/uploads/2021/11/image-3-copyright.svg"
                            alt="B&B"
                        />
                    </div>
                </div>
            </div>
            <Company />
        </div>
    );
}

function CustomNextArrow(props) {
    const { onClick } = props;
    return (
        <div className="arrow next" onClick={onClick}>
            <FaChevronRight />
        </div>
    );
}

function CustomPrevArrow(props) {
    const { onClick } = props;
    return (
        <div className="arrow prev" onClick={onClick}>
            <FaChevronLeft />
        </div>
    );
}

export default Page;