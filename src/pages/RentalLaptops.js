import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import RentalCard from "../components/RentalCard";
import axios from "axios";
import { debounce } from "lodash";
import "./RentalLaptops.css";

const ROW_SIZE = 4;

const RentalLaptops = () => {
  const [laptops, setLaptops] = useState([]);
  const [filteredLaptops, setFilteredLaptops] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedLaptop, setSelectedLaptop] = useState(null);
  const [sortOption, setSortOption] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [category, setCategory] = useState("All Laptops");
  const [categories, setCategories] = useState(["All Laptops"]);
  const [currentMode, setCurrentMode] = useState("buy"); // Default mode
  const [availableProcessors, setAvailableProcessors] = useState([]);
  const [availableRAM, setAvailableRAM] = useState([]);
  const cardRefs = useRef([]);

  const location = useLocation();
  const navigate = useNavigate();

  // Fetch all laptops from the API
  useEffect(() => {
    const fetchLaptops = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/api/laptops`
        );
        setLaptops(response.data);
      } catch (error) {
        console.error("Failed to fetch laptops:", error);
      }
    };
    fetchLaptops();
  }, []);

  // Process URL parameters and update current mode
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    // Get mode from URL parameters or default to "buy"
    const modeParam = params.get("mode") || "buy";
    setCurrentMode(modeParam);

    // Reset filters when mode changes
    if (modeParam !== currentMode) {
      setSortOption("");
      setPriceRange("");
      setCategory("All Laptops");
    }
  }, [location.search]);

  // Extract categories specific to the current mode
  useEffect(() => {
    // Filter laptops by current mode
    const modeLaptops = laptops.filter((laptop) => {
      const laptopMode = laptop.mode || "buy";
      return laptopMode === currentMode;
    });

    // Extract unique categories from filtered laptops
    const uniqueCategories = [
      "All Laptops",
      ...new Set(modeLaptops.map((laptop) => laptop.category).filter(Boolean)),
    ];
    setCategories(uniqueCategories);

    // Extract unique processors
    const uniqueProcessors = [
      ...new Set(modeLaptops.map((laptop) => laptop.processor).filter(Boolean)),
    ];
    setAvailableProcessors(uniqueProcessors);

    // Extract unique RAM options
    const uniqueRAM = [
      ...new Set(modeLaptops.map((laptop) => laptop.RAM).filter(Boolean)),
    ];
    setAvailableRAM(uniqueRAM);

    // Reset category if current category is not available in this mode
    if (category !== "All Laptops" && !uniqueCategories.includes(category)) {
      setCategory("All Laptops");
    }
  }, [laptops, currentMode]);

  // Process URL parameters and filter laptops accordingly
  useEffect(() => {
    const params = new URLSearchParams(location.search);

    const filters = {
      ram: params.get("ram"),
      processor: params.get("processor"),
      category: params.get("category"),
      mode: currentMode,
    };

    if (filters.category) setCategory(filters.category);

    let filtered = laptops.filter((laptop) => {
      const laptopMode = laptop.mode || "buy"; // Default to "buy" for legacy data

      return (
        // Filter by mode
        laptopMode === filters.mode &&
        // Filter by other parameters if present
        (!filters.ram || laptop.RAM === filters.ram) &&
        (!filters.processor || laptop.processor === filters.processor) &&
        (!filters.category || laptop.category === filters.category)
      );
    });

    setFilteredLaptops(filtered);
  }, [location.search, laptops, currentMode]);

  // Apply additional filters (price range, sort options, category)
  useEffect(() => {
    applyFilters();
  }, [sortOption, priceRange, category, currentMode]);

  const applyFilters = () => {
    let updatedLaptops = [...laptops];

    // First filter by mode
    updatedLaptops = updatedLaptops.filter((laptop) => {
      const laptopMode = laptop.mode || "buy"; // Default to "buy" for legacy data
      return laptopMode === currentMode;
    });

    // Then apply other filters
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

  const handleCategoryClick = (cat) => {
    setCategory(cat);

    // Update URL to reflect category change while preserving other parameters
    const params = new URLSearchParams(location.search);

    if (cat === "All Laptops") {
      params.delete("category");
    } else {
      params.set("category", cat);
    }

    navigate(`?${params.toString()}`);
  };

  const handleModeChange = (newMode) => {
    // Update URL to change mode
    const params = new URLSearchParams(location.search);
    params.set("mode", newMode);

    // Remove category if changing modes (since categories may differ between modes)
    params.delete("category");

    navigate(`?${params.toString()}`);
  };

  const scrollToSpecs = debounce((rowIndex, name) => {
    cardRefs.current[rowIndex]?.[name]?.scrollIntoView({
      behavior: "smooth",
    });
  }, 100);

  const handleToggleSpecs = (laptop, rowIndex) => {
    if (selectedRow === rowIndex && selectedLaptop?.name === laptop.name) {
      setSelectedRow(null);
      setSelectedLaptop(null);
    } else {
      setSelectedRow(rowIndex);
      setSelectedLaptop(laptop);
      scrollToSpecs(rowIndex, laptop.name);
    }
  };

  const rows = [];
  for (let i = 0; i < filteredLaptops.length; i += ROW_SIZE) {
    rows.push(filteredLaptops.slice(i, i + ROW_SIZE));
  }

  // Action button text based on current mode
  const getActionButtonText = () => {
    return currentMode === "buy" ? "Buy Now!" : "Rent Now!";
  };

  // Dynamic page title based on mode
  const getPageTitle = () => {
    return currentMode === "buy" ? "Buy Laptops" : "Rental Laptops";
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">{getPageTitle()}</h1>

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
        {categories.map((cat) => (
          <button
            key={cat}
            disabled={category === cat}
            className={`category-btn ${category === cat ? "active" : ""}`}
            onClick={() => handleCategoryClick(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="card_div">
        {filteredLaptops.length === 0 ? (
          <p className="no-results">
            No {currentMode === "buy" ? "laptops for sale" : "rental laptops"}{" "}
            match the selected filters.
          </p>
        ) : (
          rows.map((row, rowIndex) => (
            <div key={rowIndex}>
              <div className="card-container">
                {row.map((laptop) => (
                  <div
                    key={laptop._id}
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
                      mode={currentMode}
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
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "/default-laptop-image.jpg"; // Fallback image
                        }}
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
                      <button className="rent-now">
                        {getActionButtonText()}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RentalLaptops;
