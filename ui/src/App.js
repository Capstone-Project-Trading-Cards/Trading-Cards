import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "./pages/About";
import AddCardForm from "./pages/AddCardForm";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BuyCoins from "./pages/BuyCoins";
import Packs from "./pages/Packs";
import Profile from "./pages/Profile";
import Welcome from "./pages/Welcome";
import Pack from "./pages/Pack";
import Showcase from "./pages/Showcase";
import AllCards from "./pages/AllCards";
import AddPackForm from './pages/AddPackForm'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route exact path="/cards" element={<AllCards />} />
        <Route path="/about" element={<About />} />
        <Route path="/addCard" element={<AddCardForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/packs" element={<Packs />} />
        <Route path="/packs/:packId" element={<Pack />} />
        <Route path="/buyCoins" element={<BuyCoins />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/showcase/:packId" element={<Showcase />} />
        <Route path="/addPack" element={<AddPackForm/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
