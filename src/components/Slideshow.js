import React, { useState, useEffect } from "react";
import "./Slideshow.css";

const Slideshow = ({ slides }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(
      () => setCurrentSlide((prev) => (prev + 1) % slides.length),
      3000
    );
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="slideshow-container">
      {slides.map((slide, index) => (
        <div
          className={`slide ${index === currentSlide ? "active" : ""}`}
          key={index}
          style={{ display: index === currentSlide ? "block" : "none" }}
        >
          <img src={slide.image} alt={`Slide ${index + 1}`} />
        </div>
      ))}
      <button
        className="prev"
        onClick={() =>
          setCurrentSlide((currentSlide - 1 + slides.length) % slides.length)
        }
      >
        &#10094;
      </button>
      <button
        className="next"
        onClick={() => setCurrentSlide((currentSlide + 1) % slides.length)}
      >
        &#10095;
      </button>
    </div>
  );
};

export default Slideshow;
