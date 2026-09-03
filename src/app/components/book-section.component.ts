import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Book, books } from '../data/books';
import { BookCardComponent } from './book-card.component';

@Component({
  selector: 'app-book-section',
  standalone: true,
  imports: [BookCardComponent],
  template: `
    <section class="py-8">
      <div class="max-w-6xl mx-auto px-6">
        <div class="flex items-end justify-between mb-5">
          <div>
            <h2 class="font-display text-2xl font-bold text-foreground">{{ title }}</h2>
            @if (subtitle) {
              <p class="text-sm text-muted-foreground mt-0.5">{{ subtitle }}</p>
            }
          </div>
          @if (showSeeAll) {
            <button (click)="seeAll.emit()" class="text-sm text-primary font-medium hover:text-primary/80 transition-colors">Ver todos</button>
          }
        </div>
        <div class="flex gap-5 overflow-x-auto pb-3 -mx-1 px-1">
          @for (book of sectionBooks; track book.id) {
            <app-book-card [book]="book" />
          }
        </div>
      </div>
    </section>
  `,
})
export class BookSectionComponent {
  @Input({ required: true }) title = '';
  @Input() subtitle = '';
  @Input({ required: true }) bookIds: string[] = [];
  @Input() showSeeAll = true;
  @Output() seeAll = new EventEmitter<void>();

  get sectionBooks(): Book[] {
    return this.bookIds
      .map((id) => books.find((book) => book.id === id))
      .filter((book): book is Book => Boolean(book));
  }
}
