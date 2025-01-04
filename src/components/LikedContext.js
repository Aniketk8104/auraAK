import React, { createContext, useContext, useState } from "react";

// Create Context
const LikedContext = createContext();

// Custom hook to access the context
export const useLiked = () => useContext(LikedContext);

// Provider to wrap around the app
export const LikedProvider = ({ children }) => {
  const [likedProducts, setLikedProducts] = useState([]);

  // Function to toggle like/unlike
  const toggleLike = (product) => {
    setLikedProducts((prev) => {
      const exists = prev.find((item) => item.name === product.name);
      if (exists) {
        return prev.filter((item) => item.name !== product.name);
      } else {
        return [...prev, product];
      }
    });
  };

  return (
    <LikedContext.Provider value={{ likedProducts, toggleLike }}>
      {children}
    </LikedContext.Provider>
  );
};
