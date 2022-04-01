// libraries
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const fileupload = require("express-fileupload");

// import routes
const cardsRoute = require("./routes/cards");
const userRoute = require("./routes/user");
const auth = require("./routes/auth");
const packRoute = require("./routes/pack");
const adminRoute = require("./routes/admin");
const tradesRoute = require("./routes/trades");

// server setup
const app = express();

dotenv.config();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(fileupload());
const http = require("http").Server(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  socket.on("message", ({ name, message }) => {
    io.emit("message", { name, message });
    console.log(`${message} ${name}`);
  });
});

const dbURI = process.env.MONGO_DB;

// connect to database
mongoose
  .connect(dbURI)
  .then(() => console.log(`Database connection successful`))
  .catch((err) => console.log(`Database connection error ${err}`));

// routes
app.use("/api/cards", cardsRoute);
app.use("/api/user", userRoute);
app.use("/", auth);
app.use("/api/packs", packRoute);
app.use("/api/admin", adminRoute);
app.use("/api/trades", tradesRoute);
app.use("/", auth);

// creating server
http.listen(process.env.PORT || 5000, () =>
  console.log("Express server is running on Port 5000")
);
