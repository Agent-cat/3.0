import { WebSocketServer } from "ws";
const wss = new WebSocketServer({ port: 8080 });

let allSockets = [];
wss.on("connection", (socket) => {
  allSockets.push(socket);
  socket.on("message", (e) => {
    allSockets.forEach((s) => {
      s.send(e.toString());
    });
  });
});
