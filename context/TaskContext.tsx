import { createContext, useContext, useEffect, useState } from "react";
import { fetchTasks, createTask, updateTask, deleteTask } from "../lib/api";

const TasksContext = createContext(null);

export function TasksProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  const refresh = async () => {
    setLoading(true);
    const data = await fetchTasks();
    setTasks(data);
    setLoading(false);
  };

  const addTask = async (task) => {
    const created = await createTask(task);
    setTasks((prev) => [...prev, created]);
  };

  const editTask = async (id, data) => {
    const updated = await updateTask(id, data);
    setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
  };

  const removeTask = async (id) => {
    await deleteTask(id);
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  useEffect(() => {
    refresh();
  }, []);

  return (
    <TasksContext.Provider value={{ tasks, loading, refresh, addTask, editTask, removeTask }}>
      {children}
    </TasksContext.Provider>
  );
}

export const useTasks = () => useContext(TasksContext);
