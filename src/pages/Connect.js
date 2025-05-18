// src/pages/Connect.js

import React from "react";

const Connect = () => {
  return (
    <div style={{ textAlign: "center", padding: "50px", fontFamily: "Arial" }}>
      <h1>Connect with Aura Tech</h1>
      <a
        href="https://www.instagram.com/aura_tech18/"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          backgroundColor: "#e1306c",
          color: "white",
          padding: "15px 25px",
          textDecoration: "none",
          borderRadius: "8px",
          display: "inline-block",
          margin: "10px",
          fontSize: "18px",
        }}
      >
        Instagram
      </a>
      <a
        href="https://wa.me/919967917846"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          backgroundColor: "#25D366",
          color: "white",
          padding: "15px 25px",
          textDecoration: "none",
          borderRadius: "7px",
          display: "inline-block",
          margin: "10px",
          fontSize: "18px",
        }}
      >
        WhatsApp
      </a>
    </div>
  );
};

export default Connect;
