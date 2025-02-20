import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../components/Header_Quickbook.css";

export default function Header() {
  const navigate = useNavigate();
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
  const [activeTab, setActiveTab] = useState("buy");
  const [filters, setFilters] = useState({
    ram: [],
    processor: [],
    category: [],
  });

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    setIsLoggedIn(!!token);
    setIsAdmin(!!token);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // **Fetch Filter Options from Backend**
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

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleRentNow = (e) => {
    e.stopPropagation(); // Prevents dropdown from toggling
    const queryParams = new URLSearchParams(selectedOptions).toString();
    navigate(`/rental-laptops?${queryParams}`);
  };

  return (
    <header className={`navbar ${isScrolled ? "scrolled" : ""}`}>
      <nav className="top-nav">
        <a href="/">
          <div className="logo">
            <img src="/img/logo.png" alt="Aura Tech Services company logo" />
          </div>
        </a>
        <div className="buy-rent-options">
          <div
            className={activeTab === "buy" ? "selected" : ""}
            onClick={() => handleTabClick("buy")}
          >
            BUY
          </div>
          <div
            className={activeTab === "rent" ? "selected" : ""}
            onClick={() => handleTabClick("rent")}
          >
            RENT
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
            <button className="search-button" onClick={handleRentNow}>
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
          <span className="host-link">Welcome To Aira Tech</span>
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
          <button className="search-button" onClick={handleRentNow}>
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
