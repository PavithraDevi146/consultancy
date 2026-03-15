import InteriorEnquiry from "../models/InteriorEnquiry.js";

export const createInteriorEnquiry = async (req, res) => {
  const { name, email, phone, city, interiorType, budget, message } = req.body;

  if (!name || !email || !phone || !city || !interiorType || !budget || !message) {
    return res.status(400).json({ message: "Please provide all required fields" });
  }

  const enquiry = await InteriorEnquiry.create({
    user: req.user?._id,
    name,
    email,
    phone,
    city,
    interiorType,
    budget,
    message,
  });

  return res.status(201).json(enquiry);
};

export const createMyInteriorEnquiry = async (req, res) => {
  const { name, email, phone, city, interiorType, budget, message } = req.body;

  if (!name || !email || !phone || !city || !interiorType || !budget || !message) {
    return res.status(400).json({ message: "Please provide all required fields" });
  }

  const enquiry = await InteriorEnquiry.create({
    user: req.user._id,
    name,
    email,
    phone,
    city,
    interiorType,
    budget,
    message,
  });

  return res.status(201).json(enquiry);
};

export const getInteriorEnquiries = async (req, res) => {
  const enquiries = await InteriorEnquiry.find().sort({ createdAt: -1 });
  return res.json(enquiries);
};

export const getMyInteriorEnquiries = async (req, res) => {
  const enquiries = await InteriorEnquiry.find({ user: req.user._id }).sort({ createdAt: -1 });
  return res.json(enquiries);
};

export const updateInteriorEnquiryStatus = async (req, res) => {
  const enquiry = await InteriorEnquiry.findById(req.params.id);

  if (!enquiry) {
    return res.status(404).json({ message: "Interior enquiry not found" });
  }

  if (req.body.status) {
    enquiry.status = req.body.status;
  }

  const updated = await enquiry.save();
  return res.json(updated);
};
