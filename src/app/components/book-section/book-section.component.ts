import { Component, EventEmitter, Input, Output, inject } from "@angular/core";
import { Book } from "../../interfaces/book";
import { BookDataService } from "../../services/book-data.service";
import { BookCardComponent } from "../book-card/book-card.component";

@Component({
  selector: "app-book-section",
  standalone: true,
  imports: [BookCardComponent],
  templateUrl: "./book-section.component.html",
})
export class BookSectionComponent {
  private readonly data = inject(BookDataService);
  @Input({ required: true }) title = "";
  @Input() subtitle = "";
  @Input({ required: true }) bookIds: string[] = [];
  @Input() showSeeAll = true;
  @Output() seeAll = new EventEmitter<void>();

  get sectionBooks(): Book[] {
    return this.bookIds
      .map((id) => this.data.books().find((book) => book.id === id))
      .filter((book): book is Book => Boolean(book));
  }
}
