import Image from "next/image";
import React from "react";
import { Carousel } from "react-responsive-carousel";

import "react-responsive-carousel/lib/styles/carousel.min.css";

const images = ["/images/Hero.jpg", "/images/Hero.jpg", "/images/Hero.jpg"];

const Hero = () => {
    const carouselStyle = {
        height: "100%",
        width: "100%",
        objectFit: "cover",
    };
    const imageStyle = {
        width: "100%", // Set a fixed width for the images inside the carousel
        height: "100%", // Set a fixed height for the images inside the carousel
        objectFit: "cover",
    };

    return (
        <div className='relative w-screen mb-12 bg-fixed bg-center bg-cover'>
            <Carousel
                showStatus={false}
                showIndicators={false}
                showThumbs={false}
                autoPlay
                infiniteLoop
                interval={5000}
                transitionTime={1000}
                axis='horizontal'
            >
                {images.map((image, index) => (
                    <div key={index}>
                        <Image
                            src={image}
                            alt={`Image ${index + 1}`}
                            className='w-full h-full object-cover'
                            style={{ ...carouselStyle, ...imageStyle }}
                            width={1440}
                            height={787}
                        />
                    </div>
                ))}
            </Carousel>

            {/* Overlay */}
            <div className='absolute top-0 left-0 right-0 bottom-0  flex flex-col items-center justify-center text-white'>
                <h2 className='text-5xl font-bold mb-5'>About PEBBLE</h2>
                <p className='py-5 text-xl'>About us</p>
            </div>
        </div>
    );
};

export default Hero;
