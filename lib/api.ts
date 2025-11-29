const API = "https://3000-firebase-sumativat1-1764010381887.cluster-udxxdyopu5c7cwhhtg6mmadhvs.cloudworkstations.dev/tasks";

export const fetchTasks = async () => {
  const res = await fetch(API);
  if (!res.ok) throw new Error("Error al obtener tareas");
  return res.json();
};

export const createTask = async (task) => {
  const res = await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...task, createdAt: new Date().toISOString() }),
  });

  if (!res.ok) throw new Error("Error al crear tarea");
  return res.json();
};

export const updateTask = async (id, data) => {
  const res = await fetch(`${API}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Error al actualizar tarea");
  return res.json();
};

export const deleteTask = async (id) => {
  const res = await fetch(`${API}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Error al eliminar tarea");
};
