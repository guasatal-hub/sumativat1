import React from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { useTasks } from "../context/TaskContext";
import TaskItem from "../components/TaskItem";

export default function HomeScreen() {
  const { tasks, loading, refresh } = useTasks();
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mis Tareas</Text>
        <TouchableOpacity style={styles.addBtn} onPress={() => router.push("/new")}>
          <Text style={{ color: "white", fontSize: 22 }}>+</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#fff" />
      ) : (
        <FlatList
          data={tasks}
          keyExtractor={(i) => String(i.id)}
          renderItem={({ item }) => <TaskItem task={item} onRefresh={refresh} />}
          contentContainerStyle={{ padding: 16 }}
          refreshing={loading}
          onRefresh={refresh}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0f1724" },
  header: {
    paddingTop: 48,
    paddingBottom: 16,
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#0b1220",
  },
  title: { color: "#fff", fontSize: 22, fontWeight: "bold" },
  addBtn: {
    backgroundColor: "#6366f1",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
