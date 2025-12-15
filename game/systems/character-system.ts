import type { Character, StatBlock, Trait } from "../core/character";
import type { Player } from "../core/player";
import { WEEKS_PER_YEAR } from "../core/time";

const createId = () => `${Date.now()}-${Math.random().toString(16).slice(2)}`;

const defaultStats: StatBlock = {
  vitals: {
    health: 100,
    energy: 100,
    stress: 10,
  },
  mind: {
    happiness: 55,
    confidence: 40,
    discipline: 35,
  },
  social: {
    charisma: 40,
    reputation: 10,
  },
  wealth: {
    cash: 0,
    debt: 0,
  },
};

const START_AGE_YEARS = 18;

export function createPlayer(name: string, traits: Trait[] = []): Player {
  const base: Character = {
    id: createId(),
    name,
    stats: structuredClone(defaultStats),
    traits,
  };

  return {
    ...base,
    ageInWeeks: START_AGE_YEARS * WEEKS_PER_YEAR,
    xp: 0,
    level: 1,
    history: [],
  };
}

export function nextWeek(player: Player): Player {
  return {
    ...player,
    ageInWeeks: player.ageInWeeks + 1,
  };
}
