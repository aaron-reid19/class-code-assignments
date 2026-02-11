import React, { useState } from "react";
import { StyleSheet, Switch, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AppCard from "../../components/AppCard";
import { theme } from "../../styles/theme";

export default function Settings() {
  const [notifications, setNotifications] = useState(true);

  return (
    <View style={styles.container}>
      <Text style={styles.h1}>Settings</Text>

      <AppCard
        title="Notifications"
        subtitle="Enable app notifications"
        right={
          <Switch value={notifications} onValueChange={setNotifications} />
        }
      />

      <AppCard
        title="Account"
        subtitle="Update profile settings"
        right={
          <Ionicons
            name="person-circle-outline"
            size={24}
            color={theme.colors.primary}
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.spacing.screen,
    backgroundColor: theme.colors.bg,
  },
  h1: {
    fontSize: 22,
    fontWeight: "800",
    marginBottom: 12,
    color: theme.colors.text,
  },
});
