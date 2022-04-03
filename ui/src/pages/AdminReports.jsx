import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Grid,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import BackgroundImage from "../images/page-backgrounds/stadium-image.jpg";
import Footer from "../components/Footer";
import { useNavigate } from "react-router";

export default function Homepage() {
  const [cardData, setCardData] = useState([{}]);
  const [userData, setUserData] = useState([{}]);
  const [packData, setPackData] = useState([{}]);
  const [tradeData, setTradeData] = useState([{}]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState();
  const [buttonClicked, setButtonClicked] = useState(false);

  const navigate = useNavigate()

  let totalCardPrice = 0;
  let totalPack = 0;
  let totalCoinBalance = 0;
  let totalMoneyBalance = 0;

  useEffect(() => {
    // get cards
    axios
      .get("http://localhost:5000/api/cards/")
      .then((res) => res.data)
      .then((res) => {
        setCardData(res);
        console.log(res);
      })
      .catch((err) => console.log(err));

    axios
      .get("http://localhost:5000/api/cards/getTotalCardValue")
      .then((res) => res.data)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));

    // get all users
    axios
      .get("http://localhost:5000/api/user/getAllUsers")
      .then((res) => res.data)
      .then((res) => {
        setUserData(res);
        console.log(res);
      })
      .catch((err) => console.log(err));

    // get all packs
    axios
      .get("http://localhost:5000/api/packs/")
      .then((res) => res.data)
      .then((res) => {
        setPackData(res);
        console.log(res);
      })
      .catch((err) => console.log(err));

    // get all trades
    axios
      .get("http://localhost:5000/api/trades/")
      .then((res) => res.data)
      .then((res) => {
        setTradeData(res);
        console.log(res);
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
        if(!data.user.isAdmin) {
          navigate('/dashboard')
        }
        if (data.isLoggedIn) {
          setUser(data.user);
          setIsLoggedIn(true);
        }
      })
      .catch((err) => console.log(err));
  }, [buttonClicked]);

  const banUser = (userId) => {
    axios
      .post("http://localhost:5000/api/user/banUser", {
        userId: userId,
      })
      .then((res) => res.data)
      .then((res) => {
        console.log(res);
        setButtonClicked(!buttonClicked);
      })
      .catch((err) => console.log(err));
  };

  const unbanUser = (userId) => {
    axios
      .post("http://localhost:5000/api/user/unbanUser", {
        userId: userId,
      })
      .then((res) => res.data)
      .then((res) => {
        console.log(res);
        setButtonClicked(!buttonClicked);
      })
      .catch((err) => console.log(err));
  };

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        margin: 0,
        boxSizing: "border-box",
        overflowX: "hidden",
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
            width: "99%",
            height: "auto",
            zIndex: 0,
            minHeight: "100%",
            minWidth: "1024px",
          }}
          alt="background"
        />
        <Box sx={{ position: "relative" }} mb={2}>
          <Box mt={4}>
            <Typography textAlign="center" color="white" variant="h3">
              Admin Actions
            </Typography>
            <Box
              mt={4}
              sx={{ display: "flex", justifyContent: "space-around" }}
            >
              <Card>
                <Box>
                  <Typography variant="h5" textAlign="center">
                    Create a Pack
                  </Typography>
                  <Button href="/addPack" variant="contained">
                    Click here to Navigate
                  </Button>
                </Box>
              </Card>
              <Card>
                <Box>
                  <Typography variant="h5" textAlign="center">
                    Create a Card
                  </Typography>
                  <Button href="/addCard" variant="contained">
                    Click here to Navigate
                  </Button>
                </Box>
              </Card>
              <Card>
                <Box>
                  <Typography variant="h5" textAlign="center">
                    Add Announcement
                  </Typography>
                  <Button href="/addAnnouncement" variant="contained">
                    Click here to Navigate
                  </Button>
                </Box>
              </Card>
              <Card>
                <Box>
                  <Typography variant="h5" textAlign="center">
                    Announcements
                  </Typography>
                  <Button href="/announcements" variant="contained">
                    Click here to Navigate
                  </Button>
                </Box>
              </Card>
            </Box>
          </Box>
          <Typography mt={6} variant="h3" color="white" textAlign="center">
            Admin Reports
          </Typography>
          <Grid
            container
            spacing={2}
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
            p={8}
          >
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Box>
                <Card>
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <CardHeader title={`Recent Users`}></CardHeader>
                  </Box>
                  <CardContent>
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>Username</TableCell>
                            <TableCell>Created At</TableCell>
                            <TableCell align="right">Ban User</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {userData?.map((user) => (
                            <TableRow key={user.username}>
                              <TableCell component="th" scope="row">
                                {user.username}
                              </TableCell>
                              <TableCell component="th" scope="row">
                                {`${new Date(user.createdAt).getDate()}/${
                                  new Date(user.createdAt).getMonth() + 1
                                }/${new Date(user.createdAt).getFullYear()}`}
                              </TableCell>
                              <TableCell align="right">
                                {user.banned === "true" ? (
                                  <Button
                                    size="small"
                                    onClick={() => unbanUser(user._id)}
                                    variant="contained"
                                    color="success"
                                  >
                                    UnBan User
                                  </Button>
                                ) : (
                                  <Button
                                    size="small"
                                    onClick={() => banUser(user._id)}
                                    variant="contained"
                                    color="error"
                                  >
                                    Ban User
                                  </Button>
                                )}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            </Grid>

            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Box>
                <Card>
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <CardHeader title={`Recently Added Cards`}></CardHeader>
                  </Box>
                  <CardContent>
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>Card Name</TableCell>
                            <TableCell>Rating</TableCell>
                            <TableCell align="right">Price</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {cardData?.map((card) => (
                            <TableRow key={card._id}>
                              <TableCell component="th" scope="row">
                                {card.firstname} {card.lastname}
                              </TableCell>
                              <TableCell component="th" scope="row">
                                {card.rating}
                              </TableCell>
                              <TableCell
                                align="right"
                                component="th"
                                scope="row"
                              >
                                {card.price}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            </Grid>

            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Box>
                <Card>
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <CardHeader title={`Recently Added Packs`}></CardHeader>
                  </Box>
                  <CardContent>
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>Pack Name</TableCell>
                            <TableCell align="right">Price</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {packData?.map((pack) => (
                            <TableRow key={pack._id}>
                              <TableCell component="th" scope="row">
                                {pack.name}
                              </TableCell>
                              <TableCell
                                align="right"
                                component="th"
                                scope="row"
                              >
                                {pack.price}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Box>
                <Card>
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <CardHeader title={`Recent Listings`}></CardHeader>
                  </Box>
                  <CardContent>
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>Offer From</TableCell>
                            <TableCell align="right">Offered To</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {tradeData?.map((trade) => (
                            <TableRow key={trade._id}>
                              <TableCell component="th" scope="row">
                                {trade.offerTo}
                              </TableCell>
                              <TableCell
                                align="right"
                                component="th"
                                scope="row"
                              >
                                {trade.offerFrom}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            </Grid>
          </Grid>
          <Typography variant="h4" textAlign="center" color="white">
            Financial Information
          </Typography>
          <Grid container direction="row" p={8}>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Box>
                <Card sx={{ height: "30vh" }}>
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <CardHeader
                      title={`Financial Information`}
                      subheader={`Total Value of Items`}
                    ></CardHeader>
                  </Box>
                  <CardContent>
                    <Box
                      sx={{ display: "flex", justifyContent: "space-around" }}
                    >
                      <Box>
                        <Typography variant="h5">Total Card Value</Typography>
                        <Typography mt={2} textAlign="center" variant="h5">
                          {totalCardPrice}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="h5">Number of Packs</Typography>
                        <Typography mt={2} textAlign="center" variant="h5">
                          {packData?.length}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="h5">Number of Users</Typography>
                        <Typography mt={2} textAlign="center" variant="h5">
                          {userData?.length}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="h5">
                          Number of Trades In Market
                        </Typography>
                        <Typography mt={2} textAlign="center" variant="h5">
                          {tradeData?.length}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            </Grid>
          </Grid>
          <Typography variant="h4" textAlign="center" color="white">
            Miscellaneous Information
          </Typography>
          <Grid container direction="row" p={8}>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Box>
                <Card sx={{ height: "30vh" }}>
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <CardHeader
                      title={`Database`}
                      subheader={`Database information of TCC`}
                    ></CardHeader>
                  </Box>
                  <CardContent>
                    <Box
                      sx={{ display: "flex", justifyContent: "space-around" }}
                    >
                      <Box>
                        <Typography variant="h5">Number Of Cards</Typography>
                        <Typography mt={2} textAlign="center" variant="h5">
                          {cardData?.length}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="h5">Number of Packs</Typography>
                        <Typography mt={2} textAlign="center" variant="h5">
                          {packData?.length}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="h5">Number of Users</Typography>
                        <Typography mt={2} textAlign="center" variant="h5">
                          {userData?.length}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="h5">
                          Number of Trades In Market
                        </Typography>
                        <Typography mt={2} textAlign="center" variant="h5">
                          {tradeData?.length}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Footer />
      </Box>
    </Box>
  );
}
