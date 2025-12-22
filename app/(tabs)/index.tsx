// app/(tabs)/index.tsx
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { Card } from "@/components/ui/card";
import { CharacterCard } from "@/components/ui/character-card";
import { Dialog } from "@/components/ui/dialog";
import { PillButton } from "@/components/ui/pill-button";
import { ACTIONS } from "@/game/core/actions";
import { weeksToYears } from "@/game/core/time";
import { useGameStore } from "@/game/state/game-store";
import { useTheme, type Theme } from "@/theme/ThemeProvider";
import { useState } from "react";

export default function HomeScreen() {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const player = useGameStore((s) => s.state.progress.player);
  const currentWeek = useGameStore((s) => s.state.progress.currentWeek);
  const nextWeek = useGameStore((s) => s.actions.nextWeek);

  const { years, weeks } = weeksToYears(player.ageInWeeks);

  const [actionDialogOpen, setActionDialogOpen] = useState(false);

  const advanceWeek = useGameStore((s) => s.actions.advanceWeekWithAction);

  return (
    <View style={styles.root}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.pageTitle}>Life Sim</Text>
        <Text style={styles.subtitle}>Week {currentWeek}</Text>

        <CharacterCard
          name={player.name}
          avatar={require("../../assets/images/avatar.png")}
          vitals={{
            health: player.stats.vitals.health,
            energy: player.stats.vitals.energy,
            happiness: player.stats.mind.happiness,
          }}
        />

        <Card title="Age">
          <Text style={styles.value}>
            {years} years, {weeks} weeks
          </Text>
        </Card>

        <Card title="Actions">
          <PillButton
            title="Next week"
            subtitle="Choose what you do this week"
            left={<Text style={{ fontSize: 16 }}>📅</Text>}
            onPress={() => setActionDialogOpen(true)}
          />
        </Card>

        <Dialog
          visible={actionDialogOpen}
          title="What will you do this week?"
          onClose={() => setActionDialogOpen(false)}
        >
          {ACTIONS.map((action) => (
            <PillButton
              key={action.id}
              title={action.label}
              subtitle={action.description}
              left={
                <Text style={{ fontSize: 16 }}>
                  {action.id === "work"
                    ? "💼"
                    : action.id === "rest"
                    ? "🛌"
                    : "🧑‍🤝‍🧑"}
                </Text>
              }
              onPress={() => {
                advanceWeek(action.id);
                setTimeout(() => setActionDialogOpen(false), 150);
              }}
            />
          ))}
        </Dialog>
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
    actionButton: {
      padding: theme.spacing.md,
      borderRadius: theme.radius.card,
      borderWidth: 1,
      borderColor: theme.colors.border,
      backgroundColor: theme.colors.surface,
      marginBottom: theme.spacing.sm,
    },
    actionTitle: {
      color: theme.colors.text,
      fontWeight: "600",
      marginBottom: 2,
    },
    actionDescription: {
      color: theme.colors.textMuted,
      fontSize: 13,
    },
    actionButtonPressed: {
      backgroundColor: theme.colors.border,
      borderColor: theme.colors.primary,
    },
  });
}
