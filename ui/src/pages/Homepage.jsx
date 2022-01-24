import React, { useEffect, useState } from "react";
import axios from "axios";
import { CardTemplate } from "../components/CardTemplate";

export default function Homepage() {
  const [cardData, setCardData] = useState([{}]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/cards/")
      .then((res) => res.data)
      .then((res) => {
        setCardData(res);
        console.log(res);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="parent">
      {cardData.map((card) => (
        <CardTemplate card={card} />
      ))}
    </div>
  );
}
