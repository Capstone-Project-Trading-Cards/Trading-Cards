import React, { useEffect, useState } from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router";
import Navbar from "../components/Navbar";
import TCCLogo1 from "../images/soccer-player-cards/Haaland.png";
import TCCLogo2 from "../images/soccer-player-cards/Salah.png";
import TCCLogo3 from "../images/soccer-player-cards/Mbappé.png";
import TCCLogo4 from "../images/soccer-player-cards/Lewandowski.png";
import BackgroundImage from "../images/page-backgrounds/stadium-image.jpg";
import Footer from "../components/Footer";

export default function BuyCoins() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [apiMessage, setApiMessage] = useState("");
  const [buttonValue, setButtonValue] = useState("");
  const [isPageLoading, setIsPageLoading] = useState(false);
  const [userCoins, setUserCoins] = useState();

  const navigate = useNavigate();

  const checkBalanceAndCallAPI = (coinCost, coinAmount) => {
    if (user.moneyBalance < coinCost) {
      setApiMessage("Insufficient Balance");
    } else {
      // if we have time we should do this on the backend
      const usersCoinBalance = user.coinBalance;
      const usersMoneyBalance = user.moneyBalance;
      const usersNewCoinBalance = usersCoinBalance + coinAmount;
      const usersNewMoneyBalance = usersMoneyBalance - coinCost;

      axios
        .post("http://localhost:5000/api/user/buyCoins", {
          coinBalance: usersNewCoinBalance,
          moneyBalance: usersNewMoneyBalance,
          userId: user._id,
        })
        .then((res) => res.data)
        .then((res) => {
          console.log(res);
          setUser(res);
        })
        .catch((err) => setApiMessage(err));
    }
    return "API call completed";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsPageLoading(true);
    switch (buttonValue) {
      case "low":
        checkBalanceAndCallAPI(10, 50000);
        break;
      case "med":
        checkBalanceAndCallAPI(20, 100000);
        break;
      case "high":
        checkBalanceAndCallAPI(30, 200000);
        break;
      case "mega":
        checkBalanceAndCallAPI(50, 500000);
        break;
      default:
        setApiMessage("Form Submit error");
        break;
    }
    setIsPageLoading(false);
  };

  useEffect(() => {
    // get user
    setIsPageLoading(true);
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
        } else {
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
    setIsPageLoading(false);
  }, []);

  return (
    <Box sx={{ height: "100vh", width: "100vw", overflow: "hidden" }}>
      <Navbar user={user} isLoggedIn={isLoggedIn} />
      <Box
        container
        mb={6}
        sx={{
          height: "100%",
          width: "100%",
          overflow: "hidden",
          position: "relative",
          margin: 0,
        }}
      >
        <img
          src={BackgroundImage}
          style={{
            opacity: "0.95",
            position: "fixed",
            left: 0,
            top: 0,
            width: "100%",
            height: "auto",
            zIndex: 0,
            minHeight: "100%",
            minWidth: "1024px",
          }}
          alt="background"
        />
        <Typography>{apiMessage}</Typography>
        <Box mt={6} mb={4} sx={{ position: "relative" }}>
          <Box>
            <Typography variant="h4" textAlign="center" color="white">
              Buy Coins
            </Typography>
            <Typography variant="body2" mt={2} textAlign="center" color="white">
              Buy More Coins to Open More Packs!
            </Typography>
          </Box>
          <Box>
            <Box
              mt={4}
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Typography color="white" variant="h6">
                Balance
              </Typography>
              <Typography color="white" variant="subtitle">
                Money Amount: ${user?.moneyBalance}
              </Typography>
              <Typography color="white" variant="subtitle">
                Coin Amount: {user?.coinBalance} TCC
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", justifyContent: "center", width: "100%" }}
        >
          <Box sx={{ zIndex: 1, width: "100%" }} mt={6}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-around",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                }}
              >
                <img
                  width="120px"
                  src={TCCLogo1}
                  sx={{ position: "relative" }}
                  alt="50.000 TCC"
                />
                <Button
                  variant="contained"
                  value={buttonValue}
                  onClick={() => setButtonValue("low")}
                  type="submit"
                >
                  50.000 TCC
                </Button>
              </Box>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <img width="120px" src={TCCLogo2} alt="100.000 TCC" />
                <Button
                  variant="contained"
                  value={buttonValue}
                  onClick={() => setButtonValue("med")}
                  type="submit"
                >
                  100.000 TCC
                </Button>
              </Box>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <img width="120px" src={TCCLogo3} alt="200.000 TCC" />
                <Button
                  variant="contained"
                  value={buttonValue}
                  onClick={() => setButtonValue("high")}
                  type="submit"
                >
                  200.000 TCC
                </Button>
              </Box>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <img width="120px" src={TCCLogo4} alt="500.000 TCC" />
                <Button
                  variant="contained"
                  value={buttonValue}
                  onClick={() => setButtonValue("mega")}
                  type="submit"
                >
                  500.000 TCC
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
        <br />
        <Footer />
      </Box>
    </Box>
  );
}
