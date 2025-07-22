import { Request, Response } from "express";
import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import catchAsync from "../../helpers/catchAsync";
import sendResponse from "../../helpers/sendResponse";
// import { eventService } from './events.service';
import { Event } from "./events.interface";
import { EventService } from "./events.service";

// Get all events
const getAllEvents = catchAsync(async (_req: Request, res: Response) => {
  const result = await EventService.getAllEvents();
  sendResponse<Event[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Events fetched successfully",
    data: result,
  });
});

// Get event by ID
const getEventById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await EventService.getEventById(id);

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Event not found");
  }

  sendResponse<Event>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Event fetched successfully",
    data: result,
  });
});

// Create a new event
const createEvent = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const result = await EventService.createEvent(data);

  sendResponse<Event>(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Event created successfully",
    data: result,
  });
});

// Archive an event
const archiveEvent = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await EventService.archiveEvent(id);

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Event not found");
  }

  sendResponse<Event>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Event archived successfully",
    data: result,
  });
});

// update event
const updateEvent = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;
  const updated = await EventService.updateEvent(id, payload);
  res.status(200).json({
    success: true,
    message: 'Event updated successfully',
    data: updated,
  });
});
// Delete an event
const deleteEvent = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  await EventService.deleteEvent(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Event deleted successfully",
    data: null,
  });
});

export const EventController = {
  getAllEvents,
  getEventById,
  createEvent,
  archiveEvent,
  updateEvent,
  deleteEvent,
};
