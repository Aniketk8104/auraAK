import React from "react";
import Popup from "../components/Popup";
import Slideshow from "../components/Slideshow";
import LaptopRental from "../components/LaptopRental";
import IndustriesSection from "../components/IndustriesSection";

const Home = () => {
  const slides = [
    { image: "img/img3.png" },
    { image: "img/Aura_janmasti1.jpg" },
    { image: "img/Laptop_Banner.png" },
  ];

  return (
    <div>
      <Popup />
      <Slideshow slides={slides} />
      <LaptopRental />
      <IndustriesSection />
    </div>
  );
};

export default Home;
