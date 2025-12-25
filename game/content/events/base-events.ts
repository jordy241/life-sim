import type { GameEvent } from "@/game/core/events";

export const BASE_EVENTS: GameEvent[] = [
  {
    id: "random-pop-quiz",
    title: "Pop quiz",
    description: "Your teacher announces a surprise quiz.",
    weight: 3,
    options: [
      {
        id: "study",
        label: "Try your best and focus",
        delta: {
          mind: { discipline: +2 },
          vitals: { stress: +5, energy: -5 },
        },
      },
      {
        id: "wing-it",
        label: "Wing it",
        delta: {
          mind: { happiness: +2, discipline: -1 },
          vitals: { stress: +2 },
        },
      },
    ],
  },
  {
    id: "friend-invites-you-out",
    title: "A friend invites you out",
    description: "They want to hang out tonight.",
    options: [
      {
        id: "go",
        label: "Go out",
        delta: {
          social: { charisma: +2, reputation: +1 },
          mind: { happiness: +6 },
          vitals: { energy: -10 },
          wealth: { cash: -20 },
        },
      },
      {
        id: "decline",
        label: "Stay home",
        delta: {
          mind: { happiness: -2 },
          vitals: { energy: +5, stress: -2 },
        },
      },
    ],
  },
];
