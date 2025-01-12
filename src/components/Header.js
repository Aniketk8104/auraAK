import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check if the user is logged in by looking for the token in localStorage
    const token = localStorage.getItem('adminToken');
    if (token) {
      setIsLoggedIn(true);
      setIsAdmin(true); // Consider this user as admin if token exists
    } else {
      setIsLoggedIn(false);
      setIsAdmin(false);
    }
  }, []);

  const handleLoginClick = () => {
    navigate('/login'); // Navigate to the login page
  }

  const handleLogoutClick = () => {
    localStorage.removeItem('adminToken'); // Remove the token from localStorage on logout
    setIsLoggedIn(false); // Update login state
    setIsAdmin(false); // Update admin state
    navigate('/'); // Navigate to the home page
  }

  const toggleNav = () => {
    setIsNavOpen((prev) => !prev);
  };

  return (
    <header>
      {/* Desktop Header */}
      <div className="sticky-wrapper">
        <div className="header-container">
          {/* Mobile Toggle Button */}
          <button
            className={`toggle-btn ${isNavOpen ? "active" : ""}`}
            aria-label="Toggle Navigation"
            onClick={toggleNav}
          >
            <i className={`fas ${isNavOpen ? "fa-times" : "fa-bars"}`}></i>
          </button>

          {/* Logo */}
          <a href="/"><div className="logo">
            <img src="/img/logo.png" alt="Aura Tech Services company logo" />
          </div>
          </a>
          {/* Header Right Section */}
          <div className="header-right">
            <div className="search-bar">
              <input
                type="text"
                placeholder="Search for products..."
                aria-label="Search bar"
              />
              <button>
                <i className="fas fa-search"></i>
              </button>
            </div>
            <div className="location">
              <select aria-label="Select location">
                <option>Mumbai</option>
                <option>Delhi</option>
                <option>Bangalore</option>
              </select>
            </div>
            {/* Conditionally render Login / Logout button */}
            {isLoggedIn ? (
              <button className="login-btn" onClick={handleLogoutClick}>Logout</button>
            ) : (
              <button className="login-btn" onClick={handleLoginClick}>Login / Signup</button>
            )}
          </div>
        </div>
      </div>

      {/* Conditionally Render Navbar Only for Non-Admin Users */}
      {!isAdmin && (
        <nav
          role="navigation"
          aria-label="Main menu"
          className={`nav-menu ${isNavOpen ? "active" : ""}`}
        >
          <ul className="ulnav">
            <li>
              <Link to="/" onClick={() => setIsNavOpen(false)}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/rental-laptops" onClick={() => setIsNavOpen(false)}>
                Rental Laptops
              </Link>
            </li>
            <li>
              {/* <Link to="/rental-desktops" onClick={() => setIsNavOpen(false)}>
                Rental Desktops
              </Link> */}
            </li>
            <li>
              {/* <Link to="/how-to-rent" onClick={() => setIsNavOpen(false)}>
                How to Rent
              </Link> */}
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
