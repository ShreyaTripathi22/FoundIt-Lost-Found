import express from "express";
import { upload } from "../middlewares/upload.middleware.js";
import { createFoundItem } from "../controllers/found.controller.js";

const router = express.Router();

router.post(
  "/single",
  upload.single("image"),
  createFoundItem
);

export default router;
