import React, { useEffect, useState } from "react";
import axios from "axios";
import CardSoccer from "../components/CardSoccer/CardSoccer";
import Navbar from "../components/CardSoccer/Navbar";

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
    <div>
      <Navbar />
      <h1 className="text-center">Soccer</h1>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <CardSoccer data={cardData} />
      </div>
      <h1 className="text-center">Basketball</h1>
      <h1 className="text-center">NHL</h1>
      <h1 className="text-center">NFL</h1>
    </div>
  );
}
