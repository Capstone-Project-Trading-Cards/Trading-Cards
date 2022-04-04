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
import SelectInput from "@mui/material/Select/SelectInput";

export default function AddPackForm() {
  const [name, setName] = useState("");
  const [rarity, setRarity] = useState(1);
  const [tier, setTier] = useState("LOW");
  const [price, setPrice] = useState(0);
  const [user, setUser] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
          if (!data.user.isAdmin) {
            navigate("/dashboard");
          }
          setUser(data.user);
          setIsLoggedIn(true);
        } else {
          navigate("/");
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (e) => {
    console.log("submit");
    e.preventDefault();
    setTier(document.getElementById("tier").value);
    axios
      .post("http://localhost:5000/api/packs/addpack", {
        name: name,
        rarity: rarity,
        tier: tier,
        price: price,
      })
      .then((res) => res.data)
      .then((res) => {
        console.log(res);
        navigate("/packs");
      })
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
        Add Pack
      </Typography>
      <Grid mt={4} sx={{ display: "flex", justifyContent: "center" }}>
        <Grid container justifyContent="center" sx={{ width: "70%" }}>
          <Grid item xs={10} sx={{ display: "flex", justifyContent: "center" }}>
            <Box>
              <form onSubmit={handleSubmit}>
                <Box>
                  <FormControl>
                    <TextField
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      label="Name"
                      margin="normal"
                      sx={{ backgroundColor: "white" }}
                    />
                  </FormControl>
                </Box>
                <Box>
                  <FormControl>
                    <TextField
                      type="text"
                      value={rarity}
                      onChange={(e) => setRarity(e.target.value)}
                      label="Rarity"
                      margin="normal"
                      sx={{ backgroundColor: "white" }}
                    />
                  </FormControl>
                </Box>
                <Box>
                  <FormControl>
                    <TextField
                      type="text"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      label="Price"
                      margin="normal"
                      sx={{ backgroundColor: "white" }}
                    />
                  </FormControl>
                </Box>
                <Box p={2} textAlign="center" mb={4}>
                  <FormControl>
                    <select id="tier" style={{ padding: "12px" }}>
                      <option>Tier</option>
                      <option value="LOW">LOW</option>
                      <option value="MID">MID</option>
                      <option value="MIGH">MIGH</option>
                    </select>
                  </FormControl>
                </Box>
                <Stack>
                  <Button variant="contained" type="submit">
                    CREATE
                  </Button>
                </Stack>
              </form>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
