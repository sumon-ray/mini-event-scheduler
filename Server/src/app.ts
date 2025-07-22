import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { EventRouter } from "./app/modules/events/events.routes";
import globalErrorHandler from "./app/middlewares/globalErrorhandler";
import notFound from "./app/middlewares/notFound";

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Health check route
app.get("/", (_req, res) => {
  res.send("🎉 Mini Event Scheduler API is running!");
});

app.use("/api/events", EventRouter);

app.use(notFound)
app.use(globalErrorHandler)

export default app;
