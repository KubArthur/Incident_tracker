import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

export default function ButtonTemplates({ label, theme, onPress, disabled }) {
  return theme === "main" ? (
    <TouchableOpacity
      onPress={onPress} // Pass the onPress function to TouchableOpacity
      style={[styles.buttonMainContainer, styles.bn36]}
    >
      <Text style={styles.buttonMainText}>{label}</Text>
    </TouchableOpacity>
  ) : theme === "second" && disabled === "true" ? (
    <TouchableOpacity
      disabled
      onPress={onPress} // Pass the onPress function to TouchableOpacity
      style={[styles.buttonSecondContainer, styles.bn36]}
    >
      <Text style={styles.buttonSecondText}>{label}</Text>
    </TouchableOpacity>
  ) : theme === "second" ? (
    <TouchableOpacity
      onPress={onPress} // Pass the onPress function to TouchableOpacity
      style={[styles.buttonSecondContainer, styles.bn36]}
    >
      <Text style={styles.buttonSecondText}>{label}</Text>
    </TouchableOpacity>
  ) : null;
}

const styles = StyleSheet.create({
  buttonMainContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    margin: 8,
    borderRadius: 6,
    width: 220,
  },
  buttonSecondContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 6,
    width: 100,
  },
  bn36: {
    borderColor: "white",
    borderWidth: 2,
  },
  buttonMainText: {
    fontWeight: "400",
    fontSize: 18,
    textAlign: "center",
    textDecorationLine: "none",
    color: "white",
  },
  buttonSecondText: {
    fontWeight: "400",
    fontSize: 18,
    textAlign: "center",
    textDecorationLine: "none",
    color: "white",
  },
});
