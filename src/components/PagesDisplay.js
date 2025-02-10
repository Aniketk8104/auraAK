import React from "react";
import "./PagesDisplay.css";
import { Link } from "react-router-dom";

export default function PagesDisplay() {
  return (
    <nav className="pages-nav">
      <ul className="ulnav">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/rental-laptops">Rental Laptops</Link>
        </li>
        <li>
          {/* Uncomment when needed */}
          {/* <Link to="/rental-desktops">Rental Desktops</Link> */}
        </li>
        <li>{/* <Link to="/how-to-rent">How to Rent</Link> */}</li>
      </ul>
    </nav>
  );
}
