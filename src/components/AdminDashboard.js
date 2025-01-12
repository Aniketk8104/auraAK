import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [data, setData] = useState("");
  const [error, setError] = useState("");
  const [slides, setSlides] = useState([]);
  const [newImage, setNewImage] = useState(null);
  const [newTitle, setNewTitle] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("adminToken");
      try {
        const response = await axios.get("http://localhost:4000/api/admin/protected", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(response.data.data);
      } catch (err) {
        setError(err.response?.data?.message || "Access denied");
      }
    };

    const fetchSlides = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/slideshow");
        setSlides(response.data);
      } catch (err) {
        setError("Failed to fetch slideshow images.");
      }
    };

    fetchData();
    fetchSlides();
  }, []);

  const handleAddImage = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("adminToken");
    const formData = new FormData();
    formData.append("image", newImage);
    formData.append("title", newTitle);

    try {
      const response = await axios.post("http://localhost:4000/api/slideshow", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setSlides((prevSlides) => [...prevSlides, response.data]); // Add new image directly to the state
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
      await axios.delete(`http://localhost:4000/api/slideshow/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSlides((prevSlides) => prevSlides.filter((slide) => slide._id !== id)); // Remove deleted slide from the state
      alert("Image deleted successfully!");
    } catch (err) {
      setError("Failed to delete image.");
    }
  };


  return (
    <div style={{ padding: "20px" }}>
      <h1>Admin Dashboard</h1>
      {error ? <p style={{ color: "red" }}>{error}</p> : <p>{data}</p>}

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

      <div>
        {slides.map((slide) => (
          <div key={slide._id} style={{ marginTop: "20px" }}>
            <img src={slide.imageUrl} alt={slide.title} style={{ width: "200px" }} />
            <p>{slide.title}</p>
            <button onClick={() => handleDeleteImage(slide._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
