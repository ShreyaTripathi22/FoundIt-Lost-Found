import express from "express";
import {
  createFoundItem,
  getAllFoundItems,
  getFoundItemById,
} from "../controllers/found.controller.js";
import { upload } from "../middlewares/upload.middleware.js";


const router = express.Router();

router.post("/", upload.single("image"), createFoundItem);
router.get("/", getAllFoundItems);
router.get("/:id", getFoundItemById);

export default router;
