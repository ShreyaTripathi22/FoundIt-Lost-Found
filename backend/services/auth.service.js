import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SALT_ROUNDS = 6;

export const hashPassword = (password) =>
  bcrypt.hash(password, SALT_ROUNDS);

export const comparePassword = (password, hash) =>
  bcrypt.compare(password, hash);

export const generateToken = (payload) =>
  jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "7d" });
