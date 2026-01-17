// ===== FORCE PRISMA DB PUSH (RENDER FIX) =====
import { execSync } from "child_process";

try {
  console.log("⏳ Running Prisma db push...");
  execSync("npx prisma db push", { stdio: "inherit" });
  console.log("✅ Prisma db push completed");
} catch (error) {
  console.error("❌ Prisma db push failed:", error);
}

// ===== IMPORTS =====
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./auth/auth.routes.js";
import projectRoutes from "./projects/project.routes.js";
import chatRoutes from "./chat/chat.routes.js";

dotenv.config();

// ===== APP SETUP =====
const app = express();

// ===== MIDDLEWARE =====
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

// ===== ROUTES =====
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/chat", chatRoutes);

// ===== HEALTH CHECK =====
app.get("/", (req, res) => {
  res.send("🔥 Yolo backend is running");
});

// ===== START SERVER =====
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`🔥 Yolo backend running on port ${PORT}`);
});
