import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import RentalLaptops from "./pages/RentalLaptops";
import RentalDesktops from "./pages/RentalDesktops";
import HowToRent from "./pages/HowToRent";
import "./styles/style.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
// import LikedPage from "./components/LikedPage";
// import { LikedProvider } from "./components/LikedContext";
// import RentalCard from "./components/RentalCard";

const App = () => {
  return (
    // </LikedProvider>
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rental-laptops" element={<RentalLaptops />} />
          <Route path="/rental-desktops" element={<RentalDesktops />} />
          <Route path="/how-to-rent" element={<HowToRent />} />

          {/* <Route
            path="/"
            element={
              <div className="cardContainer">
                {products.map((product, index) => (
                  <RentalCard key={index} product={product} />
                ))}
              </div>
            }
          /> */}
          {/* <Route path="/liked" element={<LikedPage />} /> */}
        </Routes>
      </main>
      <Footer />
    </Router>
    // </LikedProvider>
  );
};

export default App;
