import { useLocalSearchParams, useRouter } from "expo-router";
import { View, Text, StyleSheet } from "react-native";
import TaskForm from "../../components/TaskForm";
import { useTasks } from "../../context/TaskContext";

export default function EditTask() {
  const params = useLocalSearchParams();
  const id = Number(params.id);
  const { tasks, editTask } = useTasks();
  const router = useRouter();

  const task = tasks.find((t) => t.id === id);

  const handleSubmit = async (data) => {
    await editTask(id, data);
    router.back();
  };

  if (!task)
    return (
      <View style={styles.container}>
        <Text style={{ color: "white" }}>Cargando…</Text>
      </View>
    );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Tarea</Text>
      <TaskForm initial={task} onSubmit={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#0f1724", paddingTop: 48 },
  title: { color: "white", fontSize: 20, marginBottom: 12 },
});
