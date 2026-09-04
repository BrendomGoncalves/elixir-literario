import { Component, inject } from "@angular/core";
import { Router } from "@angular/router";
import { Book } from "../../interfaces/book";
import { BookDataService } from "../../services/book-data.service";
import { SpiceRatingComponent } from "../../components/spice-rating/spice-rating.component";
import { RankingTab } from "../../types/ranking-tab";

@Component({
  selector: "app-rankings",
  standalone: true,
  imports: [SpiceRatingComponent],
  templateUrl: "./rankings.component.html",
})
export class RankingsComponent {
  private readonly router = inject(Router);
  private readonly data = inject(BookDataService);
  activeTab: RankingTab = "hot";

  readonly tabs: { id: RankingTab; label: string }[] = [
    { id: "hot", label: "Mais quentes" },
    { id: "popular", label: "Mais populares" },
    { id: "dark", label: "Dark mais lidos" },
    { id: "booktok", label: "Viralizando" },
  ];

  readonly descriptions: Record<RankingTab, string> = {
    hot: "Mais acessados e comentados nos últimos 7 dias",
    popular: "Os livros com mais avaliações de todos os tempos",
    dark: "Dark romance e clima intenso — os mais lidos do gênero",
    booktok: "Dominando o For You Page agora mesmo",
  };

  readonly medalColors = ["text-yellow-400", "text-gray-400", "text-amber-600"];
  readonly medalBg = [
    "bg-yellow-400/10 border-yellow-400/30",
    "bg-gray-400/10 border-gray-400/30",
    "bg-amber-600/10 border-amber-600/30",
  ];

  private get rankData(): Record<RankingTab, Book[]> {
    const books = this.data.books();
    return {
      hot: [...books]
        .filter((book) => book.trendingThisWeek)
        .sort((a, b) => b.ratingCount - a.ratingCount),
      popular: [...books].sort((a, b) => b.ratingCount - a.ratingCount),
      dark: [...books]
        .filter(
          (book) => book.dark >= 3 || book.tropes.includes("dark-romance"),
        )
        .sort((a, b) => b.ratingCount - a.ratingCount),
      booktok: [...books]
        .filter((book) => book.viralOnBooktok)
        .sort((a, b) => b.ratingCount - a.ratingCount),
    };
  }

  get list(): Book[] {
    return this.rankData[this.activeTab];
  }

  get podium(): { book: Book; rank: number }[] {
    if (this.list.length < 3) return [];
    return [
      { book: this.list[1]!, rank: 2 },
      { book: this.list[0]!, rank: 1 },
      { book: this.list[2]!, rank: 3 },
    ];
  }

  rankRowClass(rank: number): string {
    const base =
      "w-full flex items-center gap-4 p-4 rounded-2xl border transition-all duration-200 text-left group hover:border-primary/30 hover:bg-card/60 ";
    return rank <= 3
      ? base + this.medalBg[rank - 1]
      : base + "border-border bg-card/30";
  }

  openBook(id: string): void {
    void this.router.navigate(["/livro", id]);
  }
}
