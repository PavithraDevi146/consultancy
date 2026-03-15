import express from "express";
import {
  createHome,
  deleteHome,
  getHomeByIdOrSlug,
  getHomes,
  updateHome,
} from "../controllers/homeController.js";
import { adminOnly, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getHomes);
router.get("/:idOrSlug", getHomeByIdOrSlug);
router.post("/", protect, adminOnly, createHome);
router.put("/:id", protect, adminOnly, updateHome);
router.delete("/:id", protect, adminOnly, deleteHome);

export default router;
