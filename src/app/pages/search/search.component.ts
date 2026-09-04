import { Component, inject } from "@angular/core";
import { NgTemplateOutlet } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { BookCardGridComponent } from "../../components/book-card/book-card.component";
import { Book } from "../../interfaces/book";
import { Mood } from "../../types/mood";
import { Trope } from "../../types/trope";
import { BookDataService } from "../../services/book-data.service";
import { ReadingListService } from "../../services/reading-list.service";

@Component({
  selector: "app-search",
  standalone: true,
  imports: [FormsModule, NgTemplateOutlet, BookCardGridComponent],
  templateUrl: "./search.component.html",
})
export class SearchComponent {
  readonly readingList = inject(ReadingListService);
  readonly data = inject(BookDataService);

  query = "";
  spiceMin = 1;
  spiceMax = 5;
  selectedTropes: Trope[] = [];
  selectedMood: Mood | "all" = "all";
  seriesFilter: "all" | "single" | "series" = "all";
  minRating = 0;
  showFilters = false;
  sortBy: "rating" | "spice" | "popular" = "popular";

  readonly levels = [1, 2, 3, 4, 5];
  readonly ratings = [0, 3.5, 4, 4.5];
  get tropeLabels() {
    return this.data.tropeLabels();
  }
  readonly allTropes: Trope[] = [
    "enemies-to-lovers",
    "forbidden-love",
    "second-chance",
    "fake-dating",
    "forced-proximity",
    "dark-romance",
    "slow-burn",
    "sports-romance",
    "billionaire",
    "age-gap",
    "mafia",
    "reverse-harem",
  ];
  readonly moods: { value: Mood | "all"; label: string }[] = [
    { value: "all", label: "Todos" },
    { value: "dark", label: "Dark" },
    { value: "mixed", label: "Misto" },
    { value: "light", label: "Leve" },
  ];
  readonly seriesOptions: {
    value: "all" | "single" | "series";
    label: string;
  }[] = [
    { value: "all", label: "Todos" },
    { value: "single", label: "Livro único" },
    { value: "series", label: "Série" },
  ];

  get filtered(): Book[] {
    const result = this.data.books().filter((book) => {
      if (this.query) {
        const q = this.query.toLowerCase();
        if (
          !book.title.toLowerCase().includes(q) &&
          !book.author.toLowerCase().includes(q)
        )
          return false;
      }
      if (book.spice < this.spiceMin || book.spice > this.spiceMax)
        return false;
      if (
        this.selectedTropes.length > 0 &&
        !this.selectedTropes.some((trope) => book.tropes.includes(trope))
      )
        return false;
      if (this.selectedMood !== "all" && book.mood !== this.selectedMood)
        return false;
      if (this.seriesFilter === "single" && book.isSeries) return false;
      if (this.seriesFilter === "series" && !book.isSeries) return false;
      if (book.rating < this.minRating) return false;
      return true;
    });

    if (this.sortBy === "rating")
      return result.sort((a, b) => b.rating - a.rating);
    if (this.sortBy === "spice")
      return result.sort((a, b) => b.spice - a.spice);
    return result.sort((a, b) => b.ratingCount - a.ratingCount);
  }

  get activeFiltersCount(): number {
    return (
      (this.spiceMin > 1 || this.spiceMax < 5 ? 1 : 0) +
      this.selectedTropes.length +
      (this.selectedMood !== "all" ? 1 : 0) +
      (this.seriesFilter !== "all" ? 1 : 0) +
      (this.minRating > 0 ? 1 : 0)
    );
  }

  toggleTrope(trope: Trope): void {
    this.selectedTropes = this.selectedTropes.includes(trope)
      ? this.selectedTropes.filter((item) => item !== trope)
      : [...this.selectedTropes, trope];
  }

  setSpiceMin(value: string | number): void {
    this.spiceMin = Math.min(Number(value), this.spiceMax);
  }

  setSpiceMax(value: string | number): void {
    this.spiceMax = Math.max(Number(value), this.spiceMin);
  }

  resetFilters(): void {
    this.spiceMin = 1;
    this.spiceMax = 5;
    this.selectedTropes = [];
    this.selectedMood = "all";
    this.seriesFilter = "all";
    this.minRating = 0;
  }
}
