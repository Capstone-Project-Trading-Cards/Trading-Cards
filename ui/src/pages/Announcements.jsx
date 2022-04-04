import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { Box, Button, Card, Typography } from "@mui/material";
import BackgroundImage from "../images/page-backgrounds/stadium-image.jpg";
import Footer from "../components/Footer";

export default function Announcement() {
  const [data, setData] = useState([{}]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState();
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    // get announcements
    axios
      .get("http://localhost:5000/api/admin/annoucements")
      .then((res) => res.data)
      .then((res) => {
        setData(res);
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
  }, [isClicked]);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/api/admin/${id}`)
      .then((res) => res.data)
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
      .finally(() => setIsClicked(!isClicked));
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
          <Typography mt={4} color="white" textAlign="center" variant="h3">
            Announcements
          </Typography>
          <Box
            mt={4}
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {data.map((d) => (
              <Box
                mt={2}
                mb={2}
                sx={{
                  padding: "10px",
                  width: "50vw",
                  backgroundColor: "white",
                }}
              >
                <Box
                  mt={2}
                  mb={2}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Typography>Title: {d.title}</Typography>
                  <Typography>By Admin: {d.username}</Typography>
                  <Typography>{d.message}</Typography>
                  <Typography>
                    Created At: {d.createdAt?.split("T")[0]}
                  </Typography>
                  <Box mt={2}>
                    <Button
                      onClick={() => handleDelete(d._id)}
                      variant="contained"
                      color="error"
                    >
                      Delete
                    </Button>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
        <Footer />
      </Box>
    </Box>
  );
}
