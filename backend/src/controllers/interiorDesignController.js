import InteriorDesign from "../models/InteriorDesign.js";

export const getInteriors = async (req, res) => {
  const { roomType } = req.query;
  const query = roomType ? { roomType } : {};

  const interiors = await InteriorDesign.find(query).sort({ createdAt: -1 });
  return res.json(interiors);
};

export const createInterior = async (req, res) => {
  const interior = await InteriorDesign.create(req.body);
  return res.status(201).json(interior);
};

export const updateInterior = async (req, res) => {
  const interior = await InteriorDesign.findById(req.params.id);

  if (!interior) {
    return res.status(404).json({ message: "Interior design not found" });
  }

  Object.assign(interior, req.body);
  const updated = await interior.save();
  return res.json(updated);
};

export const deleteInterior = async (req, res) => {
  const interior = await InteriorDesign.findById(req.params.id);

  if (!interior) {
    return res.status(404).json({ message: "Interior design not found" });
  }

  await interior.deleteOne();
  return res.json({ message: "Interior design deleted" });
};
