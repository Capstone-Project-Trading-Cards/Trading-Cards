import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { Box, Button, Typography } from "@mui/material";
import BackgroundImage from "../images/page-backgrounds/stadium-image.jpg";
import Footer from "../components/Footer";
import { useLocation } from "react-router";

export default function Showcase() {
  const [cardData, setCardData] = useState([{}]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState();

  const location = useLocation();

  useEffect(() => {
    console.log(location.pathname.split("/")[[2]]);
    // get cards
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
    /*
    axios
      .post(
        `http://localhost:5000/api/packs/showcase/${
          location.pathname.split("/")[[2]]
        }`,
        user?._id
      )
      .then((res) => res.data)
      .then((res) => {
        setCardData(res);
        console.log(res);
      })
      .catch((err) => console.log(err));
      */
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
          <Typography>Page Content Goes Here...</Typography>

          {cardData.map((card) => (
            <img src={card.image} alt={card.name} />
          ))}
        </Box>
        <Footer />
      </Box>
    </Box>
  );
}
