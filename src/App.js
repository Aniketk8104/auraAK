import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import HeaderQuickbook from "./components/Header_Quickbook"
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import LoadingSpinner from "./components/LoadingSpinner"; // Add a loading spinner component


import "@fortawesome/fontawesome-free/css/all.min.css";
import "./styles/style.css";
import "./styles/mobile-styles.css";

// Lazy-loaded components
const Home = lazy(() => import("./pages/Home"));
const RentalLaptops = lazy(() => import("./pages/RentalLaptops"));
const RentalDesktops = lazy(() => import("./pages/RentalDesktops"));
const HowToRent = lazy(() => import("./pages/HowToRent"));
const Login = lazy(() => import("./components/Login"));
const AdminDashboard = lazy(() =>
  import("./components/AdminDashboard/AdminDashboard")
);

const App = () => {
  return (
    <Router>
      {/* <Header /> */}
      <HeaderQuickbook />
      <main>
        {/* Wrap Routes in Suspense for lazy loading */}
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            {/* Public Routes */}
            <Route
              path="/"
              element={
                <PageWrapper title="Home - Laptop & Desktop Rentals">
                  <Home />
                </PageWrapper>
              }
            />
            <Route
              path="/rental-laptops"
              element={
                <PageWrapper title="Rental Laptops - Affordable Laptop Rentals">
                  <RentalLaptops />
                </PageWrapper>
              }
            />
            <Route
              path="/rental-desktops"
              element={
                <PageWrapper title="Rental Desktops - Rent Desktops Easily">
                  <RentalDesktops />
                </PageWrapper>
              }
            />
            <Route
              path="/how-to-rent"
              element={
                <PageWrapper title="How to Rent - Rental Process Explained">
                  <HowToRent />
                </PageWrapper>
              }
            />

            {/* Admin Routes */}
            <Route
              path="/login"
              element={
                <PageWrapper title="Admin Login">
                  <Login />
                </PageWrapper>
              }
            />
            <Route
              path="/admin-dashboard"
              element={
                <PageWrapper title="Admin Dashboard - Aura Tech">
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                </PageWrapper>
              }
            />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </Router>
  );
};

// PageWrapper Component to Update Page Title
const PageWrapper = ({ title, children }) => {
  React.useEffect(() => {
    document.title = title || "Default Title";
  }, [title]);

  return <>{children}</>;
};

export default App;
