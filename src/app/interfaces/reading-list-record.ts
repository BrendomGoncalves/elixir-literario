import { ReadingStatus } from "../types/reading-status";

export interface ReadingListRecord {
  id: string;
  bookId: string;
  status: ReadingStatus;
}