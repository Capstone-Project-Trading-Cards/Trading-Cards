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

export default function AddCardForm() {
  const [chooseCategory, setChooseCategory] = useState([]);
  const [chooseTier, setChooseTier] = useState(null);
  const [choosePack, setChoosePack] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState();
  const [packs, setPacks] = useState([]);
  const [imageFileName, setImageFileName] = useState("");
  const [error, setError] = useState(false);

  const onChangeImageFile = (e) => {
    setImageFileName(e.target.files[0]);
  };

  const [formInformation, setFormInformation] = useState({
    firstname: "",
    lastname: "",
    category: "",
    // category that it belongs to could be more than one
    // rarity
    tier: "",
    price: "",
    image: "",
    rating: "",
    speed: "",
    power: "",
    vision: "",
    passing: "",
    defending: "",
    stamina: "",
    nationality: "",
    team: "",
    // when user puts the cards up for trade switch to true, it is false as default
    pack: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    console.log(formInformation);
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
          if(!data.user.isAdmin) {
            navigate('/dashboard')
          }
          setUser(data.user);
          setIsLoggedIn(true);
        } else {
          navigate("/");
        }
      })
      .catch((err) => console.log(err));

    //get packs
    axios
      .get("http://localhost:5000/api/packs")
      .then((res) => res.data)
      .then((data) => {
        console.log(data);
        setPacks(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = () => {
    axios
      .post("http://localhost:5000/api/cards/add", formInformation)
      .then((res) => res.data)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        setError(true);
      });
  };
  const categories = [
    "Fifa",
    "Soccer",
    "Forward",
    "Midfielder",
    "Defender",
    "Goalkeeper",
  ];

  const tiers = ["Diamond", "Platinium", "Gold", "Silver", "Bronze"];

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
              {error ? (
                <Typography variant="h6">Couldn't add the card</Typography>
              ) : (
                ""
              )}
              <form onSubmit={handleSubmit} encType="multipart/form-data">
                <FormControl
                  sx={{
                    width: "48%",
                    m: 1,
                  }}
                >
                  <TextField
                    value={formInformation.firstname}
                    onChange={(e) =>
                      setFormInformation({
                        ...formInformation,
                        firstname: e.target.value,
                      })
                    }
                    label="First Name"
                    variant="outlined"
                    sx={{ backgroundColor: "white" }}
                  />
                </FormControl>
                <FormControl
                  sx={{
                    width: "48%",
                    m: 1,
                  }}
                >
                  <TextField
                    value={formInformation.lastname}
                    onChange={(e) =>
                      setFormInformation({
                        ...formInformation,
                        lastname: e.target.value,
                      })
                    }
                    label="Last Name"
                    variant="outlined"
                    sx={{ backgroundColor: "white" }}
                  />
                </FormControl>
                <FormControl sx={{ m: 1, width: "48%" }}>
                  <TextField
                    value={formInformation.nationality}
                    onChange={(e) =>
                      setFormInformation({
                        ...formInformation,
                        nationality: e.target.value,
                      })
                    }
                    label="Nationality"
                    variant="outlined"
                    sx={{ backgroundColor: "white" }}
                  />
                </FormControl>
                <FormControl sx={{ m: 1, width: "48%" }}>
                  <TextField
                    value={formInformation.team}
                    onChange={(e) =>
                      setFormInformation({
                        ...formInformation,
                        team: e.target.value,
                      })
                    }
                    label="Team"
                    variant="outlined"
                    sx={{ backgroundColor: "white" }}
                  />
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
                    value={formInformation.rating}
                    onChange={(e) =>
                      setFormInformation({
                        ...formInformation,
                        rating: e.target.value,
                      })
                    }
                    sx={{ backgroundColor: "white" }}
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
                    value={formInformation.speed}
                    onChange={(e) =>
                      setFormInformation({
                        ...formInformation,
                        speed: e.target.value,
                      })
                    }
                    sx={{ backgroundColor: "white" }}
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
                    value={formInformation.power}
                    onChange={(e) =>
                      setFormInformation({
                        ...formInformation,
                        power: e.target.value,
                      })
                    }
                    sx={{ backgroundColor: "white" }}
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
                    value={formInformation.vision}
                    onChange={(e) =>
                      setFormInformation({
                        ...formInformation,
                        vision: e.target.value,
                      })
                    }
                    sx={{ backgroundColor: "white" }}
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
                    sx={{ backgroundColor: "white" }}
                    label="passing"
                    variant="outlined"
                    value={formInformation.passing}
                    onChange={(e) =>
                      setFormInformation({
                        ...formInformation,
                        passing: e.target.value,
                      })
                    }
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
                    value={formInformation.defending}
                    onChange={(e) =>
                      setFormInformation({
                        ...formInformation,
                        defending: e.target.value,
                      })
                    }
                    sx={{ backgroundColor: "white" }}
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
                    value={formInformation.stamina}
                    onChange={(e) =>
                      setFormInformation({
                        ...formInformation,
                        stamina: e.target.value,
                      })
                    }
                    sx={{ backgroundColor: "white" }}
                  />
                </FormControl>
                <FormControl sx={{ m: 1, width: "48%" }}>
                  <InputLabel>Category</InputLabel>
                  <Select
                    value={formInformation.category}
                    onChange={(e) => {
                      setFormInformation({
                        ...formInformation,
                        category: e.target.value,
                      });
                    }}
                    sx={{ backgroundColor: "white" }}
                    input={<OutlinedInput label="Category" />}
                    fullWidth
                    defaultValue={categories[0]}
                  >
                    {categories?.map((category) => (
                      <MenuItem value={category}>
                        <ListItemText primary={category} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl sx={{ m: 1, width: "48%" }}>
                  <InputLabel>Tier</InputLabel>
                  <Select
                    value={formInformation.tier}
                    onChange={(e) => {
                      setFormInformation({
                        ...formInformation,
                        tier: e.target.value,
                      });
                    }}
                    sx={{ backgroundColor: "white" }}
                    input={<OutlinedInput label="Pack" />}
                    fullWidth
                    defaultValue={tiers[0]}
                  >
                    {tiers?.map((tier) => (
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
                    value={formInformation.price}
                    onChange={(e) =>
                      setFormInformation({
                        ...formInformation,
                        price: e.target.value,
                      })
                    }
                    sx={{ backgroundColor: "white" }}
                  />
                </FormControl>
                <FormControl sx={{ m: 1, width: "48%" }}>
                  <InputLabel>Choose Pack</InputLabel>
                  <Select
                    value={formInformation.pack}
                    onChange={(e) => {
                      setFormInformation({
                        ...formInformation,
                        pack: e.target.value,
                      });
                    }}
                    sx={{ backgroundColor: "white" }}
                    input={<OutlinedInput label="Pack" />}
                    fullWidth
                    defaultValue={packs[0]}
                  >
                    {packs?.map((pack) => (
                      <MenuItem key={pack._id} value={pack.name}>
                        <ListItemText primary={pack.name} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Stack alignItems="center" m={4}>
                  <Button
                    color="primary"
                    variant="contained"
                    endIcon={<StorageIcon />}
                    type="submit"
                  >
                    Add Card to the Database
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
