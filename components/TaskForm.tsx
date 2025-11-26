import { useState } from "react";
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";

export default function TaskForm({ initial = {}, onSubmit }) {
  const [title, setTitle] = useState(initial.title ?? "");
  const [description, setDescription] = useState(initial.description ?? "");

  const submit = () => {
    if (title.trim().length < 3)
      return Alert.alert("Error", "El título debe tener mínimo 3 caracteres");

    onSubmit({ title, description });
  };

  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder="Título"
        placeholderTextColor="#9ca3af"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="Descripción"
        placeholderTextColor="#9ca3af"
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <TouchableOpacity style={styles.btn} onPress={submit}>
        <Text style={{ color: "white" }}>Guardar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#0b1220",
    color: "white",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  btn: {
    backgroundColor: "#6366f1",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },
});
