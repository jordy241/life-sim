import type { GameEvent } from "@/game/core/events";

export const BASE_EVENTS: GameEvent[] = [
  {
    id: "random-pop-quiz",
    icon: "📚",
    title: "Pop quiz",
    description: "Your teacher announces a surprise quiz.",
    weight: 3,
    options: [
      {
        id: "study",
        icon: "📝",
        label: "Try your best and focus",
        delta: {
          mind: { discipline: +2 },
          vitals: { stress: +5, energy: -5 },
        },
      },
      {
        id: "wing-it",
        icon: "🤷",
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
    icon: "🎉",
    title: "A friend invites you out",
    description: "They want to hang out tonight.",
    options: [
      {
        id: "go",
        icon: "🕺",
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
        icon: "🏠",
        label: "Stay home",
        delta: {
          mind: { happiness: -2 },
          vitals: { energy: +5, stress: -2 },
        },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // FILLER EVENTS: job/education independent
  // ─────────────────────────────────────────────────────────────

  {
    id: "late-night-scroll",
    icon: "📱",
    title: "Late-night scrolling",
    description: "You get stuck scrolling way past bedtime.",
    weight: 2,
    options: [
      {
        id: "keep-scrolling",
        icon: "🌀",
        label: "Keep scrolling",
        delta: {
          vitals: { energy: -10, stress: +3 },
          mind: { happiness: -1, discipline: -1 },
        },
      },
      {
        id: "sleep-now",
        icon: "😴",
        label: "Put your phone away and sleep",
        delta: {
          vitals: { energy: +8, stress: -2 },
          mind: { discipline: +2 },
        },
      },
      {
        id: "watch-funny",
        icon: "😂",
        label: "Watch something funny",
        delta: {
          mind: { happiness: +3 },
          vitals: { energy: -6 },
        },
      },
    ],
  },

  {
    id: "rainy-week",
    icon: "🌧️",
    title: "Rainy week",
    description: "It rains all week. Everything feels slower.",
    weight: 2,
    options: [
      {
        id: "cozy",
        icon: "🫖",
        label: "Stay in and rest",
        delta: {
          vitals: { energy: +8, stress: -4 },
          mind: { happiness: +2, confidence: +1 },
        },
      },
      {
        id: "go-out",
        icon: "🌂",
        label: "Go out anyway",
        delta: {
          mind: { discipline: +1, confidence: +1 },
          vitals: { energy: -6, stress: +2 },
        },
      },
      {
        id: "doomscroll",
        icon: "🗞️",
        label: "Doomscroll",
        delta: {
          mind: { happiness: -3, confidence: -1 },
          vitals: { stress: +5 },
        },
      },
    ],
  },

  {
    id: "nice-weather",
    icon: "☀️",
    title: "Nice weather",
    description: "It’s unusually nice outside today.",
    options: [
      {
        id: "go-walk",
        icon: "🚶‍♀️",
        label: "Go for a walk",
        delta: {
          vitals: { health: +2, stress: -2, energy: -2 },
          mind: { happiness: +2, confidence: +1 },
        },
      },
      {
        id: "meet-someone",
        icon: "🧋",
        label: "Meet someone",
        delta: {
          social: { charisma: +1, reputation: +1 },
          mind: { happiness: +3, confidence: +1 },
          wealth: { cash: -15 },
          vitals: { energy: -4 },
        },
      },
      {
        id: "stay-in",
        icon: "🧊",
        label: "Stay in anyway",
        delta: {
          mind: { discipline: +1 },
          vitals: { stress: -1, energy: +2 },
        },
      },
    ],
  },

  {
    id: "seasonal-cold",
    icon: "🤧",
    title: "Seasonal cold",
    description: "You feel a cold coming on.",
    weight: 2,
    options: [
      {
        id: "rest",
        icon: "🛌",
        label: "Rest and recover",
        delta: {
          vitals: { health: +2, energy: +6, stress: -2 },
          mind: { discipline: +1 },
        },
      },
      {
        id: "medicine",
        icon: "💊",
        label: "Buy medicine",
        delta: {
          wealth: { cash: -15 },
          vitals: { health: +2, stress: -1 },
        },
      },
      {
        id: "push-through",
        icon: "🫡",
        label: "Push through",
        delta: {
          vitals: { health: -2, stress: +4, energy: -4 },
          mind: { discipline: +1, confidence: -1 },
        },
      },
    ],
  },

  {
    id: "bad-sleep",
    icon: "🌙",
    title: "Bad sleep",
    description: "You wake up tired for no clear reason.",
    weight: 2,
    options: [
      {
        id: "nap",
        icon: "😪",
        label: "Take a nap",
        delta: { vitals: { energy: +10, stress: -2 } },
      },
      {
        id: "coffee",
        icon: "☕",
        label: "Caffeine time",
        delta: { vitals: { energy: +6, stress: +2 }, mind: { happiness: +1 } },
      },
      {
        id: "power-through",
        icon: "🧱",
        label: "Power through",
        delta: { vitals: { energy: -4, stress: +3 }, mind: { discipline: +1 } },
      },
    ],
  },

  {
    id: "messy-room",
    icon: "🧹",
    title: "Messy room",
    description: "Your place is a mess and it’s starting to bother you.",
    options: [
      {
        id: "deep-clean",
        icon: "🧽",
        label: "Deep clean",
        delta: {
          mind: { discipline: +2, confidence: +1, happiness: +1 },
          vitals: { stress: -2, energy: -4 },
        },
      },
      {
        id: "quick-tidy",
        icon: "🗂️",
        label: "Quick tidy",
        delta: {
          mind: { discipline: +1, confidence: +1 },
          vitals: { stress: -1, energy: -1 },
        },
      },
      {
        id: "ignore",
        icon: "🙈",
        label: "Ignore it",
        delta: {
          vitals: { stress: +3 },
          mind: { happiness: -1, confidence: -1 },
        },
      },
    ],
  },

  {
    id: "impulse-buy",
    icon: "🛍️",
    title: "Impulse buy",
    description: "You see something you really want. It’s ‘on sale’.",
    weight: 2,
    options: [
      {
        id: "buy",
        icon: "💳",
        label: "Buy it",
        delta: {
          wealth: { cash: -25 },
          mind: { happiness: +3, confidence: +1 },
        },
      },
      {
        id: "resist",
        icon: "🧘",
        label: "Resist",
        delta: {
          mind: { discipline: +2, confidence: +1 },
          vitals: { stress: -1 },
        },
      },
      {
        id: "compare",
        icon: "🔎",
        label: "Compare prices",
        delta: { mind: { discipline: +1 }, vitals: { stress: +1 } },
      },
    ],
  },

  {
    id: "random-compliment",
    icon: "💬",
    title: "Unexpected compliment",
    description: "Someone compliments you out of nowhere.",
    options: [
      {
        id: "accept",
        icon: "😊",
        label: "Accept it",
        delta: {
          mind: { happiness: +3, confidence: +2 },
          social: { charisma: +1 },
        },
      },
      {
        id: "deflect",
        icon: "😅",
        label: "Deflect awkwardly",
        delta: { vitals: { stress: +1 }, mind: { confidence: -1 } },
      },
      {
        id: "compliment-back",
        icon: "🌟",
        label: "Compliment them back",
        delta: {
          social: { charisma: +1, reputation: +1 },
          mind: { happiness: +1 },
        },
      },
    ],
  },

  {
    id: "argument-small",
    icon: "💢",
    title: "Small argument",
    description: "You get into a small argument with someone.",
    options: [
      {
        id: "deescalate",
        icon: "🕊️",
        label: "De-escalate",
        delta: {
          social: { reputation: +1 },
          vitals: { stress: -1 },
          mind: { discipline: +1 },
        },
      },
      {
        id: "snap",
        icon: "🥊",
        label: "Snap back",
        delta: {
          social: { reputation: -2 },
          vitals: { stress: +5 },
          mind: { happiness: -1, confidence: -1 },
        },
      },
      {
        id: "walk-away",
        icon: "🚪",
        label: "Walk away",
        delta: {
          vitals: { stress: +1 },
          mind: { discipline: +1, confidence: +1 },
        },
      },
    ],
  },

  {
    id: "public-transport-delay",
    icon: "🚌",
    title: "Transport delay",
    description: "Delays everywhere. You’re stuck waiting longer than usual.",
    weight: 2,
    options: [
      {
        id: "music",
        icon: "🎧",
        label: "Listen to music",
        delta: { vitals: { stress: -1 }, mind: { happiness: +1 } },
      },
      {
        id: "rant",
        icon: "😡",
        label: "Rant about it",
        delta: { vitals: { stress: +2 }, social: { reputation: -1 } },
      },
      {
        id: "walk",
        icon: "🚶",
        label: "Walk instead",
        delta: {
          vitals: { health: +2, energy: -3 },
          mind: { discipline: +1, confidence: +1 },
        },
      },
    ],
  },

  {
    id: "meal-prep",
    icon: "🥗",
    title: "Meal prep",
    description: "You consider meal prepping for the week.",
    options: [
      {
        id: "proper",
        icon: "✅",
        label: "Do it properly",
        delta: {
          vitals: { health: +2 },
          mind: { discipline: +2 },
          wealth: { cash: -15 },
        },
      },
      {
        id: "lazy",
        icon: "🫠",
        label: "Do a lazy version",
        delta: {
          vitals: { health: +1 },
          mind: { discipline: +1 },
          wealth: { cash: -8 },
        },
      },
      {
        id: "skip",
        icon: "🍟",
        label: "Skip it",
        delta: {
          mind: { happiness: +1 },
          vitals: { stress: +1 },
          wealth: { cash: -10 },
        },
      },
    ],
  },

  {
    id: "late-night-gaming",
    icon: "🎮",
    title: "Late-night gaming",
    description: "You stay up way too late gaming.",
    options: [
      {
        id: "worth-it",
        icon: "🏆",
        label: "Worth it",
        delta: { mind: { happiness: +3 }, vitals: { energy: -12, stress: +2 } },
      },
      {
        id: "regret",
        icon: "🫥",
        label: "Instant regret",
        delta: { mind: { happiness: -1 }, vitals: { energy: -10, stress: +4 } },
      },
      {
        id: "stop-early",
        icon: "⏰",
        label: "Stop early",
        delta: { mind: { discipline: +2 }, vitals: { energy: -4 } },
      },
    ],
  },

  {
    id: "creative-hobby",
    icon: "🎨",
    title: "Creative itch",
    description: "You feel like doing something creative this week.",
    options: [
      {
        id: "make",
        icon: "🖌️",
        label: "Make something",
        delta: {
          mind: { happiness: +3, confidence: +1 },
          vitals: { stress: -2, energy: -3 },
        },
      },
      {
        id: "share",
        icon: "📤",
        label: "Share it online",
        delta: {
          social: { reputation: +1 },
          mind: { happiness: +2 },
          vitals: { stress: +1 },
        },
      },
      {
        id: "skip",
        icon: "🫤",
        label: "Skip it",
        delta: { mind: { happiness: -1 }, vitals: { stress: +1 } },
      },
    ],
  },

  {
    id: "small-windfall",
    icon: "🎁",
    title: "Small windfall",
    description: "You receive a small unexpected amount of cash.",
    weight: 2,
    options: [
      {
        id: "save",
        icon: "🏦",
        label: "Save it",
        delta: {
          wealth: { cash: +35 },
          mind: { discipline: +2, confidence: +1 },
        },
      },
      {
        id: "treat",
        icon: "🍰",
        label: "Treat yourself",
        delta: { wealth: { cash: +15 }, mind: { happiness: +3 } },
      },
      {
        id: "share",
        icon: "🎀",
        label: "Share some",
        delta: {
          wealth: { cash: +20 },
          social: { reputation: +2 },
          mind: { happiness: +1 },
        },
      },
    ],
  },

  {
    id: "new-connection",
    icon: "🫶",
    title: "New connection",
    description:
      "You meet someone interesting and they want to hang out sometime.",
    options: [
      {
        id: "say-yes",
        icon: "✅",
        label: "Say yes",
        delta: {
          social: { charisma: +2, reputation: +1 },
          mind: { happiness: +2, confidence: +1 },
        },
      },
      {
        id: "maybe",
        icon: "🤔",
        label: "Say maybe",
        delta: { vitals: { stress: +1 }, social: { reputation: -1 } },
      },
      {
        id: "say-no",
        icon: "❌",
        label: "Say no",
        delta: { mind: { happiness: -1 }, social: { reputation: -1 } },
      },
    ],
  },

  {
    id: "lost-keys",
    icon: "🔑",
    title: "Lost keys",
    description: "You can’t find your keys and you’re getting frustrated.",
    weight: 2,
    options: [
      {
        id: "panic",
        icon: "😵",
        label: "Panic search",
        delta: { vitals: { stress: +6, energy: -2 }, mind: { confidence: -1 } },
      },
      {
        id: "methodical",
        icon: "🧭",
        label: "Search methodically",
        delta: {
          mind: { discipline: +1, confidence: +1 },
          vitals: { stress: +2 },
        },
      },
      {
        id: "spare",
        icon: "🗝️",
        label: "Use a spare key",
        delta: { mind: { discipline: -1 }, vitals: { stress: -1 } },
      },
    ],
  },

  {
    id: "headache-day",
    icon: "🤕",
    title: "Headache day",
    description: "You have a mild headache that won’t go away.",
    weight: 2,
    options: [
      {
        id: "hydrate",
        icon: "💧",
        label: "Hydrate and rest",
        delta: { vitals: { stress: -2, energy: +4, health: +1 } },
      },
      {
        id: "painkiller",
        icon: "💊",
        label: "Take a painkiller",
        delta: { wealth: { cash: -5 }, vitals: { stress: -1, health: +1 } },
      },
      {
        id: "ignore",
        icon: "😬",
        label: "Ignore it",
        delta: { vitals: { stress: +2, energy: -3 }, mind: { happiness: -1 } },
      },
    ],
  },

  {
    id: "help-stranger",
    icon: "🤲",
    title: "Small good deed",
    description: "You notice someone struggling and you can help.",
    options: [
      {
        id: "help",
        icon: "🤝",
        label: "Help them",
        delta: {
          social: { reputation: +2 },
          mind: { happiness: +2, confidence: +1 },
          vitals: { stress: -1 },
        },
      },
      {
        id: "donate",
        icon: "💰",
        label: "Offer a small donation",
        delta: {
          wealth: { cash: -10 },
          social: { reputation: +2 },
          mind: { happiness: +1 },
        },
      },
      {
        id: "walk-past",
        icon: "🚶‍♂️",
        label: "Walk past",
        delta: {
          mind: { discipline: -1 },
          social: { reputation: -1 },
          vitals: { stress: +1 },
        },
      },
    ],
  },

  {
    id: "try-meditation",
    icon: "🧘",
    title: "Try meditation",
    description: "You consider trying meditation to calm your mind.",
    options: [
      {
        id: "do-it",
        icon: "🫧",
        label: "Do a short session",
        delta: {
          vitals: { stress: -5 },
          mind: { discipline: +1, confidence: +1 },
        },
      },
      {
        id: "skip",
        icon: "🙃",
        label: "Skip",
        delta: { vitals: { stress: +1 }, mind: { happiness: +1 } },
      },
      {
        id: "overthink",
        icon: "🧠",
        label: "Overthink the whole thing",
        delta: { vitals: { stress: +3 }, mind: { happiness: -1 } },
      },
    ],
  },

  {
    id: "random-clean-eating",
    icon: "🥬",
    title: "Healthy choice",
    description: "You’re tempted to make a healthier choice this week.",
    options: [
      {
        id: "healthy",
        icon: "🥦",
        label: "Go healthy",
        delta: {
          vitals: { health: +2 },
          mind: { discipline: +2 },
          wealth: { cash: -5 },
        },
      },
      {
        id: "balanced",
        icon: "⚖️",
        label: "Go balanced",
        delta: {
          vitals: { health: +1 },
          mind: { discipline: +1, happiness: +1 },
          wealth: { cash: -3 },
        },
      },
      {
        id: "junk",
        icon: "🍔",
        label: "Go junk food",
        delta: {
          mind: { happiness: +2 },
          vitals: { health: -1, stress: +1 },
          wealth: { cash: -8 },
        },
      },
    ],
  },
];
