import { Category } from "./categorize";

export interface Event {
    id: string;
    title: string;
    date: string;
    time: string;
    category: Category;
    archived: boolean;
    notes?: string;
    description?: string;
    location?: string;
  }
    