import React from "react";
const GradientDivider = () => (
  <>
    <div className=" line_footer w-full relative flex flex-col items-left justify-left mr-2">
      <div className="absolute inset-x-auto top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-full blur-sm" />
      <div className="absolute inset-x-auto top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-full" />
      <div className=" absolute inset-x-auto top-0 bg-gradient-to-r from-transparent via-purple-400 to-transparent h-[5px] w-1/2 blur-sm" />
      <div className=" absolute inset-x-auto top-0 bg-gradient-to-r from-transparent via-purple-400 to-transparent h-px w-1/2" />
      <div
        style={{}}
        className="  absolute inset-0 w-full h-full bg-background [mask-image:radial-gradient(50%_200px_at_top,transparent_20%,white)] "
      />
    </div>
  </>
);

const Footer = () => {
  return (
    <footer className="bg-dark text-light ">
      <div className="f_container container">
        {/* Where We Operate Section */}
        <div className="f_section">
          <h3 className="f_heading fw-bold fs-3">Where We Operate</h3>
          <GradientDivider />
          <ul className="f_content list-unstyled mt-3">
            <li>Mumbai</li>
          </ul>
        </div>

        {/* Quick Links Section */}
        <div className="f_section">
          <h3 className="f_heading fw-bold fs-3">Quick Links</h3>
          <GradientDivider />
          <ul className="nav_active f_content list-unstyled mt-3">
            <li className="d-flex align-items-center gap-2">
              <i className="fa fa-home"></i> Home
            </li>
            <li className="d-flex align-items-center gap-2">
              <i className="fa fa-users"></i> About
            </li>
            <li className="d-flex align-items-center gap-2">
              <i className="fa fa-headphones"></i> Contact
            </li>
            <li className="d-flex align-items-center gap-2">
              <i className="fa fa-book"></i> Blog
            </li>
          </ul>
        </div>

        {/* Contact Us Section */}
        <div className="f_section">
          <h3 className="f_heading fw-bold fs-3">Contact Us</h3>
          <GradientDivider />
          <ul className="f_content list-unstyled mt-3">
            <li className="d-flex align-items-center gap-2">
              <i className="fa fa-phone"></i> +91 9967917846
            </li>
            <li className="d-flex align-items-center gap-2">
              <i className="fa fa-envelope"></i> info@auratechservices.in
            </li>
            <li className="d-flex align-items-center gap-2">
              <i className="fa fa-map-marker"></i> Navi Mumbai
            </li>
            <li className="d-flex align-items-center gap-2">
              <i className="fa fa-clock"></i> Mon – Sat: 10:00 AM – 7:00 PM
            </li>
          </ul>
          <h3 className="f_heading fw-bold fs-3 mt-4">Follow Us</h3>
          <GradientDivider />
          <div className="f_content d-flex justify-content-center gap-4 mt-3">
            <a
              href="www.facebook.com"
              className="text-secondary hover-text-light"
            >
              <i className="fab fa-facebook"></i>
            </a>
            <a
              href="https://www.instagram.com/p/DEXzAlEImcV/"
              className="text-secondary hover-text-light"
            >
              <i className="fab fa-instagram ml-2"></i>
            </a>
            <a
              href="https://www.linkedin.com/company/aura-tech-service"
              className="text-secondary hover-text-light"
            >
              <i className="fab fa-linkedin ml-2"></i>
            </a>
            <a href="ak@gmail.com" className="text-secondary hover-text-light">
              <i className="fas fa-envelope ml-2"></i>
            </a>
          </div>
        </div>

        {/* Where We Located Section */}
        <div className="map_container">
          <h3 className="f_heading fw-bold fs-3 mb-4">
            Where We Located
            <GradientDivider />
          </h3>
          <iframe
            title="Google Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2570.383080010083!2d73.1535965617685!3d19.085096399693924!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7eb7d9da69be3%3A0xf2b9c01257aabbad!2sEnkay%20Garden%20Phase%201%2C%20Zinnia%20Bulding!5e0!3m2!1sen!2sin!4v1737555361707!5m2!1sen!2sin"
            className="map-iframe"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>

      <div className="border-top border-secondary pt-4 text-center">
        <p className="mb-0 small">
          © 2024 auratechservices | All Rights Reserved |{" "}
          <a
            href="http://auratechservices.in"
            className="text-primary text-decoration-none"
          >
            Privacy Policy
          </a>{" "}
          |{" "}
          <a
            href="http://auratechservices.in"
            className="text-primary text-decoration-none"
          >
            Payment and Returns
          </a>{" "}
          |{" "}
          <a
            href="http://auratechservices.in"
            className="text-primary text-decoration-none"
          >
            Terms and Conditions
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
