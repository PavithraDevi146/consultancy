import express from "express";
import {
  createInquiry,
  getAllInquiries,
  getMyInquiries,
  updateInquiryStatus,
} from "../controllers/inquiryController.js";
import { adminOnly, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", createInquiry);
router.get("/mine", protect, getMyInquiries);
router.get("/", protect, adminOnly, getAllInquiries);
router.put("/:id/status", protect, adminOnly, updateInquiryStatus);

export default router;
