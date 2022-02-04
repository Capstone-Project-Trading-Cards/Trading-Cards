import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { Box, Button, Typography } from "@mui/material";
import PackLogo1 from "../images/soccer-player-cards/RONALDO.png";
import PackLogo2 from "../images/soccer-player-cards/Foden.png";
import PackLogo3 from "../images/soccer-player-cards/Neymar.png";
import PackLogo4 from "../images/soccer-player-cards/De Bruyne.png";
import BackgroundImage from "../images/page-backgrounds/stadium-image.jpg";
import Footer from "../components/Footer";

export default function Packs() {
  const [packData, setPackData] = useState([{}]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState();
  const [buttonValue, setButtonValue] = useState("");

  useEffect(() => {
    // get packs
    axios
      .get("http://localhost:5000/api/packs")
      .then((res) => res.data)
      .then((res) => {
        setPackData(res);
        console.log("Pack data" + res);
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
          setIsAdmin(data.user.isAdmin);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = () => {};

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
      {isAdmin ? (
        <Box>
          <Button>Add Pack</Button>
        </Box>
      ) : (
        ""
      )}
      <Box
        container
        mb={6}
        sx={{
          height: "100%",
          width: "100%",
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
        <Box mt={6} mb={6} sx={{ position: "relative" }}>
          <Box>
            <Typography variant="h4" textAlign="center" color="white">
              Buy Packs
            </Typography>
            <Typography variant="body2" mt={2} textAlign="center" color="white">
              Add More Cards to Your Collection!
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
                <Typography variant="h6" color="white" textAlign="center">
                  50.000 TCC
                </Typography>
                <img
                  width="160px"
                  src={PackLogo1}
                  sx={{ position: "relative" }}
                  alt="Forwards Pack"
                />
                <Button
                  variant="contained"
                  value={buttonValue}
                  onClick={() => setButtonValue("forwards")}
                  type="submit"
                >
                  Forwards Pack
                </Button>
              </Box>

              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography variant="h6" color="white" textAlign="center">
                  100.000 TCC
                </Typography>
                <img width="160px" src={PackLogo2} alt="Golds pack" />
                <Button
                  variant="contained"
                  value={buttonValue}
                  onClick={() => setButtonValue("golds")}
                  type="submit"
                >
                  Golds Pack
                </Button>
              </Box>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography variant="h6" color="white" textAlign="center">
                  250.000 TCC
                </Typography>
                <img width="160px" src={PackLogo3} alt="Diamonds Pack" />
                <Button
                  variant="contained"
                  value={buttonValue}
                  onClick={() => setButtonValue("diamonds")}
                  type="submit"
                >
                  Diamonds Pack
                </Button>
              </Box>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography variant="h6" color="white" textAlign="center">
                  500.000 TCC
                </Typography>
                <img width="160px" src={PackLogo4} alt="Rare Cards" />
                <Button
                  variant="contained"
                  value={buttonValue}
                  onClick={() => setButtonValue("rare")}
                  type="submit"
                >
                  Rare Cards Pack
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
