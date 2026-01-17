import express from "express";
import cors from "cors";

import authRoutes from "./auth/auth.routes.js";
import projectRoutes from "./projects/project.routes.js";
import chatRoutes from "./chat/chat.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/chat", chatRoutes);

app.get("/", (_, res) => {
  res.send("🔥 Yolo backend is running");
});

app.listen(4000, () => {
  console.log("🔥 Yolo backend running on http://localhost:4000");
});
