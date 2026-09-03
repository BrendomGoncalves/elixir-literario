import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { books } from '../data/books';
import { BookSectionComponent } from '../components/book-section.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [BookSectionComponent],
  template: `
    <div class="min-h-screen">
      <section class="relative min-h-[92vh] flex items-center overflow-hidden">
        <div class="absolute inset-0 bg-cover bg-center" style="background-image: url(https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=1600&h=900&fit=crop&auto=format)"></div>
        <div class="absolute inset-0" style="background: linear-gradient(135deg, rgba(13,11,16,0.97) 40%, rgba(13,11,16,0.7) 100%)"></div>
        <div class="absolute inset-0" style="background: radial-gradient(ellipse at 80% 50%, rgba(196,30,58,0.12) 0%, transparent 60%)"></div>

        <div class="relative max-w-6xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/10 mb-6">
              <span class="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              <span class="text-xs font-semibold text-primary tracking-wider uppercase">Aprovados pela BookTok</span>
            </div>
            <h1 class="font-display text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight text-foreground mb-6">
              Encontre seu próximo <em class="text-primary not-italic">romance</em>
              <em class="text-accent not-italic">{{ heroTexts[heroTextIndex] }}</em>
            </h1>
            <p class="text-lg text-muted-foreground leading-relaxed mb-10 max-w-lg">
              Descubra livros pelo nível de spice, tropo e clima que você quer sentir hoje. Sem julgamentos, só puro prazer literário.
            </p>
            <div class="flex flex-col sm:flex-row gap-4">
              <button (click)="navigate('/quiz')" class="flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-bold text-base hover:bg-primary/90 transition-all duration-200 hover:scale-[1.02] shadow-lg shadow-primary/20">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path [attr.d]="flamePath" />
                </svg>
                Qual livro eu leio agora?
              </button>
              <button (click)="navigate('/descobrir')" class="flex items-center justify-center gap-2 px-8 py-4 rounded-xl border border-border text-foreground font-semibold text-base hover:border-foreground/40 hover:bg-white/5 transition-all duration-200">
                Explorar catálogo
              </button>
            </div>

            <div class="flex items-center gap-6 mt-10 pt-8 border-t border-border/50">
              @for (stat of stats; track stat.label) {
                <div>
                  <p class="font-display text-2xl font-bold text-foreground">{{ stat.value }}</p>
                  <p class="text-xs text-muted-foreground mt-0.5">{{ stat.label }}</p>
                </div>
              }
            </div>
          </div>

          <div class="hidden md:grid grid-cols-3 gap-3 items-end">
            @for (book of heroBooks; track book.id; let i = $index) {
              <button (click)="openBook(book.id)" [class]="heroBookClass(i)">
                <img [src]="book.cover" [alt]="book.title" class="w-full h-full object-cover" />
                <div class="absolute inset-0 from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </button>
            }
          </div>
        </div>

        <div class="absolute bottom-0 left-0 right-0 h-32 from-background to-transparent"></div>
      </section>

      <section class="py-6 border-b border-border/30">
        <div class="max-w-6xl mx-auto px-6">
          <div class="flex gap-3 overflow-x-auto pb-1">
            @for (genre of genres; track genre) {
              <button (click)="navigate('/descobrir')" class="px-4 py-2 rounded-full border border-border text-sm font-medium text-foreground hover:border-primary hover:text-primary transition-all duration-200">
                {{ genre }}
              </button>
            }
          </div>
        </div>
      </section>

      <app-book-section title="Em alta esta semana" subtitle="Os mais acessados e comentados nos últimos 7 dias" [bookIds]="trending" (seeAll)="navigate('/rankings')" />

      <div class="max-w-6xl mx-auto px-6"><div class="h-px bg-border/30"></div></div>

      <app-book-section title="Dark Romance" subtitle="Para quando você quer sentir o perigo de verdade" [bookIds]="darkRomance" (seeAll)="navigate('/descobrir')" />

      <section class="py-8">
        <div class="max-w-6xl mx-auto px-6">
          <div class="relative overflow-hidden rounded-2xl p-8 md:p-12" style="background: linear-gradient(135deg, #1a0a12 0%, #2d0f1e 50%, #1a0a12 100%)">
            <div class="absolute inset-0 opacity-20" style="background-image: radial-gradient(circle at 70% 50%, #c41e3a 0%, transparent 60%)"></div>
            <div class="relative flex flex-col md:flex-row items-center gap-8">
              <div class="flex-1">
                <p class="text-primary text-sm font-semibold uppercase tracking-wider mb-3">Quiz de Descoberta</p>
                <h3 class="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Não sabe o que ler? <br />
                  <em class="text-primary">A gente descobre junto.</em>
                </h3>
                <p class="text-muted-foreground leading-relaxed max-w-md">
                  Responda 5 perguntas rápidas sobre seu humor de leitura e receba recomendações com % de compatibilidade.
                </p>
              </div>
              <button (click)="navigate('/quiz')" class="px-8 py-4 rounded-xl bg-primary text-primary-foreground font-bold text-base hover:bg-primary/90 transition-colors shadow-lg shadow-primary/25">
                Fazer o quiz agora
              </button>
            </div>
          </div>
        </div>
      </section>

      <app-book-section title="Enemies to Lovers" subtitle="Porque às vezes o ódio é só amor mal resolvido" [bookIds]="enemiesLovers" (seeAll)="navigate('/descobrir')" />

      <div class="max-w-6xl mx-auto px-6"><div class="h-px bg-border/30"></div></div>

      <app-book-section title="Viralizando no BookTok" subtitle="O que está dominando o For You Page" [bookIds]="booktok" (seeAll)="navigate('/rankings')" />

      <div class="py-16"></div>
    </div>
  `,
})
export class HomeComponent implements OnInit, OnDestroy {
  private readonly router = inject(Router);
  private intervalId?: number;

