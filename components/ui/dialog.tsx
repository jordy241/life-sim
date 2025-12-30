import { BlurView } from "expo-blur";
import React, { ReactNode } from "react";
import {
  GestureResponderEvent,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { useTheme, type Theme } from "@/theme/ThemeProvider";

interface DialogProps {
  visible: boolean;
  title?: string;
  children: ReactNode;
  onClose: (event?: GestureResponderEvent) => void;
}

export function Dialog({ visible, title, children, onClose }: DialogProps) {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      {/* Fullscreen backdrop with blur */}
      <View style={styles.backdrop}>
        <BlurView intensity={25} tint="dark" style={StyleSheet.absoluteFill} />

        {/* Optional extra dim layer (helps readability) */}
        <View style={styles.dim} pointerEvents="none" />

        <Pressable style={StyleSheet.absoluteFill} />

        {/* Dialog box */}
        <View style={styles.dialog}>
          {title ? <Text style={styles.title}>{title}</Text> : null}
          <View style={styles.content}>{children}</View>
        </View>
      </View>
    </Modal>
  );
}

function createStyles(theme: Theme) {
  return StyleSheet.create({
    backdrop: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    dim: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: "rgba(0,0,0,0.35)",
    },
    dialog: {
      width: "85%",
      backgroundColor: theme.colors.surface,
      borderRadius: theme.radius.card,
      paddingHorizontal: theme.spacing.md,
      paddingTop: theme.spacing.sm,
      paddingBottom: theme.spacing.sm,
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
