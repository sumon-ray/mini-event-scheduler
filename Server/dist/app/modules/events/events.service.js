"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventService = void 0;
const uuid_1 = require("uuid");
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const events_data_1 = require("../../data/events.data");
const categorize_1 = require("./categorize");
// Get all events
const getAllEvents = () => __awaiter(void 0, void 0, void 0, function* () {
    return [...events_data_1.events].sort((a, b) => {
        if (a.date === b.date)
            return a.time.localeCompare(b.time);
        return a.date.localeCompare(b.date);
    });
});
// Get event by ID
const getEventById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const event = events_data_1.events.find((e) => e.id === id);
    if (!event) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Event not found');
    }
    return event;
});
// Create event
const createEvent = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const category = (0, categorize_1.categorizeEvent)(payload.title, payload.notes);
    const newEvent = Object.assign({ id: (0, uuid_1.v4)(), archived: false, category }, payload);
    events_data_1.events.push(newEvent);
    return newEvent;
});
// Archive event
const archiveEvent = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const event = events_data_1.events.find((e) => e.id === id);
    if (!event) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Event not found');
    }
    event.archived = true;
    return event;
});
// Update Event
const updateEvent = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const event = events_data_1.events.find((e) => e.id === id);
    if (!event) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Event not found');
    }
    Object.assign(event, payload);
    return event;
});
// Delete event
const deleteEvent = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const index = events_data_1.events.findIndex((e) => e.id === id);
    if (index === -1) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Event not found');
    }
    events_data_1.events.splice(index, 1);
});
exports.EventService = {
    getAllEvents,
    getEventById,
    createEvent,
    archiveEvent,
    updateEvent,
    deleteEvent,
};
