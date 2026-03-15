import express from "express";
import {
  createInterior,
  deleteInterior,
  getInteriors,
  updateInterior,
} from "../controllers/interiorDesignController.js";
import { adminOnly, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getInteriors);
router.post("/", protect, adminOnly, createInterior);
router.put("/:id", protect, adminOnly, updateInterior);
router.delete("/:id", protect, adminOnly, deleteInterior);

export default router;
