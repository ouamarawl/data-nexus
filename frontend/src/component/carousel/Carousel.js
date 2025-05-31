import "./Carousel.css";
import React, { useState, useEffect } from "react";

function Carousel({ images = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const showSlide = (index) => {
    if (index >= images.length) {
      setCurrentIndex(0);
    } else if (index < 0) {
      setCurrentIndex(images.length - 1);
    } else {
      setCurrentIndex(index);
    }
  };

  const nextSlide = () => showSlide(currentIndex + 1);
  const prevSlide = () => showSlide(currentIndex - 1);

  useEffect(() => {
    if (images.length > 1) {
      const intervalId = setInterval(nextSlide, 5000);
      return () => clearInterval(intervalId);
    }
  }, [currentIndex, images.length]);

  if (images.length === 0) {
    return <p>Aucune image disponible</p>;
  }

  return (
    <div className="carousel-container">
      <div className="carousel">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Slide ${index + 1}`}
            className="carousel-slide"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          />
        ))}
      </div>
      {images.length > 1 && (
        <>
          <button className="carousel-button prev" onClick={prevSlide}>
            &#8592;
          </button>
          <button className="carousel-button next" onClick={nextSlide}>
            &#8594;
          </button>
          <div className="carousel-dots">
            {images.map((_, index) => (
              <span
                key={index}
                className={`dot ${currentIndex === index ? "active" : ""}`}
                onClick={() => showSlide(index)}
              ></span>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Carousel;
