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
    mode: "buy", // Default mode
  });
  const [editingLaptopId, setEditingLaptopId] = useState(null);
  const [expandedLaptopId, setExpandedLaptopId] = useState(null);
  const [excelFile, setExcelFile] = useState(null);
  const [importedLaptopsBuy, setImportedLaptopsBuy] = useState([]);
  const [importedLaptopsRent, setImportedLaptopsRent] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedMode, setSelectedMode] = useState("buy"); // default to "buy"

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

  // Update newLaptop mode when selectedMode changes
  useEffect(() => {
    setNewLaptop((prev) => ({ ...prev, mode: selectedMode }));
  }, [selectedMode]);

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
    if (!excelFile) {
      alert("Please select an Excel file");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = e.target?.result;
        const workbook = XLSX.read(data, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

        // Validate worksheet
        if (!worksheet.length) {
          setError("Excel file is empty or invalid format.");
          return;
        }

        // Validate headers
        const expectedHeaders = [
          "name",
          "processor",
          "price",
          "RAM",
          "Storage",
          "Graphic",
          "Display",
          "Brand",
          "category",
        ];
        const headers = Object.keys(worksheet[0]);
        const missingHeaders = expectedHeaders.filter(
          (h) => !headers.includes(h)
        );

        if (missingHeaders.length) {
          setError(`Missing headers in Excel: ${missingHeaders.join(", ")}`);
          return;
        }

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
            mode: selectedMode, // Set mode based on selected tab
          }))
          .filter((laptop) => laptop.name && laptop.price > 0);

        // Set imported laptops based on the selected mode
        if (selectedMode === "buy") {
          setImportedLaptopsBuy(validatedLaptops);
        } else {
          setImportedLaptopsRent(validatedLaptops);
        }
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

    // Get the right imported laptops based on mode
    const importedLaptops =
      selectedMode === "buy" ? importedLaptopsBuy : importedLaptopsRent;

    if (!importedLaptops.length) {
      setError("No laptops to import.");
      return;
    }

    setLoading(true);
    try {
      const importResults = await Promise.all(
        importedLaptops.map(async (laptop) => {
          const formData = new FormData();
          Object.entries(laptop).forEach(([key, value]) => {
            if (value !== null) {
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

      // Clear only the imported laptops for the current mode
      if (selectedMode === "buy") {
        setImportedLaptopsBuy([]);
      } else {
        setImportedLaptopsRent([]);
      }

      setExcelFile(null);
      document.querySelector('input[type="file"]').value = "";

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
      } else if (key !== "image" && newLaptop[key] !== null) {
        formData.append(key, newLaptop[key]);
      }
    });

    // Explicitly ensure mode is set
    formData.append("mode", selectedMode);

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

      // Reset form after successful submission
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
        mode: selectedMode, // Keep current mode
      });

      // Clear file input
      if (document.querySelector('input[type="file"]')) {
        document.querySelector('input[type="file"]').value = "";
      }

      setError("");
    } catch (err) {
      console.error("Error adding or updating laptop:", err);
      setError("Failed to add or update laptop.");
    } finally {
      setLoading(false);
    }
  };

  const handleEditLaptop = (laptop) => {
    // Switch to the appropriate mode tab when editing
    setSelectedMode(laptop.mode || "buy");

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
      mode: laptop.mode || "buy",
    });
    setEditingLaptopId(laptop._id);

    // Scroll to the form
    document.querySelector("form").scrollIntoView({ behavior: "smooth" });
  };

  const handleDeleteLaptop = async (id) => {
    if (!window.confirm("Are you sure you want to delete this laptop?")) return;

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

  // Get the current imported laptops based on mode
  const importedLaptops =
    selectedMode === "buy" ? importedLaptopsBuy : importedLaptopsRent;

  // Get filtered laptops for the current mode
  const filteredLaptops = laptops.filter(
    (laptop) =>
      laptop.mode === selectedMode || (selectedMode === "buy" && !laptop.mode) // Handle legacy data without mode
  );

  return (
    <div className="laptop-manage">
      <h2>Manage Laptops</h2>

      {/* Mode toggle buttons */}
      <div className="mode-toggle">
        <button
          className={selectedMode === "buy" ? "active" : ""}
          onClick={() => setSelectedMode("buy")}
        >
          Buy Laptops
        </button>
        <button
          className={selectedMode === "rent" ? "active" : ""}
          onClick={() => setSelectedMode("rent")}
        >
          Rent Laptops
        </button>
      </div>

      <div className="form-section">
        <h3>
          {editingLaptopId ? "Edit" : "Add"}{" "}
          {selectedMode === "buy" ? "Buy" : "Rent"} Laptop
        </h3>
        <form onSubmit={handleAddOrUpdateLaptop}>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="name">Laptop Name</label>
              <input
                id="name"
                type="text"
                name="name"
                placeholder="Laptop Name"
                value={newLaptop.name}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="processor">Processor</label>
              <input
                id="processor"
                type="text"
                name="processor"
                placeholder="Processor"
                value={newLaptop.processor}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="price">Price (₹)</label>
              <input
                id="price"
                type="number"
                name="price"
                placeholder="Price"
                value={newLaptop.price}
                onChange={handleInputChange}
                required
                min="0"
              />
            </div>

            <div className="form-group">
              <label htmlFor="RAM">RAM</label>
              <input
                id="RAM"
                type="text"
                name="RAM"
                placeholder="RAM"
                value={newLaptop.RAM}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="Storage">Storage</label>
              <input
                id="Storage"
                type="text"
                name="Storage"
                placeholder="Storage"
                value={newLaptop.Storage}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="Graphic">Graphics</label>
              <input
                id="Graphic"
                type="text"
                name="Graphic"
                placeholder="Graphics"
                value={newLaptop.Graphic}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="Display">Display Size</label>
              <input
                id="Display"
                type="text"
                name="Display"
                placeholder="Display Size"
                value={newLaptop.Display}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="category">Category</label>
              <input
                id="category"
                type="text"
                name="category"
                placeholder="Category (gaming, business, etc.)"
                value={newLaptop.category}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="Brand">Brand</label>
              <input
                id="Brand"
                type="text"
                name="Brand"
                placeholder="Laptop Brand"
                value={newLaptop.Brand}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="image">Laptop Image</label>
              <input
                id="image"
                type="file"
                name="image"
                onChange={handleImageChange}
                accept="image/*"
                required={!editingLaptopId}
              />
              {newLaptop.image && (
                <img
                  src={URL.createObjectURL(newLaptop.image)}
                  alt="Preview"
                  width="100"
                  className="image-preview"
                />
              )}
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" disabled={loading}>
              {loading
                ? "Loading..."
                : editingLaptopId
                ? "Update Laptop"
                : "Add Laptop"}
            </button>
            {editingLaptopId && (
              <button
                type="button"
                onClick={() => {
                  setEditingLaptopId(null);
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
                    mode: selectedMode,
                  });
                }}
              >
                Cancel Edit
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="excel-import">
        <h3>
          Import {selectedMode === "buy" ? "Buy" : "Rent"} Laptops via Excel
        </h3>
        <div className="excel-controls">
          <input
            type="file"
            accept=".xlsx, .xls, .csv"
            onChange={handleExcelFileChange}
          />
          <button onClick={processExcelFile} disabled={loading || !excelFile}>
            {loading ? "Loading..." : "Process Excel"}
          </button>
        </div>

        {importedLaptops.length > 0 && (
          <div className="imported-preview">
            <div className="import-header">
              <h4>
                Preview: {importedLaptops.length}{" "}
                {selectedMode === "buy" ? "Buy" : "Rent"} Laptops
              </h4>
              <button onClick={handleBulkImport} disabled={loading}>
                {loading ? "Importing..." : "Import All"}
              </button>
            </div>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Processor</th>
                    <th>Price (₹)</th>
                    <th>RAM</th>
                    <th>Storage</th>
                    <th>Brand</th>
                    <th>Category</th>
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
                      <td>{laptop.Brand}</td>
                      <td>{laptop.category}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      <div className="laptops-display">
        <h3>
          {selectedMode === "buy" ? "Buy" : "Rent"} Laptops (
          {filteredLaptops.length})
        </h3>
        {filteredLaptops.length === 0 ? (
          <p className="no-laptops">
            No {selectedMode === "buy" ? "buy" : "rent"} laptops available.
          </p>
        ) : (
          <ul>
            {filteredLaptops.map((laptop, index) => (
              <li key={laptop._id || index}>
                <div
                  className="laptop-summary"
                  onClick={() => toggleDetails(laptop._id)}
                  tabIndex="0"
                  onKeyDown={(e) =>
                    e.key === "Enter" && toggleDetails(laptop._id)
                  }
                >
                  <span className="laptop-index">{index + 1}.</span>
                  <span className="laptop-name">{laptop.name}</span>
                  <span className="laptop-brief">
                    {laptop.processor} | {laptop.RAM} | ₹{laptop.price}
                  </span>
                  <span
                    className={`expand-icon ${
                      expandedLaptopId === laptop._id ? "expanded" : ""
                    }`}
                  >
                    {expandedLaptopId === laptop._id ? "▼" : "▶"}
                  </span>
                </div>
                {expandedLaptopId === laptop._id && (
                  <div className="laptop-details">
                    <div className="laptop-detail-grid">
                      <div className="laptop-image-container">
                        <img
                          src={laptop.image}
                          alt={laptop.name}
                          className="laptop-image"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "/default-laptop-image.jpg"; // Fallback image
                          }}
                        />
                      </div>
                      <div className="laptop-specs">
                        <h4>{laptop.name}</h4>
                        <div className="specs-grid">
                          <div className="spec-item">
                            <span className="spec-label">Brand:</span>
                            <span className="spec-value">{laptop.Brand}</span>
                          </div>
                          <div className="spec-item">
                            <span className="spec-label">Processor:</span>
                            <span className="spec-value">
                              {laptop.processor}
                            </span>
                          </div>
                          <div className="spec-item">
                            <span className="spec-label">RAM:</span>
                            <span className="spec-value">{laptop.RAM}</span>
                          </div>
                          <div className="spec-item">
                            <span className="spec-label">Storage:</span>
                            <span className="spec-value">{laptop.Storage}</span>
                          </div>
                          <div className="spec-item">
                            <span className="spec-label">Graphics:</span>
                            <span className="spec-value">{laptop.Graphic}</span>
                          </div>
                          <div className="spec-item">
                            <span className="spec-label">Display:</span>
                            <span className="spec-value">{laptop.Display}</span>
                          </div>
                          <div className="spec-item">
                            <span className="spec-label">Category:</span>
                            <span className="spec-value">
                              {laptop.category}
                            </span>
                          </div>
                          <div className="spec-item price">
                            <span className="spec-label">Price:</span>
                            <span className="spec-value">₹{laptop.price}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="laptop-actions">
                      <button onClick={() => handleEditLaptop(laptop)}>
                        Edit
                      </button>
                      <button onClick={() => handleDeleteLaptop(laptop._id)}>
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ManageLaptops;
