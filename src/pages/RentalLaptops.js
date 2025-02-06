import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import RentalCard from "../components/RentalCard";
import axios from "axios";

const ROW_SIZE = 4;

const RentalLaptops = () => {
  const [filteredLaptops, setFilteredLaptops] = useState([]); // Only keep filteredLaptops
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedLaptop, setSelectedLaptop] = useState(null);
  const cardRefs = useRef([]);

  const location = useLocation();

  useEffect(() => {
    const fetchLaptops = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/api/laptops`
        );
        filterLaptops(response.data, location.search); // Filter laptops directly
      } catch (error) {
        console.error("Failed to fetch laptops:", error);
      }
    };

    fetchLaptops();
  }, [location.search]);

  const filterLaptops = (laptops, queryString) => {
    const queryParams = new URLSearchParams(queryString);
    const filters = {
      brand: queryParams.get("brand"),
      ram: queryParams.get("ram"),
      processor: queryParams.get("processor"),
      city: queryParams.get("city"),
    };

    const filtered = laptops.filter((laptop) => {
      return (
        (!filters.brand || laptop.brand === filters.brand) &&
        (!filters.ram || laptop.RAM === filters.ram) &&
        (!filters.processor || laptop.processor === filters.processor) &&
        (!filters.city || laptop.city === filters.city)
      );
    });

    setFilteredLaptops(filtered);
  };

  const rows = [];
  for (let i = 0; i < filteredLaptops.length; i += ROW_SIZE) {
    rows.push(filteredLaptops.slice(i, i + ROW_SIZE));
  }

  const handleToggleSpecs = (laptop, rowIndex) => {
    if (selectedRow === rowIndex && selectedLaptop?.name === laptop.name) {
      setSelectedRow(null);
      setSelectedLaptop(null);
    } else {
      setSelectedRow(rowIndex);
      setSelectedLaptop(laptop);

      setTimeout(() => {
        cardRefs.current[rowIndex]?.[laptop.name]?.scrollIntoView({
          behavior: "smooth",
        });
      }, 100);
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
