import type { Player } from "@/game/core/player";
import type { StatDelta } from "@/game/systems/stats-system";

export type EventId = string;

export type EventOption = {
  id: string;
  label: string;

  // ✅ new
  icon?: string;

  delta: StatDelta | ((player: Player) => StatDelta);
  canPick?: (player: Player) => boolean;
};

export type GameEvent = {
  id: EventId;

  // ✅ new
  icon?: string;

  title: string;
  description: string;

  weight?: number;
  canTrigger?: (player: Player) => boolean;

  options: EventOption[];
};
