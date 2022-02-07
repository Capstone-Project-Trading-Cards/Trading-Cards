import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { Box, Button, Typography } from "@mui/material";
import BackgroundImage from "../images/page-backgrounds/stadium-image.jpg";
import HaalandBackground from "../images/haaland-background.png";
import RonaldoBackground from "../images/ronaldo-background.png";
import Footer from "../components/Footer";

export default function Welcome() {
  const [cardData, setCardData] = useState([{}]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState();

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
      .catch((err) => console.log(err));
  }, []);
  return (
    <Box
      sx={{
        height: "100vh",
        width: "100%",
        margin: 0,
        boxSizing: "border-box",
      }}
    >
      <Navbar user={user} isLoggedIn={isLoggedIn} />
      <Box
        container
        sx={{ position: "relative", margin: 0, height: "100%", width: "100%" }}
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
        <Box sx={{ position: "relative" }} mb={2}>
          <Box
            mt={6}
            sx={{
              display: "flex",
              justifyContent: "space-around",
              width: "100%",
            }}
          >
            <Box sx={{ width: "30%" }}>
              <img width="350px" src={HaalandBackground} />
            </Box>
            <Box>
              <Typography sx={{ width: "100%" }} variant="h3" color="white">
                Trading Cards Co.
              </Typography>
              <Box>
                <Button variant="contained">Login</Button>
                <Button variant="contained">Register</Button>
              </Box>
            </Box>
            <Box sx={{ width: "30%" }}>
              <img width="600px" src={RonaldoBackground} />
            </Box>
          </Box>
        </Box>
        <Footer />
      </Box>
    </Box>
  );
}
