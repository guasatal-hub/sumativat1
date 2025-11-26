const API = "http://10.0.2.2:3000/tasks";

export const fetchTasks = async () => {
  const res = await fetch(API);
  return res.json();
};

export const createTask = async (task) => {
  const res = await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...task, createdAt: new Date().toISOString() }),
  });
  return res.json();
};

export const updateTask = async (id, data) => {
  const res = await fetch(`${API}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const deleteTask = async (id) => {
  await fetch(`${API}/${id}`, { method: "DELETE" });
};
