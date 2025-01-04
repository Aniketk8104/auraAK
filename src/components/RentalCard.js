import React from "react";
import "./RentalCard.css";

const RentalCard = ({ product, onShowSpecs, isSelected }) => (
  <div className={`foodCard ${isSelected ? "highlight" : ""}`}>
    <button className="Like">
      <i className="fas fa-heart"></i>
    </button>
    <div className="Discount">{product.name}</div>
    <div className="imageContainer">
      <img src={product.image} alt={product.name} />
    </div>
    <div className="foodTitle">Processor: {product.processor}</div>
    <div className="priceAndButton">
      <span className="Price">₹{product.price}</span>
      <button className="button" onClick={() => onShowSpecs(product)}>
        Click Now
        <br />
        to Rent
      </button>
    </div>
  </div>
);

export default RentalCard;
