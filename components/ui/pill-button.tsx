import { useTheme, type Theme } from "@/theme/ThemeProvider";
import React, { ReactNode } from "react";
import { Pressable, StyleSheet, Text, View, ViewStyle } from "react-native";

interface PillButtonProps {
  title: string;
  subtitle?: string;
  left?: ReactNode;
  right?: ReactNode;
  onPress: () => void;
  disabled?: boolean;
  style?: ViewStyle;
}

export function PillButton({
  title,
  subtitle,
  left,
  right,
  onPress,
  disabled,
  style,
}: PillButtonProps) {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.root,
        pressed && !disabled ? styles.pressed : null,
        disabled ? styles.disabled : null,
        style,
      ]}
    >
      <View style={styles.inner}>
        {left ? <View style={styles.left}>{left}</View> : null}

        <View style={styles.text}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>

          {subtitle ? (
            <Text style={styles.subtitle} numberOfLines={2}>
              {subtitle}
            </Text>
          ) : null}
        </View>

        {right ? <View style={styles.right}>{right}</View> : null}
      </View>
    </Pressable>
  );
}

function createStyles(theme: Theme) {
  return StyleSheet.create({
    root: {
      width: "100%",
      backgroundColor: theme.colors.surface,
      borderRadius: theme.radius.pill,
      borderWidth: 1,
      borderColor: theme.colors.border,
      paddingVertical: theme.spacing.md,
      paddingHorizontal: theme.spacing.md,
      marginBottom: theme.spacing.sm,
    },
    pressed: {
      transform: [{ scale: 0.99 }],
      borderColor: theme.colors.border,
      backgroundColor: theme.colors.border,
    },
    disabled: {
      opacity: 0.5,
    },
    inner: {
      flexDirection: "row",
      alignItems: "center",
      gap: theme.spacing.sm,
    },
    left: {
      width: 34,
      alignItems: "center",
      justifyContent: "center",
    },
    text: {
      flex: 1,
    },
    title: {
      color: theme.colors.text,
      fontSize: 15,
      fontWeight: "600",
    },
    subtitle: {
      marginTop: 2,
      color: theme.colors.textMuted,
      fontSize: 12,
    },
    right: {
      minWidth: 34,
      alignItems: "center",
      justifyContent: "center",
    },
  });
}
