// theme/ThemeProvider.tsx
import { useGameStore } from "@/game/state/game-store";
import React, { createContext, ReactNode, useContext, useMemo } from "react";

export type ThemeName = "dark" | "light" | "pink";

export interface Theme {
  colors: {
    background: string;
    surface: string;
    border: string;
    primary: string;
    primaryText: string;
    text: string;
    textMuted: string;

    chrome: string;
    success: string;
  };
  radius: {
    card: number;
    pill: number;
  };
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
  };
}

const darkTheme: Theme = {
  colors: {
    background: "#020617",
    surface: "#111827",
    border: "#1F2937",
    primary: "#FACC15",
    primaryText: "#111827",
    text: "#F9FAFB",
    textMuted: "#9CA3AF",
    chrome: "#020617",
    success: "#22C55E",
  },
  radius: {
    card: 12,
    pill: 999,
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
  },
};

const lightTheme: Theme = {
  colors: {
    background: "#F9FAFB",
    surface: "#FFFFFF",
    border: "#E5E7EB",
    primary: "#2563EB",
    primaryText: "#FFFFFF",
    text: "#111827",
    textMuted: "#6B7280",
    chrome: "#E5E7EB",
    success: "#16A34A",
  },
  radius: {
    card: 12,
    pill: 999,
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
  },
};

const pinkTheme: Theme = {
  colors: {
    background: "#FFF5F7", // very light pink background
    surface: "#FFFFFF", // white cards
    border: "#FBCFE8", // soft pink border
    primary: "#EC4899", // bright pink accent
    primaryText: "#FFFFFF", // white text on pink buttons
    text: "#1F2933", // dark text
    textMuted: "#9F7F92", // muted mauve/pink text
    chrome: "#FDE2E7",
    success: "#10B981",
  },
  radius: {
    card: 12,
    pill: 999,
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
  },
};

const themes: Record<ThemeName, Theme> = {
  dark: darkTheme,
  light: lightTheme,
  pink: pinkTheme,
};

type ThemeContextValue = {
  theme: Theme;
  themeName: ThemeName;
  setThemeName: (name: ThemeName) => void;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const themeName = useGameStore((s) => s.state.settings.themeName);
  const setTheme = useGameStore((s) => s.actions.setTheme);

  const theme = useMemo(() => themes[themeName], [themeName]);

  const value: ThemeContextValue = {
    theme,
    themeName,
    setThemeName: setTheme,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
  return ctx;
}
