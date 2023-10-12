const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const { dummyData } = require("./data");
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});
const cors = require("cors");
app.use(cors());
app.get("/api/check", (req, res) => {
  res.status(200).send(dummyData.filter((d) => d.id < 10));
});

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("getLast", (res) => {
    res(dummyData[dummyData.length - 1]);
  });
});

server.listen(5000, () => {
  console.log("listening on *:5000");
});
