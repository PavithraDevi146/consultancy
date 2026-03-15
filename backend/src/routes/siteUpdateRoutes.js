import express from "express";
import {
  createSiteUpdate,
  deleteSiteUpdate,
  getSiteUpdates,
} from "../controllers/siteUpdateController.js";
import { adminOnly, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getSiteUpdates);
router.post("/", protect, adminOnly, createSiteUpdate);
router.delete("/:id", protect, adminOnly, deleteSiteUpdate);

export default router;
