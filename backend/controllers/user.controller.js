import { getDb } from "../config/db.js";

export const registerUser = async (req, res, next) => {
  try {
    const db = getDb();
    const { name, email, password } = req.body;

    console.log("REGISTER BODY:", req.body);

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const existingUser = await db
      .collection("Users")
      .findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    await db.collection("Users").insertOne({
      name,          // ✅ fixed
      email,
      password,      // hash later
      createdAt: new Date(),
    });

    res.status(201).json({ success: true, message: "User registered successfully" });
  } catch (err) {
    next(err);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const db = getDb();
    const { email, password } = req.body;

    const user = await db
      .collection("Users")
      .findOne({ email, password });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json({
      message: "Login successful",
      username: user.username,
      userId: user._id,
    });
  } catch (err) {
    next(err);
  }
};
