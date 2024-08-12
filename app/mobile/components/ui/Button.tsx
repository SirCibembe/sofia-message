import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Button() {
  return (
    <View style={styles.button}>
      <Text className="p-4">Button</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 2.5,
    paddingHorizontal: 5,
    marginEnd: 2,
    marginBottom: 2,
    fontSize: 12,
    fontWeight: "500",
    color: "#333",
    backgroundColor: "#fff",
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 4,
    cursor: "pointer",
  },
});
