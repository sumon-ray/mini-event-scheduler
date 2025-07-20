import { Router } from 'express';
import { EventController } from './events.controller';

const router = Router();

// Create a new event
router.post('/', EventController.createEvent);

// Get all events
router.get('/', EventController.getAllEvents);

// Get single event by ID
router.get('/:id', EventController.getEventById);

// Archive an event
router.patch('/:id/archive', EventController.archiveEvent);
router.patch('/:id', EventController.updateEvent); 
// Delete an event
router.delete('/:id', EventController.deleteEvent);

export const EventRouter = router;
