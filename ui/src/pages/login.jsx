import { useNavigate } from "react-router";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  FormControl,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault();

    axios
      .post("/api/login", {
          username: username,
          password: password,
      })
      .then((res) => res.data)
      .then((data) => {
        if(data.status == 500) {
          setIsError(true)
          console.log('500')
          return
        }
        console.log(`data from api login ${data.status}`);
        localStorage.setItem("token", data.token);
        navigate("/");
      })
  }

  return (
    <div>
      <Navbar />
      <Box
        mt={6}
        lg={12}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Grid lg={3}>
          <Box
            sx={{ display: "flex", flexDirection: "column" }}
            component="form"
            onSubmit={handleLogin}
          >
            {
              isError ? 
              <Box>
                <Typography variant="h6">
                  Username or password incorrect
                </Typography>
              </Box> :
              ''
            } 
            <FormControl>
              <TextField
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                label="Username"
                margin="normal"
              />
            </FormControl>
            <FormControl>
              <TextField
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                label="Password"
                margin="normal"
              />
            </FormControl>
            <Stack m={4}>
              <Button type="submit" variant="contained">
                Login
              </Button>
            </Stack>
          </Box>
        </Grid>
      </Box>
      <Box class="text-muted">
        <Typography textAlign="center">
          Don't have an account? <Link to="/register">Register</Link>
        </Typography>
      </Box>
    </div>
  );
}
