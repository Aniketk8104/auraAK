import React from "react";
import { Link } from "react-router-dom";
const Header = () => (
  <header>
    <div className="sticky-wrapper">
      <div className="header-container">
        <div className="logo">
          <img src="/img/logo.png" alt="Aura Tech Services company logo" />
        </div>
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
            <select>
              <option>Mumbai</option>
              <option>Delhi</option>
              <option>Bangalore</option>
            </select>
          </div>
          <button className="login-btn">Login / Signup</button>
        </div>
      </div>
      <nav role="navigation" aria-label="Main menu">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/rental-laptops">Rental Laptops</Link>
          </li>
          <li>
            <Link to="/rental-desktops">Rental Desktops</Link>
          </li>
          <li>
            <Link to="/how-to-rent">How to Rent</Link>
          </li>
        </ul>
      </nav>
    </div>
  </header>
);

export default Header;
