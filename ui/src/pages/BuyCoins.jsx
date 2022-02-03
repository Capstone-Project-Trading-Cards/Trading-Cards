import React, { useEffect, useState } from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router";
import Navbar from "../components/Navbar";

export default function BuyCoins() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState();
  const [apiMessage, setApiMessage] = useState("");
  const [buttonValue, setButtonValue] = useState("");

  const navigate = useNavigate();

  const checkBalanceAndCallAPI = (coinCost, coinAmount) => {
    if (user.moneyBalance < coinCost) {
      setApiMessage("Insufficient Balance");
    } else {
      axios
        .post("/buyCoins", {
          coinAmount: coinAmount,
          coinCost: coinCost,
          userId: user._id,
        })
        .then((res) => res.data)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => setApiMessage(err));
    }
    return "API call completed";
  };

  const handleSubmit = () => {
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
  };

  useEffect(() => {
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
        } else {
          navigate("/");
        }
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <Box>
      <Navbar user={user} isLoggedIn={isLoggedIn} />
      <Grid container md={8}>
        <Typography>{apiMessage}</Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <Button value={buttonValue} onClick={setButtonValue("low")}>
            50.000
          </Button>
          <Button value={buttonValue} onClick={setButtonValue("med")}>
            100.000
          </Button>
          <Button value={buttonValue} onClick={setButtonValue("high")}>
            200.000
          </Button>
          <Button value={buttonValue} onClick={setButtonValue("mega")}>
            500.000
          </Button>
        </Box>
      </Grid>
    </Box>
  );
}
