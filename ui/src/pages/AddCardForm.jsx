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
import Footer from "../components/Footer";

export default function AddCardForm() {
  const [chooseCategory, setChooseCategory] = useState([]);
  const [chooseTier, setChooseTier] = useState(null);
  const [choosePack, setChoosePack] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState()

  const navigate = useNavigate()

  useEffect(() => {    
    // get user
    axios.get("/api/getUsername", {
      headers: {
          "x-access-token": localStorage.getItem("token")
      }
    })
    .then((res) => res.data)
    .then(data => {
      console.log(data)
      console.log(data.isLoggedIn)
      if(data.isLoggedIn) {
        setUser(data.user)
        setIsLoggedIn(true)
      } else {
        navigate('/')
      }
    })
    .catch((err) => console.log(err));
  }, []);

  const categories = [
    "Fifa",
    "Soccer",
    "Forward",
    "Midfielder",
    "Defender",
    "Goalkeeper",
  ];

  const tiers = ["Diamond", "Platinium", "Gold", "Silver", "Bronze"];

  const packs = [
    "Rare Cards Pack",
    "Forwards Pack",
    "Diamonds Pack",
    "Golds Pack",
  ];

  return (
    <Box sx={{ width: "100vw", height: "100vh", overflowX: "hidden" }}>
      <Navbar user={user} isLoggedIn={isLoggedIn}/>
      <Typography mt={4} variant="h4" align="center">
        Add Card
      </Typography>
      <Grid mt={4} sx={{ display: "flex", justifyContent: "center" }}>
        <Grid container justifyContent="center" sx={{ width: "70%" }}>
          <Grid item xs={10} sx={{ display: "flex", justifyContent: "center" }}>
            <Box component="form">
              <FormControl
                sx={{
                  width: "48%",
                  m: 1,
                }}
              >
                <TextField label="First Name" variant="outlined" />
              </FormControl>
              <FormControl
                sx={{
                  width: "48%",
                  m: 1,
                }}
              >
                <TextField label="Last Name" variant="outlined" />
              </FormControl>
              <FormControl sx={{ m: 1, width: "48%" }}>
                <TextField label="Nationality" variant="outlined" />
              </FormControl>
              <FormControl sx={{ m: 1, width: "48%" }}>
                <TextField label="Team" variant="outlined" />
              </FormControl>
              <InputLabel sx={{ m: 2 }}>
                10 - 100 is the rating limit*
              </InputLabel>
              <FormControl sx={{ m: 1, width: "14%" }}>
                <TextField
                  type="number"
                  InputProps={{
                    inputProps: {
                      max: 100,
                      min: 10,
                    },
                  }}
                  label="rating"
                  variant="outlined"
                />
              </FormControl>
              <FormControl sx={{ m: 1, width: "12%" }}>
                <TextField
                  type="number"
                  InputProps={{
                    inputProps: {
                      max: 100,
                      min: 10,
                    },
                  }}
                  label="speed"
                  variant="outlined"
                />
              </FormControl>
              <FormControl sx={{ m: 1, width: "12%" }}>
                <TextField
                  type="number"
                  InputProps={{
                    inputProps: {
                      max: 100,
                      min: 10,
                    },
                  }}
                  label="power"
                  variant="outlined"
                />
              </FormControl>
              <FormControl sx={{ m: 1, width: "12%" }}>
                <TextField
                  type="number"
                  InputProps={{
                    inputProps: {
                      max: 100,
                      min: 10,
                    },
                  }}
                  label="vision"
                  variant="outlined"
                />
              </FormControl>
              <FormControl sx={{ m: 1, width: "12%" }}>
                <TextField
                  type="number"
                  InputProps={{
                    inputProps: {
                      max: 100,
                      min: 10,
                    },
                  }}
                  label="passing"
                  variant="outlined"
                />
              </FormControl>
              <FormControl sx={{ m: 1, width: "12%" }}>
                <TextField
                  type="number"
                  InputProps={{
                    inputProps: {
                      max: 100,
                      min: 10,
                    },
                  }}
                  label="defending"
                  variant="outlined"
                />
              </FormControl>
              <FormControl sx={{ m: 1, width: "12%" }}>
                <TextField
                  type="number"
                  InputProps={{
                    inputProps: {
                      max: 100,
                      min: 10,
                    },
                  }}
                  label="stamina"
                  variant="outlined"
                />
              </FormControl>
              <FormControl sx={{ m: 1, width: "48%" }}>
                <InputLabel>Category</InputLabel>
                <Select
                  multiple
                  value={chooseCategory}
                  onChange={(e) => setChooseCategory(e.target.value)}
                  input={<OutlinedInput label="Category" />}
                  renderValue={(selected) => selected.join(", ")}
                  fullWidth
                >
                  {categories.map((category) => (
                    <MenuItem key={category} value={category}>
                      <Checkbox
                        checked={chooseCategory.indexOf(category) > -1}
                      />
                      <ListItemText primary={category} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl sx={{ m: 1, width: "48%" }}>
                <InputLabel>Tier</InputLabel>
                <Select
                  label="tier"
                  value={chooseTier}
                  onChange={(e) => setChooseTier(e.target.value)}
                  fullWidth
                >
                  {tiers.map((tier) => (
                    <MenuItem key={tier} value={tier}>
                      <ListItemText primary={tier} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <InputLabel sx={{ m: 2 }}>
                1 - 10000000 is the price limit*
              </InputLabel>
              <FormControl sx={{ m: 1, width: "48%" }}>
                <TextField
                  type="number"
                  InputProps={{ inputProps: { max: 10000000, min: 1 } }}
                  label="Price"
                />
              </FormControl>
              <FormControl sx={{ m: 1, width: "48%" }}>
                <InputLabel>Choose Pack</InputLabel>
                <Select
                  value={choosePack}
                  onChange={(e) => setChoosePack(e.target.value)}
                  input={<OutlinedInput label="Pack" />}
                  fullWidth
                  defaultValue={packs[0]}
                >
                  {packs.map((pack) => (
                    <MenuItem key={pack} value={pack}>
                      <ListItemText primary={pack} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Stack alignItems="center" sx={{ m: 2 }}>
                <InputLabel>Upload the Card Image</InputLabel>
                <label htmlFor="contained-button-file">
                  <Input
                    accept="image/*"
                    id="contained-button-file"
                    multiple
                    type="file"
                  />
                </label>
              </Stack>
              <Stack alignItems="center" m={4}>
                <Button
                  color="primary"
                  variant="contained"
                  endIcon={<StorageIcon />}
                >
                  Add Card to the Database
                </Button>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Grid>
      <br />
      <Footer />
    </Box>
  );
}
