import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import RentalLaptops from "./pages/RentalLaptops";
import RentalDesktops from "./pages/RentalDesktops";
import HowToRent from "./pages/HowToRent";
import "./styles/style.css";
import './styles/mobile-styles.css';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';

import "@fortawesome/fontawesome-free/css/all.min.css";

const App = () => {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/rental-laptops" element={<RentalLaptops />} />
          <Route path="/rental-desktops" element={<RentalDesktops />} />
          <Route path="/how-to-rent" element={<HowToRent />} />

          {/* Admin Routes */}
          <Route path="/login" element={<Login />} />
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
