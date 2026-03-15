import CompletedHome from "../models/CompletedHome.js";
import User from "../models/User.js";

export const getSavedHomes = async (req, res) => {
  const user = await User.findById(req.user._id).populate("savedHomes");
  return res.json(user?.savedHomes || []);
};

export const addSavedHome = async (req, res) => {
  const { homeId } = req.body;
  const home = await CompletedHome.findById(homeId);

  if (!home) {
    return res.status(404).json({ message: "Completed home not found" });
  }

  const user = await User.findById(req.user._id);
  const alreadySaved = user.savedHomes.some((savedId) => savedId.toString() === homeId);

  if (!alreadySaved) {
    user.savedHomes.push(homeId);
    await user.save();
  }

  const updatedUser = await User.findById(req.user._id).populate("savedHomes");
  return res.json(updatedUser.savedHomes);
};

export const removeSavedHome = async (req, res) => {
  const { homeId } = req.params;
  const user = await User.findById(req.user._id);

  user.savedHomes = user.savedHomes.filter((savedId) => savedId.toString() !== homeId);
  await user.save();

  const updatedUser = await User.findById(req.user._id).populate("savedHomes");
  return res.json(updatedUser.savedHomes);
};
