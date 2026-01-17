import express from "express";
import { PrismaClient } from "@prisma/client";
import { requireAuth } from "../auth/auth.middleware.js";
import { callLLM } from "../services/openai.service.js";

const prisma = new PrismaClient();
const router = express.Router();

// CHAT WITH PROJECT
router.post("/", requireAuth, async (req, res) => {
  const { projectId, message } = req.body;

  const project = await prisma.project.findFirst({
    where: { id: projectId, userId: req.userId }
  });

  if (!project) {
    return res.status(404).json({ error: "Project not found" });
  }

  try {
    const reply = await callLLM(project.prompt, message);
    res.json({ reply });
  } catch {
    res.status(500).json({ error: "LLM failed" });
  }
});

export default router;
