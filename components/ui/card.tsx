import React, { ReactNode } from "react";
import { StyleSheet, Text, View, ViewProps } from "react-native";

interface CardProps extends ViewProps {
  title?: string;
  children: ReactNode;
}

export function Card({ title, children, style, ...rest }: CardProps) {
  return (
    <View style={[styles.card, style]} {...rest}>
      {title ? <Text style={styles.title}>{title}</Text> : null}
      <View style={styles.content}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#8D8D8DFF",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#E5E7EB",
    marginBottom: 8,
  },
  content: {
    // just space for children
  },
});
