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
const events_data_1 = require("../../../data/events.data");
const events_service_1 = require("../events.service");
const AppError_1 = __importDefault(require("../../../errors/AppError"));
// clear array before testt
beforeEach(() => {
    events_data_1.events.length = 0;
});
describe('EventService', () => {
    test('should create a new event', () => __awaiter(void 0, void 0, void 0, function* () {
        const newEvent = yield events_service_1.EventService.createEvent({
            title: 'Test Event',
            date: '2025-08-10',
            time: '10:00',
            notes: 'Test notes',
            // category: 'Work',
        });
        expect(newEvent).toHaveProperty('id');
        expect(newEvent.title).toBe('Test Event');
        expect(newEvent.archived).toBe(false);
        expect(events_data_1.events.length).toBe(1);
    }));
    test('should get all events sorted by date and time', () => __awaiter(void 0, void 0, void 0, function* () {
        yield events_service_1.EventService.createEvent({
            title: 'Event 1',
            date: '2025-08-11',
            time: '11:00',
            notes: '',
            // category: 'Work',
        });
        yield events_service_1.EventService.createEvent({
            title: 'Event 2',
            date: '2025-08-10',
            time: '09:00',
            notes: '',
            // category: 'Personal',
        });
        const allEvents = yield events_service_1.EventService.getAllEvents();
        expect(allEvents[0].title).toBe('Event 2'); // earlier date first
        expect(allEvents[1].title).toBe('Event 1');
    }));
    test('should throw error if event not found by id', () => __awaiter(void 0, void 0, void 0, function* () {
        yield expect(events_service_1.EventService.getEventById('non-existing-id')).rejects.toThrow('Event not found');
    }));
    test('should archive an event', () => __awaiter(void 0, void 0, void 0, function* () {
        const event = yield events_service_1.EventService.createEvent({
            title: 'Archive Test',
            date: '2025-08-12',
            time: '12:00',
            notes: '',
            // category: 'Other',
        });
        const archivedEvent = yield events_service_1.EventService.archiveEvent(event.id);
        expect(archivedEvent.archived).toBe(true);
    }));
    test('should delete an event', () => __awaiter(void 0, void 0, void 0, function* () {
        const event = yield events_service_1.EventService.createEvent({
            title: 'Delete Test',
            date: '2025-08-13',
            time: '13:00',
            notes: '',
            // category: 'Other',
        });
        yield events_service_1.EventService.deleteEvent(event.id);
        expect(events_data_1.events.find(e => e.id === event.id)).toBeUndefined();
    }));
    //  New: Update Event Tests
    test('should update an existing event', () => __awaiter(void 0, void 0, void 0, function* () {
        const event = yield events_service_1.EventService.createEvent({
            title: 'Original Title',
            date: '2025-08-14',
            time: '14:00',
            notes: 'Original Notes',
            // category: 'Work',
        });
        const updatedEvent = yield events_service_1.EventService.updateEvent(event.id, {
            title: 'Updated Title',
            notes: 'Updated Notes',
        });
        expect(updatedEvent.title).toBe('Updated Title');
        expect(updatedEvent.notes).toBe('Updated Notes');
        expect(updatedEvent.id).toBe(event.id);
    }));
    test('should throw error when updating a non-existing event', () => __awaiter(void 0, void 0, void 0, function* () {
        yield expect(events_service_1.EventService.updateEvent('invalid-id', { title: 'Fail Update' })).rejects.toThrow(AppError_1.default); // or toThrow('Event not found')
    }));
});
