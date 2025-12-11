import React from "react";
import { Image, StyleSheet, Text, View, ViewProps } from "react-native";

interface CharacterCardProps extends ViewProps {
  name: string;
  avatar: any; // require("path/to/image.png") or { uri: "..." }
}

export function CharacterCard({
  name,
  avatar,
  style,
  ...rest
}: CharacterCardProps) {
  return (
    <View style={[styles.card, style]} {...rest}>
      <Image source={avatar} style={styles.avatar} />

      <View style={styles.infoContainer}>
        <Text style={styles.name}>{name}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#1F2937",
    borderRadius: 12,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  infoContainer: {
    marginLeft: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
    color: "#F9FAFB",
  },
});
