import { Component, Input } from "@angular/core";
import { RatingSize } from "../../types/rating-size";

@Component({
  selector: "app-spice-rating",
  standalone: true,
  templateUrl: "./spice-rating.component.html",
})
export class SpiceRatingComponent {
  @Input() level = 0;
  @Input() size: RatingSize = "sm";
  @Input() showLabel = false;
  readonly icons = [0, 1, 2, 3, 4];

  get px(): number {
    return this.size === "sm" ? 14 : this.size === "md" ? 18 : 24;
  }
}

@Component({
  selector: "app-dark-rating",
  standalone: true,
  template: `
    <div class="flex items-center gap-1.5">
      @if (showLabel) {
        <span
          class="text-xs font-medium text-muted-foreground uppercase tracking-wider"
          >Dark</span
        >
      }
      <div class="flex gap-0.5">
        @for (i of icons; track i) {
          <svg
            [attr.width]="px"
            [attr.height]="px"
            viewBox="0 0 24 24"
            fill="currentColor"
            [class.text-accent]="i < level"
            [class.text-border]="i >= level"
          >
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
  @Input() size: RatingSize = "sm";
  @Input() showLabel = false;
  readonly icons = [0, 1, 2, 3, 4];

  get px(): number {
    return this.size === "sm" ? 13 : this.size === "md" ? 17 : 22;
  }
}
