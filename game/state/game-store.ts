import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import type { Player } from "@/game/core/player";
import { createPlayer, nextWeek as advancePlayerWeek } from "@/game/systems/character-system";
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
};

type GameStore = {
  state: GameStoreState;
  actions: GameActions;
};

const createInitialState = (): GameStoreState => ({
  progress: {
    currentWeek: 0,
    player: createPlayer("Jordy", []),
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
      },
    }),
    {
      name: "life-sim-store",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (store) => ({ state: store.state }), // persist only data, not actions
    }
  )
);
