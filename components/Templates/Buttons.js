import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import {
  FontAwesome,
  MaterialIcons,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

export default function ButtonTemplates({ label, theme, onPress, effect }) {
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
      style={[styles.buttonContainer_m, styles.bn37]}
    >
      <MaterialIcons
        name="add-a-photo"
        size={18}
        color="white"
        style={styles.buttonIcon}
      />
      <Text style={styles.label_m}>{label}</Text>
    </TouchableOpacity>
  ) : theme === "camera" ? (
    <TouchableOpacity
      onPress={onPress} // Pass the onPress function to TouchableOpacity
      style={[styles.buttonContainer_m, styles.bn36]}
    >
      <FontAwesome
        name={theme}
        size={18}
        color="white"
        style={styles.buttonIcon}
      />
      <Text style={styles.label_m}>{label}</Text>
    </TouchableOpacity>
  ) : theme === "secondary_send" ? (
    <TouchableOpacity
      onPress={onPress} // Pass the onPress function to TouchableOpacity
      style={[styles.buttonContainer_m, styles.bn37]}
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
        name={effect ? "flash" : "flash-off"}
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
  ) : theme === "secondary_popup" ? (
    <TouchableOpacity
      onPress={onPress} // Pass the onPress function to TouchableOpacity
    >
      <Text style={styles.label_popup}>{label}</Text>
    </TouchableOpacity>
  ) : theme === "secondary_alternative" ? (
    <TouchableOpacity
      onPress={onPress} // Pass the onPress function to TouchableOpacity
    >
      <Text style={styles.label_alternative}>{label}</Text>
    </TouchableOpacity>
  ) : null;
}

const styles = StyleSheet.create({
  buttonContainer_b: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    margin: 8,
    borderRadius: 6,
    minWidth: "60%",
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
    minWidth: "60%",
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
  bn37: {
    borderWidth: 3,
    borderColor: "#2baf9a",
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
  label_popup: {
    fontWeight: "600",
    fontSize: 14,
    color: "lightblue",
    marginBottom: 19,
  },
  label_alternative: {
    fontWeight: "600",
    fontSize: 16,
    color: "lightblue",
    marginTop: 10,
    marginBottom:5,
  },
  buttonIcon: {
    paddingRight: 8,
  },
});
