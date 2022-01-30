import React from "react";
import "./Carousel.css";

export default function Carousel() {
  return (
    <div
      id="carouselExampleSlidesOnly"
      className="carousel slide"
      data-ride="carousel"
    >
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img
            className="d-block w-100"
            src={require("../../images/page-backgrounds/homepage-1.png")}
            alt="First slide"
          />
        </div>
        <div className="carousel-item active">
          <img className="d-block w-100" src="" alt="Second slide" />
        </div>
        <div className="carousel-item">
          <img className="d-block w-100" src="" alt="Third slide" />
        </div>
      </div>
    </div>
  );
}
