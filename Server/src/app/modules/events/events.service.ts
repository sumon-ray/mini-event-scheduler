import { Event } from './events.interface';
import { v4 as uuidv4 } from 'uuid';
import status from 'http-status';
import AppError from '../../errors/AppError';
import { events } from '../../data/events.data';

// Get all events
const getAllEvents = async (): Promise<Event[]> => {
  return [...events].sort((a, b) => {
    if (a.date === b.date) return a.time.localeCompare(b.time);
    return a.date.localeCompare(b.date);
  });
};

// Get event by ID
const getEventById = async (id: string): Promise<Event> => {
  const event = events.find((e) => e.id === id);
  if (!event) {
    throw new AppError(status.NOT_FOUND, 'Event not found');
  }
  return event;
};

// Create event
const createEvent = async (
  payload: Omit<Event, 'id' | 'archived'>
): Promise<Event> => {
  const newEvent: Event = {
    id: uuidv4(),
    archived: false,
    ...payload,
  };
  events.push(newEvent);
  return newEvent;
};

// Archive event
const archiveEvent = async (id: string): Promise<Event> => {
  const event = events.find((e) => e.id === id);
  if (!event) {
    throw new AppError(status.NOT_FOUND, 'Event not found');
  }
  event.archived = true;
  return event;
};

// Delete event
const deleteEvent = async (id: string): Promise<void> => {
  const index = events.findIndex((e) => e.id === id);
  if (index === -1) {
    throw new AppError(status.NOT_FOUND, 'Event not found');
  }
  events.splice(index, 1);
};

export const EventService = {
  getAllEvents,
  getEventById,
  createEvent,
  archiveEvent,
  deleteEvent,
};
