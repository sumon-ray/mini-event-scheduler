export interface IEvent {
    _id: string;
    title: string;
    date: string;
    time: string;
    notes?: string;
    category: 'Work' | 'Personal' | 'Other';
    archived: boolean;
    notes?: string;
    description?: string;
    location?: string;
  }