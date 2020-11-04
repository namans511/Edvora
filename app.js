const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();

const express = require("express");
const app = express();

const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin");
const profileRoutes = require("./routes/profile");
const feedRoutes = require("./routes/feed");

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.json({ limit: "50mb", extended: true }));

//CORS HEADERS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});

//Routing requests
app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);
app.use("/profile", profileRoutes);
app.use("/feed", feedRoutes);

//handling errors
app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const data = error.data;
  const message = error.message;

  res.status(status).json({
    message: message,
    data: data,
  });
});

//connecting to mongodb database
mongoose
  .connect(process.env.MONGO_API_KEY, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then((result) => {
    let port = process.env.PORT || 8080;
    app.listen(port);
    console.log("Server up and running on port " + port);
  })
  .catch((err) => {
    console.log(err);
  });
