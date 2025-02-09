import React, { useState } from "react";
import axios from "axios";
import "./Popup.css";

const Popup = () => {
  const [isVisible, setIsVisible] = useState(
    !localStorage.getItem("popupShown")
  );
  const [mobileNumber, setMobileNumber] = useState("");

  const closePopup = async () => {
    if (mobileNumber.match(/^\d{10}$/)) {
      try {
        await axios.post(`${process.env.REACT_APP_BASE_URL}/api/mobile/save`, {
          number: mobileNumber,
        });
        setIsVisible(false);
        localStorage.setItem("popupShown", "true");
      } catch (error) {
        console.error("Error saving number", error);
      }
    } else {
      alert("Please enter a valid 10-digit mobile number.");
    }
  };

  return (
    isVisible && (
      <div className="popup-container active">
        <div className="popup-content">
          <button className="close-btn" onClick={() => setIsVisible(false)}>
            ×
          </button>
          <h2>Welcome</h2>
          <p>
            Enter your mobile number now for a seamless renting experience and
            gain more discounts.
          </p>
          <input
            type="tel"
            placeholder="Enter your mobile number"
            className="popup-input"
            pattern="[0-9]{10}"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
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
