import { Character } from "./character";

export interface Player extends Character {
  ageInWeeks: number;
  xp: number;
  level: number;
  career?: string;
  history: PlayerEvent[];
}

export interface PlayerEvent {
  weekNumber: number;
  description: string;
}
