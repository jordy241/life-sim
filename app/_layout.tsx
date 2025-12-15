import { ThemeProvider, useTheme } from "@/theme/ThemeProvider";
import { Stack } from "expo-router";
import React from "react";

function ThemedStack() {
  const { theme } = useTheme();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: theme.colors.background,
        },
      }}
    />
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <ThemedStack />
    </ThemeProvider>
  );
}
