import express from "express";
import { PrismaClient } from "@prisma/client";
import { requireAuth } from "../auth/auth.middleware.js";

const prisma = new PrismaClient();
const router = express.Router();

// CREATE PROJECT
router.post("/", requireAuth, async (req, res) => {
  const { name, prompt } = req.body;

  if (!name || !prompt) {
    return res.status(400).json({ error: "Missing fields" });
  }

  const project = await prisma.project.create({
    data: {
      name,
      prompt,
      userId: req.userId
    }
  });

  res.json(project);
});

// LIST PROJECTS
router.get("/", requireAuth, async (req, res) => {
  const projects = await prisma.project.findMany({
    where: { userId: req.userId },
    orderBy: { createdAt: "desc" }
  });

  res.json(projects);
});

export default router;
