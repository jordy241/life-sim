// components/ui/card.tsx
import { Theme, useTheme } from "@/theme/ThemeProvider";
import React, { ReactNode } from "react";
import { StyleSheet, Text, View, ViewProps } from "react-native";

interface CardProps extends ViewProps {
  title?: string;
  children: ReactNode;
}

export function Card({ title, children, style, ...rest }: CardProps) {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={[styles.card, style]} {...rest}>
      {title ? <Text style={styles.title}>{title}</Text> : null}
      <View style={styles.content}>{children}</View>
    </View>
  );
}

function createStyles(theme: Theme) {
  return StyleSheet.create({
    card: {
      backgroundColor: theme.colors.surface,
      borderRadius: theme.radius.card,
      padding: theme.spacing.md,
      marginBottom: theme.spacing.sm,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    title: {
      fontSize: 16,
      fontWeight: "600",
      color: theme.colors.text,
      marginBottom: theme.spacing.sm,
    },
    content: {},
  });
}
