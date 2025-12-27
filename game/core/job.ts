import type { Character, LifeStage, StatBlock } from "./character";

export type JobLevel =
  | "intern"
  | "junior"
  | "mid"
  | "senior"
  | "lead"
  | "manager";

export type JobType =
  | "unemployed"
  | "student"
  | "part_time"
  | "full_time"
  | "contractor"
  | "self_employed";

export type WorkSchedule = "day" | "night" | "shift" | "flex";

export type JobTag =
  | "office"
  | "manual"
  | "creative"
  | "tech"
  | "service"
  | "healthcare"
  | "education"
  | "government"
  | "remote";

export type Currency = "EUR" | "USD";

export type JobEffectKey =
  | "vitals.health"
  | "vitals.energy"
  | "vitals.stress"
  | "mind.happiness"
  | "mind.confidence"
  | "mind.discipline"
  | "social.charisma"
  | "social.reputation"
  | "wealth.cash"
  | "wealth.debt";

export type JobEffect = {
  key: JobEffectKey;
  delta: number; // applied per week tick (or per paycheck, your call)
};

export type Pay = {
  currency: Currency;
  amount: number; // per week for simplicity (fits your ageInWeeks loop nicely)
};

export type JobRole = {
  id: string;
  title: string;
  description: string;
  tags: JobTag[];
  type: JobType;
  schedule: WorkSchedule;

  level: JobLevel;
  weeklyPay: Pay;

  icon: string;

  // Requirements/gating (keep it simple)
  minLifeStage?: LifeStage; // ex: "young_adult"
  minAgeYears?: number; // if you prefer age gating instead

  // Optional “fit” info for later
  preferredTraits?: ("ambitious" | "creative" | "lazy" | "social")[];

  // What this job tends to do to you each week (fatigue, stress, etc.)
  weeklyEffects?: JobEffect[];
};

export type JobStatus = {
  roleId: string; // references JobRole.id
  startedAtWeek: number;

  performance: number; // 0-100
  satisfaction: number; // 0-100

  // Progression knobs
  weeksInRole: number;
  lastPayWeek?: number;

  // Optional: workplace events can set these
  warnings: number;
  isFired?: boolean;
};

export type Employment = {
  current?: JobStatus; // undefined => no job
  history: JobStatus[];
};

export type JobResult = { ok: true } | { ok: false; reason: string };

export const YEARS_TO_WEEKS = 52;

export function getAgeYears(character: Pick<Character, "ageInWeeks">): number {
  return Math.floor(character.ageInWeeks / YEARS_TO_WEEKS);
}

export function canTakeJob(character: Character, role: JobRole): JobResult {
  if (
    role.minLifeStage &&
    character.lifeStage &&
    character.lifeStage !== role.minLifeStage
  ) {
    // NOTE: this is strict equality; if you want "at least", add a stage ranking table later.
    return { ok: false, reason: `Requires life stage: ${role.minLifeStage}` };
  }

  if (typeof role.minAgeYears === "number") {
    const age = getAgeYears(character);
    if (age < role.minAgeYears)
      return { ok: false, reason: `Requires age ${role.minAgeYears}+` };
  }

  return { ok: true };
}

export function startJob(
  character: Character,
  employment: Employment,
  role: JobRole,
  weekNow: number
): { character: Character; employment: Employment; result: JobResult } {
  const check = canTakeJob(character, role);
  if (!check.ok) return { character, employment, result: check };

  const current = employment.current;
  const history = current
    ? [...employment.history, current]
    : [...employment.history];

  const next: Employment = {
    current: {
      roleId: role.id,
      startedAtWeek: weekNow,
      performance: 50,
      satisfaction: 50,
      weeksInRole: 0,
      warnings: 0,
      isFired: false,
    },
    history,
  };

  return { character, employment: next, result: { ok: true } };
}

export function quitJob(employment: Employment): Employment {
  if (!employment.current) return employment;
  return {
    current: undefined,
    history: [...employment.history, employment.current],
  };
}

function clamp01to100(n: number): number {
  return Math.max(0, Math.min(100, Math.round(n)));
}

function getStatRef(
  stats: StatBlock,
  key: JobEffectKey
): { get: () => number; set: (v: number) => void } {
  const [group, prop] = key.split(".") as [
    "vitals" | "mind" | "social" | "wealth",
    string
  ];

  // Wealth isn't 0-100 clamped necessarily. Keep it flexible.
  if (group === "wealth") {
    if (prop === "cash")
      return {
        get: () => stats.wealth.cash,
        set: (v) => (stats.wealth.cash = Math.max(0, v)),
      };
    if (prop === "debt")
      return {
        get: () => stats.wealth.debt,
        set: (v) => (stats.wealth.debt = Math.max(0, v)),
      };
  }

  // The rest are 0-100
  const container = stats[group] as any;
  return {
    get: () => container[prop],
    set: (v) => (container[prop] = clamp01to100(v)),
  };
}

export function applyWeeklyJobEffects(
  character: Character,
  role: JobRole
): Character {
  if (!role.weeklyEffects?.length) return character;

  // Mutate a copy (safer for state stores)
  const next: Character = {
    ...character,
    stats: {
      vitals: { ...character.stats.vitals },
      mind: { ...character.stats.mind },
      social: { ...character.stats.social },
      wealth: { ...character.stats.wealth },
    },
  };

  for (const eff of role.weeklyEffects) {
    const ref = getStatRef(next.stats, eff.key);
    ref.set(ref.get() + eff.delta);
  }

  return next;
}

export function paySalary(character: Character, role: JobRole): Character {
  // simple: weeklyPay adds to cash
  const next: Character = {
    ...character,
    stats: {
      ...character.stats,
      wealth: {
        ...character.stats.wealth,
        cash: character.stats.wealth.cash + role.weeklyPay.amount,
      },
    },
  };
  return next;
}
