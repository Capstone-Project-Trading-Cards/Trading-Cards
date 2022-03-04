import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  Grid,
  Input,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import StorageIcon from "@mui/icons-material/Storage";
import { useState } from "react";
import Navbar from "../components/Navbar";

export default function AddPackForm() {
  const [name, setName] = useState("")
  const [rarity, setRarity] = useState(1)
  const [tier, setTier] = useState('LOW')
  const [price, setPrice] = useState(0)
  const [user, setUser] = useState()
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const navigate = useNavigate();

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
        } else {
          navigate("/");
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (e) => {
      console.log('submit')
    e.preventDefault();
    setTier(document.getElementById('tier').value)
    axios
      .post(
        "http://localhost:5000/api/packs/addpack",
        { 
            name: name, 
            rarity: rarity,
            tier: tier,
            price: price   
        }
      )
      .then((res) => res.data)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const packTiers = ["LOW", "MID", "HIGH"];

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        overflowX: "hidden",
        backgroundColor: "#FAFAFA",
      }}
    >
      <Navbar user={user} isLoggedIn={isLoggedIn} />
      <Typography mt={4} variant="h4" align="center">
        Add Card
      </Typography>
      <Grid mt={4} sx={{ display: "flex", justifyContent: "center" }}>
        <Grid container justifyContent="center" sx={{ width: "70%" }}>
          <Grid item xs={10} sx={{ display: "flex", justifyContent: "center" }}>
            <Box>
              <form onSubmit={handleSubmit}>
                Name: <input type="text" value={name} onChange={(e) =>setName(e.target.value)}/>
                <br/>
                Price: <input type="number" value={price} onChange={(e) =>setPrice(e.target.value)}/>
                <br/>
                Tier
                <select id="tier">
                    <option value="LOW">LOW</option>
                    <option value="MID">MID</option>
                    <option value="MIGH">MIGH</option>
                </select>
                <button type='submit'>CREATE</button>
              </form>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
