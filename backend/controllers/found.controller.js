import { getDb } from "../config/db.js";
import { ObjectId } from "mongodb";

export const getAllFoundItems = async (req, res, next) => {
  try {
    const db = getDb();
    const items = await db.collection("Found Items").find({}).toArray();
    res.json(items);
  } catch (err) {
    next(err);
  }
};

export const createFoundItem = async (req, res, next) => {
  try {
    const db = getDb();

    const newFoundItem = {
      name: req.body.name,
      description: req.body.description,
      location: req.body.location,
      image: req.body.image || null,
      date: req.body.date,
      email: req.body.email,
      createdAt: new Date(),
    };

    await db.collection("Found Items").insertOne(newFoundItem);

    // 👈 smart matching later
    // runSmartMatching(newFoundItem);

    res.status(201).json({ message: "Found item posted" });
  } catch (err) {
    next(err);
  }
};

export const getFoundItemById = async (req, res, next) => {
  try {
    const db = getDb();
    const item = await db
      .collection("Found Items")
      .findOne({ _id: new ObjectId(req.params.id) });

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.json(item);
  } catch (err) {
    next(err);
  }
};
