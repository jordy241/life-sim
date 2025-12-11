import { Character } from "./character";

export interface NPC extends Character {
  personality: "friendly" | "cold" | "chaotic" | "romantic";
  relationship: number; // -100 to 100
  role?: string; // coworker, friend, partner, stranger
}
