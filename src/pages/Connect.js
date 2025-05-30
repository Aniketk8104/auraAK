import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const Connect = () => {
  const [showPopup, setShowPopup] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  // Use useCallback to memoize the closePopup function
  const closePopup = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => {
      setShowPopup(false);
      navigate("/"); // Redirect to home page
    }, 300);
  }, [navigate]); // Add navigate as a dependency

  useEffect(() => {
    setIsVisible(true);

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        closePopup();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [closePopup]); // Add closePopup as a dependency

  if (!showPopup) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
        opacity: isVisible ? 1 : 0,
        transition: "opacity 0.3s ease",
        pointerEvents: "auto",
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="popup-title"
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "30px",
          borderRadius: "12px",
          textAlign: "center",
          width: "90%",
          maxWidth: "400px",
          position: "relative",
          boxShadow: "0 4px 20px rgba(0,0,0,0.25)",
          transform: isVisible ? "translateY(0)" : "translateY(-20px)",
          transition: "transform 0.3s ease, opacity 0.3s ease",
          opacity: isVisible ? 1 : 0,
          pointerEvents: "auto", // Ensure popup content is clickable
        }}
        // Prevent clicks inside popup from bubbling to overlay
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={closePopup}
          style={{
            position: "absolute",
            top: "12px",
            right: "15px",
            background: "transparent",
            border: "none",
            fontSize: "24px",
            cursor: "pointer",
            color: "#666",
            padding: "0 8px",
            borderRadius: "50%",
            transition: "color 0.2s ease",
          }}
          aria-label="Close popup"
          onMouseOver={(e) => (e.currentTarget.style.color = "#333")}
          onMouseOut={(e) => (e.currentTarget.style.color = "#666")}
        >
          &times;
        </button>
        <h2 id="popup-title" style={{ marginBottom: "20px", color: "#333" }}>
          Connect with Aura Tech
        </h2>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            alignItems: "center",
          }}
        >
          <a
            href="https://www.instagram.com/aura_tech18/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              backgroundColor: "#e1306c",
              color: "white",
              padding: "12px 20px",
              textDecoration: "none",
              borderRadius: "8px",
              display: "inline-block",
              width: "100%",
              maxWidth: "200px",
              fontSize: "16px",
              fontWeight: "500",
              transition: "transform 0.2s ease, background-color 0.2s ease",
              boxShadow: "0 2px 8px rgba(225, 48, 108, 0.3)",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.backgroundColor = "#c13568";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.backgroundColor = "#e1306c";
            }}
          >
            Instagram
          </a>
          <a
            href="https://wa.me/919967917846?text=%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%0A%20%20%20%20%20INQUIRY%0A%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%0A%0AHello%2C%0A%0AI%20scanned%20your%20QR%20code%20regarding%20laptop%20rental%20and%20sales%20services.%20I%27m%20interested%20in%20learning%20more%20about%20your%20offerings.%0A%0AREQUESTED%20INFO%3A%0A%E2%80%A2%20Laptop%20models%20available%0A%E2%80%A2%20Rental%20rates%2Fterms%0A%E2%80%A2%20Purchase%20options%0A%E2%80%A2%20Device%20specs%0A%E2%80%A2%20Additional%20services%0A%0ALooking%20forward%20to%20your%20response.%0A%0AThank%20you%2C"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              backgroundColor: "#25D366",
              color: "white",
              padding: "12px 20px",
              textDecoration: "none",
              borderRadius: "8px",
              display: "inline-block",
              width: "100%",
              maxWidth: "200px",
              fontSize: "16px",
              fontWeight: "500",
              transition: "transform 0.2s ease, background-color 0.2s ease",
              boxShadow: "0 2px 8px rgba(37, 211, 102, 0.3)",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.backgroundColor = "#1da851";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.backgroundColor = "#25D366";
            }}
          >
            WhatsApp
          </a>
        </div>
        <div
          style={{
            fontStyle: "italic",
            marginTop: "30px",
            marginBottom: "0px",
            fontSize: "50px",
          }}
        >
          <p>Close Popup for visit our website</p>
        </div>
      </div>
    </div>
  );
};

export default Connect;
