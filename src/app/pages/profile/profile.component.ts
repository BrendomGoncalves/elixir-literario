import { Component, inject } from "@angular/core";
import { Router } from "@angular/router";
import { Book, ReadingStatus, books, userProfile } from "../../data/books";
import { BookCardGridComponent } from "../../components/book-card.component";
import { SpiceRatingComponent } from "../../components/spice-rating.component";
import { ReadingListService } from "../../services/reading-list.service";

@Component({
  selector: "app-profile",
  standalone: true,
  imports: [BookCardGridComponent, SpiceRatingComponent],
  templateUrl: "./profile.component.html",
})
export class ProfileComponent {
  private readonly router = inject(Router);
  readonly readingListService = inject(ReadingListService);
  readonly userProfile = userProfile;
  readonly spiceLevels = [5, 4, 3, 2, 1];
  readonly tabs: { id: ReadingStatus; label: string }[] = [
    { id: "read", label: "Lidos" },
    { id: "reading", label: "Lendo" },
    { id: "want-to-read", label: "Quero ler" },
  ];

  activeTab: ReadingStatus = "read";

  get readBooks(): Book[] {
    return this.listByStatus("read");
  }
  get readingBooks(): Book[] {
    return this.listByStatus("reading");
  }
  get wantToReadBooks(): Book[] {
    return this.listByStatus("want-to-read");
  }

  get avgSpice(): string {
    return this.readBooks.length > 0
      ? (
          this.readBooks.reduce((sum, book) => sum + book.spice, 0) /
          this.readBooks.length
        ).toFixed(1)
      : userProfile.avgSpice.toFixed(1);
  }

  get totalRead(): number {
    return this.readBooks.length || userProfile.booksRead;
  }

  get tabBooks(): Record<ReadingStatus, Book[]> {
    return {
      read: this.readBooks,
      reading: this.readingBooks,
      "want-to-read": this.wantToReadBooks,
    };
  }

  get activeBooks(): Book[] {
    return this.tabBooks[this.activeTab];
  }

  get emptyMessage(): string {
    if (this.activeTab === "want-to-read")
      return "Adicione livros que você quer ler";
    if (this.activeTab === "reading") return "Você não tem livros em andamento";
    return "Nenhum livro lido ainda";
  }

  spiceCount(level: number): number {
    return this.readBooks.filter((book) => book.spice === level).length;
  }

  spicePercent(level: number): number {
    const read = this.readBooks;
    if (read.length === 0) return 0;
    return (
      (read.filter((book) => book.spice === level).length / read.length) * 100
    );
  }

  navigate(path: string): void {
    void this.router.navigateByUrl(path);
  }

  private listByStatus(status: ReadingStatus): Book[] {
    return Object.entries(this.readingListService.readingList())
      .filter(([, currentStatus]) => currentStatus === status)
      .map(([id]) => books.find((book) => book.id === id))
      .filter((book): book is Book => Boolean(book));
  }
}
