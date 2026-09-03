import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home.component';
import { QuizComponent } from './pages/quiz.component';
import { SearchComponent } from './pages/search.component';
import { BookPageComponent } from './pages/book-page.component';
import { ProfileComponent } from './pages/profile.component';
import { RankingsComponent } from './pages/rankings.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'quiz', component: QuizComponent },
  { path: 'descobrir', component: SearchComponent },
  { path: 'livro/:id', component: BookPageComponent },
  { path: 'perfil', component: ProfileComponent },
  { path: 'rankings', component: RankingsComponent },
  { path: '**', redirectTo: '' },
];
