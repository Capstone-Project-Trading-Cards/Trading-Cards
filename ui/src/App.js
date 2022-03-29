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
import AddPackForm from "./pages/AddPackForm";
import UserDashboard from "./pages/UserDashboard";
import EditProfile from "./pages/EditProfile";
import Card from "./pages/Card";
import Trades from "./pages/Trades";
import TradeCard from "./pages/TradeCard";
import MyCards from "./pages/MyCards";
import AddFunds from "./pages/AddFunds";
import TradeOffers from "./pages/TradeOffers";
import AdminReports from "./pages/AdminReports";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route exact path="/cards" element={<AllCards />} />
        <Route exact path="/admin" element={<AdminReports />} />
        <Route exact path="/cards/:cardId" element={<Card />} />
        <Route path="/about" element={<About />} />
        <Route path="/addCard" element={<AddCardForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/packs" element={<Packs />} />
        <Route path="/packs/:packId" element={<Pack />} />
        <Route path="/buyCoins" element={<BuyCoins />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/editProfile" element={<EditProfile />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/showcase/:packId" element={<Showcase />} />
        <Route path="/addPack" element={<AddPackForm />} />
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/trades" element={<Trades />} />
        <Route path="/trades/:cardId" element={<TradeCard />} />
        <Route path="/myCards" element={<MyCards />} />
        <Route path="/addFunds" element={<AddFunds />} />
        <Route path="/tradeOffers" element={<TradeOffers />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
