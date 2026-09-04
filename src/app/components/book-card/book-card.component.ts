import { Component, Input, inject } from "@angular/core";
import { Router } from "@angular/router";
import { Book } from "../../interfaces/book";
import { ReadingStatus } from "../../types/reading-status";
import { SpiceRatingComponent } from "../spice-rating/spice-rating.component";

@Component({
  selector: "app-book-card",
  standalone: true,
  imports: [SpiceRatingComponent],
  templateUrl: "./book-card.component.html",
})
export class BookCardComponent {
  @Input({ required: true }) book!: Book;
  @Input() size: "sm" | "md" = "md";
  @Input() rank?: number;
  private readonly router = inject(Router);

  openBook(): void {
    void this.router.navigate(["/livro", this.book.id]);
  }
}

@Component({
  selector: "app-book-card-grid",
  standalone: true,
  imports: [SpiceRatingComponent],
  template: `
    <button (click)="openBook()" class="group text-left w-full">
      <div class="relative overflow-hidden rounded-xl bg-muted">
        <img
          [src]="book.cover"
          [alt]="book.title"
          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        @if (book.trendingThisWeek) {
          <div
            class="absolute top-2 left-2 px-1.5 py-0.5 rounded-md text-[10px] font-bold bg-accent text-accent-foreground"
          >
            Em alta
          </div>
        }
        @if (book.viralOnBooktok && !book.trendingThisWeek) {
          <div
            class="absolute top-2 left-2 px-1.5 py-0.5 rounded-md text-[10px] font-bold bg-primary text-primary-foreground"
          >
            BookTok
          </div>
        }
        @if (readingStatus) {
          <div [class]="readingStatusClass">
            {{
              readingStatus === "read"
                ? "Lido"
                : readingStatus === "reading"
                  ? "Lendo"
                  : "Lista"
            }}
          </div>
        }
        <div
          class="absolute bottom-0 left-0 right-0 p-2 from-black/90 via-black/30 to-transparent"
        >
          <app-spice-rating [level]="book.spice" size="sm" />
        </div>
      </div>
      <div class="mt-2 space-y-0.5">
        <p class="font-semibold text-sm leading-snug line-clamp-2">
          {{ book.title }}
        </p>
        <p class="text-xs text-muted-foreground">{{ book.author }}</p>
        <div class="flex items-center gap-1">
          <span class="text-accent text-xs">★</span>
          <span class="text-xs text-muted-foreground">{{
            book.rating.toFixed(1)
          }}</span>
        </div>
      </div>
    </button>
  `,
})
export class BookCardGridComponent {
  @Input({ required: true }) book!: Book;
  @Input() readingStatus?: ReadingStatus;
  private readonly router = inject(Router);

  get readingStatusClass(): string {
    const base =
      "absolute top-2 right-2 px-1.5 py-0.5 rounded-md text-[10px] font-bold ";
    if (this.readingStatus === "read")
      return base + "bg-green-600/80 text-white";
    if (this.readingStatus === "reading")
      return base + "bg-blue-600/80 text-white";
    return base + "bg-secondary text-secondary-foreground";
  }

  openBook(): void {
    void this.router.navigate(["/livro", this.book.id]);
  }
}
