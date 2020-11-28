const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();
const SocketServer = require("websocket").server;
const http = require("http");
const Message = require("./models/message");

const express = require("express");
const app = express();

// importing routers
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin");
const profileRoutes = require("./routes/profile");
const feedRoutes = require("./routes/feed");
const libraryRoutes = require("./routes/library");
const adminBro = require("./routes/adminbro.router");

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
app.use("/adminbro", adminBro);
app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);
app.use("/profile", profileRoutes);
app.use("/feed", feedRoutes);
app.use("/library", libraryRoutes);

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

// connecting to mongodb database
mongoose
  .connect(process.env.MONGO_API_KEY, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then((result) => {
    let port = process.env.PORT || 3000;
    const server = app.listen(port);
    console.log("Server up and running on port " + port);
    wsServer = new SocketServer({ httpServer: server });

    const connections = [];
    const rooms = [];

    wsServer.on("request", (req) => {
      // console.log(req);
      const connection = req.accept();
      console.log("new connection");
      // console.log(connection);
      connections.push(connection);

      connection.on("create-room", (req) => {
        const roomname = "baba"; // change
        if (!Message.exists({ roomname: roomname }))
          Message.create({
            roomname: roomname,
          });
      });

      connection.on("message", (mes) => {
        console.log(mes);
        // console.log(decodeURI(mes.utf8Data), typeof decodeURI(mes.utf8Data));
        const message = decodeURI(mes.utf8Data);
        const json = JSON.parse(message);
        // console.log("name=", json.name);
        connections.forEach((element) => {
          if (element != connection) element.sendUTF(mes.utf8Data);
        });
      });

      connection.on("close", (resCode, des) => {
        console.log("connection closed");
        connections.splice(connections.indexOf(connection), 1);
      });
    });
  })
  .catch((err) => {
    console.log(err);
  });
