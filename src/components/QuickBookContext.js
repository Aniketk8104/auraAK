import { createContext, useContext, useState } from "react";

// Create Context
const QuickBookContext = createContext(null);

// Provider Component
export const QuickBookProvider = ({ children }) => {
  const [form, setForm] = useState({
    brand: "",
    ram: "",
    processor: "",
    city: "",
  });

  const [isSticky, setIsSticky] = useState(false);

  return (
    <QuickBookContext.Provider value={{ form, setForm, isSticky, setIsSticky }}>
      {children}
    </QuickBookContext.Provider>
  );
};

// Hook to use context safely
export const useQuickBook = () => {
  const context = useContext(QuickBookContext);
  if (!context) {
    throw new Error("useQuickBook must be used within a QuickBookProvider");
  }
  return context;
};
