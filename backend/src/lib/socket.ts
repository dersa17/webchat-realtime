import { Server } from "socket.io";
import http from "http";
import express from "express";
import { ENV } from "./env";
import { socketAuthMiddleware } from "../middleware/socket.auth.middleware";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: [ENV.CLIENT_URL as string],
    credentials: true,
  },
});

// apply authentication middleware to all socket connections
io.use(socketAuthMiddleware);

const userSocketMap: Record<string, string> = {}; // { userId: socketId }

io.on("connection", (socket) => {
  console.log("A user connected", socket.user?.fullName);

  if (socket.userId) {
    const userId = socket.userId;
    userSocketMap[userId] = socket.id;

    // kirim daftar user online ke semua client
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", () => {
      console.log("A user disconnected", socket.user?.fullName);
      delete userSocketMap[userId];

      // update daftar user online setelah ada yang keluar
      io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
  }
});


export {io, app, server}