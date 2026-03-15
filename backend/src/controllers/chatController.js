import ChatMessage from "../models/ChatMessage.js";
import ChatThread from "../models/ChatThread.js";
import { getIo } from "../utils/socket.js";
import { canAccessThread, createThreadMessage, ensureClientThread } from "../utils/chatService.js";

const threadPopulate = [
  { path: "client", select: "name email" },
  { path: "manager", select: "name email" },
];

export const createOrGetClientThread = async (req, res) => {
  if (req.user.role !== "client") {
    return res.status(403).json({ message: "Only clients can create a chat thread" });
  }

  const thread = await ensureClientThread({ clientId: req.user._id });
  const populated = await ChatThread.findById(thread._id).populate(threadPopulate);

  return res.status(201).json(populated);
};

export const listThreads = async (req, res) => {
  const query = req.user.role === "admin" ? {} : { client: req.user._id };

  const threads = await ChatThread.find(query)
    .populate(threadPopulate)
    .sort({ lastMessageAt: -1, updatedAt: -1 });

  return res.json(threads);
};

export const getThreadMessages = async (req, res) => {
  const thread = await ChatThread.findById(req.params.threadId);
  if (!thread) {
    return res.status(404).json({ message: "Chat thread not found" });
  }

  if (!canAccessThread(req.user, thread)) {
    return res.status(403).json({ message: "Not authorized for this thread" });
  }

  const messages = await ChatMessage.find({ thread: thread._id })
    .populate("sender", "name email role")
    .sort({ createdAt: 1 });

  return res.json(messages);
};

export const postThreadMessage = async (req, res) => {
  try {
    const { message, thread } = await createThreadMessage({
      threadId: req.params.threadId,
      sender: req.user,
      text: req.body.text,
    });

    const populatedMessage = await ChatMessage.findById(message._id).populate("sender", "name email role");

    const io = getIo();
    if (io) {
      const payload = {
        threadId: String(thread._id),
        message: populatedMessage,
      };

      io.to(`thread:${thread._id}`).emit("chat:newMessage", payload);
      io.to(`user:${thread.client}`).emit("chat:newMessage", payload);
      if (thread.manager) {
        io.to(`user:${thread.manager}`).emit("chat:newMessage", payload);
      } else {
        io.to("role:admin").emit("chat:newMessage", payload);
      }
      io.emit("chat:threadUpdated", {
        threadId: String(thread._id),
        lastMessage: thread.lastMessage,
        lastMessageAt: thread.lastMessageAt,
      });
    }

    return res.status(201).json(populatedMessage);
  } catch (error) {
    if (error.message === "Chat thread not found") {
      return res.status(404).json({ message: error.message });
    }

    if (error.message === "Not authorized for this thread") {
      return res.status(403).json({ message: error.message });
    }

    return res.status(400).json({ message: error.message || "Unable to send message" });
  }
};
