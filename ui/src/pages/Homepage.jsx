import React, { useEffect, useState } from "react";
import axios from "axios";
import CardSoccer from "../components/CardSoccer/CardSoccer";
import Navbar from "../components/Navbar";
import Carousel from "../components/carousel/Carousel";

export default function Homepage() {
  const [cardData, setCardData] = useState([{}]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/cards/")
      .then((res) => res.data)
      .then((res) => {
        setCardData(res);
        console.log(cardData);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <Navbar />
      <div
        className="container"
        style={{
          minHeight: "94vh",
          backgroundColor: "white",
        }}
      >
        <br />
        <br />
        <div style={{}}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              position: "relative",
              opacity: 0.9,
              zIndex: 0,
            }}
          >
            <h1
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50% , -50%)",
                WebkitTransform: "translate(-50%, -50%)",
                zIndex: 1,
                fontFamily: "fantasy",
                fontSize: 90,
              }}
            >
              Trading Cards Co.
            </h1>
            <Carousel />
          </div>
        </div>
      </div>
    </div>
  );
}
