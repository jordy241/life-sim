import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { BASE_EVENTS } from "@/game/content/events/base-events";
import type { GameEvent } from "@/game/core/events";
import type { Player } from "@/game/core/player";
import {
  nextWeek as advancePlayerWeek,
  createPlayer,
} from "@/game/systems/character-system";
import { getEventById, pickWeeklyEventIds } from "@/game/systems/events-system";
import { applyStatDelta } from "@/game/systems/stats-system";
import type { ThemeName } from "@/theme/ThemeProvider";
import { applyWeeklyJobPay } from "../systems/job-system";

export type WeekState = {
  pendingEventIds: string[]; // ids for this week
  activeEventId: string | null; // currently shown event
};

export type GameProgress = {
  currentWeek: number;
  player: Player;
  weekState: WeekState;
};

export type AppSettings = {
  themeName: ThemeName;
  // future:
  // soundEnabled: boolean;
  // musicVolume: number;
  // reduceMotion: boolean;
  // language: "en" | "nl";
};

export type GameStoreState = {
  progress: GameProgress;
  settings: AppSettings;
};

type GameActions = {
  nextWeek: () => void;
  resetGame: () => void;
  setPlayerName: (name: string) => void;

  setTheme: (themeName: ThemeName) => void;

  /**
   * Picks an option for the currently active event.
   * Applies its stat delta, then advances to the next event in the week's queue.
   */
  chooseEventOption: (optionId: string) => void;

  setJob: (roleId: string) => void;
};

type GameStore = {
  state: GameStoreState;
  actions: GameActions;
};

// Later: append more pools here (e.g. MUSIC_EVENTS) depending on player careers.
const ALL_EVENT_POOLS: GameEvent[] = [...BASE_EVENTS];

const createInitialState = (): GameStoreState => ({
  progress: {
    currentWeek: 0,
    player: createPlayer("Kato", []),
    weekState: {
      pendingEventIds: [],
      activeEventId: null,
    },
  },
  settings: {
    themeName: "dark",
  },
});

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      state: createInitialState(),

      actions: {
        nextWeek: () => {
          const { state } = get();

          if (state.progress.weekState.activeEventId) return;

          let player = advancePlayerWeek(state.progress.player);
          player = applyWeeklyJobPay(player);

          const pendingEventIds = pickWeeklyEventIds(
            player,
            ALL_EVENT_POOLS,
            2
          );
          const activeEventId = pendingEventIds[0] ?? null;

          set({
            state: {
              ...state,
              progress: {
                ...state.progress,
                currentWeek: state.progress.currentWeek + 1,
                player,
                weekState: {
                  pendingEventIds,
                  activeEventId,
                },
              },
            },
          });
        },

        chooseEventOption: (optionId: string) => {
          const { state } = get();

          const activeEventId = state.progress.weekState.activeEventId;
          if (!activeEventId) return;

          const event = getEventById(
            activeEventId,
            state.progress.player,
            ALL_EVENT_POOLS
          );
          if (!event) return;

          const option = event.options.find((o) => o.id === optionId);
          if (!option) return;

          if (option.canPick && !option.canPick(state.progress.player)) return;

          const delta =
            typeof option.delta === "function"
              ? option.delta(state.progress.player)
              : option.delta;

          const updatedPlayer = applyStatDelta(state.progress.player, delta);

          // ✅ Consume from the front
          const queue = state.progress.weekState.pendingEventIds;
          const nextQueue =
            queue[0] === activeEventId
              ? queue.slice(1)
              : queue.filter((id) => id !== activeEventId);
          const nextId = nextQueue[0] ?? null;

          set({
            state: {
              ...state,
              progress: {
                ...state.progress,
                player: updatedPlayer,
                weekState: {
                  pendingEventIds: nextQueue,
                  activeEventId: nextId,
                },
              },
            },
          });
        },

        resetGame: () => {
          set({ state: createInitialState() });
        },

        setPlayerName: (name: string) => {
          const { state } = get();
          set({
            state: {
              ...state,
              progress: {
                ...state.progress,
                player: {
                  ...state.progress.player,
                  name,
                },
              },
            },
          });
        },

        setTheme: (themeName: ThemeName) => {
          const { state } = get();
          set({
            state: {
              ...state,
              settings: {
                ...state.settings,
                themeName,
              },
            },
          });
        },

        setJob: (roleId: string) =>
          set((s) => ({
            state: {
              ...s.state,
              progress: {
                ...s.state.progress,
                player: {
                  ...s.state.progress.player,
                  jobRoleId: roleId,
                },
              },
            },
          })),
      },
    }),
    {
      name: "life-sim-store",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (store) => ({ state: store.state }), // persist only data, not actions

      // optional but nice when you change state shape
      version: 1,

      // ✅ DEV-only: wipe persisted store on startup
      onRehydrateStorage: () => {
        if (!__DEV__) return;

        return async () => {
          await AsyncStorage.removeItem("life-sim-store");
        };
      },
    }
  )
);
