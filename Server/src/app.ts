import express from "express";
import cors from "cors";
import dotenv from "dotenv";
// import eventRoutes from "../app/routes/events";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// app.use("/events", eventRoutes);
app.get("/", (_req, res) => {
    res.send("🎉 Mini Event Scheduler API is running!");
  });

  console.log("efr")
export default app;
