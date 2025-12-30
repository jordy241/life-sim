// app/(tabs)/index.tsx
import { router } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { Card } from "@/components/ui/card";
import { CharacterCard } from "@/components/ui/character-card";
import { Dialog } from "@/components/ui/dialog";
import { PillButton } from "@/components/ui/pill-button";
import { weeksToYears } from "@/game/core/time";
import { useGameStore } from "@/game/state/game-store";
import { useTheme, type Theme } from "@/theme/ThemeProvider";

import { BASE_EVENTS } from "@/game/content/events/base-events";
import { getEventById } from "@/game/systems/events-system";
import { getJobRoleById } from "@/game/systems/job-system";

export default function HomeScreen() {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const player = useGameStore((s) => s.state.progress.player);
  const currentWeek = useGameStore((s) => s.state.progress.currentWeek);

  const jobTitle = getJobRoleById(player.jobRoleId)?.title ?? "Unemployed";
  const totalMoney = player.stats.wealth.cash - player.stats.wealth.debt;

  const nextWeek = useGameStore((s) => s.actions.nextWeek);
  const chooseEventOption = useGameStore((s) => s.actions.chooseEventOption);

  const activeEventId = useGameStore(
    (s) => s.state.progress.weekState.activeEventId
  );

  const { years, weeks } = weeksToYears(player.ageInWeeks);

  const [eventDialogOpen, setEventDialogOpen] = useState(false);

  const activeEvent = useMemo(() => {
    if (!activeEventId) return null;
    return getEventById(activeEventId, player, BASE_EVENTS);
  }, [activeEventId, player]);

  // If an event becomes active (e.g. after pressing "Next week"),
  // open the event dialog automatically.
  useEffect(() => {
    if (activeEventId) setEventDialogOpen(true);
    else setEventDialogOpen(false);
  }, [activeEventId]);

  const isOptionDisabled = (option: {
    canPick?: (p: typeof player) => boolean;
  }) => {
    if (!option.canPick) return false;
    return !option.canPick(player);
  };

  return (
    <View style={styles.root}>
      <ScrollView contentContainerStyle={styles.container}>
        <CharacterCard
          name={player.name}
          avatar={require("../../assets/images/avatar.png")}
          vitals={{
            health: player.stats.vitals.health,
            energy: player.stats.vitals.energy,
            happiness: player.stats.mind.happiness,
          }}
          ageInWeeks={player.ageInWeeks}
          jobTitle={jobTitle}
          totalMoney={totalMoney}
        />
        ;
        <Card title="Age">
          <Text style={styles.value}>
            {years} years, {weeks} weeks
          </Text>
          <Text style={styles.success}>{player.stats.wealth.cash}$</Text>
        </Card>
        <PillButton
          title="Next week"
          subtitle="Choose what you do this week"
          left={<Text style={{ fontSize: 16 }}>📅</Text>}
          onPress={() => {
            if (activeEventId) {
              setEventDialogOpen(true);
            } else {
              nextWeek();
            }
          }}
        />
        <PillButton
          title="Jobs"
          subtitle="Browse all available jobs"
          nextArrow
          left={<Text style={{ fontSize: 16 }}>💼</Text>}
          onPress={() => router.push("/(tabs)/jobs")}
        />
        <PillButton
          title="Settings"
          subtitle="Theme, preferences, etc."
          nextArrow
          left={<Text style={{ fontSize: 16 }}>⚙️</Text>}
          onPress={() => router.push("/(tabs)/settings")}
        />
        {/* Event dialog (new) */}
        <Dialog
          visible={eventDialogOpen}
          onClose={() => setEventDialogOpen(false)}
        >
          {!activeEvent ? (
            <Text style={styles.subtitle}>No active event.</Text>
          ) : (
            <>
              {/* ✅ Header inside dialog */}
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 8,
                }}
              >
                <Text style={{ fontSize: 22 }}>{activeEvent.icon ?? "✨"}</Text>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "700",
                    color: theme.colors.text,
                  }}
                >
                  {activeEvent.title}
                </Text>
              </View>

              <Text style={styles.subtitle}>{activeEvent.description}</Text>

              {activeEvent.options.map((opt) => {
                const disabled = isOptionDisabled(opt);

                return (
                  <PillButton
                    key={opt.id}
                    title={opt.label}
                    left={
                      <Text style={{ fontSize: 16 }}>
                        {opt.icon ?? (disabled ? "🔒" : "✨")}
                      </Text>
                    }
                    onPress={() => {
                      if (disabled) return;
                      chooseEventOption(opt.id);
                      // dialog stays open; it will update to next event automatically
                      // and will close automatically when activeEventId becomes null (useEffect)
                    }}
                  />
                );
              })}
            </>
          )}
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
    success: { color: theme.colors.success, fontSize: 16, fontWeight: "600" },
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
