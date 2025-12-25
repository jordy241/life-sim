import type { EventId, GameEvent } from "@/game/core/events";
import type { Player } from "@/game/core/player";

function pickWeighted<T extends { weight?: number }>(items: readonly T[]): T {
  const total = items.reduce((sum, it) => sum + (it.weight ?? 1), 0);
  let r = Math.random() * total;

  for (const it of items) {
    r -= it.weight ?? 1;
    if (r <= 0) return it;
  }
  return items[items.length - 1];
}

export function buildEventPoolsForPlayer(
  player: Player,
  pools: GameEvent[]
): GameEvent[] {
  // Keep simple: only filter by canTrigger if present.
  return pools.filter((ev) => (ev.canTrigger ? ev.canTrigger(player) : true));
}

export function pickWeeklyEventIds(
  player: Player,
  pools: GameEvent[],
  count: number
): EventId[] {
  const eligible = buildEventPoolsForPlayer(player, pools);
  if (eligible.length === 0) return [];

  const remaining = [...eligible];
  const picked: GameEvent[] = [];

  const n = Math.min(count, remaining.length);

  for (let i = 0; i < n; i++) {
    const chosen = pickWeighted(remaining);
    picked.push(chosen);

    const idx = remaining.findIndex((x) => x.id === chosen.id);
    if (idx >= 0) remaining.splice(idx, 1);
  }

  return picked.map((e) => e.id);
}

export function getEventById(
  eventId: EventId,
  player: Player,
  pools: GameEvent[]
): GameEvent | null {
  const eligible = buildEventPoolsForPlayer(player, pools);
  return eligible.find((e) => e.id === eventId) ?? null;
}
