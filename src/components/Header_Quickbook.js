import React, { useState, useEffect, useMemo } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import "./Header_Quickbook.css";

export default function ImprovedHeader() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState({
    ram: "",
    processor: "",
    category: "",
  });
  const [dropdownType, setDropdownType] = useState(null);
  const [selectedSearchOption, setSelectedSearchOption] = useState(null);
  const [activeTab, setActiveTab] = useState("buy");
  const [filters, setFilters] = useState({
    ram: [],
    processor: [],
    category: [],
  });
  const [userData, setUserData] = useState(null);

  // Auth popup states
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [authStep, setAuthStep] = useState(1);
  const [authData, setAuthData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [authErrors, setAuthErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState(0);

  // Check authentication status
  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await fetch(
            `${process.env.REACT_APP_BASE_URL}/api/users/me`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (response.ok) {
            const data = await response.json();
            setIsLoggedIn(true);
            setUserData(data);
            setIsAdmin(data.role === "admin");
          } else {
            localStorage.removeItem("token");
          }
        } catch (error) {
          console.error("Error checking auth status:", error);
          localStorage.removeItem("token");
        }
      }
    };

    checkAuthStatus();
  }, []);

  // Detect scrolling for header style changes
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Extract mode from URL parameters
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const modeParam = params.get("mode");
    if (modeParam === "rent" || modeParam === "buy") {
      setActiveTab(modeParam);
    }

    const ramParam = params.get("ram");
    const processorParam = params.get("processor");

    setSelectedOptions((prev) => ({
      ...prev,
      ram: ramParam || "",
      processor: processorParam || "",
    }));
  }, [location.search]);

  // Fetch filter options from backend
  useEffect(() => {
    fetch(`${process.env.REACT_APP_BASE_URL}/api/laptops/filters`)
      .then((response) => response.json())
      .then((data) => {
        setFilters({
          ram: data.rams || [],
          processor: data.processors || [],
          category: data.categorys || [],
        });
      })
      .catch((error) => console.error("Error fetching filters:", error));
  }, []);

  const handleOptionSelect = (type, option) => {
    setSelectedOptions((prev) => ({ ...prev, [type]: option }));
    setShowDropdown(false);
  };

  const handleSearchOptionClick = (type) => {
    setDropdownType(type);
    setSelectedSearchOption(type);
    setShowDropdown(true);
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleActionButton = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const params = new URLSearchParams();
    params.set("mode", activeTab);

    if (selectedOptions.ram) params.set("ram", selectedOptions.ram);
    if (selectedOptions.processor)
      params.set("processor", selectedOptions.processor);
    if (selectedOptions.category)
      params.set("category", selectedOptions.category);

    setSelectedOptions({
      ram: "",
      processor: "",
      category: "",
    });

    navigate(`/rental-laptops?${params.toString()}`);
  };

  // Auth functions
  const openAuthModal = (mode) => {
    setAuthMode(mode);
    setAuthStep(1);
    setShowAuthModal(true);
    setAuthErrors({});
    setAuthData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  const closeAuthModal = () => {
    setShowAuthModal(false);
    setAuthStep(1);
    setIsLoading(false);
    setAuthErrors({});
  };

  const handleAuthInputChange = (field, value) => {
    setAuthData((prev) => ({ ...prev, [field]: value }));

    if (authErrors[field]) {
      setAuthErrors((prev) => ({ ...prev, [field]: "" }));
    }

    if (field === "password") {
      calculatePasswordStrength(value);
    }
  };

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    if (/[^A-Za-z0-9]/.test(password)) strength += 25;
    setPasswordStrength(strength);
  };

  const validateForm = () => {
    const errors = {};

    if (authMode === "login") {
      if (!authData.email) errors.email = "Email is required";
      if (!authData.password) errors.password = "Password is required";
    } else {
      if (!authData.name) errors.name = "Name is required";
      if (!authData.email) errors.email = "Email is required";
      if (!/\S+@\S+\.\S+/.test(authData.email))
        errors.email = "Please enter a valid email";
      if (!authData.password) errors.password = "Password is required";
      if (authData.password.length < 6)
        errors.password = "Password must be at least 6 characters";
      if (!authData.confirmPassword)
        errors.confirmPassword = "Please confirm your password";
      if (authData.password !== authData.confirmPassword)
        errors.confirmPassword = "Passwords do not match";
    }

    return errors;
  };

  const isFormValid = useMemo(() => {
    const errors = validateForm();
    return Object.keys(errors).length === 0;
  }, [authMode, authData]);

  const handleAuthSubmit = async (e) => {
    e.preventDefault();

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setAuthErrors(errors);
      return;
    }

    setIsLoading(true);

    try {
      const endpoint = authMode === "login" ? "login" : "register";
      const body =
        authMode === "login"
          ? { email: authData.email, password: authData.password }
          : {
              name: authData.name,
              email: authData.email,
              password: authData.password,
            };

      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/users/${endpoint}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Authentication failed");
      }

      localStorage.setItem("token", data.token);
      setIsLoggedIn(true);
      setUserData(data);
      closeAuthModal();
    } catch (error) {
      setAuthErrors({
        general: error.message || "Authentication failed. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);

      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/users/google-auth`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: credentialResponse.credential,
            name: decoded.name,
            email: decoded.email,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Google authentication failed");
      }

      localStorage.setItem("token", data.token);
      setIsLoggedIn(true);
      setUserData(data);
      closeAuthModal();
    } catch (error) {
      setAuthErrors({
        general: error.message || "Google authentication failed",
      });
    }
  };

  const handleGoogleFailure = () => {
    setAuthErrors({
      general: "Google authentication failed. Please try again.",
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setIsAdmin(false);
    setUserData(null);
    navigate("/");
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        showDropdown &&
        !event.target.closest(".search-option") &&
        !event.target.closest(".search-dropdown")
      ) {
        setShowDropdown(false);
      }
      if (
        showAuthModal &&
        event.target.classList.contains("auth-modal-overlay")
      ) {
        closeAuthModal();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown, showAuthModal]);

  return (
    <>
      <header className={`navbar ${isScrolled ? "scrolled" : ""}`}>
        <nav className="top-nav">
          <Link to="/">
            <div className="logo">
              <img src="/img/logo.png" alt="Aura Tech Services company logo" />
            </div>
          </Link>

          <div className="buy-rent-options">
            <div
              className={activeTab === "buy" ? "selected" : ""}
              onClick={() => handleTabClick("buy")}
            >
              <span>BUY</span>
            </div>
            <div
              className={activeTab === "rent" ? "selected" : ""}
              onClick={() => handleTabClick("rent")}
            >
              <span>RENT</span>
            </div>
          </div>

          {isScrolled && (
            <div className="search-bar search-small">
              {["ram", "processor", "category"].map((type) => (
                <React.Fragment key={type}>
                  <div
                    className={`search-option ${
                      selectedSearchOption === type ? "selected" : ""
                    }`}
                    onClick={() => handleSearchOptionClick(type)}
                  >
                    <span className="label">Select</span>
                    <span className="placeholder">
                      {selectedOptions[type] ||
                        `${type.charAt(0).toUpperCase() + type.slice(1)}`}
                    </span>
                  </div>
                  {type !== "category" && <div className="divider"></div>}
                </React.Fragment>
              ))}
              <button className="search-button" onClick={handleActionButton}>
                {activeTab === "buy" ? "Buy Laptop" : "Rent Now"}
              </button>
            </div>
          )}

          <div className="user-options">
            <span className="welcome-text">Welcome To Aura Tech</span>
            {isLoggedIn ? (
              <div className="user-menu-logged">
                <button className="user-avatar-btn">
                  <div className="avatar-circle">
                    {userData?.name?.charAt(0).toUpperCase() || "U"}
                  </div>
                </button>
                <button className="logout-btn" onClick={handleLogout}>
                  Logout
                </button>
                {isAdmin && (
                  <button
                    className="admin-btn"
                    onClick={() => navigate("/admin")}
                  >
                    Admin
                  </button>
                )}
              </div>
            ) : (
              <div className="auth-buttons">
                <button
                  className="auth-btn login-btn"
                  onClick={() => openAuthModal("login")}
                >
                  Login
                </button>
                <button
                  className="auth-btn signup-btn"
                  onClick={() => openAuthModal("signup")}
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </nav>

        {!isScrolled && (
          <div className="search-bar">
            {["ram", "processor", "category"].map((type) => (
              <React.Fragment key={type}>
                <div
                  className={`search-option ${
                    selectedSearchOption === type ? "selected" : ""
                  }`}
                  onClick={() => handleSearchOptionClick(type)}
                >
                  <span className="label">Select</span>
                  <span className="placeholder">
                    {selectedOptions[type] ||
                      `${type.charAt(0).toUpperCase() + type.slice(1)}`}
                  </span>
                </div>
                {type !== "category" && <div className="divider"></div>}
              </React.Fragment>
            ))}
            <button className="search-button" onClick={handleActionButton}>
              {activeTab === "buy" ? "Buy Laptop" : "Rent Now"}
            </button>
          </div>
        )}

        {showDropdown && dropdownType && filters[dropdownType]?.length > 0 && (
          <div className="search-dropdown">
            <div className="suggestion-item header">
              {dropdownType.toUpperCase()} Options
            </div>
            {filters[dropdownType].map((option, index) => (
              <div
                key={index}
                className="suggestion-item"
                onClick={() => handleOptionSelect(dropdownType, option)}
              >
                <span className="location">{option}</span>
              </div>
            ))}
          </div>
        )}
      </header>

      {/* Auth Modal */}
      {showAuthModal && (
        <div className="auth-modal-overlay">
          <div className="auth-modal">
            <div className="auth-modal-header">
              <div className="auth-mode-switcher">
                <button
                  className={`mode-btn ${authMode === "login" ? "active" : ""}`}
                  onClick={() => {
                    setAuthMode("login");
                    setAuthStep(1);
                  }}
                >
                  Sign In
                </button>
                <button
                  className={`mode-btn ${
                    authMode === "signup" ? "active" : ""
                  }`}
                  onClick={() => {
                    setAuthMode("signup");
                    setAuthStep(1);
                  }}
                >
                  Create Account
                </button>
              </div>
              <button className="close-modal" onClick={closeAuthModal}>
                ×
              </button>
            </div>

            <div className="auth-modal-body">
              {authErrors.general && (
                <div className="error-message general-error">
                  {authErrors.general}
                </div>
              )}

              <form onSubmit={handleAuthSubmit} className="auth-form">
                {authMode === "signup" && (
                  <div className="form-group">
                    <label>Full Name</label>
                    <input
                      type="text"
                      value={authData.name}
                      onChange={(e) =>
                        handleAuthInputChange("name", e.target.value)
                      }
                      placeholder="Enter your full name"
                      className={authErrors.name ? "error" : ""}
                      required
                    />
                    {authErrors.name && (
                      <div className="field-error">{authErrors.name}</div>
                    )}
                  </div>
                )}

                <div className="form-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    value={authData.email}
                    onChange={(e) =>
                      handleAuthInputChange("email", e.target.value)
                    }
                    placeholder="Enter your email"
                    className={authErrors.email ? "error" : ""}
                    required
                  />
                  {authErrors.email && (
                    <div className="field-error">{authErrors.email}</div>
                  )}
                </div>

                <div className="form-group">
                  <label>Password</label>
                  <div className="password-input">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={authData.password}
                      onChange={(e) =>
                        handleAuthInputChange("password", e.target.value)
                      }
                      placeholder={
                        authMode === "login"
                          ? "Enter your password"
                          : "Create password"
                      }
                      className={authErrors.password ? "error" : ""}
                      required
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? "🙈" : "👁️"}
                    </button>
                  </div>
                  {authErrors.password && (
                    <div className="field-error">{authErrors.password}</div>
                  )}
                  {authMode === "signup" && authData.password && (
                    <div className="password-strength">
                      <div className="strength-bar">
                        <div
                          className={`strength-fill strength-${passwordStrength}`}
                          style={{ width: `${passwordStrength}%` }}
                        ></div>
                      </div>
                      <span className="strength-text">
                        {passwordStrength < 50
                          ? "Weak"
                          : passwordStrength < 75
                          ? "Good"
                          : "Strong"}
                      </span>
                    </div>
                  )}
                </div>

                {authMode === "signup" && (
                  <div className="form-group">
                    <label>Confirm Password</label>
                    <input
                      type="password"
                      value={authData.confirmPassword}
                      onChange={(e) =>
                        handleAuthInputChange("confirmPassword", e.target.value)
                      }
                      placeholder="Confirm password"
                      className={authErrors.confirmPassword ? "error" : ""}
                      required
                    />
                    {authErrors.confirmPassword && (
                      <div className="field-error">
                        {authErrors.confirmPassword}
                      </div>
                    )}
                  </div>
                )}

                {authMode === "login" && (
                  <div className="form-options">
                    <label className="checkbox-label">
                      <input type="checkbox" />
                      <span>Remember me</span>
                    </label>
                    <a href="#" className="forgot-link">
                      Forgot password?
                    </a>
                  </div>
                )}

                <button
                  type="submit"
                  className="submit-btn"
                  disabled={!isFormValid || isLoading}
                >
                  {isLoading ? (
                    <div className="loading-spinner"></div>
                  ) : authMode === "login" ? (
                    "Sign In"
                  ) : (
                    "Create Account"
                  )}
                </button>
              </form>

              <div className="auth-divider">
                <span>or continue with</span>
              </div>

              <div className="social-auth">
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={handleGoogleFailure}
                  useOneTap
                  theme="filled_blue"
                  size="large"
                  text={authMode === "login" ? "signin_with" : "signup_with"}
                  shape="rectangular"
                  width="300"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
