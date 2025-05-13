// Storage logic for the Node12.com website

export interface IStorage {
  // Define storage interface methods here
}

export class MemStorage implements IStorage {
  constructor() {
    // Initialize storage
  }
}

export const storage = new MemStorage();