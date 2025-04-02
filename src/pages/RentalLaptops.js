import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import RentalCard from "../components/RentalCard";
import axios from "axios";

const ROW_SIZE = 4;

const RentalLaptops = () => {
  const [laptops, setLaptops] = useState([]);
  const [filteredLaptops, setFilteredLaptops] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedLaptop, setSelectedLaptop] = useState(null);
  const [sortOption, setSortOption] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [category, setCategory] = useState("All Laptops");
  const cardRefs = useRef([]);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLaptops = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/api/laptops`
        );
        setLaptops(response.data);
        filterLaptops(response.data, location.search);
      } catch (error) {
        console.error("Failed to fetch laptops:", error);
      }
    };
    fetchLaptops();
  }, [location.search]);

  useEffect(() => {
    applyFilters();
  }, [sortOption, priceRange, category]);

  const filterLaptops = (laptops, queryString) => {
    const queryParams = new URLSearchParams(queryString);
    const filters = {
      ram: queryParams.get("ram"),
      processor: queryParams.get("processor"),
      category: queryParams.get("category"),
    };

    let filtered = laptops.filter((laptop) => {
      return (
        (!filters.ram || laptop.RAM === filters.ram) &&
        (!filters.processor || laptop.processor === filters.processor) &&
        (!filters.category || laptop.category === filters.category)
      );
    });

    setFilteredLaptops(filtered);
  };

  const applyFilters = () => {
    let updatedLaptops = [...laptops];

    if (category !== "All Laptops") {
      updatedLaptops = updatedLaptops.filter(
        (laptop) => laptop.category === category
      );
    }

    if (priceRange) {
      updatedLaptops = updatedLaptops.filter((laptop) => {
        const price = laptop.price;
        if (priceRange === "0-15000") return price < 15000;
        if (priceRange === "15000-25000")
          return price >= 15000 && price <= 25000;
        if (priceRange === "25000-35000")
          return price > 25000 && price <= 35000;
        if (priceRange === "35000+") return price > 35000;
        return true;
      });
    }

    if (sortOption) {
      updatedLaptops.sort((a, b) => {
        if (sortOption === "price-low") return a.price - b.price;
        if (sortOption === "price-high") return b.price - a.price;
        if (sortOption === "popular") return b.popularity - a.popularity;
        if (sortOption === "newest")
          return new Date(b.releaseDate) - new Date(a.releaseDate);
        return 0;
      });
    }

    setFilteredLaptops(updatedLaptops);
  };

  const handleCategoryClick = (category) => {
    setCategory(category);
    navigate(`?category=${category}`);
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
      <div className="page-header">
        <h1 className="page-title">Rental Laptops</h1>
        <div className="filters">
          <select
            className="filter-select"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="">Sort by</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="popular">Most Popular</option>
            <option value="newest">Newest</option>
          </select>

          <select
            className="filter-select"
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
          >
            <option value="">Price Range</option>
            <option value="0-15000">Below ₹15,000</option>
            <option value="15000-25000">₹15,000 - ₹25,000</option>
            <option value="25000-35000">₹25,000 - ₹35,000</option>
            <option value="35000+">Above ₹35,000</option>
          </select>
        </div>
      </div>

      <div className="categories">
        {[
          "All Laptops",
          "Business",
          "Gaming",
          "Ultrabooks",
          "MacBooks",
          "Workstations",
          "2-in-1",
        ].map((cat) => (
          <button
            key={cat}
            className={`category-btn ${category === cat ? "active" : ""}`}
            onClick={() => handleCategoryClick(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="card_div">
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
                      <li>🖥️ Category: {selectedLaptop.category}</li>
                    </ul>
                    <button className="rent-now">Rent Now!</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RentalLaptops;
