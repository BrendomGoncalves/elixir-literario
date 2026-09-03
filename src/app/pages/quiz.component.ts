import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Book, Mood, Trope, books, tropeLabels } from '../data/books';
import { SpiceRatingComponent } from '../components/spice-rating.component';

interface Answers {
  spice: number | null;
  tropes: Trope[];
  mood: Mood | null;
  hea: boolean | null;
  series: 'single' | 'series' | 'any' | null;
}

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [SpiceRatingComponent],
  template: `
    @if (showResults) {
      <div class="min-h-screen max-w-2xl mx-auto px-6 py-12">
        <div class="text-center mb-10">
          <p class="text-primary text-sm font-semibold uppercase tracking-wider mb-2">Seus resultados</p>
          <h1 class="font-display text-4xl font-bold text-foreground mb-3">
            Encontramos <em class="text-accent">seus livros</em>
          </h1>
          <p class="text-muted-foreground">Baseado nas suas preferências, estes são os mais compatíveis com você agora.</p>
        </div>

        <div class="space-y-4 mb-10">
          @for (result of results; track result.book.id) {
            <button (click)="openBook(result.book.id)" class="w-full text-left p-4 rounded-2xl border border-border hover:border-primary/40 bg-card hover:bg-card/80 transition-all duration-200 group">
              <div class="flex gap-4">
                <div class="relative flex-shrink-0 w-20 rounded-xl overflow-hidden bg-muted aspect-[2/3]">
                  <img [src]="result.book.cover" [alt]="result.book.title" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div class="flex-1 min-w-0">
                  <div class="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <p class="font-semibold text-foreground leading-tight">{{ result.book.title }}</p>
                      <p class="text-sm text-muted-foreground">{{ result.book.author }}</p>
                    </div>
                    <div class="flex-shrink-0 text-right">
                      <div class="text-2xl font-black leading-none mb-0.5" [style.color]="matchColor(result.match)">{{ result.match }}%</div>
                      <p class="text-[10px] text-muted-foreground uppercase tracking-wider">match</p>
                    </div>
                  </div>
                  <div class="w-full h-1.5 bg-border rounded-full overflow-hidden mb-3">
                    <div class="h-full rounded-full transition-all duration-700" [style.width.%]="result.match" [style.background-color]="matchColor(result.match)"></div>
                  </div>
                  <app-spice-rating [level]="result.book.spice" size="sm" />
                  <div class="flex flex-wrap gap-1.5 mt-2">
                    @for (trope of result.book.tropes.slice(0, 2); track trope) {
                      <span class="px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground text-[11px]">{{ tropeLabels[trope] }}</span>
                    }
                  </div>
                </div>
              </div>
            </button>
          }
        </div>

        <div class="flex gap-3">
          <button (click)="restart()" class="flex-1 py-3 rounded-xl border border-border text-foreground font-semibold hover:bg-white/5 transition-colors">Refazer quiz</button>
          <button (click)="navigate('/descobrir')" class="flex-1 py-3 rounded-xl bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-colors">Ver catálogo</button>
        </div>
      </div>
    } @else {
      <div class="min-h-screen flex flex-col">
        <div class="fixed top-16 left-0 right-0 z-40 bg-background/80 backdrop-blur-sm border-b border-border/30">
          <div class="max-w-2xl mx-auto px-6 py-3 flex items-center gap-4">
            <button (click)="back()" [disabled]="step === 0" class="text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div class="flex-1 flex gap-1.5">
              @for (color of progressColors; track $index; let i = $index) {
                <div [class]="'h-1.5 flex-1 rounded-full transition-all duration-500 ' + (i <= step ? color : 'bg-border')"></div>
              }
            </div>
            <span class="text-xs text-muted-foreground font-medium">{{ step + 1 }}/{{ totalSteps }}</span>
          </div>
        </div>

        <div class="flex-1 max-w-2xl mx-auto px-6 pt-24 pb-12 w-full">
          <div class="mb-8">
            <h1 class="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">{{ currentTitle }}</h1>
            <p class="text-muted-foreground">{{ currentSubtitle }}</p>
          </div>

          <div class="animate-in fade-in duration-300">
            @switch (step) {
              @case (0) {
                <div class="space-y-3">
                  @for (option of spiceOptions; track option.level) {
                    <button (click)="chooseSpice(option.level)" [class]="'w-full flex items-center gap-4 p-4 rounded-xl border transition-all duration-200 text-left ' + (answers.spice === option.level ? 'border-primary bg-primary/10' : 'border-border hover:border-border/80 hover:bg-white/5')">
                      <app-spice-rating [level]="option.level" size="md" />
                      <div>
                        <p class="font-semibold text-foreground">{{ option.label }}</p>
                        <p class="text-sm text-muted-foreground">{{ option.desc }}</p>
                      </div>
                    </button>
                  }
                </div>
              }
              @case (1) {
                <div>
                  <div class="grid grid-cols-2 gap-2.5 mb-6">
                    @for (trope of allTropes; track trope) {
                      <button (click)="toggleTrope(trope)" [class]="'p-3.5 rounded-xl border text-sm font-medium text-left transition-all duration-200 ' + (answers.tropes.includes(trope) ? 'border-primary bg-primary/15 text-primary' : 'border-border hover:border-border/80 hover:bg-white/5 text-foreground')">
                        {{ tropeLabels[trope] }}
                      </button>
                    }
                  </div>
                  <button (click)="next()" [disabled]="answers.tropes.length === 0" class="w-full py-4 rounded-xl bg-primary text-primary-foreground font-bold hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed transition-all">
                    Continuar @if (answers.tropes.length > 0) { ({{ answers.tropes.length }} selecionados) }
                  </button>
                </div>
              }
              @case (2) {
                <div class="space-y-3">
                  @for (option of moodOptions; track option.mood) {
                    <button (click)="chooseMood(option.mood)" [class]="'w-full p-5 rounded-xl border transition-all duration-200 text-left group overflow-hidden relative ' + (answers.mood === option.mood ? 'border-primary' : 'border-border hover:border-border/80')">
                      <div [class]="'absolute inset-0 bg-gradient-to-r opacity-30 ' + option.bg"></div>
                      <div class="relative">
                        <p class="font-bold text-lg text-foreground">{{ option.label }}</p>
                        <p class="text-sm text-muted-foreground">{{ option.desc }}</p>
                      </div>
                    </button>
                  }
                </div>
              }
              @case (3) {
                <div class="space-y-3">
                  @for (option of heaOptions; track option.label) {
                    <button (click)="chooseHea(option.value)" [class]="'w-full p-5 rounded-xl border transition-all text-left ' + (answers.hea === option.value ? 'border-primary bg-primary/10' : 'border-border hover:border-border/80 hover:bg-white/5')">
                      <p class="font-semibold text-foreground">{{ option.label }}</p>
                      <p class="text-sm text-muted-foreground">{{ option.desc }}</p>
                    </button>
                  }
                </div>
              }
              @case (4) {
                <div class="space-y-3">
                  @for (option of seriesOptions; track option.value) {
                    <button (click)="chooseSeries(option.value)" [class]="'w-full p-5 rounded-xl border transition-all text-left ' + (answers.series === option.value ? 'border-primary bg-primary/10' : 'border-border hover:border-border/80 hover:bg-white/5')">
                      <p class="font-semibold text-foreground">{{ option.label }}</p>
                      <p class="text-sm text-muted-foreground">{{ option.desc }}</p>
                    </button>
                  }
                </div>
              }
            }
          </div>
        </div>
      </div>
    }
  `,
})
export class QuizComponent {
  private readonly router = inject(Router);

