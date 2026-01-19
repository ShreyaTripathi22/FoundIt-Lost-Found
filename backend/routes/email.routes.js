import express from "express";
import { sendClaimEmail } from "../controllers/email.controller.js";

const router = express.Router();

router.post("/claim", sendClaimEmail);

export default router;
