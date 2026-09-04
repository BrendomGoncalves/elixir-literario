import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { NavComponent } from "./components/nav/nav.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavComponent],
  template: `
    <div class="bg-background text-foreground min-h-screen" style="font-family: 'Outfit', system-ui, sans-serif">
      <app-nav />
      <main class="pt-16 pb-20 md:pb-0">
        <router-outlet />
      </main>
    </div>
  `,
})
export class AppComponent {}
