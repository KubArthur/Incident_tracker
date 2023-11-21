import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons"; // Import Ionicons

export default function IconTemplates({ theme, onPress }) {
  return theme === "home" ? (
    <TouchableOpacity>
      <Ionicons
        name="home"
        size={36}
        color="white"
        onPress={onPress}
        marginBottom={30}
      />
    </TouchableOpacity>
  ) : theme === "camera" || theme === "car" || theme === "water" || theme === "network"? (
    <TouchableOpacity
      onPress={onPress} // Pass the onPress function to TouchableOpacity
      style={[styles.buttonContainer_s, styles.bn36]}
    >
      <FontAwesome name={theme} size={36} color="white" />
    </TouchableOpacity>
  ) : null;
}

const styles = StyleSheet.create({
  buttonContainer_s: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    padding: 8,
    borderRadius: 10,
    width: 60,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
  },
  bn36: {
    borderWidth: 2,
    borderColor: "white",
  },
});
