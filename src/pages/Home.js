import React, { useEffect, useState } from "react";
import Popup from "../components/Popup";
import Slideshow from "../components/Slideshow";
import LaptopRental from "../components/LaptopRental";
import IndustriesSection from "../components/IndustriesSection";

const Home = () => {
  const [slides, setSlides] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/slideshow");
        if (!response.ok) {
          throw new Error("Failed to fetch slideshow images");
        }
        const data = await response.json();
        setSlides(data); // Update state with fetched slides
      } catch (err) {
        console.error(err);
        setError(err.message);
      }
    };

    fetchSlides();
  }, []);

  return (
    <div>
      <Popup />
      {error && <p style={{ color: "red" }}>{error}</p>}

      <Slideshow slides={slides} />
      <LaptopRental />
      <IndustriesSection />
    </div>
  );
};

export default Home;
