import React from "react";
import { useQuickBook } from "./QuickBookContext"; // Import useQuickBook Hook

const QuickBookDropdown = ({ label, options, name }) => {
  const { form, setForm } = useQuickBook(); // Correct way to use context

  const handleChange = (event) => {
    setForm((prevForm) => ({
      ...prevForm,
      [name]: event.target.value,
    }));
  };

  return (
    <div className="dropdown">
      <label>{label}</label>
      <select value={form[name] || ""} onChange={handleChange}>
        <option value="">Select {label}</option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default QuickBookDropdown;
