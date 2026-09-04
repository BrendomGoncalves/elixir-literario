import { Component, effect, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { Book } from "../../interfaces/book";
import { Comment as BookComment } from "../../interfaces/comment";
import { ReadingStatus } from "../../types/reading-status";
import { BookDataService } from "../../services/book-data.service";
import { BookCardComponent } from "../../components/book-card/book-card.component";
import {
  DarkRatingComponent,
  SpiceRatingComponent,
} from "../../components/spice-rating/spice-rating.component";
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
  // Books
  book?: Book;
  private readonly bookId = signal<string | null>(null);
  readonly isLoading = signal(true);

  // Comments
  newComment = "";
  localComments: BookComment[] = [];

  // Reading Status
  readonly statuses: ReadingStatus[] = ["want-to-read", "reading", "read"];
  readonly statusLabels: Record<ReadingStatus, string> = {
    "want-to-read": "Quero ler",
    reading: "Lendo",
    read: "Lido",
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private readingList: ReadingListService,
    private data: BookDataService,
  ) {
    effect(() => {
      const id = this.bookId();
      const books = this.data.books();

      if (!id || !this.data.booksLoaded()) return;

      this.isLoading.set(false);
      this.book = books.find((item) => item.id === id);
      this.localComments = [...(this.book?.comments ?? [])];
    });

    // Atualiza o bookId sempre que a rota mudar
    this.route.paramMap.pipe(takeUntilDestroyed()).subscribe((params) => {
      this.bookId.set(params.get("id"));
      this.newComment = "";
    });
  }

  // Get de tropes e labels
  get tropeLabels() {
    return this.data.tropeLabels();
  }

  // Getters para o livro atual, status de leitura e livros similares
  get currentStatus(): ReadingStatus | null {
    return this.book
      ? (this.readingList.readingList()[this.book.id] ?? null)
      : null;
  }

  // Getters para livros similares e avaliações detalhadas
  get similarBooks(): Book[] {
    if (!this.book) return [];
    return this.book.similarBooks
      .map((id) => this.data.books().find((item) => item.id === id))
      .filter((item): item is Book => Boolean(item));
  }

  // Getters para avaliações detalhadas
  get detailedRatings(): { label: string; value: number }[] {
    if (!this.book) return [];
    return [
      { label: "Romance", value: this.book.detailedRatings.romance },
      { label: "Química", value: this.book.detailedRatings.chemistry },
      { label: "Trama", value: this.book.detailedRatings.plot },
      { label: "Personagens", value: this.book.detailedRatings.characters },
    ];
  }

  // Métodos para alternar status de leitura, obter classes de botão e enviar comentários
  toggleStatus(status: ReadingStatus): void {
    if (!this.book) return;
    this.readingList.update(
      this.book.id,
      this.currentStatus === status ? null : status,
    );
  }

  // Retorna a classe CSS para o botão de status de leitura com base no status atual
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

  // Envia um novo comentário, adicionando-o à lista local e ao serviço de dados
  submitComment(): void {
    const text = this.newComment.trim();
    if (!text) return;
    const comment = {
      id: `lc${Date.now()}`,
      user: "isabelareads",
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=40&h=40&fit=crop",
      text,
      date: "agora",
      likes: 0,
    };
    this.localComments = [comment, ...this.localComments];
    if (this.book) this.data.addComment(this.book, comment);
    this.newComment = "";
  }

  // TODO: Remover função desnecessária, pois a navegação já é tratada pelo RouterLink
  navigate(path: string): void {
    void this.router.navigateByUrl(path);
  }
}
