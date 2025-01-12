import React, { useState } from "react";
import Sidebar from "./Sidebar";
import ManageSlideshow from "./ManageSlideshow";
import AnotherSection from "./AnotherSection";
import ErrorMessage from "../Shared/ErrorMessage";

const AdminDashboard = () => {
  const [currentSection, setCurrentSection] = useState("manageSlideshow");
  const [error, setError] = useState("");

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Sidebar Navigation */}
      <Sidebar currentSection={currentSection} onSectionChange={setCurrentSection} />

      {/* Main Content */}
      <div style={{ flex: 1, padding: "20px", backgroundColor: "#ecf0f1" }}>
        {error && <ErrorMessage message={error} />}
        {currentSection === "manageSlideshow" && <ManageSlideshow setError={setError} />}
        {currentSection === "anotherSection" && <AnotherSection />}
      </div>
    </div>
  );
};

export default AdminDashboard;
