import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: {},
  username: "",
  isLoggedIn: false,
  token: "",
  isAdmin: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, action) {
      axios
        .post("/api/login", {
          username: action.payload.username,
          password: action.payload.password,
        })
        .then((res) => res.data)
        .then((data) => {
          if (data.status === 500) {
            console.log(data);
          } else {
            console.log(`data from api login ${data.status}`);
            state.token = data.token;
          }
        });
    },
    getUser(state) {
      axios
        .get("/api/getUsername", {
          headers: {
            "x-access-token": state.token,
          },
        })
        .then((res) => res.data)
        .then((data) => {
          if (data.isLoggedIn) {
            state.user = data.user;
            state.username = data.user.username;
            state.isAdmin = data.user.isAdmin;
            state.isLoggedIn = true;
          }
        })
        .catch((err) => console.log(err));
    },
    logout(state) {
      state.user = {};
      state.username = "";
      state.isLoggedIn = false;
      state.token = "";
      state.isAdmin = false;
    },
  },
});

export const { login, logout, getUser } = userSlice.actions;
export default userSlice.reducer;
