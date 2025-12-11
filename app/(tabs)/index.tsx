// app/(tabs)/index.tsx
import React, { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { Card } from "@/components/ui/card";
import { CharacterCard } from "@/components/ui/character-card"; // if you’re using it
import type { Player } from "@/game/core/player";
import { weeksToYears } from "@/game/core/time";
import { createPlayer, nextWeek } from "@/game/systems/character-system";

const initialPlayer: Player = createPlayer("Jordy", []); // temp name

export default function HomeScreen() {
  const [player, setPlayer] = useState<Player>(initialPlayer);

  const { years, weeks } = weeksToYears(player.ageInWeeks);

  return (
    <View style={styles.root}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.pageTitle}>Life Sim</Text>
        <Text style={styles.subtitle}>Home</Text>

        <CharacterCard
          name={player.name}
          avatar={require("../../assets/images/avatar.png")}
        />

        <Card title="Age">
          <Text style={styles.value}>
            {years} years, {weeks} weeks
          </Text>
        </Card>

        <Card title="Actions">
          <Pressable
            style={styles.button}
            onPress={() => setPlayer((prev) => nextWeek(prev))}
          >
            <Text style={styles.buttonText}>Next week</Text>
          </Pressable>
        </Card>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#111827",
  },
  container: {
    padding: 16,
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#F9FAFB",
  },
  subtitle: {
    fontSize: 14,
    color: "#9CA3AF",
    marginBottom: 16,
  },
  value: {
    color: "#F9FAFB",
    fontSize: 16,
    fontWeight: "600",
  },
  button: {
    marginTop: 8,
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: "#FACC15",
  },
  buttonText: {
    color: "#111827",
    fontWeight: "600",
  },
});
