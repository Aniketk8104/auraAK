import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
// import "./styles.css";
import "../components/Header_Quickbook.css";

export default function Header() {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState({
    ram: "",
    processor: "",
    category: "",
  });
  const [dropdownType, setDropdownType] = useState(null);
  const [selectedSearchOption, setSelectedSearchOption] = useState(null);
  const [activeTab, setActiveTab] = useState("buy");

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      setIsLoggedIn(true);
      setIsAdmin(true);
    } else {
      setIsLoggedIn(false);
      setIsAdmin(false);
    }
  }, []);

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleLogoutClick = () => {
    localStorage.removeItem("adminToken");
    setIsLoggedIn(false);
    setIsAdmin(false);
    navigate("/");
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const ramOptions = [
    { label: "8 GB", value: "8gb" },
    { label: "12 GB", value: "12gb" },
    { label: "16 GB", value: "16gb" },
    { label: "32 GB", value: "32gb" },
  ];

  const processorOptions = [
    { label: "Intel Core i5", value: "i5" },
    { label: "Intel Core i7", value: "i7" },
    { label: "Intel Core i9", value: "i9" },
    { label: "AMD Ryzen 5", value: "ryzen5" },
    { label: "AMD Ryzen 7", value: "ryzen7" },
  ];

  const categoryOptions = [
    { label: "Gaming", value: "gaming" },
    { label: "Business", value: "business" },
    { label: "Student", value: "student" },
    { label: "Creative Professional", value: "creative" },
  ];

  const handleOptionSelect = (type, option) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [type]: option.label,
    }));
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
          <div
            className="search-bar search-small"
            onClick={() => setShowDropdown(!showDropdown)}
          >
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
            <button className="search-button">
              {activeTab === "buy" ? "Buy Laptop" : "Rent Laptop"}
            </button>
          </div>
        )}

        <div className="user-options">
          <span
            {...(isLoggedIn ? (
              <button className="logout-btn" onClick={handleLogoutClick}>
                Logout
              </button>
            ) : (
              <button className="login-btn" onClick={handleLoginClick}></button>
            ))}
            className="host-link"
          >
            Welcome To Aira Tech
          </span>
          <span className="globe-icon">🌐</span>
          <div className="user-menu">
            <span className="menu-icon">☰</span>
            <div className="user-avatar"></div>
          </div>
        </div>
      </nav>

      {!isScrolled && (
        <div
          className="search-bar"
          onClick={() => setShowDropdown(!showDropdown)}
        >
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
          <button className="search-button">
            {activeTab === "buy" ? "Buy Laptop" : "Rent Laptop"}
          </button>
        </div>
      )}

      {showDropdown && (
        <div className="search-dropdown">
          {dropdownType === "ram" && (
            <>
              <div className="suggestion-item header">RAM Options</div>
              {ramOptions.map((ram) => (
                <div
                  key={ram.value}
                  className="suggestion-item"
                  onClick={() => handleOptionSelect("ram", ram)}
                >
                  <span className="location">{ram.label}</span>
                </div>
              ))}
            </>
          )}

          {dropdownType === "processor" && (
            <>
              <div className="suggestion-item header">Processor Options</div>
              {processorOptions.map((processor) => (
                <div
                  key={processor.value}
                  className="suggestion-item"
                  onClick={() => handleOptionSelect("processor", processor)}
                >
                  <span className="location">{processor.label}</span>
                </div>
              ))}
            </>
          )}

          {dropdownType === "category" && (
            <>
              <div className="suggestion-item header">Laptop Categories</div>
              {categoryOptions.map((category) => (
                <div
                  key={category.value}
                  className="suggestion-item"
                  onClick={() => handleOptionSelect("category", category)}
                >
                  <span className="location">{category.label}</span>
                </div>
              ))}
            </>
          )}
        </div>
      )}
    </header>
  );
}
