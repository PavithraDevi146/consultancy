import express from "express";
import { createContactMessage, getContactMessages } from "../controllers/contactController.js";
import { adminOnly, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", createContactMessage);
router.get("/", protect, adminOnly, getContactMessages);

export default router;
