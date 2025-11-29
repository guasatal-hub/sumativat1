import { useEffect, useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import TaskItem from "../components/TaskItem";
import TaskForm from "../components/TaskForm";

import { fetchTasks, createTask, updateTask, deleteTask } from "../lib/api";

export default function Index() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    const data = await fetchTasks();
    setTasks(data);
  };

  const handleCreate = async (task) => {
    const newTask = await createTask(task);
    setTasks([...tasks, newTask]);
  };

  const handleEdit = async (updated) => {
    if (!editingTask) return;

    const updatedTask = await updateTask(editingTask.id, updated);

    setTasks(tasks.map((t) => (t.id === editingTask.id ? updatedTask : t)));

    setEditingTask(null);
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    setTasks(tasks.filter((t) => t.id !== id));
  };

  return (
    <View style={styles.container}>
      <TaskForm
        onSubmit={editingTask ? handleEdit : handleCreate}
        initialValue={editingTask}
      />

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TaskItem
            task={item}
            onEdit={(t) => setEditingTask(t)}
            onDelete={handleDelete}
          />
        )}
        style={{ width: "100%" }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    paddingTop: 40,
    backgroundColor: "#fff",
  },
});
