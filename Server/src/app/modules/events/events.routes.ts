import { Router } from "express";
import { EventController } from "./events.controller";

const router = Router();

router.post("/", EventController.createEvent);
router.get("/", EventController.getAllEvents);
router.get("/:id", EventController.getEventById);
router.patch("/:id/archive", EventController.archiveEvent);
router.patch("/:id", EventController.updateEvent);
router.delete("/:id", EventController.deleteEvent);

export const EventRouter = router;
