import type { JobRole } from "../core/job";

export const JOB_ROLES: JobRole[] = [
  {
    id: "job_unemployed",
    title: "Unemployed",
    description: "Currently without a job.",
    icon: "-",
    tags: [],
    type: "unemployed",
    schedule: "flex",
    level: "junior",
    weeklyPay: { currency: "EUR", amount: 0 },
    weeklyEffects: [
      { key: "vitals.stress", delta: +2 },
      { key: "mind.happiness", delta: -1 },
    ],
  },
  {
    id: "job_barista_part_time",
    title: "Barista",
    description: "Prepare and serve coffee and other beverages.",
    icon: "☕",
    tags: ["service"],
    type: "part_time",
    schedule: "shift",
    level: "junior",
    weeklyPay: { currency: "EUR", amount: 220 },
    minAgeYears: 16,
    weeklyEffects: [
      { key: "vitals.energy", delta: -4 },
      { key: "vitals.stress", delta: +3 },
      { key: "social.charisma", delta: +1 },
    ],
  },
  {
    id: "job_junior_office",
    title: "Junior Office Assistant",
    description: "Assist with administrative tasks in an office setting.",
    icon: "💼",
    tags: ["office"],
    type: "full_time",
    schedule: "day",
    level: "junior",
    weeklyPay: { currency: "EUR", amount: 520 },
    minAgeYears: 18,
    weeklyEffects: [
      { key: "vitals.energy", delta: -3 },
      { key: "vitals.stress", delta: +2 },
      { key: "mind.discipline", delta: +1 },
      { key: "social.reputation", delta: +1 },
    ],
  },
];
