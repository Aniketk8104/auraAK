import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import RentalCard from "../components/RentalCard";
import axios from "axios";
import "./RentalLaptops.css";

const ROW_SIZE = 4;

const RentalLaptops = () => {
  const [laptops, setLaptops] = useState([]);
  const [filteredLaptops, setFilteredLaptops] = useState([]);
  const [sortOption, setSortOption] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [category, setCategory] = useState("All Laptops");
  const [categories, setCategories] = useState(["All Laptops"]);
  const [currentMode, setCurrentMode] = useState("buy"); // Default mode
  const [availableProcessors, setAvailableProcessors] = useState([]);
  const [availableRAM, setAvailableRAM] = useState([]);

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
  }, [sortOption, priceRange, category, currentMode, laptops]);

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

  // Dynamic page title based on mode
  const getPageTitle = () => {
    return currentMode === "buy" ? "Buy Laptops" : "Rental Laptops";
  };

  return (
    <div>
      <div className="header">
        <h1>{getPageTitle()}</h1>

        <div className="filters">
          <select
            id="sort"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="">Sort by Popularity</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="popular">Trending</option>
            <option value="newest">Top Rated</option>
          </select>

          <select
            id="price-range"
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
          >
            <option value="">All Price Ranges</option>
            <option value="0-15000">Under ₹15,000</option>
            <option value="15000-25000">₹15,000 - ₹25,000</option>
            <option value="25000-35000">₹25,000 - ₹35,000</option>
            <option value="35000+">Premium (₹35,000+)</option>
          </select>
        </div>

        <div className="categories">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`category-btn ${category === cat ? "active" : ""}`}
              onClick={() => handleCategoryClick(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="products">
        {filteredLaptops.length === 0 ? (
          <p className="no-results">
            No {currentMode === "buy" ? "laptops for sale" : "rental laptops"}{" "}
            match the selected filters.
          </p>
        ) : (
          filteredLaptops.map((laptop) => (
            <RentalCard key={laptop._id} product={laptop} mode={currentMode} />
          ))
        )}
      </div>
    </div>
  );
};

export default RentalLaptops;
