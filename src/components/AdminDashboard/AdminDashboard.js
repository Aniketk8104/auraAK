import React, { useState } from "react";
import Sidebar from "./Sidebar";
import ManageSlideshow from "./ManageSlideshow";
import ManageLaptops from "./ManageLaptops";
import ManageMobileNumbers from "./ManageMobileNumbers";
import ErrorMessage from "../Shared/ErrorMessage";
import QRdemo from "./QRdemo";

const AdminDashboard = () => {
  const [currentSection, setCurrentSection] = useState("manageSlideshow");
  const [error, setError] = useState("");

  return (
    <div style={{ display: "flex", height: "100vh", marginTop: "120px" }}>
      {/* Sidebar Navigation */}
      <Sidebar
        currentSection={currentSection}
        onSectionChange={setCurrentSection}
      />

      {/* Main Content */}
      <div style={{ flex: 1, padding: "20px", backgroundColor: "#ecf0f1" }}>
        {error && <ErrorMessage message={error} />}
        {currentSection === "manageSlideshow" && (
          <ManageSlideshow setError={setError} />
        )}
        {currentSection === "manageLaptops" && (
          <ManageLaptops setError={setError} />
        )}
        {currentSection === "manageMobileNumbers" && <ManageMobileNumbers />}
        {currentSection === "QRdemo" && <QRdemo />}
      </div>
    </div>
  );
};

export default AdminDashboard;
