import jwt from "jsonwebtoken";
import { Server } from "socket.io";
import User from "../models/User.js";
import ChatThread from "../models/ChatThread.js";
import { canAccessThread } from "./chatService.js";

let ioInstance = null;

export const initSocketServer = (server) => {
  ioInstance = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  ioInstance.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth?.token;
      if (!token) {
        return next(new Error("Authentication token missing"));
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id).select("-password");

      if (!user) {
        return next(new Error("User not found"));
      }

      socket.user = user;
      return next();
    } catch (error) {
      return next(new Error("Authentication failed"));
    }
  });

  ioInstance.on("connection", (socket) => {
    const user = socket.user;

    socket.join(`user:${user._id}`);
    if (user.role === "admin") {
      socket.join("role:admin");
    }

    socket.on("chat:joinThread", async ({ threadId }) => {
      if (!threadId) return;

      const thread = await ChatThread.findById(threadId);
      if (!thread) return;

      if (!canAccessThread(user, thread)) return;

      socket.join(`thread:${thread._id}`);
    });
  });

  return ioInstance;
};

export const getIo = () => ioInstance;
