import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  ListItemText,
  MenuItem,
  Modal,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router";
import Navbar from "../components/Navbar";
import Forwards from "../images/pack-background3.png";
import Golds from "../images/pack-background4.png";
import Diamonds from "../images/pack-background2.png";
import PackLogo4 from "../images/fifa-background2.png";
import sampleCard1 from "../images/soccer-player-cards/rare/Haaland.png";
import sampleCard2 from "../images/soccer-player-cards/rare/Kylian Mbappe.png";
import sampleCard3 from "../images/soccer-player-cards/rare/Lewandowski.png";
import Bronzes from "../images/Bronze-Card.png";
import Silvers from "../images/Silver-Card.png";
import Platinium from "../images/Platinium-Card.png";
import BackgroundImage from "../images/page-backgrounds/stadium-image.jpg";
import Footer from "../components/Footer";
import Carousel from "react-material-ui-carousel";

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

export default function TradeCard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [pack, setPack] = useState({});
  const [apiMessage, setApiMessage] = useState("");
  const [cardData, setCardData] = useState({});
  const [buttonValue, setButtonValue] = useState("");
  const [open, setOpen] = React.useState(false);
  const [chosenCard, setChosenCard] = React.useState({});
  const [ownedCards, setOwnedCards] = React.useState([]);

  const handleDelete = (cardId) => {
    axios
      .delete(`http://localhost:5000/api/cards/${cardId}`)
      .then((res) => res.data)
      .then((res) => {
        console.log(res);
        navigate("/cards");
      })
      .catch((err) => console.log(err));
  };

  const handleSendTradeOffer = (chosenCard) => {
    setChosenCard(chosenCard);
    console.log(`Card Data ${cardData} offered card ${chosenCard}`);
    axios
      .post("http://localhost:5000/api/trades/offer", {
        offerFrom: user?._id,
        offerTo: cardData.owner,
        offeredCard: chosenCard,
        wantedCard: cardData,
      })
      .then((res) => res.data)
      .then((res) => {
        console.log(res);
        navigate("/tradeOffers");
      })
      .catch((err) => console.log(err));
  };

  const handleOpen = (e) => {
    e.preventDefault();
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const location = useLocation();

  const classes = useStyles();

  const navigate = useNavigate();

  const cardSamples = [sampleCard1, sampleCard2, sampleCard3];

  useEffect(() => {
    console.log(location.pathname.split("/")[[2]]);
    axios
      .get(
        `http://localhost:5000/api/cards/${location.pathname.split("/")[[2]]}`
      )
      .then((res) => res.data)
      .then((res) => {
        setCardData(res);
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
        } else {
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get(`http://localhost:5000/api/cards/userCollection/${user?._id}`)
      .then((res) => res.data)
      .then((res) => {
        setOwnedCards(res);
        console.log(res);
        console.log("fetch card stuff");
      })
      .catch((err) => console.log(err));
  }, [ownedCards.length, user.username]);

  const handleRemoveFromTradeList = (cardId) => {
    axios
      .post(`http://localhost:5000/api/cards/removeFromTrade`, cardId)
      .then((res) => res.data)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
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
          <Modal open={open} onClose={handleClose}>
            <Box className={classes.modal}>
              <Typography textAlign="center" variant="h4" component="h2">
                Send offer
              </Typography>
              <Typography variant="h6" textAlign="center" mt={1}>
                {cardData.firstname} {cardData.lastname}
              </Typography>
              <Typography textAlign="center" mt={1}>
                Rating: {cardData.rating}
              </Typography>
              <Typography textAlign="center" mt={1}>
                Value: {cardData.price}
              </Typography>
              {ownedCards.length > 0 ? (
                <>
                  <Typography variant="body1" mt={1} mb={2} textAlign="center">
                    Choose the Card that you want to trade
                  </Typography>
                  <FormControl
                    sx={{
                      m: 3,
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <InputLabel>Owned Cards</InputLabel>
                    <Select
                      value={chosenCard}
                      onChange={(e) => setChosenCard(e.target.value)}
                      sx={{ backgroundColor: "white" }}
                      input={<OutlinedInput label="Category" />}
                      fullWidth
                      defaultValue={ownedCards[0]}
                    >
                      {ownedCards?.map((ownedCard) => (
                        <MenuItem key={ownedCard._id} value={ownedCard}>
                          <ListItemText
                            primary={`${ownedCard.firstname} ${ownedCard.lastname}`}
                            secondary={`Rating: ${ownedCard.rating} Value: ${ownedCard.price}`}
                          />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </>
              ) : (
                ""
              )}
              <Box
                mt={4}
                sx={{ display: "flex", justifyContent: "space-around" }}
              >
                <Button
                  onClick={() => handleSendTradeOffer(chosenCard)}
                  variant="contained"
                >
                  Send the offer
                </Button>
                <Button
                  onClick={handleClose}
                  variant="contained"
                  color="inherit"
                >
                  Cancel
                </Button>
              </Box>
            </Box>
          </Modal>
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
                Value {cardData.price} TCC
              </Typography>
              {user?._id === cardData.owner ? (
                <Typography variant="h5" color="white" textAlign="center">
                  Owned By You
                </Typography>
              ) : (
                <Typography variant="h5" color="white" textAlign="center">
                  Owner id: {cardData.owner}
                </Typography>
              )}
              <img
                className={classes.cardHover}
                src={
                  cardData.tier === "Platinium"
                    ? Platinium
                    : cardData.tier === "Diamond"
                    ? Diamonds
                    : cardData.tier === "Gold"
                    ? Golds
                    : cardData.tier === "Silver"
                    ? Silvers
                    : Bronzes
                }
                alt="cardimage"
                sx={{ position: "relative" }}
              />
            </Box>

            <Box
              component="form"
              sx={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <Typography variant="h4" mb={4} color="white" textAlign="center">
                {cardData.name} {cardData.lastname}
              </Typography>
              <Typography mt={1} variant="h6" color="white">
                Rating: {cardData.rating}
              </Typography>
              <Typography mt={1} variant="h6" color="white">
                Team: {cardData.team}
              </Typography>
              <Typography mt={1} variant="h6" color="white">
                Nationality: {cardData.nationality}
              </Typography>
              <Typography mt={1} variant="h6" color="white">
                Card Tier: {cardData.tier}
              </Typography>
              <Typography mt={1} variant="h6" color="white">
                Package: {cardData.pack}
              </Typography>
              <Typography mt={1} variant="h6" color="white">
                Card Category: {cardData.category}
              </Typography>
              <Typography mt={1} variant="h6" color="white">
                Speed: {cardData.speed}
              </Typography>
              <Typography mt={1} variant="h6" color="white">
                Power: {cardData.power}
              </Typography>
              <Typography mt={1} variant="h6" color="white">
                Vision: {cardData.vision}
              </Typography>
              <Typography mt={1} variant="h6" color="white">
                Passing: {cardData.passing}
              </Typography>
              <Typography mt={1} variant="h6" color="white">
                Defending: {cardData.defending}
              </Typography>
              <Typography mt={1} mb={4} variant="h6" color="white">
                Stamina: {cardData.stamina}
              </Typography>
              {user._id !== cardData.owner ? (
                <>
                  {ownedCards.length > 0 ? (
                    <Button
                      color="warning"
                      mt={2}
                      onClick={handleOpen}
                      variant="contained"
                    >
                      Send a Trade Offer
                    </Button>
                  ) : (
                    ""
                  )}
                </>
              ) : (
                <Button
                  color="warning"
                  mt={2}
                  onClick={() => handleRemoveFromTradeList(cardData._id)}
                  variant="contained"
                >
                  Remove from Trade List
                </Button>
              )}
              {user.isAdmin ? (
                <Box mt={2}>
                  <Button
                    color="secondary"
                    onClick={() => handleDelete(cardData._id)}
                    variant="contained"
                  >
                    Delete Card
                  </Button>
                </Box>
              ) : (
                ""
              )}
            </Box>
          </Box>
        </Box>
        <br />
        <Footer />
      </Box>
    </Box>
  );
}
