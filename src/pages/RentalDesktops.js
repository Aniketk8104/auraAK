import React from "react";
import RentalCard from "../components/RentalCard";

const desktops = [
  {
    name: "Desktop Pro",
    image: "desktop1.png",
    processor: "Intel i7",
    price: "1200",
  },
  {
    name: "Desktop Air",
    image: "desktop2.png",
    processor: "Intel i5",
    price: "1000",
  },
];

const RentalDesktops = () => (
  <div className="card-container">
    <h1>Rental Desktops</h1>
    {desktops.map((desktop, index) => (
      <RentalCard key={index} product={desktop} />
    ))}
  </div>
);

export default RentalDesktops;
