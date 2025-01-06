import React from "react";
import "./IndustriesSection.css";

const industries = [
  {
    title: "IT & Tech Companies",
    description:
      "Setting up a temporary office? Need high-performance computers for a short-term or long-term project? Auratechservices’s flexible solutions help IT and tech companies manage their equipment needs without the high costs of purchasing.",
    image: "img/card1.png",
  },
  {
    title: "Startups & Entrepreneurs",
    description:
      "As a startup, you need to save costs and stay flexible. Renting your tech allows you to scale up or down quickly, depending on your business needs.",
    image: "img/card2.png",
  },
  {
    title: "Gaming Industry",
    description:
      "Professional gamers and gaming events demand cutting-edge technology. We offer a wide range of gaming laptops, desktops, and monitors with high-performance specifications to meet the demands of intense gaming sessions.",
    image: "img/card3.png",
  },
];

const IndustriesSection = () => (
  <div className="container-cards">
    <div className="header-cards">
      <h4>Industries We Serve</h4>
      <h1>
        Auratechservices: The Solution for IT Companies, Startups, Gamers, and
        More
      </h1>
      <p>
        At Auratechservices, we understand that different industries have
        different requirements. That's why we offer tailored rental solutions
        for a variety of sectors.
      </p>
    </div>
    <div className="row">
      {industries.map((industry, index) => (
        <div className="card" key={index}>
          <img src={industry.image} alt={industry.title} />
          <h3>{industry.title}</h3>
          <p>{industry.description}</p>
        </div>
      ))}
    </div>
  </div>
);

export default IndustriesSection;
