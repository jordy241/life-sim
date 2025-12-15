import { Theme, useTheme } from "@/theme/ThemeProvider";
import React from "react";
import { Image, StyleSheet, Text, View, ViewProps } from "react-native";

interface CharacterCardProps extends ViewProps {
  name: string;
  avatar: any; // require(...) or { uri: ... }
}

export function CharacterCard({
  name,
  avatar,
  style,
  ...rest
}: CharacterCardProps) {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={[styles.card, style]} {...rest}>
      <Image source={avatar} style={styles.avatar} />

      <View style={styles.infoContainer}>
        <Text style={styles.name}>{name}</Text>
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
      flexDirection: "row",
      alignItems: "center",
      marginBottom: theme.spacing.md,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    avatar: {
      width: 64,
      height: 64,
      borderRadius: 32,
    },
    infoContainer: {
      marginLeft: theme.spacing.md,
    },
    name: {
      fontSize: 18,
      fontWeight: "600",
      color: theme.colors.text,
    },
  });
}
