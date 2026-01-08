import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";

dotenv.config({ path: "./config.env" });

let db;

const client = new MongoClient(process.env.URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export const connectToServer = async () => {
  try {
    await client.connect();
    db = client.db("FoundIt");
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
};

export const getDb = () => {
  if (!db) {
    throw new Error("Database not initialized");
  }
  return db;
};
