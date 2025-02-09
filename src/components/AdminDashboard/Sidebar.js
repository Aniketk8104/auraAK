import React from "react";
import "./Sidebar.css";

const Sidebar = ({ currentSection, onSectionChange }) => {
  return (
    <nav className="sidebar">
      <h3 className="sidebar-title">Admin Dashboard</h3>
      <ul className="sidebar-menu">
        <li
          className={`sidebar-menu-item ${
            currentSection === "manageSlideshow" ? "active" : ""
          }`}
          onClick={() => onSectionChange("manageSlideshow")}
        >
          Manage Slideshow
        </li>
        <li
          className={`sidebar-menu-item ${
            currentSection === "anotherSection" ? "active" : ""
          }`}
          onClick={() => onSectionChange("anotherSection")}
        >
          Another Section
        </li>
        <li
          className={`sidebar-menu-item ${
            currentSection === "manageLaptops" ? "active" : ""
          }`}
          onClick={() => onSectionChange("manageLaptops")}
        >
          Manage Laptops
        </li>
        <li
          className={`sidebar-menu-item ${
            currentSection === "manageMobileNumbers" ? "active" : ""
          }`}
          onClick={() => onSectionChange("manageMobileNumbers")}
        >
          Manage Mobile Numbers
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
