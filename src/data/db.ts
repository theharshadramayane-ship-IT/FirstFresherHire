import Dexie, { type Table } from 'dexie';
import type { Job } from './types';

export class FirstFresherHireDB extends Dexie {
  jobs!: Table<Job, number>;

  constructor() {
    super('FirstFresherHireDB');
    this.version(1).stores({
      jobs: 'id, title, company' 
    });
  }
}

export const db = new FirstFresherHireDB();