import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ManageLaptops.css";
import * as XLSX from "xlsx";

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
    Brand: "",
    category: "",
    image: null,
  });
  const [editingLaptopId, setEditingLaptopId] = useState(null);
  const [expandedLaptopId, setExpandedLaptopId] = useState(null);
  const [excelFile, setExcelFile] = useState(null);
  const [importedLaptops, setImportedLaptops] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchLaptops = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/api/laptops`
        );
        setLaptops(response.data);
      } catch (err) {
        console.error("Error fetching laptops:", err);
        setError("Failed to fetch laptops.");
      } finally {
        setLoading(false);
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

  const handleExcelFileChange = (e) => {
    const file = e.target.files?.[0];
    setExcelFile(file || null);
  };

  const processExcelFile = () => {
    console.log("processExcelFile clicked");
    if (!excelFile) {
      alert("Please select an Excel file");
      return;
    }

    console.log("excelFile:", excelFile);

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = e.target?.result;
        const workbook = XLSX.read(data, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

        console.log("Raw Excel Data:", data);
        console.log("Parsed Excel Data:", worksheet);

        const validatedLaptops = worksheet
          .map((laptop) => ({
            name: laptop.name || "",
            processor: laptop.processor || "",
            price: Number(laptop.price) || 0,
            RAM: laptop.RAM || "",
            Storage: laptop.Storage || "",
            Graphic: laptop.Graphic || "",
            Display: laptop.Display || "",
            category: laptop.category || "",
            Brand: laptop.Brand || "",
            image: null,
          }))
          .filter((laptop) => laptop.name && laptop.price > 0);

        console.log("Validated Laptops:", validatedLaptops);

        setImportedLaptops(validatedLaptops);
      } catch (error) {
        console.error("Error processing Excel file:", error);
        setError("Error processing Excel file.");
      }
    };

    reader.readAsBinaryString(excelFile);
  };

  const handleBulkImport = async () => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      setError("Unauthorized. Please log in.");
      return;
    }

    setLoading(true);
    try {
      const importResults = await Promise.all(
        importedLaptops.map(async (laptop) => {
          const formData = new FormData();
          Object.entries(laptop).forEach(([key, value]) => {
            if (key !== "image") {
              formData.append(key, value.toString());
            }
          });

          try {
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
            return { success: true, data: response.data };
          } catch (err) {
            console.error("Import error for laptop:", laptop.name, err);
            return { success: false, error: err.message, laptop };
          }
        })
      );

      const successfulImports = importResults
        .filter((result) => result.success)
        .map((result) => result.data);
      const failedImports = importResults.filter((result) => !result.success);

      setLaptops((prev) => [...prev, ...successfulImports]);
      setImportedLaptops([]);
      setExcelFile(null);

      if (failedImports.length > 0) {
        setError(
          `Failed to import ${failedImports.length} laptops. Check console for details.`
        );
      } else {
        alert(`Successfully imported ${successfulImports.length} laptops`);
      }
    } catch (err) {
      console.error("Bulk import error:", err);
      setError("Failed to import laptops");
    } finally {
      setLoading(false);
    }
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

    setLoading(true);
    try {
      let response;
      if (editingLaptopId) {
        response = await axios.put(
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
            laptop._id === editingLaptopId ? response.data : laptop
          )
        );
        setEditingLaptopId(null);
        alert("Laptop updated successfully!");
      } else {
        response = await axios.post(
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
        Brand: "",
        category: "",
        image: null,
      });
      setError("");
    } catch (err) {
      console.error("Error adding or updating laptop:", err);
      setError("Failed to add or update laptop.");
    } finally {
      setLoading(false);
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
      Brand: laptop.Brand,
      category: laptop.category,
      image: null,
    });
    setEditingLaptopId(laptop._id);
  };

  const handleDeleteLaptop = async (id) => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      setError("Unauthorized. Please log in.");
      return;
    }

    setLoading(true);
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
    } finally {
      setLoading(false);
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
          name="category"
          placeholder="category"
          value={newLaptop.category}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="Brand"
          placeholder="Laptop barnd"
          value={newLaptop.Brand}
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
        <button type="submit" disabled={loading}>
          {loading
            ? "Loading..."
            : editingLaptopId
            ? "Update Laptop"
            : "Add Laptop"}
        </button>
      </form>
      <div className="excel-import">
        <h3>Import Laptops via Excel</h3>
        <input
          type="file"
          accept=".xlsx, .xls, .csv"
          onChange={handleExcelFileChange}
        />
        <button onClick={processExcelFile} disabled={loading}>
          {loading ? "Loading..." : "Process Excel"}
        </button>
        {importedLaptops.length > 0 && (
          <div>
            <h4>Preview Imported Laptops</h4>
            <button onClick={handleBulkImport} disabled={loading}>
              {loading ? "Loading..." : "Import All"}
            </button>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Processor</th>
                  <th>Price</th>
                  <th>RAM</th>
                  <th>Storage</th>
                </tr>
              </thead>
              <tbody>
                {importedLaptops.map((laptop, index) => (
                  <tr key={index}>
                    <td>{laptop.name}</td>
                    <td>{laptop.processor}</td>
                    <td>{laptop.price}</td>
                    <td>{laptop.RAM}</td>
                    <td>{laptop.Storage}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <div className="laptops-display">
        <ul>
          {laptops.map((laptop, index) => (
            <li key={laptop._id || index}>
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
                  <p>Brand: {laptop.Brand}</p>
                  <p>category: {laptop.category}</p>
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
