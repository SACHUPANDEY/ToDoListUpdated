import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";
import todoRoutes from "./routes/todo.js";
import adminRoutes from "./routes/admin.js";

dotenv.config();
const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("Server is running..."));

app.use("/api/auth", authRoutes);
app.use("/api/todos", todoRoutes);
app.use("/api/admin", adminRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
