import express from "express";
import {
  createInteriorEnquiry,
  createMyInteriorEnquiry,
  getInteriorEnquiries,
  getMyInteriorEnquiries,
  updateInteriorEnquiryStatus,
} from "../controllers/interiorEnquiryController.js";
import { adminOnly, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", createInteriorEnquiry);
router.post("/mine", protect, createMyInteriorEnquiry);
router.get("/mine", protect, getMyInteriorEnquiries);
router.get("/", protect, adminOnly, getInteriorEnquiries);
router.put("/:id/status", protect, adminOnly, updateInteriorEnquiryStatus);

export default router;
