import { events } from '../../../data/events.data';
import { EventService } from '../events.service';
import AppError from '../../../errors/AppError'; 

// clear array before testt
beforeEach(() => {
  events.length = 0;
});

describe('EventService', () => {
  test('should create a new event', async () => {
    const newEvent = await EventService.createEvent({
      title: 'Test Event',
      date: '2025-08-10',
      time: '10:00',
      notes: 'Test notes',
      category: 'Work',
    });

    expect(newEvent).toHaveProperty('id');
    expect(newEvent.title).toBe('Test Event');
    expect(newEvent.archived).toBe(false);
    expect(events.length).toBe(1);
  });

  test('should get all events sorted by date and time', async () => {
    await EventService.createEvent({
      title: 'Event 1',
      date: '2025-08-11',
      time: '11:00',
      notes: '',
      category: 'Work',
    });
    await EventService.createEvent({
      title: 'Event 2',
      date: '2025-08-10',
      time: '09:00',
      notes: '',
      category: 'Personal',
    });

    const allEvents = await EventService.getAllEvents();
    expect(allEvents[0].title).toBe('Event 2'); // earlier date first
    expect(allEvents[1].title).toBe('Event 1');
  });

  test('should throw error if event not found by id', async () => {
    await expect(EventService.getEventById('non-existing-id')).rejects.toThrow('Event not found');
  });

  test('should archive an event', async () => {
    const event = await EventService.createEvent({
      title: 'Archive Test',
      date: '2025-08-12',
      time: '12:00',
      notes: '',
      category: 'Other',
    });

    const archivedEvent = await EventService.archiveEvent(event.id);
    expect(archivedEvent.archived).toBe(true);
  });

  test('should delete an event', async () => {
    const event = await EventService.createEvent({
      title: 'Delete Test',
      date: '2025-08-13',
      time: '13:00',
      notes: '',
      category: 'Other',
    });

    await EventService.deleteEvent(event.id);
    expect(events.find(e => e.id === event.id)).toBeUndefined();
  });

//  New: Update Event Tests
  test('should update an existing event', async () => {
    const event = await EventService.createEvent({
      title: 'Original Title',
      date: '2025-08-14',
      time: '14:00',
      notes: 'Original Notes',
      category: 'Work',
    });

    const updatedEvent = await EventService.updateEvent(event.id, {
      title: 'Updated Title',
      notes: 'Updated Notes',
    });

    expect(updatedEvent.title).toBe('Updated Title');
    expect(updatedEvent.notes).toBe('Updated Notes');
    expect(updatedEvent.id).toBe(event.id);
  });

  test('should throw error when updating a non-existing event', async () => {
    await expect(
      EventService.updateEvent('invalid-id', { title: 'Fail Update' })
    ).rejects.toThrow(AppError); // or toThrow('Event not found')
  });
});