  step = 0;
  showResults = false;
  readonly totalSteps = 5;
  readonly tropeLabels = tropeLabels;
  readonly progressColors = ['bg-primary', 'bg-primary', 'bg-accent', 'bg-accent', 'bg-green-500'];

  answers: Answers = this.emptyAnswers();

  readonly allTropes: Trope[] = [
    'enemies-to-lovers', 'forbidden-love', 'second-chance', 'fake-dating',
    'forced-proximity', 'dark-romance', 'slow-burn', 'sports-romance',
    'billionaire', 'age-gap', 'mafia', 'reverse-harem',
  ];

  readonly spiceOptions = [
    { level: 1, label: 'Suavinho', desc: 'Flerte, tensão, nada explícito' },
    { level: 2, label: 'Morninho', desc: 'Porta fechada ou quase aberta' },
    { level: 3, label: 'Quente', desc: 'Cenas explícitas moderadas' },
    { level: 4, label: 'Muito quente', desc: 'Cenas detalhadas e frequentes' },
    { level: 5, label: 'Em chamas', desc: 'Sem filtro nenhum, obrigada' },
  ];

  readonly moodOptions: { mood: Mood; label: string; desc: string; bg: string }[] = [
    { mood: 'dark', label: 'Dark', desc: 'Intenso, perturbador, perigoso', bg: 'from-gray-900 to-red-950' },
    { mood: 'mixed', label: 'Misto', desc: 'Intenso mas com leveza', bg: 'from-purple-950 to-rose-950' },
    { mood: 'light', label: 'Leve', desc: 'Divertido, fofinho, reconfortante', bg: 'from-rose-950 to-amber-950' },
  ];

