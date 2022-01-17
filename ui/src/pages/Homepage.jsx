import React from "react";
import CardSoccer from "../components/CardSoccer/CardSoccer";
import Navbar from "../components/CardSoccer/Navbar";

export default function Homepage() {
  return (
    <div>
      <Navbar />
      <h1 className="text-center">Soccer</h1>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <CardSoccer />
      </div>
      <h1 className="text-center">Basketball</h1>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <CardSoccer />
      </div>
      <h1 className="text-center">NHL</h1>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <CardSoccer />
      </div>
      <h1 className="text-center">NFL</h1>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <CardSoccer />
      </div>
    </div>
  );
}
