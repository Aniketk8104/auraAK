import React from "react";
import "./LaptopRental.css";

const LaptopRental = () => {
  return (
    <div className="laptop-rental">
      {/* Left Section: Laptop Details */}
      <div className="laptop-details">
        <h1>Just ₹849/Month – Laptops on Rent!</h1>
        <ul>
          <li>
            <span className="icon">💻</span> Processors: Intel i3, i5, i7, and
            i9, with latest 10th, 11th, 12th, and 13th Gen
          </li>
          <li>
            <span className="icon">🧠</span> RAM: 8GB, 16GB, 32GB.
          </li>
          <li>
            <span className="icon">💾</span> SSD Storage: 256GB, 512GB, 1TB, 2TB
          </li>
          <li>
            <span className="icon">🎮</span> Graphics: Nvidia RTX, AMD Radeon,
            Intel Arc
          </li>
          <li>
            <span className="icon">📏</span> Display Sizes: 14", 15", 16"
          </li>
          <li>
            <span className="icon">🖥️</span> Resolutions: 1080p FHD, 2K, 4K
          </li>
        </ul>
        <button className="rent-now">Rent Now!</button>
      </div>

      {/* Right Section: Lottie Animation */}
      <div className="illustration">
        <lottie-player
          src="https://lottie.host/ab36b0b4-9b44-4f8a-a151-1ccdb79b6014/dDOZH5Fe2T.json"
          background="transparent"
          speed="1"
          style={{ width: "100%", height: "auto", maxHeight: "5000px" }}
          loop
          autoplay
        ></lottie-player>
      </div>
    </div>
  );
};

export default LaptopRental;
