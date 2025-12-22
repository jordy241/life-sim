import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import type { ActionId } from "@/game/core/actions";
import type { Player } from "@/game/core/player";
import { applyAction } from "@/game/systems/action-system";
import {
  nextWeek as advancePlayerWeek,
  createPlayer,
} from "@/game/systems/character-system";
import type { ThemeName } from "@/theme/ThemeProvider";

export type GameProgress = {
  currentWeek: number;
  player: Player;
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
  advanceWeekWithAction: (actionId: ActionId) => void;
};

type GameStore = {
  state: GameStoreState;
  actions: GameActions;
};

const createInitialState = (): GameStoreState => ({
  progress: {
    currentWeek: 0,
    player: createPlayer("Kato", []),
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
          set({
            state: {
              ...state,
              progress: {
                ...state.progress,
                currentWeek: state.progress.currentWeek + 1,
                player: advancePlayerWeek(state.progress.player),
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
        advanceWeekWithAction: (actionId: ActionId) => {
          const { state } = get();

          const updatedPlayer = applyAction(state.progress.player, actionId);

          set({
            state: {
              ...state,
              progress: {
                currentWeek: state.progress.currentWeek + 1,
                player: {
                  ...updatedPlayer,
                  ageInWeeks: updatedPlayer.ageInWeeks + 1,
                },
              },
            },
          });
        },
      },
    }),
    {
      name: "life-sim-store",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (store) => ({ state: store.state }), // persist only data, not actions
    }
  )
);
