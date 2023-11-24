import React, { useEffect, useState } from "react";
import { FaAngleDown } from "react-icons/fa";

const ScrollToBottom = () => {
    const [showTopBtn, setShowTopBtn] = useState(false);

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY <= 100) {
                setShowTopBtn(true);
            } else {
                setShowTopBtn(false);
            }
        });
    }, []);
    const goToBottom = () => {
        window.scrollTo({
            top: 800,
            behavior: "smooth",
        });
    };
    return (
        <div className='top-to-btm'>
            {" "}
            {showTopBtn && (
                <FaAngleDown
                    className='icon-position icon-style'
                    onClick={goToBottom}
                />
            )}{" "}
        </div>
    );
};
export default ScrollToBottom;
