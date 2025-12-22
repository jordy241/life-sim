import type { ActionId } from "@/game/core/actions";
import type { Player } from "@/game/core/player";
import { applyStatDelta } from "@/game/systems/stats-system";

export function applyAction(player: Player, actionId: ActionId): Player {
  switch (actionId) {
    case "work":
      return applyStatDelta(player, {
        vitals: { energy: -15, stress: +10 },
        mind: { discipline: +2 },
        wealth: { cash: +120 },
      });

    case "rest":
      return applyStatDelta(player, {
        vitals: { energy: +25, stress: -15 },
        mind: { happiness: +5 },
      });

    case "socialize":
      return applyStatDelta(player, {
        vitals: { energy: -10 },
        mind: { happiness: +15 },
        social: { charisma: +5, reputation: +2 },
      });
  }
}
