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

export default function MyCards() {
  const [cardData, setCardData] = useState([{}]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState();
  const [postRequest, setPostRequest] = useState(false);
  const [openTradeIt, setOpenTradeIt] = useState(false);
  const [listPrice, setListPrice] = useState(0);
  const [selectedCard, setSelectedCard] = useState({});
  const [openSellNow, setOpenSellNow] = useState(false);

  const useStyles = makeStyles({
    modal: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: 400,
      backgroundColor: "white",
      border: "2px solid #afafaf",
      boxShadow: 24,
      padding: "20px",
      borderRadius: "10px",
    },
  });

  const classes = useStyles();

  const handleClickTradeIt = (card) => {
    console.log(card);
    setSelectedCard(card);
    setOpenTradeIt(true);
  };

  const handleCloseTradeIt = () => {
    setOpenTradeIt(false);
    setSelectedCard({});
  };

  const handleClickSellNow = (card) => {
    console.log(card);
    setSelectedCard(card);
    setOpenSellNow(true);
  };

  const handleCloseSellNow = () => {
    setOpenSellNow(false);
    setSelectedCard({});
  };

  const handleSellNow = (card) => {
    axios
      .post(`http://localhost:5000/api/cards/sell`, {
        cardData: card._id,
        userId: user._id,
      })
      .then((res) => res.data)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setPostRequest(!postRequest);
        handleCloseSellNow();
      });
  };

  const handleTradeNow = (card, price) => {
    setSelectedCard(card);
    axios
      .post("http://localhost:5000/api/cards/putCardForTrade", {
        cardId: selectedCard._id,
        price: price,
      })
      .then((res) => res.data)
      .then((res) => {
        console.log(res);
        setPostRequest(!postRequest);
      })
      .catch((err) => console.log(err))
      .finally(() => handleCloseTradeIt());
  };

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
          console.log("get username stuff");
        }
      })
      .catch((err) => console.log(err));
    axios
      .get(`http://localhost:5000/api/cards/userCollection/${user?._id}`)
      .then((res) => res.data)
      .then((res) => {
        setCardData(res);
        console.log(res);
        console.log("fetch card stuff");
      })
      .catch((err) => console.log(err));
  }, [user?.username, postRequest]);
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
            My Card Collection
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
              <>
                <Grid key={card._id} item xs={12} sm={6} md={4} lg={3}>
                  <Modal open={openTradeIt} onClose={handleCloseTradeIt}>
                    <Box className={classes.modal}>
                      <Typography
                        textAlign="center"
                        variant="h4"
                        component="h2"
                      >
                        Trade your Card
                      </Typography>
                      <Typography variant="h5" mt={1} textAlign="center">
                        {selectedCard?.firstname} {selectedCard?.lastname}
                      </Typography>
                      <Typography variant="h6" mt={1} textAlign="center">
                        Rating: {selectedCard?.rating}
                      </Typography>
                      <Typography variant="h6" mt={1} textAlign="center">
                        Sell Now Price: {selectedCard?.price}
                      </Typography>
                      <Typography variant="body1" mt={1} textAlign="center">
                        Set a price for your card
                      </Typography>

                      <Box
                        mt={2}
                        sx={{ display: "flex", justifyContent: "center" }}
                      >
                        <TextField
                          value={listPrice}
                          onChange={(e) => setListPrice(e.target.value)}
                          label="TCC"
                        />
                      </Box>
                      <Box
                        mt={4}
                        sx={{ display: "flex", justifyContent: "space-around" }}
                      >
                        <Button
                          onClick={() =>
                            handleTradeNow(selectedCard, listPrice)
                          }
                          variant="contained"
                        >
                          List for trade
                        </Button>
                        <Button
                          onClick={handleCloseTradeIt}
                          variant="contained"
                          color="inherit"
                        >
                          Cancel
                        </Button>
                      </Box>
                    </Box>
                  </Modal>

                  <Modal open={openSellNow} onClose={handleCloseSellNow}>
                    <Box className={classes.modal}>
                      <Typography
                        textAlign="center"
                        variant="h4"
                        component="h2"
                      >
                        Sell your Card
                      </Typography>
                      <Typography variant="h5" mt={1} textAlign="center">
                        {selectedCard?.firstname} {selectedCard?.lastname}
                      </Typography>
                      <Typography variant="h6" mt={1} textAlign="center">
                        Rating: {selectedCard?.rating}
                      </Typography>
                      <Typography variant="h6" mt={1} textAlign="center">
                        Sell Now Price: {selectedCard?.price}
                      </Typography>
                      <Box
                        mt={4}
                        sx={{ display: "flex", justifyContent: "space-around" }}
                      >
                        <Button
                          onClick={() => handleSellNow(selectedCard)}
                          variant="contained"
                        >
                          Sell Now
                        </Button>
                        <Button
                          onClick={handleCloseSellNow}
                          variant="contained"
                          color="inherit"
                        >
                          Cancel
                        </Button>
                      </Box>
                    </Box>
                  </Modal>
                  <Box>
                    <Card>
                      <CardHeader
                        title={`${card.firstname} ${card.lastname}`}
                        subheader={`Price: ${card.price} - Rating ${card.rating}`}
                      ></CardHeader>
                      <CardContent>
                        <Stack>
                          <Button
                            href={`cards/${card._id}`}
                            variant="contained"
                          >
                            Go to Card
                          </Button>
                          <Box
                            mt={2}
                            sx={{
                              display: "flex",
                              justifyContent: "space-around",
                            }}
                          >
                            <Button
                              color="secondary"
                              onClick={() => handleClickSellNow(card)}
                              variant="contained"
                            >
                              Sell Now
                            </Button>
                            {card.availableToTrade === "true" ? (
                              <Button
                                color="success"
                                onClick={() =>
                                  handleRemoveFromTradeList(card._id)
                                }
                                variant="contained"
                              >
                                Remove From Trade List
                              </Button>
                            ) : (
                              <Button
                                color="warning"
                                onClick={() => handleClickTradeIt(card)}
                                variant="contained"
                              >
                                Trade It
                              </Button>
                            )}
                          </Box>
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
              </>
            ))}
          </Grid>
        </Box>
        <Footer />
      </Box>
    </Box>
  );
}
