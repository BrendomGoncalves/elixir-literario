import { Mood } from "../types/mood";
import { Trope } from "../types/trope";
import { Comment } from "./comment";

export interface Book {
  id: string;
  title: string;
  author: string;
  cover: string;
  spice: number;
  dark: number;
  rating: number;
  ratingCount: number;
  synopsis: string;
  tropes: Trope[];
  mood: Mood;
  happilyEverAfter: boolean;
  isSeries: boolean;
  seriesName?: string;
  seriesBook?: number;
  contentWarnings: string[];
  detailedRatings: {
    romance: number;
    chemistry: number;
    plot: number;
    characters: number;
  };
  similarBooks: string[];
  affiliateLink: string;
  trendingThisWeek?: boolean;
  viralOnBooktok?: boolean;
  genre: string[];
  comments: Comment[];
}
