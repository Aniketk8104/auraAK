import React, { useState, useEffect } from "react";
import "./Slideshow.css";

const Slideshow = ({ slides }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Automatically change the slide every 3 seconds
  useEffect(() => {
    if (slides.length > 0) {
      const timer = setInterval(
        () => setCurrentSlide((prev) => (prev + 1) % slides.length),
        3000
      );
      return () => clearInterval(timer); // Cleanup the timer on component unmount
    }
  }, [slides.length]);

  return (
    <div className="slideshow-container">
      {slides.length === 0 ? (
        <p>No slides available</p>
      ) : (
        slides.map((slide, index) => (
          <div
            className={`slide ${index === currentSlide ? "active" : ""}`}
            key={index}
            style={{ display: index === currentSlide ? "block" : "none" }}
          >
            <img
              src={slide.imageUrl} // Use `imageUrl` as it's the correct property
              alt={`Slide ${index + 1}`}
              className="slide-image"
            />
          </div>
        ))
      )}
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
