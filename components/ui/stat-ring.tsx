import { useTheme, type Theme } from "@/theme/ThemeProvider";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Svg, { Circle } from "react-native-svg";

interface StatRingProps {
  value: number; // 0–100
  size?: number; // diameter
  strokeWidth?: number;
  label?: string;
}

export function StatRing({
  value,
  size = 56, // ⬅ smaller default
  strokeWidth = 6, // ⬅ thinner ring
  label,
}: StatRingProps) {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const clampedValue = Math.max(0, Math.min(100, value));
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = (clampedValue / 100) * circumference;

  const ringColor = getStatColor(clampedValue);

  return (
    <View style={styles.container}>
      <View style={{ width: size, height: size }}>
        <Svg width={size} height={size}>
          {/* Background ring */}
          <Circle
            stroke={theme.colors.border}
            fill="none"
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
          />

          {/* Progress ring */}
          <Circle
            stroke={ringColor}
            fill="none"
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
            strokeDasharray={`${progress} ${circumference}`}
            strokeLinecap="round"
            transform={`scale(-1 1) translate(-${size} 0) rotate(-90 ${
              size / 2
            } ${size / 2})`}
          />
        </Svg>

        {/* Center value */}
        <View style={styles.center}>
          <Text style={styles.value}>{clampedValue}%</Text>
        </View>
      </View>

      {label ? <Text style={styles.label}>{label}</Text> : null}
    </View>
  );
}

function getStatColor(value: number) {
  // Clamp to 0–100
  const v = Math.max(0, Math.min(100, value));

  let r = 0;
  let g = 0;

  if (v < 50) {
    // Red -> Yellow
    r = 255;
    g = Math.round((v / 50) * 255);
  } else {
    // Yellow -> Green
    r = Math.round(255 - ((v - 50) / 50) * 255);
    g = 255;
  }

  return `rgb(${r}, ${g}, 0.80)`;
}

function createStyles(theme: Theme) {
  return StyleSheet.create({
    container: {
      alignItems: "center",
    },
    center: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: "center",
      alignItems: "center",
    },
    value: {
      fontSize: 11, // ⬅ much smaller
      fontWeight: "600",
      color: theme.colors.text,
      opacity: 0.85, // ⬅ quieter
    },
    label: {
      marginTop: 4,
      fontSize: 11,
      color: theme.colors.textMuted,
    },
  });
}
