import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ManageLaptops.css";

const ManageLaptops = ({ setError }) => {
  const [laptops, setLaptops] = useState([]);
  const [newLaptop, setNewLaptop] = useState({
    name: "",
    processor: "",
    price: "",
    RAM: "",
    Storage: "",
    Graphic: "",
    Display: "",
    Resolution: "",
    image: null,
  });
  const [editingLaptopId, setEditingLaptopId] = useState(null);
  const [expandedLaptopId, setExpandedLaptopId] = useState(null);

  useEffect(() => {
    const fetchLaptops = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/api/laptops`
        );
        setLaptops(response.data);
      } catch (err) {
        console.error("Error fetching laptops:", err);
        setError("Failed to fetch laptops.");
      }
    };

    fetchLaptops();
  }, [setError]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewLaptop((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setNewLaptop((prev) => ({
      ...prev,
      image: e.target.files[0],
    }));
  };

  const handleAddOrUpdateLaptop = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("adminToken");
    if (!token) {
      setError("Unauthorized. Please log in.");
      return;
    }

    const formData = new FormData();
    Object.keys(newLaptop).forEach((key) => {
      if (key === "image" && newLaptop.image) {
        formData.append(key, newLaptop.image);
      } else if (key !== "image") {
        formData.append(key, newLaptop[key]);
      }
    });

    try {
      if (editingLaptopId) {
        // Update existing laptop
        await axios.put(
          `${process.env.REACT_APP_BASE_URL}/api/laptops/${editingLaptopId}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setLaptops((prev) =>
          prev.map((laptop) =>
            laptop._id === editingLaptopId
              ? { ...laptop, ...newLaptop, image: laptop.image }
              : laptop
          )
        );
        setEditingLaptopId(null);
        alert("Laptop updated successfully!");
      } else {
        // Add new laptop
        const response = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/api/laptops`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setLaptops((prev) => [...prev, response.data]);
        alert("Laptop added successfully!");
      }

      setNewLaptop({
        name: "",
        processor: "",
        price: "",
        RAM: "",
        Storage: "",
        Graphic: "",
        Display: "",
        Resolution: "",
        image: null,
      });
      setError("");
    } catch (err) {
      console.error("Error adding or updating laptop:", err);
      setError("Failed to add or update laptop.");
    }
  };

  const handleEditLaptop = (laptop) => {
    setNewLaptop({
      name: laptop.name,
      processor: laptop.processor,
      price: laptop.price,
      RAM: laptop.RAM,
      Storage: laptop.Storage,
      Graphic: laptop.Graphic,
      Display: laptop.Display,
      Resolution: laptop.Resolution,
      image: null, // Prevent overriding with a new image unless explicitly selected
    });
    setEditingLaptopId(laptop._id);
  };

  const handleDeleteLaptop = async (id) => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      setError("Unauthorized. Please log in.");
      return;
    }

    try {
      await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/api/laptops/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLaptops((prev) => prev.filter((laptop) => laptop._id !== id));
      alert("Laptop deleted successfully!");
    } catch (err) {
      console.error("Error deleting laptop:", err);
      setError("Failed to delete laptop.");
    }
  };

  const toggleDetails = (id) => {
    setExpandedLaptopId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="laptop-manage">
      <h2>Manage Laptops</h2>
      <form onSubmit={handleAddOrUpdateLaptop}>
        <input
          type="text"
          name="name"
          placeholder="Laptop Name"
          value={newLaptop.name}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="processor"
          placeholder="Processor"
          value={newLaptop.processor}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={newLaptop.price}
          onChange={handleInputChange}
          required
          min="0"
        />
        <input
          type="text"
          name="RAM"
          placeholder="RAM"
          value={newLaptop.RAM}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="Storage"
          placeholder="Storage"
          value={newLaptop.Storage}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="Graphic"
          placeholder="Graphics"
          value={newLaptop.Graphic}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="Display"
          placeholder="Display Size"
          value={newLaptop.Display}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="Resolution"
          placeholder="Resolution"
          value={newLaptop.Resolution}
          onChange={handleInputChange}
          required
        />
        <input
          type="file"
          name="image"
          onChange={handleImageChange}
          accept="image/*"
          required={!editingLaptopId}
        />
        <button type="submit">
          {editingLaptopId ? "Update Laptop" : "Add Laptop"}
        </button>
      </form>
      <div className="laptops-display">
        <ul>
          {laptops.map((laptop, index) => (
            <li key={laptop._id}>
              <div
                className="laptop-summary"
                onClick={() => toggleDetails(laptop._id)}
              >
                {index + 1}. {laptop.name}
              </div>
              {expandedLaptopId === laptop._id && (
                <div className="laptop-details">
                  <img
                    src={laptop.image}
                    alt={laptop.name}
                    className="laptop-image"
                  />
                  <p>Processor: {laptop.processor}</p>
                  <p>Price: ₹{laptop.price}</p>
                  <p>RAM: {laptop.RAM}</p>
                  <p>Storage: {laptop.Storage}</p>
                  <p>Graphics: {laptop.Graphic}</p>
                  <p>Display: {laptop.Display}</p>
                  <p>Resolution: {laptop.Resolution}</p>
                  <button onClick={() => handleEditLaptop(laptop)}>Edit</button>
                  <button onClick={() => handleDeleteLaptop(laptop._id)}>
                    Delete
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ManageLaptops;
