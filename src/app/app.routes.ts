import { Routes } from "@angular/router";
import { QuizComponent } from "./pages/quiz/quiz.component";
import { SearchComponent } from "./pages/search/search.component";
import { BookPageComponent } from "./pages/book-page/book-page.component";
import { ProfileComponent } from "./pages/profile/profile.component";
import { RankingsComponent } from "./pages/rankings/rankings.component";
import { HomeComponent } from "./pages/home/home.component";

export const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "quiz", component: QuizComponent },
  { path: "descobrir", component: SearchComponent },
  { path: "livro/:id", component: BookPageComponent },
  { path: "perfil", component: ProfileComponent },
  { path: "rankings", component: RankingsComponent },
  { path: "**", redirectTo: "" },
];
