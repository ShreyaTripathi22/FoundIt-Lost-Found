import dotenv from "dotenv";
import app from "./app.js";
import { connectToServer } from "./config/db.js";

dotenv.config({ path: "./config.env" });

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  await connectToServer();
  console.log(`Server running on port ${PORT}`);
});

// What lives here
// Environment config
// Database connection
// app.listen()