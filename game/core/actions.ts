export type ActionId = "work" | "rest" | "socialize";

export interface GameAction {
  id: ActionId;
  label: string;
  description: string;
}

export const ACTIONS: GameAction[] = [
  {
    id: "work",
    label: "Work",
    description: "Earn money but lose energy.",
  },
  {
    id: "rest",
    label: "Rest",
    description: "Recover energy and reduce stress.",
  },
  {
    id: "socialize",
    label: "Socialize",
    description: "Increase happiness and social stats.",
  },
];
