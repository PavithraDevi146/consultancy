import Inquiry from "../models/Inquiry.js";

export const createInquiry = async (req, res) => {
  const { fullName, email, phone, projectType, budget, message } = req.body;

  if (!fullName || !email || !projectType || !budget || !message) {
    return res.status(400).json({ message: "Please fill all required fields" });
  }

  const inquiry = await Inquiry.create({
    user: req.user?._id,
    fullName,
    email,
    phone,
    projectType,
    budget,
    message,
  });

  return res.status(201).json(inquiry);
};

export const getMyInquiries = async (req, res) => {
  const inquiries = await Inquiry.find({ user: req.user._id }).sort({ createdAt: -1 });
  return res.json(inquiries);
};

export const getAllInquiries = async (req, res) => {
  const inquiries = await Inquiry.find().sort({ createdAt: -1 });
  return res.json(inquiries);
};

export const updateInquiryStatus = async (req, res) => {
  const inquiry = await Inquiry.findById(req.params.id);

  if (!inquiry) {
    return res.status(404).json({ message: "Inquiry not found" });
  }

  inquiry.status = req.body.status || inquiry.status;
  const updated = await inquiry.save();
  return res.json(updated);
};
