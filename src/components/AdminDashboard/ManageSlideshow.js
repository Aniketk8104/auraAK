import React, { useEffect, useState } from "react";
import axios from "axios";
import SlideCard from "./SlideCard";
import "./ManageSlideshow.css";

const ManageSlideshow = ({ setError }) => {
  const [slides, setSlides] = useState([]);
  const [newImage, setNewImage] = useState(null);
  const [newTitle, setNewTitle] = useState("");

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const response = await axios.get(
          "http://3.108.52.173:5000//api/slideshow"
        );
        setSlides(response.data);
      } catch (err) {
        setError("Failed to fetch slideshow images.");
      }
    };

    fetchSlides();
  }, [setError]);

  const handleAddImage = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("adminToken");
    const formData = new FormData();
    formData.append("image", newImage);
    formData.append("title", newTitle);

    try {
      const response = await axios.post(
        "http://3.108.52.173:5000//api/slideshow",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setSlides((prevSlides) => [...prevSlides, response.data]);
      setNewImage(null);
      setNewTitle("");
      setError("");
      alert("Image added successfully!");
    } catch (err) {
      setError("Failed to add image.");
    }
  };

  const handleDeleteImage = async (id) => {
    const token = localStorage.getItem("adminToken");
    try {
      await axios.delete(`http://3.108.52.173:5000//api/slideshow/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSlides((prevSlides) => prevSlides.filter((slide) => slide._id !== id));
      alert("Image deleted successfully!");
    } catch (err) {
      setError("Failed to delete image.");
    }
  };

  return (
    <div class="slide-manage">
      <h2>Manage Slideshow</h2>
      <form onSubmit={handleAddImage}>
        <input
          type="file"
          onChange={(e) => setNewImage(e.target.files[0])}
          required
        />
        <input
          type="text"
          placeholder="Enter image title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <button type="submit">Add Image</button>
      </form>
      <div class="slides-display">
        {slides.map((slide) => (
          <SlideCard
            key={slide._id}
            slide={slide}
            onDelete={handleDeleteImage}
          />
        ))}
      </div>
    </div>
  );
};

export default ManageSlideshow;
