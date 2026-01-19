import { getDb } from "../config/db.js";
import { ObjectId } from "mongodb";
import { runSmartMatching } from "../services/match.service.js";

export const getAllLostItems = async (req, res, next) => {
  try {
    const db = getDb();
    const items = await db.collection("Lost Items").find({}).toArray();
    res.json(items);
  } catch (err) {
    next(err);
  }
};

export const createLostItem = async (req, res, next) => {
  try {
    const db = getDb();

    const newLostItem = {
      name: req.body.name,
      description: req.body.description,
      location: req.body.location,
      date: req.body.date,
      email: req.body.email,
      createdAt: new Date(),
    };

    await db.collection("Lost Items").insertOne(newLostItem);

    // 👈 smart matching will be called here later
    // runSmartMatching(newLostItem);
    await runSmartMatching(newLostItem, "LOST");


    res.status(201).json({ message: "Lost item reported" });
  } catch (err) {
    next(err);
  }
};

export const getLostItemById = async (req, res, next) => {
  try {
    const db = getDb();
    const item = await db
      .collection("Lost Items")
      .findOne({ _id: new ObjectId(req.params.id) });

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.json(item);
  } catch (err) {
    next(err);
  }
};
