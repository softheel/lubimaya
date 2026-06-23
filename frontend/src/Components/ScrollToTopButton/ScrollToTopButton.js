import React, { useState, useEffect } from "react";
import LineUp from '../../assets/images/LineUp.svg';

import "./ScrollToTopButton.css";

const ScrollToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    // Функция для прокрутки страницы вверх
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    // Отслеживаем прокрутку страницы
    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);

        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    return (
        <>
            {isVisible && (
                <button className="scroll-to-top-button" onClick={scrollToTop}>
                    <img src={LineUp} alt="Scroll to top" />
                </button>
            )}
        </>
    );
};

export default ScrollToTopButton;