  readonly heaOptions = [
    { value: true, label: 'Sim, HEA obrigatório', desc: 'Não aguento coração partido' },
    { value: false, label: 'Não, pode doer', desc: 'Estou pronta para sofrer' },
  ];

  readonly seriesOptions: { value: 'single' | 'series' | 'any'; label: string; desc: string }[] = [
    { value: 'single', label: 'Livro único', desc: 'Quero uma história completa e fechada' },
    { value: 'series', label: 'Série', desc: 'Quanto mais tempo com os personagens, melhor' },
    { value: 'any', label: 'Tanto faz', desc: 'O que importa é a história' },
  ];

  private readonly questions = [
    { title: 'Qual nível de spice você quer?', subtitle: 'Seja honesta — aqui não tem julgamento.' },
    { title: 'Qual tropo te faz virar páginas?', subtitle: 'Escolha quantos quiser.' },
    { title: 'Qual clima você quer?', subtitle: 'Como você quer se sentir lendo.' },
    { title: 'Precisa de final feliz?', subtitle: 'Seja honesta.' },
    { title: 'Livro único ou série?', subtitle: 'Quanto você quer se comprometer.' },
  ];

  get currentTitle(): string {
    return this.questions[this.step]?.title ?? '';
  }

  get currentSubtitle(): string {
    return this.questions[this.step]?.subtitle ?? '';
  }

  get results(): { book: Book; match: number }[] {
    return books
      .map((book) => ({ book, match: this.computeMatch(book) }))
      .sort((a, b) => b.match - a.match)
      .slice(0, 5);
  }

  chooseSpice(level: number): void {
    this.answers = { ...this.answers, spice: level };
    this.next();
  }

  toggleTrope(trope: Trope): void {
    const tropes = this.answers.tropes.includes(trope)
      ? this.answers.tropes.filter((item) => item !== trope)
      : [...this.answers.tropes, trope];
    this.answers = { ...this.answers, tropes };
  }

  chooseMood(mood: Mood): void {
    this.answers = { ...this.answers, mood };
    this.next();
  }

  chooseHea(hea: boolean): void {
    this.answers = { ...this.answers, hea };
    this.next();
  }

  chooseSeries(series: 'single' | 'series' | 'any'): void {
    this.answers = { ...this.answers, series };
    this.next();
  }

  next(): void {
    if (this.step < this.totalSteps - 1) this.step += 1;
    else this.showResults = true;
  }

  back(): void {
    if (this.step > 0) this.step -= 1;
  }

  restart(): void {
    this.step = 0;
    this.showResults = false;
    this.answers = this.emptyAnswers();
  }

  matchColor(match: number): string {
    return match >= 80 ? '#d4a843' : match >= 60 ? '#c41e3a' : '#9a8a9e';
  }

  navigate(path: string): void {
    void this.router.navigateByUrl(path);
  }

  openBook(id: string): void {
    void this.router.navigate(['/livro', id]);
  }

  private computeMatch(book: Book): number {
    let score = 0;

    if (this.answers.spice !== null) {
      const diff = Math.abs(book.spice - this.answers.spice);
      score += (1 - diff / 4) * 30;
    } else score += 30;

    if (this.answers.tropes.length > 0) {
      const matched = this.answers.tropes.filter((trope) => book.tropes.includes(trope)).length;
      score += (matched / this.answers.tropes.length) * 35;
    } else score += 35;

    if (this.answers.mood !== null) {
      score += book.mood === this.answers.mood ? 20 : book.mood === 'mixed' ? 10 : 0;
    } else score += 20;

    if (this.answers.hea !== null) score += book.happilyEverAfter === this.answers.hea ? 8 : 0;
    else score += 8;

    if (this.answers.series !== null && this.answers.series !== 'any') {
      score += book.isSeries === (this.answers.series === 'series') ? 7 : 0;
    } else score += 7;

    return Math.round(Math.min(score, 100));
  }

  private emptyAnswers(): Answers {
    return { spice: null, tropes: [], mood: null, hea: null, series: null };
  }
}
