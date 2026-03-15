import express from "express";
import { addSavedHome, getSavedHomes, removeSavedHome } from "../controllers/savedHomeController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getSavedHomes);
router.post("/", protect, addSavedHome);
router.delete("/:homeId", protect, removeSavedHome);

export default router;
