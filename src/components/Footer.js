import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-main">
          {/* Brand Section */}
          <div className="footer-brand">
            <div className="footer-logo">
              <div className="logo-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                  <path d="M3 3h18v18H3V3zm16 16V5H5v14h14zm-8-9h8v6h-8V10z" />
                </svg>
              </div>
              <span className="logo-text">Aura Tech</span>
            </div>
            <p className="footer-tagline">
              Your trusted partner for premium laptop rentals and sales.
              Empowering businesses and individuals with cutting-edge technology
              solutions.
            </p>
            <div className="footer-social">
              <a href="#" className="social-link" aria-label="Facebook">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a href="#" className="social-link" aria-label="Twitter">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>
              <a href="#" className="social-link" aria-label="LinkedIn">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a href="#" className="social-link" aria-label="Instagram">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.618 5.367 11.985 11.988 11.985s11.987-5.367 11.987-11.985C24.014 5.367 18.635.001 12.017.001zM8.903 16.581c-1.258 0-2.277-1.019-2.277-2.277s1.019-2.277 2.277-2.277 2.277 1.019 2.277 2.277-1.019 2.277-2.277 2.277zm6.228 0c-1.258 0-2.277-1.019-2.277-2.277s1.019-2.277 2.277-2.277 2.277 1.019 2.277 2.277-1.019 2.277-2.277 2.277z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Services Section */}
          <div className="footer-section">
            <h3>Services</h3>
            <ul className="footer-links">
              <li>
                <a href="#">Laptop Rentals</a>
              </li>
              <li>
                <a href="#">Laptop Sales</a>
              </li>
              <li>
                <a href="#">Bulk Rentals</a>
              </li>
              <li>
                <a href="#">Corporate Solutions</a>
              </li>
              <li>
                <a href="#">Technical Support</a>
              </li>
              <li>
                <a href="#">Maintenance</a>
              </li>
            </ul>
          </div>

          {/* Categories Section */}
          <div className="footer-section">
            <h3>Categories</h3>
            <ul className="footer-links">
              <li>
                <a href="#">Gaming Laptops</a>
              </li>
              <li>
                <a href="#">Business Laptops</a>
              </li>
              <li>
                <a href="#">MacBooks</a>
              </li>
              <li>
                <a href="#">Budget Laptops</a>
              </li>
            </ul>
          </div>

          {/* Support Section */}
          <div className="footer-section">
            <h3>Support</h3>
            <ul className="footer-links">
              <li>
                <a href="#">Return Policy</a>
              </li>
              <li>
                <a href="#">Warranty</a>
              </li>
              <li>
                <a href="#">FAQ</a>
              </li>
              <li>
                <a href="#">Contact Us</a>
              </li>
            </ul>
          </div>

          {/* Contact & Newsletter Section */}
          <div className="footer-section">
            <h3>Contact Info</h3>
            <ul className="contact-info">
              <li className="contact-item">
                <svg
                  className="contact-icon"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
                <span className="contact-text">Panvel, Navi Mumbai</span>
              </li>
              <li className="contact-item">
                <svg
                  className="contact-icon"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z" />
                </svg>
                <span className="contact-text">+91 9967917846</span>
              </li>
              <li className="contact-item">
                <svg
                  className="contact-icon"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
                <span className="contact-text">info@auratechservices.in</span>
              </li>
            </ul>

            <div className="newsletter">
              <h3>Stay Updated</h3>
              <p className="newsletter-description">
                Get latest offers and tech news
              </p>
              <form className="newsletter-form">
                <input
                  type="email"
                  className="newsletter-input"
                  placeholder="Enter your email"
                />
                <button type="submit" className="newsletter-button">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-copyright">
            <p>&copy; 2024 Aura Tech Services. All rights reserved.</p>
          </div>

          <div className="footer-legal">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Cookie Policy</a>
            {/* <a href="#">Sitemap</a> */}
          </div>

          <div className="trust-badges">
            <span className="trust-badge">🔒 Secure</span>
            <span className="trust-badge">✓ Verified</span>
            <span className="trust-badge">24/7 Support</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
