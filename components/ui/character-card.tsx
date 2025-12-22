import { Theme, useTheme } from "@/theme/ThemeProvider";
import React from "react";
import { Image, StyleSheet, Text, View, ViewProps } from "react-native";

import { StatRing } from "@/components/ui/stat-ring";

interface CharacterCardProps extends ViewProps {
  name: string;
  avatar: any;

  vitals: {
    health: number;
    energy: number;
    happiness: number;
  };
}

export function CharacterCard({
  name,
  avatar,
  vitals,
  style,
  ...rest
}: CharacterCardProps) {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={[styles.card, style]} {...rest}>
      {/* Avatar */}
      <Image source={avatar} style={styles.avatar} />

      {/* Name */}
      <Text style={styles.name}>{name}</Text>

      {/* Vital stats */}
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
