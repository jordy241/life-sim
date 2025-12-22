import type { StatBlock } from "@/game/core/character";
import type { Player } from "@/game/core/player";

const clamp = (v: number, min: number, max: number) =>
  Math.min(max, Math.max(min, v));

export type StatDelta = Partial<{
  vitals: Partial<StatBlock["vitals"]>;
  mind: Partial<StatBlock["mind"]>;
  social: Partial<StatBlock["social"]>;
  wealth: Partial<StatBlock["wealth"]>;
}>;

export function applyStatDelta(player: Player, delta: StatDelta): Player {
  const s = player.stats;

  const next: StatBlock = {
    vitals: {
      health: clamp(s.vitals.health + (delta.vitals?.health ?? 0), 0, 100),
      energy: clamp(s.vitals.energy + (delta.vitals?.energy ?? 0), 0, 100),
      stress: clamp(s.vitals.stress + (delta.vitals?.stress ?? 0), 0, 100),
    },
    mind: {
      happiness: clamp(s.mind.happiness + (delta.mind?.happiness ?? 0), 0, 100),
      confidence: clamp(
        s.mind.confidence + (delta.mind?.confidence ?? 0),
        0,
        100
      ),
      discipline: clamp(
        s.mind.discipline + (delta.mind?.discipline ?? 0),
        0,
        100
      ),
    },
    social: {
      charisma: clamp(
        s.social.charisma + (delta.social?.charisma ?? 0),
        0,
        100
      ),
      reputation: clamp(
        s.social.reputation + (delta.social?.reputation ?? 0),
        0,
        100
      ),
    },
    wealth: {
      cash: Math.max(0, s.wealth.cash + (delta.wealth?.cash ?? 0)),
      debt: Math.max(0, s.wealth.debt + (delta.wealth?.debt ?? 0)),
    },
  };

  return { ...player, stats: next };
}
