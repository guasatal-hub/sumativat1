import { useEffect, useState } from "react";
import { View, FlatList, StyleSheet, Text, StatusBar } from "react-native";
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

  const handleToggleComplete = async (task) => {
    const updatedTask = await updateTask(task.id, {
      ...task,
      completed: !task.completed,
    });

    setTasks(tasks.map((t) => (t.id === task.id ? updatedTask : t)));
  };

  const completedTasks = tasks.filter((t) => t.completed).length;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#6366f1" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mis Tareas</Text>
        <View style={styles.statsContainer}>
          <Text style={styles.statsText}>
            {completedTasks} de {tasks.length} completadas
          </Text>
        </View>
      </View>

      {/* Task Form */}
      <View style={styles.formContainer}>
        <TaskForm
          onSubmit={editingTask ? handleEdit : handleCreate}
          initialValue={editingTask}
        />
      </View>

      {/* Tasks List */}
      <View style={styles.listContainer}>
        {tasks.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>📝</Text>
            <Text style={styles.emptyText}>No hay tareas aún</Text>
            <Text style={styles.emptySubtext}>
              Agrega tu primera tarea para comenzar
            </Text>
          </View>
        ) : (
          <FlatList
            data={tasks}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TaskItem
                task={item}
                onEdit={(t) => setEditingTask(t)}
                onDelete={handleDelete}
                onToggleComplete={handleToggleComplete}
              />
            )}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        )}

        {/* LISTA DE TAREAS COMPLETADAS */}
        {completedTasks > 0 && (
          <View style={{ marginTop: 25, marginBottom: 30 }}>
            <Text style={styles.completedTitle}>
              Tareas Completadas ({completedTasks})
            </Text>

            {tasks
              .filter((t) => t.completed)
              .map((t) => (
                <Text key={t.id} style={styles.completedItem}>
                  ✓ {t.title}
                </Text>
              ))}
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  header: {
    backgroundColor: "#6366f1",
    paddingTop: 50,
    paddingBottom: 25,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: "#6366f1",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 8,
  },
  statsContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignSelf: "flex-start",
  },
  statsText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "600",
  },
  formContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  listContent: {
    paddingBottom: 20,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 60,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#334155",
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: "#94a3b8",
    textAlign: "center",
  },
  completedTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#4b5563",
    marginBottom: 8,
  },
  completedItem: {
    fontSize: 15,
    color: "#16a34a",
    marginTop: 4,
  },
});
