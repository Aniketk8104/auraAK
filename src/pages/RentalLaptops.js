import React, { useState } from "react";
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
];

// const RentalLaptops = () => (
//   <div className="card-container">
//     {/* <h1>Rental Laptops</h1> */}
//     {laptops.map((laptop, index) => (
//       <RentalCard key={index} product={laptop} />
//     ))}
//   </div>
// );
const ROW_SIZE = 4;
const RentalLaptops = () => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedLaptop, setSelectedLaptop] = useState(null);

  // Divide laptops into rows
  const rows = [];
  for (let i = 0; i < laptops.length; i += ROW_SIZE) {
    rows.push(laptops.slice(i, i + ROW_SIZE));
  }

  // Handle toggle button click
  const handleToggleSpecs = (laptop, rowIndex) => {
    if (selectedRow === rowIndex && selectedLaptop?.name === laptop.name) {
      // If the same row and laptop are clicked again, close the section
      setSelectedRow(null);
      setSelectedLaptop(null);
    } else {
      // Otherwise, open the section
      setSelectedRow(rowIndex);
      setSelectedLaptop(laptop);
    }
  };

  return (
    <div>
      {rows.map((row, rowIndex) => (
        <div key={rowIndex}>
          {/* Row of Cards */}
          <div className="card-container">
            {row.map((laptop, index) => (
              <RentalCard
                key={index}
                product={laptop}
                onShowSpecs={() => handleToggleSpecs(laptop, rowIndex)}
                isSelected={
                  selectedRow === rowIndex &&
                  selectedLaptop?.name === laptop.name
                }
              />
            ))}
          </div>

          {/* Specification Section Below the Current Row */}
          {selectedRow === rowIndex && selectedLaptop && (
            <div className="laptop-specs">
              <h1>Specifications for {selectedLaptop.name}</h1>
              <ul>
                <li>
                  <span className="icon">💻</span> Processor:
                  {selectedLaptop.processor}
                </li>
                <li>
                  <span className="icon">💵</span> Price: ₹
                  {selectedLaptop.price}
                </li>
                <li>
                  <span className="icon">🧠</span> RAM: {selectedLaptop.RAM}
                </li>
                <li>
                  <span className="icon">💾</span> Storage:
                  {selectedLaptop.Storage}
                </li>
                <li>
                  <span className="icon">🎮</span> Graphics:
                  {selectedLaptop.Graphic}
                </li>
                <li>
                  <span className="icon">📏</span> Display Size:
                  {selectedLaptop.Display}
                </li>
                <li>
                  <span className="icon">🖥️</span> Resolution:
                  {selectedLaptop.Resolution}
                </li>
              </ul>
              <button className="rent-now">Rent Now!</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default RentalLaptops;
