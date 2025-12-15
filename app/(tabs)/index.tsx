// app/(tabs)/index.tsx
import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { Card } from "@/components/ui/card";
import { CharacterCard } from "@/components/ui/character-card";
import { weeksToYears } from "@/game/core/time";
import { useGameStore } from "@/game/state/game-store";
import { useTheme, type Theme } from "@/theme/ThemeProvider";

export default function HomeScreen() {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const player = useGameStore((s) => s.state.progress.player);
  const currentWeek = useGameStore((s) => s.state.progress.currentWeek);
  const nextWeek = useGameStore((s) => s.actions.nextWeek);

  const { years, weeks } = weeksToYears(player.ageInWeeks);

  return (
    <View style={styles.root}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.pageTitle}>Life Sim</Text>
        <Text style={styles.subtitle}>Week {currentWeek}</Text>

        <CharacterCard
          name={player.name}
          avatar={require("../../assets/images/avatar.png")}
        />

        <Card title="Age">
          <Text style={styles.value}>
            {years} years, {weeks} weeks
          </Text>
        </Card>

        <Card title="Actions">
          <Pressable style={styles.button} onPress={nextWeek}>
            <Text style={styles.buttonText}>Next week</Text>
          </Pressable>
        </Card>
      </ScrollView>
    </View>
  );
}

function createStyles(theme: Theme) {
  return StyleSheet.create({
    root: { flex: 1, backgroundColor: theme.colors.background },
    container: { padding: theme.spacing.md },
    pageTitle: { fontSize: 28, fontWeight: "700", color: theme.colors.text },
    subtitle: {
      fontSize: 14,
      color: theme.colors.textMuted,
      marginBottom: theme.spacing.md,
    },
    value: { color: theme.colors.text, fontSize: 16, fontWeight: "600" },
    button: {
      marginTop: theme.spacing.sm,
      alignSelf: "flex-start",
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.sm,
      borderRadius: theme.radius.pill,
      backgroundColor: theme.colors.primary,
    },
    buttonText: { color: theme.colors.primaryText, fontWeight: "600" },
  });
}
