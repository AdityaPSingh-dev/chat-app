const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 3001 });

wss.on("connection", function connection(ws) {
  const welcomeMessage = JSON.stringify({
    user: "Server",
    text: "Welcome to the chat!",
    time: new Date().toLocaleTimeString(),
  });
  ws.send(welcomeMessage);

  ws.on("message", function incoming(message) {
    console.log("received: %s", message);
    // Broadcast to everyone
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });
});
