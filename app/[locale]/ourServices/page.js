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

function Page({ params }) {
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const [referenceCount, setReferenceCount] = useState(0);
    const [services, setServices] = useState([]);
    const [isVisible, setIsVisible] = useState(false);

    const resolvedParams = React.use(params); // `params` çözülüyor
    const locale = resolvedParams.locale || "en"; // Varsayılan dil 'en'

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
    // Fare hareketiyle resimlerin ters yönde hareket etmesi
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

    // Firebase'den "references" verilerini çekmek
    useEffect(() => {
        const referencesRef = ref(realtimeDb, "references");
        onValue(referencesRef, (snapshot) => {
            const data = snapshot.val();
            const count = data ? Object.keys(data).length : 0;
            setReferenceCount(count);
        });
    }, []);

    const peopleCount = referenceCount * 23;

    // Firebase'den "services" verilerini çekmek
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

    // Slider ayarları
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
                <h1>Services</h1>
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
                    <h3>Our Services</h3>
                    <h2>Our Experts are Ready to Help</h2>
                    <h4>
                        Dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.
                    </h4>
                    <div className="servicesPageExperiences">
                        <div className="servicesPageExperience">
                            <h4>Experience</h4>
                            <h2>
                                {isVisible ? <CountUp start={0} end={referenceCount} duration={2} /> : 0}+
                            </h2>
                        </div>
                        <div className="servicesPagePeople">
                            <h4>People</h4>
                            <h2>
                                {isVisible ? <CountUp start={0} end={peopleCount} duration={2} /> : 0}+
                            </h2>
                        </div>
                    </div>
                </div>
            </div>
            {/* Hizmetler Slider */}
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
                                        cursor: "pointer", // Tıklanabilir olduğunu göstermek için
                                    }}
                                >
                                    <img src={service.image} alt={service.title[locale]} />
                                    <div>
                                        <h3>{service.title[locale]}</h3>
                                        <h4>{service.shortDescription[locale]}</h4>
                                    </div>
                                    <div className="readMoreContainer">
                                        <span className="readMoreText">Read More</span>
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
                    <h3>Who We Are</h3>
                    <h2>Our Experts are Ready to Help</h2>
                    <h4>
                        Dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.
                    </h4>
                    <Link href={`/${locale}/aboutUs`}>
                        <div className="servicesAboutLink">
                            Discover Us
                        </div>
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

// Özel slider okları
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