require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const http = require("http");
const WebSocket = require("ws");
const authRoutes = require("./routes/user");

const Message = require("./models/Messages");
const Chat = require("./models/ChatRoom");

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

mongoose
  .connect(process.env.mongo_uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    server.listen(4000, () => console.log("server is running at port 4000"));
  })
  .catch((err) => console.log(err.message));

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/user", authRoutes);

const clients = new Map();

wss.on("connection", (ws, client) => {
  ws.on("message", async (message) => {
    const msg = JSON.parse(message);

    try {
      if (msg.type == "name") {
        clients.set(msg.name, ws);
        console.log(clients.size);
      }

      if (msg.type == "message") {
        const user = clients.get(msg.reciever);
        console.log(typeof msg)
        const chatFilter = { participants:{$all:[msg.sender , msg.reciever]}}
        const chat = await Chat.findOneAndUpdate(chatFilter , { $push : { messages: msg}})        
        console.log(chat)
        console.log(msg)
        
      
        if (user) {
          user.send(JSON.stringify(msg));
          console.log("msg send");
        }else {
          const chatFilter = { participants:{$all:[msg.sender , msg.reciever]}}
          const chat = await Chat.findOneAndUpdate(chatFilter , { $push: { messages: msg }})
        }
      }
    } catch (err) {
      console.log(err);
    }
  });

  ws.on("close", () => {
    console.log("lost a client");
  });
});
