import express from "express";
import {
  createLostItem,
  getAllLostItems,
  getLostItemById,
} from "../controllers/lost.controller.js";
import {upload} from "../middlewares/upload.middleware.js";

const router = express.Router();

router.post("/", upload.single("image"), createLostItem);
router.get("/", getAllLostItems);
router.get("/:id", getLostItemById);

export default router;
