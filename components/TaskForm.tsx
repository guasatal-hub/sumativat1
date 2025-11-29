import { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, Button } from "react-native";

export default function TaskForm({ onSubmit, initialValue }) {
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (initialValue) setTitle(initialValue.title);
  }, [initialValue]);

  const handleSubmit = () => {
    if (!title.trim()) return;
    onSubmit({ title });
    setTitle("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Título de la tarea:</Text>

      <TextInput
        style={styles.input}
        placeholder="Escribe una tarea..."
        value={title}
        onChangeText={(text) => setTitle(text)}
      />

      <Button title={initialValue ? "Guardar cambios" : "Crear tarea"} onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: "#fff",
    width: "100%",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
  },
  input: {
    marginVertical: 12,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    fontSize: 16,
  },
});
