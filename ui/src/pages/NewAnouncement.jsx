import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import {
  Box,
  Button,
  Card,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";
import BackgroundImage from "../images/page-backgrounds/stadium-image.jpg";
import Footer from "../components/Footer";
import { useNavigate } from "react-router";

export default function NewAnnouncement() {
  const [cardData, setCardData] = useState([{}]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState();
  const [announcement, setAnnouncement] = useState("");
  const [title, setTitle] = useState("");

  const navigate = useNavigate();

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

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/admin/announcements/add", {
        username: user?.username,
        title: title,
        message: announcement,
      })
      .then((res) => res.data)
      .then((res) => {
        console.log(res);
        navigate("/announcements");
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
          <Typography mt={4} color="white" variant="h3" textAlign="center">
            Create Announcement
          </Typography>
          <Box mt={4} sx={{ display: "flex", justifyContent: "center" }}>
            <Box
              sx={{
                width: "50vw",
                display: "flex",
                justifyContent: "center",
                padding: "40px",
              }}
            >
              <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{ display: "flex", flexDirection: "column" }}
              >
                <Box mb={2}>
                  <TextField
                    sx={{ backgroundColor: "white" }}
                    mt={2}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    label="Title"
                  />
                </Box>
                <TextareaAutosize
                  aria-label="minimum height"
                  minRows={5}
                  placeholder="Write you announcement here"
                  style={{ width: 500 }}
                  value={announcement}
                  onChange={(e) => setAnnouncement(e.target.value)}
                />
                <Box
                  mt={2}
                  sx={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Button href="/admin" color="error" variant="contained">
                    Cancel
                  </Button>
                  <Button type="submit" variant="contained">
                    Post
                  </Button>
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
