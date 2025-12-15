import { useTheme, type Theme } from "@/theme/ThemeProvider";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";

export default function TabLayout() {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textMuted,
        headerStyle: {
          backgroundColor: theme.colors.chrome,
        },
        headerShadowVisible: false,
        headerTintColor: theme.colors.text,
        tabBarStyle: {
          backgroundColor: theme.colors.chrome,
          borderTopColor: theme.colors.border,
          borderTopWidth: 1,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "home-sharp" : "home-outline"}
              color={color}
              size={24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "settings" : "settings-outline"}
              color={color}
              size={24}
            />
          ),
        }}
      />
    </Tabs>
  );
}

function createStyles(theme: Theme) {
  // currently not used, but handy if you later want custom tab/header content
  return {};
}
