import { Component, inject } from "@angular/core";
import { Router } from "@angular/router";
import { Book, Mood, Trope, books, tropeLabels } from "../../data/books";
import { SpiceRatingComponent } from "../../components/spice-rating.component";

interface Answers {
  spice: number | null;
  tropes: Trope[];
  mood: Mood | null;
  hea: boolean | null;
  series: "single" | "series" | "any" | null;
}

@Component({
  selector: "app-quiz",
  standalone: true,
  imports: [SpiceRatingComponent],
  templateUrl: "./quiz.component.html",
})
export class QuizComponent {
  private readonly router = inject(Router);

  step = 0;
  showResults = false;
  readonly totalSteps = 5;
  readonly tropeLabels = tropeLabels;
  readonly progressColors = [
    "bg-primary",
    "bg-primary",
    "bg-accent",
    "bg-accent",
    "bg-green-500",
  ];

  answers: Answers = this.emptyAnswers();

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

  readonly spiceOptions = [
    { level: 1, label: "Suavinho", desc: "Flerte, tensão, nada explícito" },
    { level: 2, label: "Morninho", desc: "Porta fechada ou quase aberta" },
    { level: 3, label: "Quente", desc: "Cenas explícitas moderadas" },
    { level: 4, label: "Muito quente", desc: "Cenas detalhadas e frequentes" },
    { level: 5, label: "Em chamas", desc: "Sem filtro nenhum, obrigada" },
  ];

  readonly moodOptions: {
    mood: Mood;
    label: string;
    desc: string;
    bg: string;
  }[] = [
    {
      mood: "dark",
      label: "Dark",
      desc: "Intenso, perturbador, perigoso",
      bg: "from-gray-900 to-red-950",
    },
    {
      mood: "mixed",
      label: "Misto",
      desc: "Intenso mas com leveza",
      bg: "from-purple-950 to-rose-950",
    },
    {
      mood: "light",
      label: "Leve",
      desc: "Divertido, fofinho, reconfortante",
      bg: "from-rose-950 to-amber-950",
    },
  ];

  readonly heaOptions = [
    {
      value: true,
      label: "Sim, HEA obrigatório",
      desc: "Não aguento coração partido",
    },
    { value: false, label: "Não, pode doer", desc: "Estou pronta para sofrer" },
  ];

  readonly seriesOptions: {
    value: "single" | "series" | "any";
    label: string;
    desc: string;
  }[] = [
    {
      value: "single",
      label: "Livro único",
      desc: "Quero uma história completa e fechada",
    },
    {
      value: "series",
      label: "Série",
      desc: "Quanto mais tempo com os personagens, melhor",
    },
    { value: "any", label: "Tanto faz", desc: "O que importa é a história" },
  ];

  private readonly questions = [
    {
      title: "Qual nível de spice você quer?",
      subtitle: "Seja honesta — aqui não tem julgamento.",
    },
    {
      title: "Qual tropo te faz virar páginas?",
      subtitle: "Escolha quantos quiser.",
    },
    {
      title: "Qual clima você quer?",
      subtitle: "Como você quer se sentir lendo.",
    },
    { title: "Precisa de final feliz?", subtitle: "Seja honesta." },
    {
      title: "Livro único ou série?",
      subtitle: "Quanto você quer se comprometer.",
    },
  ];

  get currentTitle(): string {
    return this.questions[this.step]?.title ?? "";
  }

  get currentSubtitle(): string {
    return this.questions[this.step]?.subtitle ?? "";
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

  chooseSeries(series: "single" | "series" | "any"): void {
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
    return match >= 80 ? "#d4a843" : match >= 60 ? "#c41e3a" : "#9a8a9e";
  }

  navigate(path: string): void {
    void this.router.navigateByUrl(path);
  }

  openBook(id: string): void {
    void this.router.navigate(["/livro", id]);
  }

  private computeMatch(book: Book): number {
    let score = 0;

    if (this.answers.spice !== null) {
      const diff = Math.abs(book.spice - this.answers.spice);
      score += (1 - diff / 4) * 30;
    } else score += 30;

    if (this.answers.tropes.length > 0) {
      const matched = this.answers.tropes.filter((trope) =>
        book.tropes.includes(trope),
      ).length;
      score += (matched / this.answers.tropes.length) * 35;
    } else score += 35;

    if (this.answers.mood !== null) {
      score +=
        book.mood === this.answers.mood ? 20 : book.mood === "mixed" ? 10 : 0;
    } else score += 20;

    if (this.answers.hea !== null)
      score += book.happilyEverAfter === this.answers.hea ? 8 : 0;
    else score += 8;

    if (this.answers.series !== null && this.answers.series !== "any") {
      score += book.isSeries === (this.answers.series === "series") ? 7 : 0;
    } else score += 7;

    return Math.round(Math.min(score, 100));
  }

  private emptyAnswers(): Answers {
    return { spice: null, tropes: [], mood: null, hea: null, series: null };
  }
}
