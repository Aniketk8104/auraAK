import React, { useState } from "react";
import "./Popup.css";

const Popup = () => {
  const [isVisible, setIsVisible] = useState(
    !localStorage.getItem("popupShown")
  );

  const closePopup = () => {
    setIsVisible(false);
    localStorage.setItem("popupShown", "true");
  };

  return (
    isVisible && (
      <div className="popup-container active">
        <div className="popup-content">
          <button className="close-btn" onClick={closePopup}>
            ×
          </button>
          <h2>Welcome</h2>
          <p>
            Enter your mobile number now for a seamless renting experience and
            gain more discounts.
          </p>
          <input
            type="tel"
            name="mobile"
            placeholder="Enter your mobile number"
            className="popup-input"
            pattern="[0-9]{10}"
            title="Please enter a valid 10-digit mobile number."
            required
          />
          <button className="popup-submit" onClick={closePopup}>
            Submit
          </button>
        </div>
      </div>
    )
  );
};

export default Popup;
