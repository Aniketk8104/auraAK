import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HeaderQuickbook from "./components/Header_Quickbook";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import LoadingSpinner from "./components/LoadingSpinner";
import Connect from "./pages/Connect";
import AuraReferralProgram from "./pages/AuraReferralProgram";
import LaptopRentalCRM from "./pages/LaptopRentalCRM";
import { GoogleOAuthProvider } from "@react-oauth/google"; // ✅ Google OAuth

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

// Get Client ID from .env file
const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

const App = () => {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <Router>
        <HeaderQuickbook />

        <main>
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

              {/* Other Pages */}
              <Route path="/connect" element={<Connect />} />
              <Route
                path="/AuraReferralProgram"
                element={<AuraReferralProgram />}
              />
              <Route path="/LaptopRentalCRM" element={<LaptopRentalCRM />} />
            </Routes>
          </Suspense>
        </main>

        <Footer />
      </Router>
    </GoogleOAuthProvider>
  );
};

// Component to update page title dynamically
const PageWrapper = ({ title, children }) => {
  React.useEffect(() => {
    document.title = title || "Default Title";
  }, [title]);

  return <>{children}</>;
};

export default App;
