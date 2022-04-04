import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import BackgroundImage from "../images/page-backgrounds/stadium-image.jpg";
import Footer from "../components/Footer";
import { useLocation, useNavigate } from "react-router";
import Bronzes from "../images/Bronze-Card.png";
import Silvers from "../images/Silver-Card.png";
import Golds from "../images/pack-background4.png";
import Platinum from "../images/Platinium-Card.png";
import Diamonds from "../images/pack-background2.png";

export default function Showcase() {
  const [cardData, setCardData] = useState([{}]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState();
  const [revealCards, setRevealCards] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    console.log(location.pathname.split("/")[[2]]);
    // get cards
    axios.get("/");
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
      .then(() => {
        if (revealCards) {
          axios
            .post(
              `http://localhost:5000/api/packs/${
                location.pathname.split("/")[[2]]
              }/open/${5}`,
              {
                username: user.username,
              }
            )
            .then((res) => res.data)
            .then((res) => {
              setCardData(res);
              console.log(res);
              setRevealCards(false);
            })
            .catch((err) => console.log(err));
        } else {
          console.log("Cards revealed");
        }
      })
      .catch((err) => console.log(err));
  }, [user?.username]);

  const handleAddCollection = () => {
    axios
      .post("http://localhost:5000/api/cards/addCardsToMyCollection", {
        cards: cardData,
        userId: user._id,
      })
      .then((res) => res.data)
      .then((res) => {
        console.log(res);
        navigate("/myCards");
      })
      .catch((err) => console.log(err));
  };

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
          <Typography variant="h3" mt={4} color="white" textAlign="center">
            Congratulations! You've Opened
          </Typography>
          <Grid
            mt={4}
            container
            spacing={2}
            direction="row"
            p={3}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            {cardData.map((card, index) => (
              <Grid key={card._id} item xs={12} sm={6} md={4} lg={2}>
                <Box>
                  <Card>
                    <Box
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <CardHeader
                        title={`${card.firstname} ${card.lastname}`}
                        subheader={`Price: ${card.price} - Rating ${card.rating}`}
                      ></CardHeader>
                    </Box>
                    <CardContent>
                      <Box sx={{ display: "flex", justifyContent: "center" }}>
                        <img
                          src={
                            card.tier === "Bronze"
                              ? Bronzes
                              : card.tier === "Silver"
                              ? Silvers
                              : card.tier === "Gold"
                              ? Golds
                              : card.tier === "Platinium"
                              ? Platinum
                              : card.tier === "Diamond"
                              ? Diamonds
                              : ""
                          }
                          width="226px"
                          alt="Forwards Pack"
                        />
                      </Box>
                    </CardContent>
                  </Card>
                </Box>
              </Grid>
            ))}
          </Grid>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button onClick={() => handleAddCollection()} variant="contained">
              Add Cards to My Collection
            </Button>
          </Box>
        </Box>
        <Footer />
      </Box>
    </Box>
  );
}
