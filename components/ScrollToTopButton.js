"use client";

import React, { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa"; // Kullanıcıya görsel olarak ok işareti göstermek için
import "../componentsStyle/ScrollToTopButton.css"

const ScrollToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    // Sayfa kaydırıldığında düğmeyi göstermek için kontrol
    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) { // 300px aşağı kayınca görünür olur
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);

        return () => {
            window.removeEventListener("scroll", toggleVisibility);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth", // Yumuşak kaydırma
        });
    };

    return (
        <button
            onClick={scrollToTop}
            className={`scrollToTopButton ${isVisible ? "visible" : ""}`}
        >
            <FaArrowUp />
        </button>
    );
};

export default ScrollToTopButton;