import { View, Text, StyleSheet } from "react-native";
import TaskForm from "../components/TaskForm";
import { useTasks } from "../context/TaskContext";
import { useRouter } from "expo-router";

export default function NewTask() {
  const { addTask } = useTasks();
  const router = useRouter();

  const handleSubmit = async (data) => {
    await addTask({ ...data, done: false });
    router.back();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nueva Tarea</Text>
      <TaskForm onSubmit={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#0f1724", paddingTop: 48 },
  title: { color: "white", fontSize: 20, marginBottom: 12 },
});
