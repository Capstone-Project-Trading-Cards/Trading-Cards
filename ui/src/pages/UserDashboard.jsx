import React, { useEffect, useState } from "react";
import axios from "axios";
import StripeCheckout from "react-stripe-checkout";
import Navbar from "../components/Navbar";
import { Box, Button, Grid, Typography } from "@mui/material";
import BackgroundImage from "../images/page-backgrounds/stadium-image.jpg";
import MyCardsImage from "../images/pack-background2.png";
import MyTradesImage from "../images/trade-ıcon.png";
import BuyCoinsImage from "../images/Coin_Bag.png";
import OpenPacksImage from "../images/pack-background4.png";
import MyProfileImage from "../images/avatar.png";
import AddFunds from "../images/add-funds.png";
import Market from "../images/market.png";

import Footer from "../components/Footer";
import { useNavigate } from "react-router";

export default function UserDashboard() {
  const [cardData, setCardData] = useState([{}]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState();

  const navigate = useNavigate();

  const onOpened = () => {
    console.log("opened");
  };

  const onClosed = () => {
    console.log("Closed");
  };

  useEffect(() => {
    // get cards
    axios
      .get("http://localhost:5000/api/cards/")
      .then((res) => res.data)
      .then((res) => {
        setCardData(res);
        console.log(res);
      })
      .catch((err) => console.log(err));
    // get user
    axios
      .get("/api/getUsername", {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .then((res) => res.data)
      .then((data) => {
        console.log(data);
        console.log(data.isLoggedIn);
        if (data.isLoggedIn) {
          setUser(data.user);
          setIsLoggedIn(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        margin: 0,
        overflowX: "hidden",
      }}
    >
      <Navbar user={user} isLoggedIn={isLoggedIn} />
      <Box
        container
        sx={{ position: "relative", margin: 0, height: "auto", width: "100vw" }}
      >
        <img
          src={BackgroundImage}
          style={{
            opacity: "0.95",
            position: "fixed",
            left: 0,
            top: 0,
            width: "99.9vw",
            height: "auto",
            zIndex: 0,
            margin: 0,
            minHeight: "100%",
            minWidth: "1024px",
            overflow: "hidden",
          }}
          alt="background"
        />
        <Box sx={{ position: "relative" }} mb={2}>
          <Typography color="white" variant="h3" textAlign="center" mt={4}>
            Dashboard
          </Typography>
          <Box>
            <Typography mt={2} textAlign="center" variant="h6" color="white">
              Available Funds: ${user?.moneyBalance}
            </Typography>
            <Typography mt={1} textAlign="center" variant="h6" color="white">
              Coins: {user?.coinBalance} TCC
            </Typography>
          </Box>
          <Grid
            mt={6}
            sx={{
              display: "flex",
              justifyContent: "space-around",
              width: "100%",
              height: "100%",
            }}
          >
            <Box sx={{ padding: "20px" }}>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Button href="/myCards" variant="contained">
                  <Typography textAlign="center" variant="h5">
                    My Cards
                  </Typography>
                </Button>
                <Box mt={2}>
                  <img src={MyCardsImage} width="200px" />
                </Box>
              </Box>
            </Box>
            <Box sx={{ padding: "20px" }}>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Button href="/trades" variant="contained">
                  <Typography textAlign="center" variant="h5">
                    Trade Market
                  </Typography>
                </Button>
                <Box mt={2}>
                  <img src={Market} width="200px" />
                </Box>
              </Box>
            </Box>
            <Box sx={{ padding: "20px" }}>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Button href="/tradeOffers" variant="contained">
                  <Typography textAlign="center" variant="h5">
                    Trade Offers
                  </Typography>
                </Button>
                <Box mt={2}>
                  <img src={MyTradesImage} width="200px" />
                </Box>
              </Box>
            </Box>
            <Box sx={{ padding: "20px" }}>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Button href="/packs" variant="contained">
                  <Typography textAlign="center" variant="h5">
                    Open Packs
                  </Typography>
                </Button>
                <Box mt={2}>
                  <img src={OpenPacksImage} width="200px" />
                </Box>
              </Box>
            </Box>
            <Box sx={{ padding: "20px" }}>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Button href="/buyCoins" variant="contained">
                  <Typography textAlign="center" variant="h5">
                    Buy Coins
                  </Typography>
                </Button>
                <Box mt={2}>
                  <img src={BuyCoinsImage} width="200px" />
                </Box>
              </Box>
            </Box>
            <Box sx={{ padding: "20px" }}>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Button href="/addFunds" variant="contained">
                  <Typography textAlign="center" variant="h5">
                    Add Funds
                  </Typography>
                </Button>
                <Box mt={2}>
                  <img src={AddFunds} width="200px" />
                </Box>
              </Box>
            </Box>
            <Box sx={{ padding: "20px" }}>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Button href="/profile" variant="contained">
                  <Typography textAlign="center" variant="h5">
                    My Profile
                  </Typography>
                </Button>
                <Box mt={2}>
                  <img src={MyProfileImage} width="200px" />
                </Box>
              </Box>
            </Box>
          </Grid>
        </Box>
        <Footer />
      </Box>
    </Box>
  );
}
