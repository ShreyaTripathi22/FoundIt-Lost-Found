import express from "express";
import {
  registerUser,
  loginUser
} from "../controllers/user.controller.js";

const router = express.Router();

router.post("/", registerUser);        // POST /api/users
router.post("/login", loginUser);      // POST /api/users/login

export default router;
