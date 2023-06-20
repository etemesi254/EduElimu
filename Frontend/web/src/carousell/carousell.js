import React, { useState, useEffect } from 'react';
import './carousell.css';
import {AiOutlinePlus} from "react-icons/ai";

function CarouselImage() {
    const images = [
        "./assets/home (1).jpg",
        "./assets/home (2).jpg",
        "./assets/home (3).jpg",
    ];
    const creatorNames = [
        "Megan Dette",
        "John Smith",
        "Alvin Muchangi"
    ]

    const headings = [
        "Japanese III",
        "English Today",
        "Regression In Python",
    ]

    const subTitles = [
        "Learn how to speak Japanese today!",
        "Learn how to learn English today!",
        "Learn how to learn Regression in python today!",
    ]
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
        setActiveIndex((activeIndex + 1) % images.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [activeIndex, images.length]);

  const handleThumbnailClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className="carousel-container">
        <div
            className="carousel-image"
            style={{
            backgroundImage: `url("${images[activeIndex]}")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            }}
        >
            <div className="creator-name">
            <p>{creatorNames[activeIndex]}</p>
            </div>
            <div className='info-div'>
                <h2>{headings[activeIndex]}</h2>
                <p>{subTitles[activeIndex]}</p>
                <div className="controls">
                    <button id='watch'>watch</button>
                    <button id='add-to-list'>
                        <AiOutlinePlus id='add'/>
                    </button>
                </div>
            </div>
            <div className="carousel-thumbnails">
            {images.map((image, index) => (
            <img
                key={index}
                className={`carousel-thumbnail ${index === activeIndex ? 'active' : ''}`}
                src={image}
                alt={`Thumbnail ${index + 1}`}
                onClick={() => handleThumbnailClick(index)}
            />
            ))}
        </div>
        </div>
       
    </div>
  );
}

export default CarouselImage;
