import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import {
  Ionicons,
  FontAwesome,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons"; // Import Ionicons

export default function IconTemplates({ theme, onPress, effect }) {
  return theme === "home" ? (
    <TouchableOpacity onPress={onPress}>
      <Ionicons
        name="home"
        size={36}
        color="white"
        marginBottom={25}
        marginLeft={20}
        marginRight={20}
      />
    </TouchableOpacity>
  ) : theme === "camera" ? (
    <TouchableOpacity
      onPress={onPress} // Pass the onPress function to TouchableOpacity
      style={[styles.buttonContainer_s, styles.bn36]}
    >
      <FontAwesome name={theme} size={36} color="white" />
    </TouchableOpacity>
  ) : theme === "stats-chart" ? (
    <TouchableOpacity onPress={onPress}>
      <Ionicons
        name="stats-chart"
        size={24}
        color={effect ? "deepskyblue" : "white"}
        marginTop={10}
      />
    </TouchableOpacity>
  ) : theme === "toolBar" ? (
    <TouchableOpacity onPress={onPress}>
      <FontAwesome
        name={effect ? "eye-slash" : "eye"}
        size={26}
        color="white"
        marginTop={10}
        marginLeft={15}
      />
    </TouchableOpacity>
  ) : theme === "archive-search" ? (
    <TouchableOpacity onPress={onPress}>
      <MaterialCommunityIcons
        name={effect ? "archive-off" : "archive-search"}
        size={26}
        color="white"
        marginTop={10}
      />
    </TouchableOpacity>
  ) : theme === "center-focus-strong" ? (
    <TouchableOpacity onPress={onPress}>
      <MaterialIcons
        name="center-focus-strong"
        size={24}
        color="white"
        marginTop={10}
        marginRight={15}
      />
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
