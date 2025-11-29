import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";

export default function TaskItem({ task, onEdit, onDelete }) {
  return (
    <View style={styles.item}>
      <Text style={styles.title}>{task.title}</Text>

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
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 17,
    fontWeight: "500",
  },
  actions: {
    flexDirection: "row",
    gap: 15,
  },
});
