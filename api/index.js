// libraries
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");

// import routes
const cardsRoute = require("./routes/cards");
const userRoute = require("./routes/user");
const auth = require("./routes/auth");

// server setup
const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

const dbURI = process.env.MONGO_DB;

// connect to database
mongoose
  .connect(process.env.MONGO_DB)
  .then(() => console.log(`Database connection successful`))
  .catch((err) => console.log(`Database connection error ${err}`));

// routes
app.use("/api/cards", cardsRoute);
app.use("/api/user", userRoute);

app.use("/", auth);
// creating server
app.listen(process.env.PORT || 5000, () =>
  console.log("Server is running on Port 5000")
);
