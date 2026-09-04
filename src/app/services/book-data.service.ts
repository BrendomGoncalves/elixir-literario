import { HttpClient } from "@angular/common/http";
import { Injectable, inject, signal } from "@angular/core";
import { catchError, of } from "rxjs";
import { Book } from "../interfaces/book";
import { Comment } from "../interfaces/comment";
import { Trope } from "../types/trope";
import { environment } from "../../environments/environment.development";

export interface UserProfile {
  name: string;
  username: string;
  avatar: string;
  booksRead: number;
  avgSpice: number;
  favTrope: string;
  avgRating: number;
  literaryProfile: string;
}

// const API_URL = "http://localhost:3000";

@Injectable({ providedIn: "root" })
export class BookDataService {
  private readonly http = inject(HttpClient);

  readonly books = signal<Book[]>([]);
  readonly booksLoaded = signal(false);
  readonly tropeLabels = signal<Partial<Record<Trope, string>>>({});
  readonly userProfile = signal<UserProfile | null>(null);

  constructor() {
    this.http
      .get<Book[]>(`${environment.apiUrl}/books`)
      .pipe(catchError(() => of([])))
      .subscribe((books) => {
        this.books.set(books);
        this.booksLoaded.set(true);
      });

    this.http
      .get<Partial<Record<Trope, string>>>(`${environment.apiUrl}/tropeLabels`)
      .pipe(catchError(() => of({})))
      .subscribe((labels) => this.tropeLabels.set(labels));

    this.http
      .get<UserProfile>(`${environment.apiUrl}/userProfile`)
      .pipe(catchError(() => of(null)))
      .subscribe((profile) => this.userProfile.set(profile));
  }

  async findById(id: string | null): Promise<Book | undefined> {
    return this.books().find((book) => book.id === id);
  }

  addComment(book: Book, comment: Comment): void {
    const comments = [comment, ...book.comments];
    this.books.update((books) =>
      books.map((item) => (item.id === book.id ? { ...item, comments } : item)),
    );
    this.http
      .patch<Book>(`${environment.apiUrl}/books/${book.id}`, { comments })
      .pipe(catchError(() => of(null)))
      .subscribe();
  }
}
