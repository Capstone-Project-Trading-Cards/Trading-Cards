import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "./pages/About";
import AddCardForm from "./pages/AddCardForm";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BuyCoins from "./pages/BuyCoins";
import Packs from "./pages/Packs";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route path="/about" element={<About />} />
        <Route path="/addCard" element={<AddCardForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/packs" element={<Packs />} />
        <Route path="/buyCoins" element={<BuyCoins />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
