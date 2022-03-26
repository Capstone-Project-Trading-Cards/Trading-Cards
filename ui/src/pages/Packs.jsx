import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { Box, Button, Typography } from "@mui/material";
import Bronzes from "../images/Bronze-Card.png";
import Silvers from "../images/Silver-Card.png";
import Golds from "../images/pack-background4.png";
import Diamonds from "../images/pack-background2.png";
import PackLogo4 from "../images/soccer-player-cards/rare/De Bruyne.png";
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
        width: "100vw",
        margin: 0,
        overflowX: "hidden",
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
          width: "100vw",
          position: "relative",
          margin: 0,
        }}
      >
        <img
          src={BackgroundImage}
          style={{
            opacity: "0.90",
            position: "fixed",
            left: 0,
            top: 0,
            width: "99.1vw",
            height: "auto",
            zIndex: 0,
            margin: 0,
            minHeight: "100%",
            minWidth: "1024px",
            overflow: "hidden",
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
          <Box sx={{ zIndex: 1, width: "95%" }} mt={6}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-around",
              }}
            >
              {packData.map((pack) => (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    width: "18%",
                  }}
                >
                  <Typography variant="h5" color="white" textAlign="center">
                    {pack.price} TCC
                  </Typography>
                  <img
                    src={
                      pack.packRarity === 1
                        ? Bronzes
                        : pack.packRarity === 2
                        ? Silvers
                        : pack.packRarity === 3
                        ? Golds
                        : Diamonds
                    }
                    sx={{ position: "relative" }}
                    alt="Forwards Pack"
                  />
                  <Button
                    variant="contained"
                    value={buttonValue}
                    href={`packs/${pack._id}`}
                    type="submit"
                  >
                    {pack.name}
                  </Button>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
        <br />
        <Footer />
      </Box>
    </Box>
  );
}
