import React from "react";
import "./RentalCard.css";

const LaptopCard = ({ product, isSelected, mode = "buy" }) => {
  const actionText = mode === "buy" ? "Buy Now" : "Rent Now";

  return (
    <div className={`product-card ${isSelected ? "selected" : ""}`}>
      <div className="product-badge">{product.name}</div>
      <div className="product-img">
        <img
          src={product.image}
          alt={product.name}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/default-laptop-image.jpg"; // Fallback image
          }}
        />
        <button className={`wishlist-btn ${isSelected ? "active" : ""}`}>
          <svg viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </button>
      </div>
      <div className="product-info">
        {/* <h3 className="product-name">{product.name}</h3> */}
        <div className="product-specs">
          <div className="product-spec">
            <span>Processor</span>
            <span>{product.processor}</span>
          </div>
          <div className="product-spec">
            <span>RAM</span>
            <span>{product.RAM}</span>
          </div>
          <div className="product-spec">
            <span>Storage</span>
            <span>{product.Storage}</span>
          </div>
          <div className="product-spec">
            <span>Display</span>
            <span>{product.Display}</span>
          </div>
        </div>
        <div className="product-pricing">
          <div className="product-price">{product.price}</div>
          <button className="cta-button">{actionText}</button>
        </div>
      </div>
    </div>
  );
};

export default LaptopCard;
