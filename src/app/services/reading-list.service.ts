import { HttpClient } from "@angular/common/http";
import { Injectable, inject, signal } from "@angular/core";
import { catchError, map, of } from "rxjs";
import { ReadingStatus } from "../types/reading-status";
import { ReadingListRecord } from "../interfaces/reading-list-record";
import { environment } from "../../environments/environment.development";

@Injectable({ providedIn: "root" })
export class ReadingListService {
  private readonly http = inject(HttpClient);
  readonly readingList = signal<Record<string, ReadingStatus>>({});

  constructor() {
    this.http
      .get<ReadingListRecord[]>(`${environment.apiUrl}/readingList`)
      .pipe(
        map((records) =>
          records.reduce<Record<string, ReadingStatus>>((list, record) => {
            list[record.bookId] = record.status;
            return list;
          }, {}),
        ),
        catchError(() => of({})),
      )
      .subscribe((list) => this.readingList.set(list));
  }

  update(bookId: string, status: ReadingStatus | null): void {
    this.readingList.update((current) => {
      const next = { ...current };
      if (status === null) delete next[bookId];
      else next[bookId] = status;
      return next;
    });

    if (status === null) {
      this.http
        .delete(`${environment.apiUrl}/readingList/${bookId}`)
        .pipe(catchError(() => of(null)))
        .subscribe();
      return;
    }

    this.http
      .put<ReadingListRecord>(`${environment.apiUrl}/readingList/${bookId}`, {
        id: bookId,
        bookId,
        status,
      })
      .pipe(catchError(() => of(null)))
      .subscribe();
  }
}
