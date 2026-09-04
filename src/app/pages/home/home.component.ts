import { Component, OnDestroy, OnInit, inject } from "@angular/core";
import { Router } from "@angular/router";
import { Book } from "../../interfaces/book";
import { BookDataService } from "../../services/book-data.service";
import { BookSectionComponent } from "../../components/book-section/book-section.component";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [BookSectionComponent],
  templateUrl: "./home.component.html",
})
export class HomeComponent implements OnInit, OnDestroy {
  private readonly router = inject(Router);
  private readonly data = inject(BookDataService);
  private intervalId?: number;

  get books(): Book[] {
    return this.data.books();
  }
  get heroBooks(): Book[] {
    return this.books.slice(0, 6);
  }
  readonly heroTexts = [
    "hot",
    "quente",
    "spicy",
    "apimentado",
    "fantasy",
    "fantasia",
    "dark",
    "sombrio",
  ];
  heroTextIndex = 0;

  get trending(): string[] {
    return this.books
      .filter((book) => book.trendingThisWeek)
      .map((book) => book.id);
  }
  get darkRomance(): string[] {
    return this.books
      .filter((book) => book.tropes.includes("dark-romance") || book.dark >= 4)
      .map((book) => book.id);
  }
  get enemiesLovers(): string[] {
    return this.books
      .filter((book) => book.tropes.includes("enemies-to-lovers"))
      .map((book) => book.id)
      .slice(0, 6);
  }
  get booktok(): string[] {
    return this.books
      .filter((book) => book.viralOnBooktok)
      .map((book) => book.id);
  }

  readonly genres = [
    "Dark Romance",
    "Enemies to Lovers",
    "Slow Burn",
    "Fae Romance",
    "Sports Romance",
    "Billionaire",
    "Segunda Chance",
    "Mafia",
  ];
  readonly stats = [
    { value: "2.400+", label: "Livros" },
    { value: "89k", label: "Avaliações" },
    { value: "98%", label: "Sem julgamentos" },
  ];

  readonly flamePath =
    "M17.66 11.2C17.43 10.9 17.15 10.64 16.89 10.38C16.22 9.78 15.46 9.35 14.82 8.72C13.33 7.26 13 4.85 13.95 3C13 3.23 12.17 3.75 11.46 4.32C8.87 6.4 7.85 10.07 9.07 13.22C9.11 13.32 9.15 13.42 9.15 13.55C9.15 13.77 9 13.97 8.8 14.05C8.57 14.15 8.33 14.09 8.14 13.93C8.08 13.88 8.04 13.83 8 13.76C6.87 12.33 6.69 10.28 7.45 8.64C5.78 10 4.87 12.3 5 14.47C5.06 14.97 5.12 15.47 5.3 15.97C5.45 16.57 5.73 17.17 6.08 17.7C7.08 19.09 8.58 20.08 10.23 20.42C11.98 20.8 13.86 20.63 15.44 19.72C17.18 18.71 18.29 16.9 18.44 14.9C18.5 14 18.5 13.14 17.66 11.2Z";

  ngOnInit(): void {
    this.intervalId = window.setInterval(() => {
      this.heroTextIndex = (this.heroTextIndex + 1) % this.heroTexts.length;
    }, 2000);
  }

  ngOnDestroy(): void {
    if (this.intervalId !== undefined) window.clearInterval(this.intervalId);
  }

  heroBookClass(index: number): string {
    const base =
      "group relative overflow-hidden rounded-xl bg-muted hover:scale-105 transition-transform duration-300 ";
    return (
      base +
      (index === 1 ? "-translate-y-4" : index === 4 ? "-translate-y-6" : "")
    );
  }

  navigate(path: string): void {
    void this.router.navigateByUrl(path);
  }

  openBook(id: string): void {
    void this.router.navigate(["/livro", id]);
  }
}
