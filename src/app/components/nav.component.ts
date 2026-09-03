import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

interface NavTab {
  path: string;
  label: string;
  icon: 'home' | 'search' | 'trophy' | 'user';
}

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink],
  template: `
    <header class="fixed top-0 left-0 right-0 z-50 border-b border-border/40 backdrop-blur-md" style="background-color: rgba(13,11,16,0.9)">
      <div class="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a routerLink="/" class="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <span class="text-primary">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path [attr.d]="flamePath" />
            </svg>
          </span>
          <span class="font-display font-extrabold text-xl tracking-tight text-foreground">
            Elixir&nbsp;<span class="text-primary">Literário</span>
          </span>
        </a>

        <nav class="hidden md:flex items-center gap-1">
          @for (tab of tabs; track tab.path) {
            <a
              [routerLink]="tab.path"
              [class]="desktopLinkClass(tab.path)"
            >
              {{ tab.label }}
            </a>
          }
        </nav>

        <a routerLink="/quiz" class="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path [attr.d]="flamePath" />
          </svg>
          Caçar um livro
        </a>
      </div>
    </header>

    <nav class="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-border/40 backdrop-blur-md" style="background-color: rgba(13,11,16,0.95)">
      <div class="flex">
        @for (tab of tabs; track tab.path) {
          <a
            [routerLink]="tab.path"
            [class]="mobileLinkClass(tab.path)"
          >
            @switch (tab.icon) {
              @case ('home') {
                <svg width="22" height="22" viewBox="0 0 24 24" [attr.fill]="isActive(tab.path) ? 'currentColor' : 'none'" stroke="currentColor" stroke-width="1.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                </svg>
              }
              @case ('search') {
                <svg width="22" height="22" viewBox="0 0 24 24" [attr.fill]="isActive(tab.path) ? 'currentColor' : 'none'" stroke="currentColor" stroke-width="1.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
              }
              @case ('trophy') {
                <svg width="22" height="22" viewBox="0 0 24 24" [attr.fill]="isActive(tab.path) ? 'currentColor' : 'none'" stroke="currentColor" stroke-width="1.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 0 0 2.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 0 1 2.916.52 6.003 6.003 0 0 1-5.395 4.972m0 0a6.726 6.726 0 0 1-2.749 1.35m0 0a6.772 6.772 0 0 1-3.044 0" />
                </svg>
              }
              @case ('user') {
                <svg width="22" height="22" viewBox="0 0 24 24" [attr.fill]="isActive(tab.path) ? 'currentColor' : 'none'" stroke="currentColor" stroke-width="1.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>
              }
            }
            <span class="text-[10px] font-medium">{{ tab.label }}</span>
          </a>
        }
      </div>
    </nav>
  `,
})
export class NavComponent {
  private readonly router = inject(Router);

  readonly flamePath = 'M17.66 11.2C17.43 10.9 17.15 10.64 16.89 10.38C16.22 9.78 15.46 9.35 14.82 8.72C13.33 7.26 13 4.85 13.95 3C13 3.23 12.17 3.75 11.46 4.32C8.87 6.4 7.85 10.07 9.07 13.22C9.11 13.32 9.15 13.42 9.15 13.55C9.15 13.77 9 13.97 8.8 14.05C8.57 14.15 8.33 14.09 8.14 13.93C8.08 13.88 8.04 13.83 8 13.76C6.87 12.33 6.69 10.28 7.45 8.64C5.78 10 4.87 12.3 5 14.47C5.06 14.97 5.12 15.47 5.3 15.97C5.45 16.57 5.73 17.17 6.08 17.7C7.08 19.09 8.58 20.08 10.23 20.42C11.98 20.8 13.86 20.63 15.44 19.72C17.18 18.71 18.29 16.9 18.44 14.9C18.5 14 18.5 13.14 17.66 11.2Z';

  readonly tabs: NavTab[] = [
    { path: '/', label: 'Início', icon: 'home' },
    { path: '/descobrir', label: 'Descobrir', icon: 'search' },
    { path: '/rankings', label: 'Rankings', icon: 'trophy' },
    { path: '/perfil', label: 'Perfil', icon: 'user' },
  ];

  desktopLinkClass(path: string): string {
    const base = 'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ';
    return base + (this.isActive(path)
      ? 'bg-primary/15 text-primary'
      : 'text-muted-foreground hover:text-foreground hover:bg-white/5');
  }

  mobileLinkClass(path: string): string {
    return 'flex-1 flex flex-col items-center gap-0.5 py-3 transition-colors ' +
      (this.isActive(path) ? 'text-primary' : 'text-muted-foreground');
  }

  isActive(path: string): boolean {
    if (path === '/') return this.router.url === '/';
    return this.router.url.startsWith(path);
  }
}
