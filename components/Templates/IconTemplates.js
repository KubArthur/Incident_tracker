import React from "react";
import { Ionicons } from "@expo/vector-icons"; // Import Ionicons

export default function IconTemplates({ theme, onPress }) {
  return theme === "home" ? (
    <Ionicons
      name="home"
      size={36}
      color="white"
      onPress={onPress}
      marginBottom={30}
    />
  ) : theme === "flash" ? (
    <Ionicons
      name="flash"
      size={36}
      color="white"
      onPress={onPress}
      marginBottom={30}
    />
  ) : null;
}