  readonly books = books;
  readonly heroBooks = books.slice(0, 6);
  readonly heroTexts = ['hot', 'quente', 'spicy', 'apimentado', 'fantasy', 'fantasia', 'dark', 'sombrio'];
  heroTextIndex = 0;

  readonly trending = books.filter((book) => book.trendingThisWeek).map((book) => book.id);
  readonly darkRomance = books.filter((book) => book.tropes.includes('dark-romance') || book.dark >= 4).map((book) => book.id);
  readonly enemiesLovers = books.filter((book) => book.tropes.includes('enemies-to-lovers')).map((book) => book.id).slice(0, 6);
  readonly booktok = books.filter((book) => book.viralOnBooktok).map((book) => book.id);

  readonly genres = ['Dark Romance', 'Enemies to Lovers', 'Slow Burn', 'Fae Romance', 'Sports Romance', 'Billionaire', 'Segunda Chance', 'Mafia'];
  readonly stats = [
    { value: '2.400+', label: 'Livros' },
    { value: '89k', label: 'Avaliações' },
    { value: '98%', label: 'Sem julgamentos' },
  ];

  readonly flamePath = 'M17.66 11.2C17.43 10.9 17.15 10.64 16.89 10.38C16.22 9.78 15.46 9.35 14.82 8.72C13.33 7.26 13 4.85 13.95 3C13 3.23 12.17 3.75 11.46 4.32C8.87 6.4 7.85 10.07 9.07 13.22C9.11 13.32 9.15 13.42 9.15 13.55C9.15 13.77 9 13.97 8.8 14.05C8.57 14.15 8.33 14.09 8.14 13.93C8.08 13.88 8.04 13.83 8 13.76C6.87 12.33 6.69 10.28 7.45 8.64C5.78 10 4.87 12.3 5 14.47C5.06 14.97 5.12 15.47 5.3 15.97C5.45 16.57 5.73 17.17 6.08 17.7C7.08 19.09 8.58 20.08 10.23 20.42C11.98 20.8 13.86 20.63 15.44 19.72C17.18 18.71 18.29 16.9 18.44 14.9C18.5 14 18.5 13.14 17.66 11.2Z';

  ngOnInit(): void {
    this.intervalId = window.setInterval(() => {
      this.heroTextIndex = (this.heroTextIndex + 1) % this.heroTexts.length;
    }, 2000);
  }

  ngOnDestroy(): void {
    if (this.intervalId !== undefined) window.clearInterval(this.intervalId);
  }

  heroBookClass(index: number): string {
    const base = 'group relative overflow-hidden rounded-xl bg-muted hover:scale-105 transition-transform duration-300 ';
    return base + (index === 1 ? '-translate-y-4' : index === 4 ? '-translate-y-6' : '');
  }

  navigate(path: string): void {
    void this.router.navigateByUrl(path);
  }

  openBook(id: string): void {
    void this.router.navigate(['/livro', id]);
  }
}
