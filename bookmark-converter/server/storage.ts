// Storage logic for the bookmark converter application
// This is a minimal implementation for the separated application

interface BookmarkConversion {
  id: number;
  inputFormat: string;
  outputFormat: string;
  timestamp: Date;
}

export interface IStorage {
  addConversion(conversion: Omit<BookmarkConversion, 'id' | 'timestamp'>): Promise<BookmarkConversion>;
  getConversions(): Promise<BookmarkConversion[]>;
}

export class MemStorage implements IStorage {
  private conversions: Map<number, BookmarkConversion>;
  private currentId: number;

  constructor() {
    this.conversions = new Map();
    this.currentId = 1;
  }

  async addConversion(conversion: Omit<BookmarkConversion, 'id' | 'timestamp'>): Promise<BookmarkConversion> {
    const id = this.currentId++;
    const newConversion: BookmarkConversion = {
      ...conversion,
      id,
      timestamp: new Date()
    };
    
    this.conversions.set(id, newConversion);
    return newConversion;
  }

  async getConversions(): Promise<BookmarkConversion[]> {
    return Array.from(this.conversions.values());
  }
}

export const storage = new MemStorage();