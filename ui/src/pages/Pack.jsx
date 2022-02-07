import React, { useEffect, useState } from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import Navbar from "../components/Navbar";
import TCCLogo1 from "../images/soccer-player-cards/Haaland.png";
import TCCLogo2 from "../images/soccer-player-cards/Salah.png";
import TCCLogo3 from "../images/soccer-player-cards/Mbappé.png";
import TCCLogo4 from "../images/soccer-player-cards/Lewandowski.png";
import BackgroundImage from "../images/page-backgrounds/stadium-image.jpg";
import Footer from "../components/Footer";

export default function Pack() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [pack, setPack] = useState({});
  const [apiMessage, setApiMessage] = useState("");
  const [buttonValue, setButtonValue] = useState("");

  const { packId } = useParams();

  const navigate = useNavigate();

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
      .catch((err) => {
        console.log(err);
      });

    // get pack info
    axios
      .get(`/api/packs/${packId}`)
      .then((res) => res.data)
      .then((res) => {
        setPack(res);
        console.log("pack: " + res.name);
      });
  }, []);

  return (
    <Box sx={{ height: "100vh", width: "100%", overflowX: "hidden" }}>
      <Navbar user={user} isLoggedIn={isLoggedIn} />
      <Box
        mb={6}
        sx={{
          height: "auto",
          width: "100vw",
          margin: 0,
          position: "relative",
        }}
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
          }}
          alt="background"
        />
        <Box mt={6} mb={4} sx={{ position: "relative" }}></Box>
        <br />
        <Footer />
      </Box>
    </Box>
  );
}
