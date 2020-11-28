const SocketServer = require("websocket").server;
const http = require("http");
const Message = require("./models/message");

const server = http.createServer((req, res) => {});

server.listen(3000, () => {
  console.log("Listening on port 3000...");
});

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
    console.log(decodeURI(mes.utf8Data), typeof decodeURI(mes.utf8Data));
    const message = decodeURI(mes.utf8Data);
    const json = JSON.parse(message);
    console.log("name=", json.name);
    connections.forEach((element) => {
      if (element != connection) element.sendUTF(mes.utf8Data);
    });
  });

  connection.on("close", (resCode, des) => {
    console.log("connection closed");
    connections.splice(connections.indexOf(connection), 1);
  });
});
