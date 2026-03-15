import ContactMessage from "../models/ContactMessage.js";

export const createContactMessage = async (req, res) => {
  const { name, email, phone, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "Name, email and message are required" });
  }

  const contactMessage = await ContactMessage.create({ name, email, phone, message });
  return res.status(201).json(contactMessage);
};

export const getContactMessages = async (req, res) => {
  const messages = await ContactMessage.find().sort({ createdAt: -1 });
  return res.json(messages);
};
