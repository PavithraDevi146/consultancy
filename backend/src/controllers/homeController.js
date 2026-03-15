import CompletedHome from "../models/CompletedHome.js";

export const getHomes = async (req, res) => {
  const { search, houseType, featured } = req.query;
  const query = {};

  if (search) {
    query.$or = [
      { title: { $regex: search, $options: "i" } },
      { location: { $regex: search, $options: "i" } },
    ];
  }

  if (houseType) {
    query.houseType = houseType;
  }

  if (featured === "true") {
    query.featured = true;
  }

  const homes = await CompletedHome.find(query).sort({ yearCompleted: -1, createdAt: -1 });
  return res.json(homes);
};

export const getHomeByIdOrSlug = async (req, res) => {
  const { idOrSlug } = req.params;
  const home =
    (await CompletedHome.findOne({ slug: idOrSlug })) || (await CompletedHome.findById(idOrSlug).catch(() => null));

  if (!home) {
    return res.status(404).json({ message: "Completed home not found" });
  }

  return res.json(home);
};

export const createHome = async (req, res) => {
  const home = await CompletedHome.create(req.body);
  return res.status(201).json(home);
};

export const updateHome = async (req, res) => {
  const home = await CompletedHome.findById(req.params.id);

  if (!home) {
    return res.status(404).json({ message: "Completed home not found" });
  }

  Object.assign(home, req.body);
  const updated = await home.save();
  return res.json(updated);
};

export const deleteHome = async (req, res) => {
  const home = await CompletedHome.findById(req.params.id);

  if (!home) {
    return res.status(404).json({ message: "Completed home not found" });
  }

  await home.deleteOne();
  return res.json({ message: "Completed home deleted" });
};
