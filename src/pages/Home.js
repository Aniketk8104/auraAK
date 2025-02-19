import React, { useEffect, useState } from "react";
import Popup from "../components/Popup";
import Slideshow from "../components/Slideshow";
import LaptopRental from "../components/LaptopRental";
// import IndustriesSection from "../components/IndustriesSection";
import QuickBookSection from "../components/QuickBookSection";
import Projects from "../components/projects/projects";
import CodeLottie from "../components/codeLottie";
import "../styles/card.scss";
import "../styles/globals.scss";

const Home = () => {
  const [slides, setSlides] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BASE_URL}/api/slideshow`
        );
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
      <Projects />
      <CodeLottie />
      {/* <IndustriesSection /> */}
      {/* <QuickBookSection /> */}
      {/* <Header_QuickBookSection /> */}
    </div>
  );
};

export default Home;
