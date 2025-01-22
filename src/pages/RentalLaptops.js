import React, { useState, useEffect, useRef } from "react";
import RentalCard from "../components/RentalCard";
import axios from "axios"; // Import Axios or use fetch

const ROW_SIZE = 4;

const RentalLaptops = () => {
  const [laptops, setLaptops] = useState([]); // State for laptops
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedLaptop, setSelectedLaptop] = useState(null);
  const cardRefs = useRef([]); // Ref for each card

  useEffect(() => {
    const fetchLaptops = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/api/laptops`
        );
        setLaptops(response.data); // Update laptops state
      } catch (error) {
        console.error("Failed to fetch laptops:", error);
      }
    };

    fetchLaptops();
  }, []);

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
