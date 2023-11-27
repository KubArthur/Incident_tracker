import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import {
  FontAwesome,
  MaterialIcons,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

export default function ButtonTemplates({ label, theme, onPress, icon }) {
  const isDisabled = "true"; // Convertir en booléen

  return theme === "primary" ? (
    <TouchableOpacity
      onPress={onPress} // Pass the onPress function to TouchableOpacity
      style={[styles.buttonContainer_b, styles.bn36]}
    >
      <Text style={styles.label_b}>{label}</Text>
    </TouchableOpacity>
  ) : theme === "secondary" ? (
    <TouchableOpacity
      onPress={onPress} // Pass the onPress function to TouchableOpacity
      style={[styles.buttonContainer_m, styles.bn36]}
    >
      <Text style={styles.label_m}>{label}</Text>
    </TouchableOpacity>
  ) : theme === "secondary_small" ? (
    <TouchableOpacity
      onPress={onPress} // Pass the onPress function to TouchableOpacity
      style={[styles.buttonContainer_s, styles.bn36]}
    >
      <Text style={styles.label_m}>{label}</Text>
    </TouchableOpacity>
  ) : theme === "secondary_addPhoto" ? (
    <TouchableOpacity
      onPress={onPress} // Pass the onPress function to TouchableOpacity
      style={[styles.buttonContainer_m, styles.bn36]}
    >
      <MaterialIcons
        name="add-a-photo"
        size={18}
        color="white"
        style={styles.buttonIcon}
      />
      <Text style={styles.label_m}>{label}</Text>
    </TouchableOpacity>
  ) : theme === "secondary_send" ? (
    <TouchableOpacity
      onPress={onPress} // Pass the onPress function to TouchableOpacity
      style={[styles.buttonContainer_m, styles.bn36]}
    >
      <FontAwesome
        name="send"
        size={18}
        color="white"
        style={styles.buttonIcon}
      />
      <Text style={styles.label_m}>{label}</Text>
    </TouchableOpacity>
  ) : theme === "secondary_flash" ? (
    <TouchableOpacity
      onPress={onPress} // Pass the onPress function to TouchableOpacity
      style={[styles.buttonContainer_s, styles.bn36]}
    >
      <Ionicons
        name="flash"
        size={18}
        color="white"
        style={styles.buttonIcon}
      />
      <Text style={styles.label_m}>{label}</Text>
    </TouchableOpacity>
  ) : theme === "secondary_cameraRetake" ? (
    <TouchableOpacity
      onPress={onPress} // Pass the onPress function to TouchableOpacity
      style={[styles.buttonContainer_m, styles.bn36]}
    >
      <MaterialCommunityIcons
        name="camera-retake"
        size={18}
        color="white"
        style={styles.buttonIcon}
      />
      <Text style={styles.label_m}>{label}</Text>
    </TouchableOpacity>
  ) : theme === "secondary_archive" ? (
    <TouchableOpacity
      onPress={onPress} // Pass the onPress function to TouchableOpacity
      style={[styles.buttonContainer_s, styles.bn36]}
    >
      <FontAwesome name="archive" size={18} color="white" />
      <Text style={styles.label_m}>{label}</Text>
    </TouchableOpacity>
  ) : theme === "secondary_picture" ? (
    <TouchableOpacity
      onPress={onPress} // Pass the onPress function to TouchableOpacity
      style={[styles.buttonContainer_s, styles.bn36]}
    >
      <FontAwesome name="picture-o" size={18} color="white" />
      <Text style={styles.label_m}>{label}</Text>
    </TouchableOpacity>
  ) : null;
}

const styles = StyleSheet.create({
  buttonContainer_b: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    margin: 8,
    borderRadius: 6,
    width: 220,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
  },
  buttonContainer_m: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    padding: 8,
    borderRadius: 6,
    width: 220,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
  },
  buttonContainer_s: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    borderRadius: 6,
    width: 100,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
  },
  bn36: {
    borderWidth: 2,
    borderColor: "white",
  },
  label_b: {
    fontWeight: "400",
    fontSize: 18,
    textAlign: "center",
    textDecorationLine: "none",
    color: "white",
  },
  label_m: {
    fontWeight: "400",
    fontSize: 18,
    textAlign: "center",
    textDecorationLine: "none",
    color: "white",
  },
  buttonIcon: {
    paddingRight: 8,
  },
});
