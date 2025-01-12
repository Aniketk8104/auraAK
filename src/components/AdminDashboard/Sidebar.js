import React from "react";

const Sidebar = ({ currentSection, onSectionChange }) => {
  return (
    <nav style={{ width: "250px", backgroundColor: "#2c3e50", color: "#ecf0f1", padding: "20px" }}>
      <h3>Admin Dashboard</h3>
      <ul style={{ listStyle: "none", padding: 0 }}>
        <li
          style={{
            padding: "10px 0",
            cursor: "pointer",
            color: currentSection === "manageSlideshow" ? "#3498db" : "#ecf0f1",
          }}
          onClick={() => onSectionChange("manageSlideshow")}
        >
          Manage Slideshow
        </li>
        <li
          style={{
            padding: "10px 0",
            cursor: "pointer",
            color: currentSection === "anotherSection" ? "#3498db" : "#ecf0f1",
          }}
          onClick={() => onSectionChange("anotherSection")}
        >
          Another Section
        </li>
        <li
          style={{
            padding: "10px 0",
            cursor: "pointer",
            color: currentSection === "anotherSection" ? "#3498db" : "#ecf0f1",
          }}
          onClick={() => onSectionChange("AKSection")}
        >
          AK Section
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
