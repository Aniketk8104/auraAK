import React, { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import "../components/Header_Quickbook.css";

export default function ImprovedHeader() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [, setIsAdmin] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState({
    ram: "",
    processor: "",
    category: "",
  });
  const [dropdownType, setDropdownType] = useState(null);
  const [selectedSearchOption, setSelectedSearchOption] = useState(null);
  const [activeTab, setActiveTab] = useState("buy"); // Default mode
  const [filters, setFilters] = useState({
    ram: [],
    processor: [],
    category: [],
  });

  // Check authentication status
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    setIsLoggedIn(!!token);
    setIsAdmin(!!token);
  }, []);

  // Detect scrolling for header style changes
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Extract mode from URL parameters on component mount AND on location change
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const modeParam = params.get("mode");
    if (modeParam === "rent" || modeParam === "buy") {
      setActiveTab(modeParam);
    }

    // Extract any filter parameters and set them in state
    // But DON'T extract the category parameter - this keeps QuickBook category independent
    const ramParam = params.get("ram");
    const processorParam = params.get("processor");

    setSelectedOptions((prev) => ({
      ...prev,
      ram: ramParam || "",
      processor: processorParam || "",
      // Don't update category from URL to keep it independent from the page filters
    }));
  }, [location.search]);

  // Fetch filter options from backend
  useEffect(() => {
    fetch(`${process.env.REACT_APP_BASE_URL}/api/laptops/filters`)
      .then((response) => response.json())
      .then((data) => {
        setFilters({
          ram: data.rams || [],
          processor: data.processors || [],
          category: data.categorys || [],
        });
      })
      .catch((error) => console.error("Error fetching filters:", error));
  }, []);

  const handleOptionSelect = (type, option) => {
    setSelectedOptions((prev) => ({ ...prev, [type]: option }));
    setShowDropdown(false);
  };

  const handleSearchOptionClick = (type) => {
    setDropdownType(type);
    setSelectedSearchOption(type);
    setShowDropdown(true);
  };

  // Handle tab change WITHOUT navigation - only changes the local state
  const handleTabClick = (tab) => {
    setActiveTab(tab);
    // No navigation happens here
  };

  // Navigate to rental/buy laptops with selected filters - ONLY when the action button is clicked
  const handleActionButton = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const params = new URLSearchParams();

    // Add the active mode to the URL parameters
    params.set("mode", activeTab);

    // Add any selected filters to the URL parameters
    if (selectedOptions.ram) params.set("ram", selectedOptions.ram);
    if (selectedOptions.processor)
      params.set("processor", selectedOptions.processor);
    if (selectedOptions.category)
      params.set("category", selectedOptions.category);

    // Clear all selected options after navigation
    setSelectedOptions({
      ram: "",
      processor: "",
      category: "",
    });

    navigate(`/rental-laptops?${params.toString()}`);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        showDropdown &&
        !event.target.closest(".search-option") &&
        !event.target.closest(".search-dropdown")
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  return (
    <header className={`navbar ${isScrolled ? "scrolled" : ""}`}>
      <nav className="top-nav">
        <Link to="/">
          <div className="logo">
            <img src="/img/logo.png" alt="Aura Tech Services company logo" />
          </div>
        </Link>

        <div className="buy-rent-options">
          <div
            className={activeTab === "buy" ? "selected" : ""}
            onClick={() => handleTabClick("buy")}
          >
            <span>BUY</span>
          </div>
          <div
            className={activeTab === "rent" ? "selected" : ""}
            onClick={() => handleTabClick("rent")}
          >
            <span>RENT</span>
          </div>
        </div>

        {isScrolled && (
          <div className="search-bar search-small">
            {["ram", "processor", "category"].map((type) => (
              <React.Fragment key={type}>
                <div
                  className={`search-option ${
                    selectedSearchOption === type ? "selected" : ""
                  }`}
                  onClick={() => handleSearchOptionClick(type)}
                >
                  <span className="label">Select</span>
                  <span className="placeholder">
                    {selectedOptions[type] ||
                      `${type.charAt(0).toUpperCase() + type.slice(1)}`}
                  </span>
                </div>
                {type !== "category" && <div className="divider"></div>}
              </React.Fragment>
            ))}
            <button className="search-button" onClick={handleActionButton}>
              {activeTab === "buy" ? "Buy Laptop" : "Rent Now"}
            </button>
          </div>
        )}

        <div className="user-options">
          {isLoggedIn ? (
            <button
              className="logout-btn"
              onClick={() => {
                localStorage.removeItem("adminToken");
                setIsLoggedIn(false);
                navigate("/");
              }}
            >
              Logout
            </button>
          ) : (
            <button
              className="login-btn"
              onClick={() => navigate("/login")}
            ></button>
          )}
          <span className="host-link">Welcome To Aura Tech</span>
          <span className="globe-icon">🌐</span>
          <div className="user-menu">
            <span className="menu-icon">☰</span>
            <div className="user-avatar"></div>
          </div>
        </div>
      </nav>

      {!isScrolled && (
        <div className="search-bar">
          {["ram", "processor", "category"].map((type) => (
            <React.Fragment key={type}>
              <div
                className={`search-option ${
                  selectedSearchOption === type ? "selected" : ""
                }`}
                onClick={() => handleSearchOptionClick(type)}
              >
                <span className="label">Select</span>
                <span className="placeholder">
                  {selectedOptions[type] ||
                    `${type.charAt(0).toUpperCase() + type.slice(1)}`}
                </span>
              </div>
              {type !== "category" && <div className="divider"></div>}
            </React.Fragment>
          ))}
          <button className="search-button" onClick={handleActionButton}>
            {activeTab === "buy" ? "Buy Laptop" : "Rent Now"}
          </button>
        </div>
      )}

      {showDropdown && dropdownType && filters[dropdownType]?.length > 0 && (
        <div className="search-dropdown">
          <div className="suggestion-item header">
            {dropdownType.toUpperCase()} Options
          </div>
          {filters[dropdownType].map((option, index) => (
            <div
              key={index}
              className="suggestion-item"
              onClick={() => handleOptionSelect(dropdownType, option)}
            >
              <span className="location">{option}</span>
            </div>
          ))}
        </div>
      )}
    </header>
  );
}
