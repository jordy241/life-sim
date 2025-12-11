import { Character, StatBlock, Trait } from "../core/character";
import { Player } from "../core/player";
import { WEEKS_PER_YEAR } from "../core/time";

const createId = () => `${Date.now()}-${Math.random().toString(16).slice(2)}`;

const defaultStats: StatBlock = {
  health: 100,
  happiness: 50,
  energy: 100,
  money: 0,
};

const START_AGE_YEARS = 18;

export function createPlayer(name: string, traits: Trait[] = []): Player {
  const base: Character = {
    id: createId(),
    name,
    age: START_AGE_YEARS,
    stats: { ...defaultStats },
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
