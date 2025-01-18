import React, { useState } from "react";
import "./QuickBookSection.css";

const QuickBookSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mode, setMode] = useState("buy");
  const [form, setForm] = useState({
    brand: "",
    ram: "",
    processor: "",
    city: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    alert(
      `Mode: ${
        mode === "buy" ? "Quick Buy" : "Quick Rent"
      }\nForm Data: ${JSON.stringify(form)}`
    );
  };

  const toggleModal = () => {
    if (window.innerWidth <= 768) {
      setIsModalOpen(!isModalOpen);
    } else {
      handleSubmit();
    }
  };

  return (
    <div className="quick-book-section">
      {/* Mode Switcher */}
      <div className="mode-switcher">
        <button
          onClick={() => setMode("rent")}
          className={mode === "rent" ? "active" : ""}
        >
          Give on Rent
        </button>
        <button
          onClick={() => setMode("buy")}
          className={mode === "buy" ? "active" : ""}
        >
          Take on Rent
        </button>
        <div className="form-container_mobile">
          <select
            name="brand"
            value={form.brand}
            onChange={handleChange}
            className="dropdown"
          >
            <option value="">Select Brand</option>
            <option value="Dell">Dell</option>
            <option value="HP">HP</option>
            <option value="Apple">Apple</option>
          </select>

          <select
            name="ram"
            value={form.ram}
            onChange={handleChange}
            className="dropdown"
          >
            <option value="">Select RAM</option>
            <option value="8GB">8GB</option>
            <option value="16GB">16GB</option>
            <option value="32GB">32GB</option>
          </select>

          <select
            name="processor"
            value={form.processor}
            onChange={handleChange}
            className="dropdown"
          >
            <option value="">Select Processor</option>
            <option value="i5">i5</option>
            <option value="i7">i7</option>
            <option value="i9">i9</option>
          </select>

          <select
            name="city"
            value={form.city}
            onChange={handleChange}
            className="dropdown"
          >
            <option value="">Select City</option>
            <option value="New York">New York</option>
            <option value="London">London</option>
            <option value="Mumbai">Mumbai</option>
          </select>
        </div>
      </div>

      {/* Action Button */}
      <div className="button-container">
        <button onClick={toggleModal} className="submit-button">
          {mode === "buy" ? "Quick Buy" : "Quick Rent"}
        </button>
      </div>

      {/* Modal for Mobile */}
      {isModalOpen && (
        <>
          <div
            className="quick-book-modal-backdrop"
            onClick={toggleModal}
          ></div>
          <div className="quick-book-modal show">
            <button className="close-btn" onClick={toggleModal}>
              X
            </button>
            <div className="modal-content">
              <div className="form-container">
                <select
                  name="brand"
                  value={form.brand}
                  onChange={handleChange}
                  className="dropdown"
                >
                  <option value="">Select Brand</option>
                  <option value="Dell">Dell</option>
                  <option value="HP">HP</option>
                  <option value="Apple">Apple</option>
                </select>

                <select
                  name="ram"
                  value={form.ram}
                  onChange={handleChange}
                  className="dropdown"
                >
                  <option value="">Select RAM</option>
                  <option value="8GB">8GB</option>
                  <option value="16GB">16GB</option>
                  <option value="32GB">32GB</option>
                </select>

                <select
                  name="processor"
                  value={form.processor}
                  onChange={handleChange}
                  className="dropdown"
                >
                  <option value="">Select Processor</option>
                  <option value="i5">i5</option>
                  <option value="i7">i7</option>
                  <option value="i9">i9</option>
                </select>

                <select
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  className="dropdown"
                >
                  <option value="">Select City</option>
                  <option value="New York">New York</option>
                  <option value="London">London</option>
                  <option value="Mumbai">Mumbai</option>
                </select>
              </div>
              <div className="button-container">
                <button onClick={handleSubmit} className="submit-button">
                  {mode === "buy" ? "Quick Buy" : "Quick Rent"}
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default QuickBookSection;
