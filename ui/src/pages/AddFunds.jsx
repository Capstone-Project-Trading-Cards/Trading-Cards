import React, { useEffect, useState } from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router";
import Navbar from "../components/Navbar";
import TCCLogo1 from "../images/Bronze-Card.png";
import TCCLogo2 from "../images/Silver-Card.png";
import TCCLogo3 from "../images/pack-background4.png";
import TCCLogo4 from "../images/Platinium-Card.png";
import BackgroundImage from "../images/page-backgrounds/stadium-image.jpg";
import Footer from "../components/Footer";
import AddFundsPicture from "../images/fundslogo.jpg";
import StripeCheckout from "react-stripe-checkout";

export default function AddFunds() {
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
    <Box sx={{ height: "100vh", width: "100vw", overflowX: "hidden" }}>
      <Navbar user={user} isLoggedIn={isLoggedIn} />
      <Box
        mb={6}
        sx={{
          height: "100%",
          width: "100%",
          margin: 0,
          position: "relative",
        }}
      >
        <img
          src={BackgroundImage}
          style={{
            opacity: "0.90",
            position: "fixed",
            left: 0,
            top: 0,
            width: "99.2vw",
            height: "auto",
            zIndex: 0,
            margin: 0,
            minHeight: "100%",
            minWidth: "1024px",
          }}
          alt="background"
        />
        <Typography>{apiMessage}</Typography>
        <Box mt={6} mb={4} sx={{ position: "relative" }}>
          <Box>
            <Typography variant="h4" textAlign="center" color="white">
              Add Funds
            </Typography>
            <Typography variant="body2" mt={2} textAlign="center" color="white">
              Add Funds to Buy More Packs!
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
                Available Funds: ${user?.moneyBalance}
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
                  width: "18%",
                }}
              >
                <img
                  src={TCCLogo1}
                  sx={{ position: "relative" }}
                  alt="10.00$"
                />
                <StripeCheckout
                  name="Trading Cards Co." // the pop-in header title
                  description="Add more funds to buy more cards" // the pop-in header subtitle
                  image={AddFundsPicture} // the pop-in header image (default none)
                  ComponentClass="div"
                  panelLabel="Pay" // prepended to the amount in the bottom pay button
                  amount={1000} // cents
                  currency="USD"
                  stripeKey="..."
                  email="trading@cards.co"
                  // Note: Enabling either address option will give the user the ability to
                  // fill out both. Addresses are sent as a second parameter in the token callback.
                  billingAddress={true}
                  // Note: enabling both zipCode checks and billing or shipping address will
                  // cause zipCheck to be pulled from billing address (set to shipping if none provided).
                  zipCode={false}
                  bitcoin={true} // accept Bitcoins (default false)
                  allowRememberMe // "Remember Me" option (default true)
                  // Note: you can change the event to `onTouchTap`, `onClick`, `onTouchStart`
                  // useful if you're using React-Tap-Event-Plugin
                  triggerEvent="onClick"
                >
                  <Button sx={{ width: "100%" }} variant="contained">
                    $10.00
                  </Button>
                </StripeCheckout>
              </Box>
              <Box
                sx={{ display: "flex", flexDirection: "column", width: "18%" }}
              >
                <img src={TCCLogo2} alt="$20.00" />
                <StripeCheckout
                  name="Trading Cards Co." // the pop-in header title
                  description="Add more funds to buy more cards" // the pop-in header subtitle
                  image={AddFundsPicture} // the pop-in header image (default none)
                  ComponentClass="div"
                  panelLabel="Pay" // prepended to the amount in the bottom pay button
                  amount={2000} // cents
                  currency="USD"
                  stripeKey="..."
                  email="trading@cards.co"
                  // Note: Enabling either address option will give the user the ability to
                  // fill out both. Addresses are sent as a second parameter in the token callback.
                  billingAddress={true}
                  // Note: enabling both zipCode checks and billing or shipping address will
                  // cause zipCheck to be pulled from billing address (set to shipping if none provided).
                  zipCode={false}
                  bitcoin={true} // accept Bitcoins (default false)
                  allowRememberMe // "Remember Me" option (default true)
                  // Note: you can change the event to `onTouchTap`, `onClick`, `onTouchStart`
                  // useful if you're using React-Tap-Event-Plugin
                  triggerEvent="onClick"
                >
                  <Button sx={{ width: "100%" }} variant="contained">
                    $20.00
                  </Button>
                </StripeCheckout>
              </Box>
              <Box
                sx={{ display: "flex", flexDirection: "column", width: "18%" }}
              >
                <img src={TCCLogo3} alt="$30.00" />
                <StripeCheckout
                  name="Trading Cards Co." // the pop-in header title
                  description="Add more funds to buy more cards" // the pop-in header subtitle
                  image={AddFundsPicture} // the pop-in header image (default none)
                  ComponentClass="div"
                  panelLabel="Pay" // prepended to the amount in the bottom pay button
                  amount={3000} // cents
                  currency="USD"
                  stripeKey="..."
                  email="trading@cards.co"
                  // Note: Enabling either address option will give the user the ability to
                  // fill out both. Addresses are sent as a second parameter in the token callback.
                  billingAddress={true}
                  // Note: enabling both zipCode checks and billing or shipping address will
                  // cause zipCheck to be pulled from billing address (set to shipping if none provided).
                  zipCode={false}
                  bitcoin={true} // accept Bitcoins (default false)
                  allowRememberMe // "Remember Me" option (default true)
                  // Note: you can change the event to `onTouchTap`, `onClick`, `onTouchStart`
                  // useful if you're using React-Tap-Event-Plugin
                  triggerEvent="onClick"
                >
                  <Button sx={{ width: "100%" }} variant="contained">
                    $30.00
                  </Button>
                </StripeCheckout>
              </Box>
              <Box
                sx={{ display: "flex", flexDirection: "column", width: "18%" }}
              >
                <img src={TCCLogo4} alt="$50.00" />
                <StripeCheckout
                  name="Trading Cards Co." // the pop-in header title
                  description="Add more funds to buy more cards" // the pop-in header subtitle
                  image={AddFundsPicture} // the pop-in header image (default none)
                  ComponentClass="div"
                  panelLabel="Pay" // prepended to the amount in the bottom pay button
                  amount={5000} // cents
                  currency="USD"
                  stripeKey="..."
                  email="trading@cards.co"
                  // Note: Enabling either address option will give the user the ability to
                  // fill out both. Addresses are sent as a second parameter in the token callback.
                  billingAddress={true}
                  // Note: enabling both zipCode checks and billing or shipping address will
                  // cause zipCheck to be pulled from billing address (set to shipping if none provided).
                  zipCode={false}
                  bitcoin={true} // accept Bitcoins (default false)
                  allowRememberMe // "Remember Me" option (default true)
                  // Note: you can change the event to `onTouchTap`, `onClick`, `onTouchStart`
                  // useful if you're using React-Tap-Event-Plugin
                  triggerEvent="onClick"
                >
                  <Button sx={{ width: "100%" }} variant="contained">
                    $50.00
                  </Button>
                </StripeCheckout>
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
