import type { Player } from "@/game/core/player";
import type { StatDelta } from "@/game/systems/stats-system";

export type EventId = string;

export type EventOption = {
  id: string;
  label: string;
  delta: StatDelta | ((player: Player) => StatDelta);
  // optional: requirements per option
  canPick?: (player: Player) => boolean;
};

export type GameEvent = {
  id: EventId;
  title: string;
  description: string;

  // weighting for random selection
  weight?: number;

  // optional gating (career, age, etc.)
  canTrigger?: (player: Player) => boolean;

  options: EventOption[];
};
