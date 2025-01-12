import React from "react";

const SlideCard = ({ slide, onDelete }) => {
  return (
    <div style={{ marginTop: "20px" }}>
      <img src={slide.imageUrl} alt={slide.title} style={{ width: "200px" }} />
      <p>{slide.title}</p>
      <button onClick={() => onDelete(slide._id)}>Delete</button>
    </div>
  );
};

export default SlideCard;
