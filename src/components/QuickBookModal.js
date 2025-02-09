import React from "react";
import QuickBookDropdown from "./QuickBookDropdown";
import "./QuickBookSection.css";

const QuickBookModal = ({ onClose }) => {
  return (
    <>
      <div className="quick-book-modal-backdrop" onClick={onClose}></div>
      <div className="quick-book-modal show">
        <button className="close-btn" onClick={onClose}>
          X
        </button>
        <div className="modal-content">
          <QuickBookDropdown
            label="Brand"
            options={["Dell", "HP", "Apple"]}
            name="Brand"
          />
          <QuickBookDropdown label="RAM" options={["8GB", "16GB"]} name="RAM" />
          <QuickBookDropdown
            label="Processor"
            options={["i5", "i7"]}
            name="processor"
          />
          <QuickBookDropdown
            label="City"
            options={["New York", "London", "Mumbai"]}
            name="city"
          />
          <button className="submit-button">Quick Search</button>
        </div>
      </div>
    </>
  );
};

export default QuickBookModal;
