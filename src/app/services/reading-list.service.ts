import { Injectable, signal } from '@angular/core';
import { ReadingStatus } from '../data/books';

const initialReadingList: Record<string, ReadingStatus> = {
  '1': 'read', '2': 'read', '3': 'read', '5': 'read', '6': 'read',
  '7': 'read', '8': 'read', '10': 'read', '11': 'read', '14': 'read',
  '4': 'reading', '13': 'reading',
  '9': 'want-to-read', '12': 'want-to-read', '15': 'want-to-read',
};

@Injectable({ providedIn: 'root' })
export class ReadingListService {
  readonly readingList = signal<Record<string, ReadingStatus>>({ ...initialReadingList });

  update(bookId: string, status: ReadingStatus | null): void {
    this.readingList.update((current) => {
      const next = { ...current };
      if (status === null) delete next[bookId];
      else next[bookId] = status;
      return next;
    });
  }
}
