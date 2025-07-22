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
exports.EventController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const catchAsync_1 = __importDefault(require("../../helpers/catchAsync"));
const sendResponse_1 = __importDefault(require("../../helpers/sendResponse"));
const events_service_1 = require("./events.service");
// Get all events
const getAllEvents = (0, catchAsync_1.default)((_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield events_service_1.EventService.getAllEvents();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Events fetched successfully",
        data: result,
    });
}));
// Get event by ID
const getEventById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield events_service_1.EventService.getEventById(id);
    if (!result) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Event not found");
    }
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Event fetched successfully",
        data: result,
    });
}));
// Create a new event
const createEvent = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const result = yield events_service_1.EventService.createEvent(data);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: "Event created successfully",
        data: result,
    });
}));
// Archive an event
const archiveEvent = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield events_service_1.EventService.archiveEvent(id);
    if (!result) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Event not found");
    }
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Event archived successfully",
        data: result,
    });
}));
// update event
const updateEvent = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const payload = req.body;
    const updated = yield events_service_1.EventService.updateEvent(id, payload);
    res.status(200).json({
        success: true,
        message: 'Event updated successfully',
        data: updated,
    });
}));
// Delete an event
const deleteEvent = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield events_service_1.EventService.deleteEvent(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Event deleted successfully",
        data: null,
    });
}));
exports.EventController = {
    getAllEvents,
    getEventById,
    createEvent,
    archiveEvent,
    updateEvent,
    deleteEvent,
};
