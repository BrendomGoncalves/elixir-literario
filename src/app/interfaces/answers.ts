import { Mood } from "../types/mood";
import { Trope } from "../types/trope";

export interface Answers {
  spice: number | null;
  tropes: Trope[];
  mood: Mood | null;
  hea: boolean | null;
  series: "single" | "series" | "any" | null;
}
