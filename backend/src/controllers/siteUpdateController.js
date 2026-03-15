import SiteUpdate from "../models/SiteUpdate.js";

export const getSiteUpdates = async (req, res) => {
  const updates = await SiteUpdate.find()
    .populate("createdBy", "name role")
    .sort({ createdAt: -1 })
    .limit(20);

  return res.json(updates);
};

export const createSiteUpdate = async (req, res) => {
  const { title, message, category } = req.body;

  if (!title || !message) {
    return res.status(400).json({ message: "Title and message are required" });
  }

  const update = await SiteUpdate.create({
    title,
    message,
    category: category || "General",
    createdBy: req.user._id,
  });

  const populated = await update.populate("createdBy", "name role");
  return res.status(201).json(populated);
};

export const deleteSiteUpdate = async (req, res) => {
  const update = await SiteUpdate.findById(req.params.id);

  if (!update) {
    return res.status(404).json({ message: "Update not found" });
  }

  await update.deleteOne();
  return res.json({ message: "Update deleted" });
};
