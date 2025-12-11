import React, { ReactNode } from "react";
import {
  GestureResponderEvent,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

interface DialogProps {
  visible: boolean;
  title?: string;
  children: ReactNode;
  onClose: (event?: GestureResponderEvent) => void;
}

export function Dialog({ visible, title, children, onClose }: DialogProps) {
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

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)", // dim background
    justifyContent: "center",
    alignItems: "center",
  },
  dialog: {
    width: "85%",
    backgroundColor: "#111827",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#F9FAFB",
    marginBottom: 8,
  },
  content: {
    // space for dialog body
  },
  footer: {
    marginTop: 12,
    alignItems: "flex-end",
  },
  closeButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: "#374151",
  },
  closeText: {
    color: "#E5E7EB",
    fontSize: 13,
    fontWeight: "500",
  },
});
