import { Card } from "@/components/ui/card";
import { useGameStore } from "@/game/state/game-store";
import { Theme, ThemeName, useTheme } from "@/theme/ThemeProvider";
import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

export default function SettingsScreen() {
  const { theme, themeName, setThemeName } = useTheme();
  const styles = createStyles(theme);
  const resetGame = useGameStore((s) => s.actions.resetGame);

  const themes: ThemeName[] = ["dark", "light", "pink"];

  return (
    <View style={styles.root}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Settings</Text>

        <Card title="Theme">
          <Text style={styles.label}>Choose your theme</Text>

          {themes.map((name) => (
            <Pressable
              key={name}
              style={[
                styles.themeButton,
                themeName === name && styles.themeButtonActive,
              ]}
              onPress={() => setThemeName(name)}
            >
              <Text
                style={[
                  styles.themeButtonText,
                  themeName === name && styles.themeButtonTextActive,
                ]}
              >
                {name.charAt(0).toUpperCase() + name.slice(1)}
              </Text>
            </Pressable>
          ))}
        </Card>
        <Pressable onPress={resetGame}>
          <Text>Reset save</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

function createStyles(theme: Theme) {
  return StyleSheet.create({
    root: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    container: {
      padding: theme.spacing.md,
    },
    title: {
      fontSize: 28,
      fontWeight: "700",
      color: theme.colors.text,
      marginBottom: theme.spacing.lg,
    },
    label: {
      color: theme.colors.textMuted,
      marginBottom: theme.spacing.sm,
    },
    themeButton: {
      paddingVertical: theme.spacing.sm,
      paddingHorizontal: theme.spacing.md,
      backgroundColor: theme.colors.surface,
      borderRadius: theme.radius.card,
      borderWidth: 1,
      borderColor: theme.colors.border,
      marginBottom: theme.spacing.sm,
    },
    themeButtonActive: {
      backgroundColor: theme.colors.primary,
      borderColor: theme.colors.primary,
    },
    themeButtonText: {
      color: theme.colors.text,
      fontWeight: "500",
    },
    themeButtonTextActive: {
      color: theme.colors.primaryText,
      fontWeight: "700",
    },
  });
}
