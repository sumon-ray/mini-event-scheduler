"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventRouter = void 0;
const express_1 = require("express");
const events_controller_1 = require("./events.controller");
const router = (0, express_1.Router)();
// Create a new event
router.post('/', events_controller_1.EventController.createEvent);
// Get all events
router.get('/', events_controller_1.EventController.getAllEvents);
// Get single event by ID
router.get('/:id', events_controller_1.EventController.getEventById);
// Archive an event
router.patch('/:id/archive', events_controller_1.EventController.archiveEvent);
router.patch('/:id', events_controller_1.EventController.updateEvent);
// Delete an event
router.delete('/:id', events_controller_1.EventController.deleteEvent);
exports.EventRouter = router;
