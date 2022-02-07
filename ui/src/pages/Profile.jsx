import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { Box, Button, Grid, Typography } from "@mui/material";
import BackgroundImage from "../images/page-backgrounds/stadium-image.jpg";
import ProfilePicture from "../images/fifa-background3.png";
import IconPicture1 from "../images/fifa-background2.png";
import IconPicture2 from "../images/red-card.png";
import IconPicture3 from "../images/fifa-background6.png";
import PersonIcon from "@mui/icons-material/Person";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import HistoryIcon from "../images/history-icon.png";
import TradeIcon from "../images/trade-ıcon.png";
import Footer from "../components/Footer";
import { makeStyles, useTheme } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    display: "flex",
    justifyContent: "space-around",
    flexDirection: "column",
    alignItems: "center",
    "@media screen and (max-width: 960px)": {},
  },
  pictureBlock: {
    width: "40%",
    height: "auto",
    display: "flex",
    justifyContent: "space-around",
    "@media screen and (max-width: 960px)": {
      flexDirection: "column",
      width: "90%",
      margin: "20px",
    },
  },
  infoBlock: {
    width: "40%",
    height: "auto",
    "@media screen and (max-width: 960px)": {
      width: "90%",
      margin: "20px",
    },
  },
}));

export default function Profile() {
  const [cardData, setCardData] = useState([{}]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState();

  const classes = useStyles();
  const theme = useTheme();

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
        }
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        position: "relative",
      }}
    >
      <Navbar user={user} isLoggedIn={isLoggedIn} />
      <Box sx={{ position: "relative", height: "100%", width: "100vw" }}>
        <img
          src={BackgroundImage}
          style={{
            opacity: "0.90",
            position: "fixed",
            left: 0,
            top: 0,
            width: "100vw",
            height: "auto",
            zIndex: 0,
            minHeight: "100%",
            minWidth: "1024px",
          }}
          alt="background"
        />
        <Box sx={{ position: "relative" }} mb={2}>
          <Typography mt={6} variant="h4" color="white" textAlign="center">
            Profile
          </Typography>
          <Box mt={4} className={classes.mainContainer}>
            <Box className={classes.pictureBlock}>
              <Box>
                <Box
                  mt={2}
                  sx={{ display: "flex", justifyContent: "flex-start" }}
                >
                  <Button size="small" variant="contained">
                    Edit Profile
                  </Button>
                </Box>
                <img src={ProfilePicture} width="200px" />
              </Box>
              <Box mt={2}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                    width: "100%",
                  }}
                >
                  <Box
                    mt={2}
                    sx={{ display: "flex", justifyContent: "space-around" }}
                  >
                    <Box>
                      <Typography color="white">
                        Status - {user?.isAdmin ? "Admin" : "User"}
                      </Typography>
                      <Typography mt={1} color="white">
                        <PersonIcon />
                        {user?.username}
                      </Typography>
                      <Typography variant="subtitle2" mt={1} color="white">
                        <AlternateEmailIcon />
                        {user?.email}
                      </Typography>
                      <Typography variant="subtitle1" mt={1} color="white">
                        <MonetizationOnIcon />
                        {user?.coinBalance} TCC
                      </Typography>
                      <Typography variant="subtitle1" mt={1} color="white">
                        <LocalAtmIcon />${user?.moneyBalance}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box mt={4} className={classes.infoBlock}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-around",
                  margin: "20px",
                }}
              >
                <Button color="secondary" size="small" variant="contained">
                  Banned Users
                </Button>
                <img width="40px" src={IconPicture2} />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-around",
                  margin: "20px",
                }}
              >
                <Button color="secondary" size="small" variant="contained">
                  Trade History
                </Button>
                <img src={HistoryIcon} width="40px" />
              </Box>
            </Box>
          </Box>
        </Box>
        <Footer />
      </Box>
    </Box>
  );
}
