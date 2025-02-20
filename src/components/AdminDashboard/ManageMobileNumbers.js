import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import "./ManageMobileNumbers.css";

const ManageMobileNumbers = () => {
  const [mobileNumbers, setMobileNumbers] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);

  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const fetchNumbers = useCallback(async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/api/mobile/all`);
      setMobileNumbers(data);
    } catch (error) {
      console.error("Error fetching numbers", error);
    }
  }, [BASE_URL]);

  useEffect(() => {
    fetchNumbers();
  }, [fetchNumbers]);

  const deleteSelected = async () => {
    for (let id of selectedIds) {
      await axios.delete(`${BASE_URL}/api/mobile/delete/${id}`);
    }
    fetchNumbers();
    setSelectedIds([]);
  };

  const deleteAll = async () => {
    await axios.delete(`${BASE_URL}/api/mobile/delete-all`);
    fetchNumbers();
  };

  const exportToExcel = () => {
    window.open(`${BASE_URL}/api/mobile/export`, "_blank");
  };

  return (
    <div className="manage-mobile-container">
      <h2>Manage Mobile Numbers</h2>
      <div className="mobile-buttons">
        <button onClick={deleteSelected} disabled={selectedIds.length === 0}>
          Delete Selected
        </button>
        <button onClick={deleteAll}>Delete All</button>
        <button onClick={exportToExcel}>Export to Excel</button>
      </div>
      <table className="mobile-table">
        <thead>
          <tr>
            <th>Select</th>
            <th>Mobile Number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {mobileNumbers.map(({ _id, number }) => (
            <tr key={_id}>
              <td>
                <input
                  type="checkbox"
                  onChange={(e) => {
                    setSelectedIds((prev) =>
                      e.target.checked
                        ? [...prev, _id]
                        : prev.filter((id) => id !== _id)
                    );
                  }}
                />
              </td>
              <td>{number}</td>
              <td>
                <button
                  onClick={() =>
                    axios
                      .delete(`${BASE_URL}/api/mobile/delete/${_id}`)
                      .then(fetchNumbers)
                  }
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageMobileNumbers;
