import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";


//import postRoutes from "./routes/found.routes.js";
import userRoutes from "./routes/user.routes.js";
import emailRoutes from "./routes/email.routes.js";
import foundRoutes from "./routes/found.routes.js";
import lostRoutes from "./routes/lost.routes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Global middlewares
app.use(cors());
app.use(express.json());


// Static files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
// app.use("/", postRoutes);
// app.use("/", userRoutes);
// app.use("/api/email", emailRoutes);
app.use("/api/found", foundRoutes);
app.use("/api/lost", lostRoutes);
app.use("/api/email", emailRoutes);
app.use("/api/users", userRoutes);


export default app;


//what does it have
// Express app creation
// Middleware
// Routes
// Static folders