import express from "express";
import {
  createOrGetClientThread,
  getThreadMessages,
  listThreads,
  postThreadMessage,
} from "../controllers/chatController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);

router.post("/threads", createOrGetClientThread);
router.get("/threads", listThreads);
router.get("/threads/:threadId/messages", getThreadMessages);
router.post("/threads/:threadId/messages", postThreadMessage);

export default router;
