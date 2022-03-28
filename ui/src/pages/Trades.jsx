import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Grid,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import BackgroundImage from "../images/page-backgrounds/stadium-image.jpg";
import Footer from "../components/Footer";
import Bronzes from "../images/Bronze-Card.png";
import Silvers from "../images/Silver-Card.png";
import Golds from "../images/pack-background4.png";
import Platinum from "../images/Platinium-Card.png";
import Diamonds from "../images/pack-background2.png";
import { makeStyles } from "@mui/styles";

export default function Trades() {
  const [cardData, setCardData] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState();
  const [postRequest, setPostRequest] = useState(false);

  const handleRemoveFromTradeList = (cardId) => {
    axios
      .post(`http://localhost:5000/api/cards/removeFromTrade`, {
        cardId: cardId,
      })
      .then((res) => res.data)
      .then((res) => {
        console.log(res);
        setPostRequest(!postRequest);
      })
      .catch((err) => console.log(err));
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
        }
      })
      .catch((err) => console.log(err));

    // get cards
    axios
      .get("http://localhost:5000/api/cards/trades")
      .then((res) => res.data)
      .then((res) => {
        setCardData(res);
        console.log(res);
      })
      .catch((err) => console.log(err));
  }, [postRequest]);
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
            Trade Market
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center" }} mt={6}>
            <TextField
              placeholder="Search Card by Name"
              sx={{ backgroundColor: "white" }}
            />
            <Button variant="contained">Search</Button>
          </Box>
          <Grid
            container
            spacing={2}
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
            p={8}
          >
            {cardData.map((card) => (
              <Grid key={card._id} item xs={12} sm={6} md={4} lg={3}>
                <Box>
                  <Card>
                    {user?._id === card.owner ? (
                      <>
                        <CardHeader
                          title={`${card.firstname} ${card.lastname}`}
                          subheader={`Price: ${card.price} - Rating ${card.rating}`}
                        ></CardHeader>
                        <Chip
                          sx={{
                            display: "flex",
                            backgroundColor: "green",
                            color: "white",
                          }}
                          label="Owned by You"
                        />
                      </>
                    ) : (
                      <CardHeader
                        title={`${card.firstname} ${card.lastname}`}
                        subheader={`Price: ${card.price} - Rating ${card.rating} - Owner ${card.owner}`}
                      ></CardHeader>
                    )}
                    <CardContent>
                      <Stack>
                        <Button href={`trades/${card._id}`} variant="contained">
                          Go to Card
                        </Button>
                        {user?.isAdmin || user?._id === card.owner ? (
                          <Box mt={2}>
                            <Button
                              color="secondary"
                              onClick={() =>
                                handleRemoveFromTradeList(card._id)
                              }
                              variant="contained"
                            >
                              Remove Card From Trade Market
                            </Button>
                          </Box>
                        ) : (
                          ""
                        )}
                      </Stack>
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
        </Box>
        <Footer />
      </Box>
    </Box>
  );
}
