import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import {
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
import ProfilePicture from "../images/pack-background4.png";
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

export default function EditProfile() {
  const [cardData, setCardData] = useState([{}]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("email", email);
    formData.append("image", image);
    axios
      .post(`http://localhost:5000/api/user/profile/${user?._id}`, formData)
      .then((res) => res.data)
      .then((res) => console.log(res))
      .catch((err) => setIsError(err));
  };

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
          setEmail(user?.email);
        }
      })
      .catch((err) => console.log(err));
  }, [user?.username]);

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
            width: "99.9vw",
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
                  >
                    <Grid lg={8}>
                      <img src={ProfilePicture} width="200px" />
                      <Stack sx={{ m: 2, width: "100%" }}>
                        <InputLabel sx={{ color: "white" }}>
                          Upload the Card Image
                        </InputLabel>
                        <input
                          type="file"
                          name="cardImage"
                          filename="cardImage"
                          fileName="cardImage"
                          onChange={(e) => setImage(e.target.files[0])}
                          style={{ color: "white" }}
                        />
                      </Stack>
                      <Typography textAlign="center" color="white">
                        Status - {user?.isAdmin ? "Admin" : "User"}
                      </Typography>
                      <Box
                        sx={{ display: "flex", flexDirection: "column" }}
                        component="form"
                        onSubmit={handleSubmit}
                        encType="multipart/form-data"
                      >
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
                        <FormControl>
                          <TextField
                            type="text"
                            value={user?.username}
                            onChange={(e) => setUsername(e.target.value)}
                            disabled
                            placeholder="Username"
                            margin="normal"
                            sx={{ backgroundColor: "white" }}
                          />
                        </FormControl>
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
