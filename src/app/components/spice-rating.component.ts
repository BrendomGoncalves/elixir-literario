import { Component, Input } from '@angular/core';

type RatingSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-spice-rating',
  standalone: true,
  template: `
    <div class="flex items-center gap-1.5">
      @if (showLabel) {
        <span class="text-xs font-medium text-muted-foreground uppercase tracking-wider">Spice</span>
      }
      <div class="flex gap-0.5">
        @for (i of icons; track i) {
          <svg [attr.width]="px" [attr.height]="px" viewBox="0 0 24 24" fill="currentColor" [class.text-primary]="i < level" [class.text-border]="i >= level">
            <path d="M17.66 11.2C17.43 10.9 17.15 10.64 16.89 10.38C16.22 9.78 15.46 9.35 14.82 8.72C13.33 7.26 13 4.85 13.95 3C13 3.23 12.17 3.75 11.46 4.32C8.87 6.4 7.85 10.07 9.07 13.22C9.11 13.32 9.15 13.42 9.15 13.55C9.15 13.77 9 13.97 8.8 14.05C8.57 14.15 8.33 14.09 8.14 13.93C8.08 13.88 8.04 13.83 8 13.76C6.87 12.33 6.69 10.28 7.45 8.64C5.78 10 4.87 12.3 5 14.47C5.06 14.97 5.12 15.47 5.3 15.97C5.45 16.57 5.73 17.17 6.08 17.7C7.08 19.09 8.58 20.08 10.23 20.42C11.98 20.8 13.86 20.63 15.44 19.72C17.18 18.71 18.29 16.9 18.44 14.9C18.5 14 18.5 13.14 17.66 11.2Z" />
          </svg>
        }
      </div>
      @if (showLabel) {
        <span class="text-xs text-muted-foreground">{{ level }}/5</span>
      }
    </div>
  `,
})
export class SpiceRatingComponent {
  @Input() level = 0;
  @Input() size: RatingSize = 'sm';
  @Input() showLabel = false;
  readonly icons = [0, 1, 2, 3, 4];

  get px(): number {
    return this.size === 'sm' ? 14 : this.size === 'md' ? 18 : 24;
  }
}

@Component({
  selector: 'app-dark-rating',
  standalone: true,
  template: `
    <div class="flex items-center gap-1.5">
      @if (showLabel) {
        <span class="text-xs font-medium text-muted-foreground uppercase tracking-wider">Dark</span>
      }
      <div class="flex gap-0.5">
        @for (i of icons; track i) {
          <svg [attr.width]="px" [attr.height]="px" viewBox="0 0 24 24" fill="currentColor" [class.text-accent]="i < level" [class.text-border]="i >= level">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        }
      </div>
      @if (showLabel) {
        <span class="text-xs text-muted-foreground">{{ level }}/5</span>
      }
    </div>
  `,
})
export class DarkRatingComponent {
  @Input() level = 0;
  @Input() size: RatingSize = 'sm';
  @Input() showLabel = false;
  readonly icons = [0, 1, 2, 3, 4];

  get px(): number {
    return this.size === 'sm' ? 13 : this.size === 'md' ? 17 : 22;
  }
}
