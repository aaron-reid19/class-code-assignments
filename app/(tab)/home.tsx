import * as api from "@/lib/api";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from "react-native";
import AppCard from "../../components/AppCard";
import { theme } from "../../styles/theme";

export default function Home() {

const [data, setData] = useState<api.DashboardData | null >(null);
const [isLoading, setIsLoading] = useState(true)
const [ error, setError ] = useState<string | null>(null)
async function loadDashboard() {
  try{
    setError(null)
    setIsLoading(true)
    const result = await api.getDashboardData()
    setData(result)

  }
  catch (error){
    setError(error instanceof Error ? error.message : "Something Went wrong, please try again")
  }
  finally{
    setIsLoading(false);
  }
}

useEffect(() => {
  loadDashboard();
}, [])

if (isLoading) {
  return (
    <View style={styles.centered}>
      <ActivityIndicator size={"large"} color={theme.colors.primary}/>

    </View>
  )
}

if (error){
  return (
    <View style={styles.centered}>
      <Ionicons 
      name="cloud-offline-outline"
      size={48}
      color={theme.colors.muted}
      />
      <Text style={styles.errorText}>{error}</Text>
      <Pressable style={styles.retryButton} onPress={loadDashboard}>
        <Text style={styles.retryText}> Try Again</Text>
      </Pressable>
    </View>
  )
}

  return (
    <View style={styles.container}>
      <Text style={styles.h1}>Campus Hub</Text>
      <Text style={styles.p}>{data?.greeting} - Quick overview for today</Text>

      <AppCard
        title="Upcoming Deadline"
        subtitle={` ${data?.nextDeadline.course} ${data?.nextDeadline.title} - due ${data?.nextDeadline.dueDate}`}
        right={
          <Ionicons
            name="alert-circle-outline"
            size={22}
            color={theme.colors.primary}
          />
        }
      />

      <AppCard
        title="Attendance"
        subtitle={`${data?.attendance.attended}/ ${data?.attendance.total} classes ${data?.attendance.percentage}`}
        right={
          <Ionicons
            name="checkmark-circle-outline"
            size={22}
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
  centered:{
    flex:1,
    padding: theme.spacing.screen,
    justifyContent: "center",
    alignItems: "center"
  },
  h1: { fontSize: 28, fontWeight: "800", color: theme.colors.text },
  p: { marginTop: 6, marginBottom: 16, color: theme.colors.muted },
  errorText:{
    marginTop: 12,
    fontSize: 16,
    color: theme.colors.muted,
    textAlign: "center",
  },
  retryButton:{
    marginTop: 12,
    paddingVertical:12,
    paddingHorizontal: 24,
    borderRadius: theme.radius.input,
    backgroundColor: theme.colors.primary
  },
  retryText:{
    color: "#ffff"
  }
});
