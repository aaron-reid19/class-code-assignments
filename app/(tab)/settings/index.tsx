import * as storage from "@/lib/storage";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Pressable, StyleSheet, Switch, Text, View } from "react-native";
import AppCard from "../../../components/AppCard";
import { theme } from "../../../styles/theme";

export default function Settings() {
  const [notifications, setNotifications] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [ darkMode, setDarkMode] = useState(false);


  // load saved notification preference on mount
  const loadNotification = async () => {
    // try to load saved value from storage, if it exists
    const saved = await storage.get<boolean>(storage.STORAGE_KEY.NOTIFICATIONS)
    if (saved!= null){
      //if we have a saved value use it to set the state
      setNotifications(saved)

    }
    setIsLoading(false) // turning off the spinner
  }

  const loadSettings = async () => {
    const savedNotifications = await storage.get<boolean>(storage.STORAGE_KEY.NOTIFICATIONS);
    if (savedNotifications != null ){
      setNotifications(savedNotifications);
    }
    const savedTheme = await storage.get<boolean>(storage.STORAGE_KEY.THEME);
      if (savedTheme != null){
        setDarkMode(savedTheme);
    }
    setIsLoading(false)
  }


  useEffect(() => {
    // define assync function to load the value sincne use effect cant be async
    
    loadNotification();
    loadSettings()
  }, []);

  const handleToggle = async (value: boolean) =>{
    setNotifications(value);
    await storage.set(storage.STORAGE_KEY.NOTIFICATIONS, value);
  };

  const handleDarkModeToggle = async (value: boolean) => {
    setDarkMode(value);
    await storage.set(storage.STORAGE_KEY.THEME, value);
  };

  if (isLoading){
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.h1}>Settings</Text>

      <AppCard
        title="Notifications"
        subtitle="Enable app notifications"
        right={
          <Switch value={notifications} onValueChange={handleToggle} />
        }
      />
      <AppCard 
      title="Dark Mode"
      subtitle="Use dark theme"
      right={<Switch value={darkMode} onValueChange={handleDarkModeToggle} />}
      />
    <Text>Stored: {String(darkMode)}</Text>
    <Pressable onPress={() => router.push("/(tab)/settings/profile")}>
    <AppCard
        title="Account"
        subtitle="Update profile settings"
        right={
          <Ionicons
            name="chevron-forward"
            size={24}
            color={theme.colors.primary}
          />
        }
      />
    </Pressable>
      
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
