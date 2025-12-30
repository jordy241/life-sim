import { Theme, useTheme } from "@/theme/ThemeProvider";
import React from "react";
import { Image, StyleSheet, Text, View, ViewProps } from "react-native";

import { StatRing } from "@/components/ui/stat-ring";
import { weeksToYears } from "@/game/core/time";

interface CharacterCardProps extends ViewProps {
  name: string;
  avatar: any;

  jobTitle: string;
  totalMoney: number;
  ageInWeeks: number;

  vitals: {
    health: number;
    energy: number;
    happiness: number;
  };
}

const EUR = new Intl.NumberFormat("nl-BE", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

export function CharacterCard({
  name,
  avatar,
  jobTitle,
  totalMoney,
  ageInWeeks,
  vitals,
  style,
  ...rest
}: CharacterCardProps) {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const { years } = weeksToYears(ageInWeeks);

  return (
    <View style={[styles.card, style]} {...rest}>
      <Image source={avatar} style={styles.avatar} />

      <Text style={styles.name}>{name}</Text>

      <Text style={styles.meta}>
        {jobTitle} - {EUR.format(totalMoney)} - {years} years old
      </Text>

      <View style={styles.vitalsRow}>
        <StatRing value={vitals.health} label="Health" size={72} />
        <StatRing value={vitals.energy} label="Energy" size={72} />
        <StatRing value={vitals.happiness} label="Happiness" size={72} />
      </View>
    </View>
  );
}

function createStyles(theme: Theme) {
  return StyleSheet.create({
    card: {
      backgroundColor: theme.colors.surface,
      borderRadius: theme.radius.card,
      padding: theme.spacing.md,
      marginBottom: theme.spacing.md,
      borderWidth: 1,
      borderColor: theme.colors.border,
      alignItems: "center",
    },
    avatar: {
      width: 56,
      height: 56,
      borderRadius: 28,
      marginBottom: theme.spacing.sm,
    },
    name: {
      fontSize: 18,
      fontWeight: "600",
      color: theme.colors.text,
      marginBottom: 2,
    },
    meta: {
      fontSize: 13,
      color: (theme.colors as any).textMuted ?? theme.colors.text,
      marginBottom: theme.spacing.sm,
    },
    vitalsRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      width: "100%",
      marginTop: theme.spacing.sm,
    },
  });
}
