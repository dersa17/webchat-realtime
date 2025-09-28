import { Server } from "socket.io";
import http from "http";
import express from "express";
import { ENV } from "./env.js";
import { socketAuthMiddleware } from "../middleware/socket.auth.middleware.js";

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


// we will use this function to check if the user is online or not
export function getReceiverSocketId(userId: string): string {
  return userSocketMap[userId];
}

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