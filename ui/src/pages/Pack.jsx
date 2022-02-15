import React, { useEffect, useState } from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import Navbar from "../components/Navbar";
import Forwards from "../images/pack-background3.png";
import Golds from "../images/pack-background4.png";
import Diamonds from "../images/pack-background2.png";
import PackLogo4 from "../images/fifa-background2.png";
import sampleCard1 from "../images/soccer-player-cards/rare/Haaland.png";
import sampleCard2 from "../images/soccer-player-cards/rare/Mbappé.png";
import sampleCard3 from "../images/soccer-player-cards/rare/Lewandowski.png";
import BackgroundImage from "../images/page-backgrounds/stadium-image.jpg";
import Footer from "../components/Footer";
import Carousel from "react-material-ui-carousel";

const useStyles = makeStyles({
  cardHover: {
    "&:hover": {},
  },
});

export default function Pack() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [pack, setPack] = useState({});
  const [apiMessage, setApiMessage] = useState("");
  const [buttonValue, setButtonValue] = useState("");

  const classes = useStyles();

  const { packId } = useParams();

  const navigate = useNavigate();

  const cardSamples = [sampleCard1, sampleCard2, sampleCard3];

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
      .get(`http://localhost:5000/api/packs/${packId}`)
      .then((res) => res.data)
      .then((res) => {
        setPack(res);
        console.log("pack: " + res.name);
      });
  }, []);

  const handleOpenPack = () => {
    navigate(`/showcase/${packId}`);
  };

  return (
    <Box
      sx={{ height: "100vh", width: "100vw", margin: 0, overflowX: "hidden" }}
    >
      <Navbar user={user} isLoggedIn={isLoggedIn} />
      <Box
        mb={6}
        sx={{
          height: "100%",
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
            width: "99.1vw",
            height: "auto",
            zIndex: 0,
            margin: 0,
            minHeight: "100%",
            minWidth: "1024px",
          }}
          alt="background"
        />
        <Box
          mt={6}
          mb={6}
          sx={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
              padding: "40px",
              width: "60%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                width: "30%",
              }}
            >
              <Typography variant="h5" color="white" textAlign="center">
                {pack.price} TCC
              </Typography>
              <img
                className={classes.cardHover}
                src={
                  pack.name === "Forwards Pack"
                    ? Forwards
                    : pack.name === "Golds Pack"
                    ? Golds
                    : pack.name === "Diamonds Pack"
                    ? Diamonds
                    : PackLogo4
                }
                sx={{ position: "relative" }}
                alt="Forwards Pack"
              />
            </Box>

            <Box
              component="form"
              onSubmit={handleOpenPack}
              sx={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <Typography variant="h4" mb={4} color="white" textAlign="center">
                Pack Details
              </Typography>
              <Typography variant="h6" color="white">
                Pack Name: {pack.name}
              </Typography>
              <Typography mt={1} variant="h6" color="white">
                Price: {pack.price} TCC
              </Typography>
              <Typography mt={1} variant="h6" color="white">
                Card Rarity:
                {pack.packRarity === 1
                  ? " Low"
                  : pack.packRarity === 2
                  ? " Medium"
                  : " High"}
              </Typography>
              <Typography mt={1} mb={4} variant="h6" color="white">
                Number of Cards: {pack.numberOfCards}
              </Typography>
              <Button variant="contained" value={buttonValue} type="submit">
                Open the {pack.name}
              </Button>
            </Box>
          </Box>
        </Box>
        <br />
        <Footer />
      </Box>
    </Box>
  );
}
