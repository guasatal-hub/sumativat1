import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useRouter } from "expo-router";
import { useTasks } from "../context/TaskContext";
import * as Clipboard from "expo-clipboard";

export default function TaskItem({ task, onRefresh }) {
  const { editTask, removeTask } = useTasks();
  const router = useRouter();

  const toggleDone = async () => {
    await editTask(task.id, { done: !task.done });
    onRefresh?.();
  };

  const copyText = async () => {
    await Clipboard.setStringAsync(task.title);
    Alert.alert("Copiado", "Texto copiado al portapapeles");
  };

  const deleteTask = () => {
    Alert.alert("Eliminar", "¿Eliminar tarea?", [
      { text: "Cancelar" },
      {
        text: "Eliminar",
        style: "destructive",
        onPress: async () => {
          await removeTask(task.id);
          onRefresh?.();
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={[styles.bubble, task.done && styles.done]}>
        <Text style={[styles.title, task.done && styles.doneText]}>{task.title}</Text>
        {task.description ? <Text style={styles.desc}>{task.description}</Text> : null}

        <View style={styles.footer}>
          <Text style={styles.time}>
            {task.createdAt
              ? new Date(task.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
              : ""}
          </Text>

          <View style={styles.actions}>
            <TouchableOpacity onPress={toggleDone}><Text>✔️</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => router.push(`/edit/${task.id}`)}><Text>✏️</Text></TouchableOpacity>
            <TouchableOpacity onPress={copyText}><Text>📋</Text></TouchableOpacity>
            <TouchableOpacity onPress={deleteTask}><Text>🗑️</Text></TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 12 },
  bubble: { backgroundColor: "#111827", padding: 14, borderRadius: 12 },
  done: { backgroundColor: "#052e14" },
  title: { color: "white", fontSize: 16, fontWeight: "600" },
  desc: { color: "#9ca3af", marginTop: 6 },
  doneText: { color: "#94a3b8", textDecorationLine: "line-through" },
  footer: { flexDirection: "row", justifyContent: "space-between", marginTop: 10 },
  time: { color: "#9ca3af", fontSize: 12 },
  actions: { flexDirection: "row", gap: 10 },
});
