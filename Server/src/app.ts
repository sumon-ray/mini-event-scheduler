import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { EventRouter } from "./app/modules/events/events.routes";

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Health check route
app.get("/", (_req, res) => {
  res.send("🎉 Mini Event Scheduler API is running!");
});

// Event routes
app.use("/api/events", EventRouter);

export default app;
