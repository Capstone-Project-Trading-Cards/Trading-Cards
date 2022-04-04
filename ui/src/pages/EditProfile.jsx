import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import {
  Avatar,
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import BackgroundImage from "../images/page-backgrounds/stadium-image.jpg";
import ProfilePicture1 from "../images/pack-background4.png";
import ProfilePicture2 from "../images/Bronze-Card.png";
import ProfilePicture3 from "../images/Silver-Card.png";
import PersonIcon from "@mui/icons-material/Person";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import HistoryIcon from "../images/history-icon.png";
import TradeIcon from "../images/trade-ıcon.png";
import Footer from "../components/Footer";
import { makeStyles, useTheme } from "@mui/styles";
import { useNavigate } from "react-router";

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

export default function EditProfile() {
  const [cardData, setCardData] = useState([{}]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [isError, setIsError] = useState(false);

  const navigate = useNavigate();

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
      .then(() => setEmail(user?.email))
      .catch((err) => console.log(err));
  }, [user?.username, image]);

  const clickImageButton = (id) => {
    setImage(id);
    console.log(`Image ${id} chosen`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:5000/api/user/profile/${user?._id}`, {
        img: image,
        email: email,
      })
      .then((res) => res.data)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => setIsError(err))
      .finally(() => navigate("/profile"));
  };

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        overflowX: "hidden",
      }}
    >
      <Navbar user={user} isLoggedIn={isLoggedIn} />
      <Box
        sx={{
          position: "relative",
          height: "100vh",
          width: "100%",
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
            width: "99.2vw",
            height: "auto",
            zIndex: 0,
            margin: 0,
            minHeight: "100%",
            minWidth: "1024px",
          }}
          alt="background"
        />
        <Box sx={{ position: "relative" }} mb={2}>
          <Typography mt={6} variant="h4" color="white" textAlign="center">
            Edit Profile
          </Typography>
          <Box mt={4} className={classes.mainContainer}>
            <Box className={classes.pictureBlock}>
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
                    lg={12}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    component="form"
                    onSubmit={handleSubmit}
                  >
                    <Grid item lg={11}>
                      <img
                        src={
                          image === "1"
                            ? ProfilePicture1
                            : image === "2"
                            ? ProfilePicture2
                            : image === "3"
                            ? ProfilePicture3
                            : ""
                        }
                        width="200px"
                      />
                      <Stack sx={{ width: "100%" }}>
                        <InputLabel sx={{ color: "white" }}>
                          Choose an Avatar
                        </InputLabel>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-around",
                          }}
                        >
                          <Button
                            onClick={() => clickImageButton("1")}
                            variant="contained"
                          >
                            <img width="40px" src={ProfilePicture1} />
                          </Button>
                          <Button
                            onClick={() => clickImageButton("2")}
                            variant="contained"
                          >
                            <img width="40px" src={ProfilePicture2} />
                          </Button>
                          <Button
                            onClick={() => clickImageButton("3")}
                            variant="contained"
                          >
                            <img width="40px" src={ProfilePicture3} />
                          </Button>
                        </Box>
                      </Stack>
                      <Typography textAlign="center" color="white">
                        Status - {user?.isAdmin ? "Admin" : "User"}
                      </Typography>
                      <Box sx={{ display: "flex", flexDirection: "column" }}>
                        {isError ? (
                          <Box>
                            <Typography variant="h6">
                              User fields could not be saved. Try different
                              values.
                            </Typography>
                          </Box>
                        ) : (
                          ""
                        )}
                        <Box>
                          <Typography color="white">
                            {user?.username ? user?.username : "no username"}
                          </Typography>

                          <FormControl>
                            <TextField
                              type="text"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="Email Address"
                              margin="normal"
                              sx={{ backgroundColor: "white" }}
                            />
                          </FormControl>
                          <Box
                            mt={4}
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <Box>
                              <Button type="submit" variant="contained">
                                Save
                              </Button>
                            </Box>
                            <Box>
                              <Button
                                type="submit"
                                color="secondary"
                                variant="contained"
                                href="profile"
                              >
                                Cancel
                              </Button>
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                    </Grid>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
        <Footer />
      </Box>
    </Box>
  );
}
