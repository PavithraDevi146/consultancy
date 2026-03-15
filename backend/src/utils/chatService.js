import ChatMessage from "../models/ChatMessage.js";
import ChatThread from "../models/ChatThread.js";

export const canAccessThread = (user, thread) => {
  if (!user || !thread) return false;

  if (user.role === "admin") return true;

  return String(thread.client) === String(user._id);
};

export const ensureClientThread = async ({ clientId }) => {
  let thread = await ChatThread.findOne({ client: clientId });

  if (!thread) {
    thread = await ChatThread.create({ client: clientId });
  }

  return thread;
};

export const createThreadMessage = async ({ threadId, sender, text }) => {
  const cleanText = String(text || "").trim();

  if (!cleanText) {
    throw new Error("Message text is required");
  }

  const thread = await ChatThread.findById(threadId);
  if (!thread) {
    throw new Error("Chat thread not found");
  }

  if (!canAccessThread(sender, thread)) {
    throw new Error("Not authorized for this thread");
  }

  const message = await ChatMessage.create({
    thread: thread._id,
    sender: sender._id,
    senderRole: sender.role,
    text: cleanText,
  });

  if (sender.role === "admin" && !thread.manager) {
    thread.manager = sender._id;
  }

  thread.lastMessage = cleanText;
  thread.lastMessageAt = message.createdAt;
  await thread.save();

  return {
    message,
    thread,
  };
};
