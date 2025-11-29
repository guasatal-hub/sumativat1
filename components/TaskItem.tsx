import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { AntDesign, MaterialIcons, Feather } from "@expo/vector-icons";

export default function TaskItem({ task, onEdit, onDelete, onToggleComplete }) {
  return (
    <View style={[styles.item, task.completed && styles.completedItem]}>
      
      {/* Botón de completar */}
      <TouchableOpacity onPress={() => onToggleComplete(task)}>
        <Feather
          name={task.completed ? "check-circle" : "circle"}
          size={28}
          color={task.completed ? "green" : "#94a3b8"}
        />
      </TouchableOpacity>

      {/* Título */}
      <Text style={[styles.title, task.completed && styles.completedText]}>
        {task.title}
      </Text>

      {/* Acciones */}
      <View style={styles.actions}>
        <TouchableOpacity onPress={() => onEdit(task)}>
          <AntDesign name="edit" size={24} color="blue" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => onDelete(task.id)}>
          <MaterialIcons name="delete" size={26} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#f4f4f4",
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  completedItem: {
    backgroundColor: "#d1fae5",
  },
  title: {
    flex: 1,
    fontSize: 17,
    fontWeight: "500",
  },
  completedText: {
    textDecorationLine: "line-through",
    color: "gray",
  },
  actions: {
    flexDirection: "row",
    gap: 15,
  },
});
