import React, { useState, useRef } from "react";
import RentalCard from "../components/RentalCard";

const laptops = [
  {
    name: "MacBook Pro",
    image: "img/61Qe0euJJZL.jpg",
    processor: "Intel i9",
    price: "1800",
    RAM: "8GB",
    Storage: "256GB",
    Display: '14"',
    Graphic: "Nvidia RTX",
    Resolution: "1080p FHD",
  },

  {
    name: "MacBook Air 1",
    image: "img/61Qe0euJJZL.jpg",
    processor: "M1, M2, M3",
    price: "1500",
    RAM: "8GB",
    Storage: "256GB",
    Display: '14"',
    Graphic: "Nvidia RTX",
    Resolution: "1080p FHD",
  },
  {
    name: "MacBook Air 2",
    image: "img/61Qe0euJJZL.jpg",
    processor: "M1, M2, M3",
    price: "1500",
    RAM: "8GB",
    Storage: "256GB",
    Display: '14"',
    Graphic: "Nvidia RTX",
    Resolution: "1080p FHD",
  },
  {
    name: "MacBook Air 3",
    image: "img/61Qe0euJJZL.jpg",
    processor: "M1, M2, M3",
    price: "1500",
    RAM: "8GB",
    Storage: "256GB",
    Display: '14"',
    Graphic: "Nvidia RTX",
    Resolution: "1080p FHD",
  },
  {
    name: "MacBook Air 4",
    image: "img/61Qe0euJJZL.jpg",
    processor: "M1, M2, M3",
    price: "1500",
    RAM: "8GB",
    Storage: "256GB",
    Display: '14"',
    Graphic: "Nvidia RTX",
    Resolution: "1080p FHD",
  },
  {
    name: "MacBook Pro 1",
    image: "img/61Qe0euJJZL.jpg",
    processor: "Intel i9",
    price: "1800",
    RAM: "8GB",
    Storage: "256GB",
    Display: '14"',
    Graphic: "Nvidia RTX",
    Resolution: "1080p FHD",
  },
  {
    name: "MacBook Pro 2",
    image: "img/61Qe0euJJZL.jpg",
    processor: "Intel i9",
    price: "1800",
    RAM: "8GB",
    Storage: "256GB",
    Display: '14"',
    Graphic: "Nvidia RTX",
    Resolution: "1080p FHD",
  },
  {
    name: "MacBook Pro 3",
    image: "img/61Qe0euJJZL.jpg",
    processor: "Intel i9",
    price: "1800",
    RAM: "8GB",
    Storage: "256GB",
    Display: '14"',
    Graphic: "Nvidia RTX",
    Resolution: "1080p FHD",
  },
  {
    name: "MacBook Pro 4",
    image: "img/61Qe0euJJZL.jpg",
    processor: "Intel i9",
    price: "1800",
    RAM: "8GB",
    Storage: "256GB",
    Display: '14"',
    Graphic: "Nvidia RTX",
    Resolution: "1080p FHD",
  },
  {
    name: "MacBook Pro 5",
    image: "img/61Qe0euJJZL.jpg",
    processor: "Intel i9",
    price: "1800",
    RAM: "8GB",
    Storage: "256GB",
    Display: '14"',
    Graphic: "Nvidia RTX",
    Resolution: "1080p FHD",
  },
  {
    name: "MacBook Pro a",
    image: "img/61Qe0euJJZL.jpg",
    processor: "Intel i9",
    price: "1800",
    RAM: "8GB",
    Storage: "256GB",
    Display: '14"',
    Graphic: "Nvidia RTX",
    Resolution: "1080p FHD",
  },
];
const ROW_SIZE = 4;

const RentalLaptops = () => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedLaptop, setSelectedLaptop] = useState(null);
  const cardRefs = useRef([]); // Ref for each card

  const rows = [];
  for (let i = 0; i < laptops.length; i += ROW_SIZE) {
    rows.push(laptops.slice(i, i + ROW_SIZE));
  }

  const handleToggleSpecs = (laptop, rowIndex) => {
    if (selectedRow === rowIndex && selectedLaptop?.name === laptop.name) {
      setSelectedRow(null);
      setSelectedLaptop(null);
    } else {
      setSelectedRow(rowIndex);
      setSelectedLaptop(laptop);

      // Scroll to the selected laptop card
      setTimeout(() => {
        cardRefs.current[rowIndex]?.[laptop.name]?.scrollIntoView({
          behavior: "smooth",
          // block: "center", // Scroll to the center of the card
        });
      }, 100); // Slight delay to ensure the card is rendered before scrolling
    }
  };

  return (
    <div>
      {rows.map((row, rowIndex) => (
        <div key={rowIndex}>
          <div className="card-container">
            {row.map((laptop, index) => (
              <div
                key={index}
                ref={(el) => {
                  if (!cardRefs.current[rowIndex]) {
                    cardRefs.current[rowIndex] = {};
                  }
                  cardRefs.current[rowIndex][laptop.name] = el;
                }}
              >
                <RentalCard
                  product={laptop}
                  onShowSpecs={() => handleToggleSpecs(laptop, rowIndex)}
                  isSelected={
                    selectedRow === rowIndex &&
                    selectedLaptop?.name === laptop.name
                  }
                />
              </div>
            ))}
          </div>

          {selectedRow === rowIndex && selectedLaptop && (
            <div className="laptop-specs">
              <div className="specs-layout">
                <div className="specs-image">
                  <img
                    src={selectedLaptop.image}
                    alt={selectedLaptop.name}
                    className="spec-image"
                  />
                </div>
                <div className="specs-details">
                  <h1>{selectedLaptop.name}</h1>
                  <ul>
                    <li>💻 Processor: {selectedLaptop.processor}</li>
                    <li>💵 Price: ₹{selectedLaptop.price}</li>
                    <li>🧠 RAM: {selectedLaptop.RAM}</li>
                    <li>💾 Storage: {selectedLaptop.Storage}</li>
                    <li>🎮 Graphics: {selectedLaptop.Graphic}</li>
                    <li>📏 Display Size: {selectedLaptop.Display}</li>
                    <li>🖥️ Resolution: {selectedLaptop.Resolution}</li>
                  </ul>
                  <button className="rent-now">Rent Now!</button>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
export default RentalLaptops;
