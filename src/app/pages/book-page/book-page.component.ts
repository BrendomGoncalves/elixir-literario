import { Component, inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import {
  Book,
  Comment as BookComment,
  ReadingStatus,
  books,
  tropeLabels,
} from "../../data/books";
import { BookCardComponent } from "../../components/book-card.component";
import {
  DarkRatingComponent,
  SpiceRatingComponent,
} from "../../components/spice-rating.component";
import { ReadingListService } from "../../services/reading-list.service";

@Component({
  selector: "app-book-page",
  standalone: true,
  imports: [
    FormsModule,
    BookCardComponent,
    SpiceRatingComponent,
    DarkRatingComponent,
  ],
  templateUrl: "./book-page.component.html",
})
export class BookPageComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  readonly readingList = inject(ReadingListService);

  book?: Book;
  newComment = "";
  localComments: BookComment[] = [];

  readonly tropeLabels = tropeLabels;
  readonly statuses: ReadingStatus[] = ["want-to-read", "reading", "read"];
  readonly statusLabels: Record<ReadingStatus, string> = {
    "want-to-read": "Quero ler",
    reading: "Lendo",
    read: "Lido",
  };

  constructor() {
    this.route.paramMap.pipe(takeUntilDestroyed()).subscribe((params) => {
      this.book = books.find((item) => item.id === params.get("id"));
      this.localComments = [...(this.book?.comments ?? [])];
      this.newComment = "";
    });
  }

  get currentStatus(): ReadingStatus | null {
    return this.book
      ? (this.readingList.readingList()[this.book.id] ?? null)
      : null;
  }

  get similarBooks(): Book[] {
    if (!this.book) return [];
    return this.book.similarBooks
      .map((id) => books.find((item) => item.id === id))
      .filter((item): item is Book => Boolean(item));
  }

  get detailedRatings(): { label: string; value: number }[] {
    if (!this.book) return [];
    return [
      { label: "Romance", value: this.book.detailedRatings.romance },
      { label: "Química", value: this.book.detailedRatings.chemistry },
      { label: "Trama", value: this.book.detailedRatings.plot },
      { label: "Personagens", value: this.book.detailedRatings.characters },
    ];
  }

  toggleStatus(status: ReadingStatus): void {
    if (!this.book) return;
    this.readingList.update(
      this.book.id,
      this.currentStatus === status ? null : status,
    );
  }

  statusButtonClass(status: ReadingStatus): string {
    const base =
      "px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ";
    if (this.currentStatus !== status)
      return (
        base +
        "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-border/80"
      );
    if (status === "want-to-read")
      return base + "bg-secondary text-secondary-foreground";
    if (status === "reading")
      return base + "bg-blue-600/20 text-blue-400 border border-blue-600/30";
    return base + "bg-green-600/20 text-green-400 border border-green-600/30";
  }

  submitComment(): void {
    const text = this.newComment.trim();
    if (!text) return;
    this.localComments = [
      {
        id: `lc${Date.now()}`,
        user: "isabelareads",
        avatar:
          "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=40&h=40&fit=crop",
        text,
        date: "agora",
        likes: 0,
      },
      ...this.localComments,
    ];
    this.newComment = "";
  }

  navigate(path: string): void {
    void this.router.navigateByUrl(path);
  }
}
