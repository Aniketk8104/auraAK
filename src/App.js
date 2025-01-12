import React, { lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "./styles/style.css";
import "./styles/mobile-styles.css";

// Lazy-loaded components
const Home = lazy(() => import("./pages/Home"));
const RentalLaptops = lazy(() => import("./pages/RentalLaptops"));
const RentalDesktops = lazy(() => import("./pages/RentalDesktops"));
const HowToRent = lazy(() => import("./pages/HowToRent"));
const Login = lazy(() => import("./components/Login"));
const AdminDashboard = lazy(() => import("./components/AdminDashboard/AdminDashboard"));

// Utility function to update page title dynamically
const updatePageTitle = (title) => {
  document.title = title || "Default Title";
};

const App = () => {
  return (
    <Router>
      <Header />
      <main>
          <Routes>
            {/* Public Routes */}
            <Route
              path="/"
              element={
                <>
                  {updatePageTitle("Home - Laptop & Desktop Rentals")}
                  <Home />
                </>
              }
            />
            <Route
              path="/rental-laptops"
              element={
                <>
                  {updatePageTitle("Rental Laptops - Affordable Laptop Rentals")}
                  <RentalLaptops />
                </>
              }
            />
            <Route
              path="/rental-desktops"
              element={
                <>
                  {updatePageTitle("Rental Desktops - Rent Desktops Easily")}
                  <RentalDesktops />
                </>
              }
            />
            <Route
              path="/how-to-rent"
              element={
                <>
                  {updatePageTitle("How to Rent - Rental Process Explained")}
                  <HowToRent />
                </>
              }
            />

            {/* Admin Routes */}
            <Route
              path="/login"
              element={
                <>
                  {updatePageTitle("Admin Login")}
                  <Login />
                </>
              }
            />
            <Route
              path="/admin-dashboard"
              element={
                <>
                  {updatePageTitle("Admin Dashboard")}
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                </>
              }
            />

          </Routes>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
