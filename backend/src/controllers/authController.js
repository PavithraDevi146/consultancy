import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, company } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please provide name, email and password" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(409).json({ message: "User already exists" });
    }

    const user = await User.create({ name, email, password, company, role: "client" });

    return res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      company: user.company,
      savedHomes: user.savedHomes,
      token: generateToken(user._id, user.role),
    });
  } catch (error) {
    return res.status(400).json({ message: error.message || "Signup failed" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    return res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      company: user.company,
      savedHomes: user.savedHomes,
      token: generateToken(user._id, user.role),
    });
  } catch (error) {
    return res.status(400).json({ message: error.message || "Login failed" });
  }
};

export const getProfile = async (req, res) => {
  return res.json(req.user);
};
