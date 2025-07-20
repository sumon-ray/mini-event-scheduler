import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../helpers/catchAsync';
import sendResponse from '../../helpers/sendResponse';
import AppError from '../../errors/AppError';
// import { eventService } from './events.service';
import { Event } from './events.interface';
import { EventService } from './events.service';

// Get all events
const getAllEvents = catchAsync(async (_req: Request, res: Response) => {
  const result = EventService.getAllEvents();
  sendResponse<Event[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Events fetched successfully',
    data: result,
  });
});

// Get event by ID
const getEventById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = EventService.getEventById(id);

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Event not found');
  }

  sendResponse<Event>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Event fetched successfully',
    data: result,
  });
});

// Create a new event
const createEvent = catchAsync(async (req: Request, res: Response) => {
  const { title, description, date, time, location, category } = req.body;

  if (!title || !description || !date || !time || !location || !category) {
    throw new AppError(httpStatus.BAD_REQUEST, 'All fields are required');
  }

  const result = EventService.createEvent({
    title,
    description,
    date,
    time,
    location,
    category,
  });

  sendResponse<Event>(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Event created successfully',
    data: result,
  });
});

// Archive an event
const archiveEvent = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = EventService.archiveEvent(id);

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Event not found');
  }

  sendResponse<Event>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Event archived successfully',
    data: result,
  });
});

// Delete an event
const deleteEvent = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const deleted = EventService.deleteEvent(id);

  if (!deleted) {
    throw new AppError(httpStatus.NOT_FOUND, 'Event not found');
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Event deleted successfully',
  });
});

export const EventController = {
  getAllEvents,
  getEventById,
  createEvent,
  archiveEvent,
  deleteEvent,
};
