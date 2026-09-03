import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Book, books } from '../data/books';
import { SpiceRatingComponent } from '../components/spice-rating.component';

type RankingTab = 'hot' | 'popular' | 'dark' | 'booktok';

@Component({
  selector: 'app-rankings',
  standalone: true,
  imports: [SpiceRatingComponent],
  template: `
    <div class="min-h-screen max-w-3xl mx-auto px-6 py-8">
      <div class="mb-8">
        <h1 class="font-display text-3xl font-bold text-foreground mb-1">Rankings</h1>
        <p class="text-muted-foreground text-sm">{{ descriptions[activeTab] }}</p>
      </div>

      <div class="flex gap-2 overflow-x-auto pb-1 mb-8">
        @for (tab of tabs; track tab.id) {
          <button (click)="activeTab = tab.id" [class]="'flex-shrink-0 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ' + (activeTab === tab.id ? 'bg-primary text-primary-foreground shadow-md shadow-primary/20' : 'bg-card border border-border text-muted-foreground hover:text-foreground hover:border-border/80')">
            {{ tab.label }}
          </button>
        }
      </div>

      @if (list.length >= 3) {
        <div class="grid grid-cols-3 gap-3 mb-8">
          @for (item of podium; track item.book.id) {
            <button (click)="openBook(item.book.id)" [class]="'group text-center ' + (item.rank === 1 ? '-mt-4' : 'mt-4')">
              <div [class]="'relative mx-auto overflow-hidden rounded-xl bg-muted aspect-[2/3] ' + (item.rank === 1 ? 'ring-2 ring-yellow-400/60' : '')">
                <img [src]="item.book.cover" [alt]="item.book.title" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <div class="absolute top-2 left-2 w-7 h-7 rounded-full bg-background/80 flex items-center justify-center">
                  <span [class]="'text-xs font-black ' + medalColors[item.rank - 1]">#{{ item.rank }}</span>
                </div>
              </div>
              <p class="text-xs font-semibold text-foreground mt-2 line-clamp-1 px-1">{{ item.book.title }}</p>
              <div class="flex items-center justify-center gap-1 mt-0.5">
                <span class="text-accent text-xs">★</span>
                <span class="text-xs text-muted-foreground">{{ item.book.rating.toFixed(1) }}</span>
              </div>
            </button>
          }
        </div>
      }

      <div class="space-y-3">
        @for (book of list; track book.id; let i = $index) {
          <button (click)="openBook(book.id)" [class]="rankRowClass(i + 1)">
            <div class="flex-shrink-0 w-10 text-center">
              @if (i < 3) {
                <span [class]="'text-2xl font-black ' + medalColors[i]">#{{ i + 1 }}</span>
              } @else {
                <span class="text-lg font-bold text-muted-foreground">#{{ i + 1 }}</span>
              }
            </div>

            <div class="flex-shrink-0 w-14 h-20 rounded-xl overflow-hidden bg-muted">
              <img [src]="book.cover" [alt]="book.title" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
            </div>

            <div class="flex-1 min-w-0">
              <p class="font-semibold text-foreground leading-snug line-clamp-1">{{ book.title }}</p>
              <p class="text-sm text-muted-foreground mb-2">{{ book.author }}</p>
              <app-spice-rating [level]="book.spice" size="sm" />
            </div>

            <div class="flex-shrink-0 text-right hidden sm:block">
              <div class="flex items-center justify-end gap-1 mb-1">
                <span class="text-accent text-sm">★</span>
                <span class="font-bold text-foreground">{{ book.rating.toFixed(1) }}</span>
              </div>
              <p class="text-xs text-muted-foreground">{{ (book.ratingCount / 1000).toFixed(1) }}k avaliações</p>
              @if (book.trendingThisWeek) {
                <span class="inline-block mt-1.5 px-2 py-0.5 rounded-full bg-primary/15 text-primary text-[10px] font-semibold">Em alta</span>
              }
              @if (book.viralOnBooktok && !book.trendingThisWeek) {
                <span class="inline-block mt-1.5 px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground text-[10px] font-semibold">BookTok</span>
              }
            </div>

            <svg class="flex-shrink-0 text-muted-foreground/40 group-hover:text-muted-foreground transition-colors" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        }
      </div>

      @if (list.length === 0) {
        <div class="text-center py-20">
          <p class="font-display text-xl text-foreground mb-2">Nenhum resultado</p>
          <p class="text-muted-foreground text-sm">Esta lista está vazia por enquanto.</p>
        </div>
      }

      <div class="py-8"></div>
    </div>
  `,
})
export class RankingsComponent {
  private readonly router = inject(Router);
  activeTab: RankingTab = 'hot';

  readonly tabs: { id: RankingTab; label: string }[] = [
    { id: 'hot', label: 'Mais quentes' },
    { id: 'popular', label: 'Mais populares' },
    { id: 'dark', label: 'Dark mais lidos' },
    { id: 'booktok', label: 'Viralizando' },
  ];

  readonly descriptions: Record<RankingTab, string> = {
    hot: 'Mais acessados e comentados nos últimos 7 dias',
    popular: 'Os livros com mais avaliações de todos os tempos',
    dark: 'Dark romance e clima intenso — os mais lidos do gênero',
    booktok: 'Dominando o For You Page agora mesmo',
  };

  readonly medalColors = ['text-yellow-400', 'text-gray-400', 'text-amber-600'];
  readonly medalBg = ['bg-yellow-400/10 border-yellow-400/30', 'bg-gray-400/10 border-gray-400/30', 'bg-amber-600/10 border-amber-600/30'];

  private readonly rankData: Record<RankingTab, Book[]> = {
    hot: [...books].filter((book) => book.trendingThisWeek).sort((a, b) => b.ratingCount - a.ratingCount),
    popular: [...books].sort((a, b) => b.ratingCount - a.ratingCount),
    dark: [...books].filter((book) => book.dark >= 3 || book.tropes.includes('dark-romance')).sort((a, b) => b.ratingCount - a.ratingCount),
    booktok: [...books].filter((book) => book.viralOnBooktok).sort((a, b) => b.ratingCount - a.ratingCount),
  };

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
    const base = 'w-full flex items-center gap-4 p-4 rounded-2xl border transition-all duration-200 text-left group hover:border-primary/30 hover:bg-card/60 ';
    return rank <= 3 ? base + this.medalBg[rank - 1] : base + 'border-border bg-card/30';
  }

  openBook(id: string): void {
    void this.router.navigate(['/livro', id]);
  }
}
