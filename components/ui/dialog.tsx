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
      {/* Dimmed background */}
      <View style={styles.backdrop}>
        {/* Tap outside to close (optional) */}
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />

        {/* Dialog box */}
        <View style={styles.dialog}>
          {title ? <Text style={styles.title}>{title}</Text> : null}

          <View style={styles.content}>{children}</View>

          <View style={styles.footer}>
            <Pressable style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

function createStyles(theme: Theme) {
  return StyleSheet.create({
    backdrop: {
      flex: 1,
      // This is intentionally not theme-based (it's an overlay),
      // but you *can* add a token later if you want.
      backgroundColor: "rgba(0,0,0,0.6)",
      justifyContent: "center",
      alignItems: "center",
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
    footer: {
      marginTop: theme.spacing.sm,
      alignItems: "flex-end",
    },
    closeButton: {
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.sm,
      borderRadius: theme.radius.pill,
      backgroundColor: theme.colors.primary,
    },
    closeText: {
      color: theme.colors.primaryText,
      fontSize: 13,
      fontWeight: "600",
    },
  });
}
