import React, { useState } from "react";
import { TextInput, StyleSheet, TouchableOpacity, View } from "react-native";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons"; // Importer l'icône MaterialIcons depuis @expo/vector-icons

export default function InputTemplates({ placeholder, onChangeText, icon }) {
  const [value, setValue] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleTextChange = (text) => {
    setValue(text);
    if (onChangeText) {
      onChangeText(text);
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <TouchableOpacity>
      <View style={styles.inputContainer}>
        {/* Ajouter l'icône MaterialIcons ou FontAwesome à gauche */}
        {icon === "person" ? (
          <MaterialIcons
            name="person"
            size={24}
            color="white"
            style={styles.icon}
          />
        ) : icon === "lock" ? (
          <MaterialIcons
            name="lock"
            size={24}
            color="white"
            style={styles.icon}
          />
        ) : null}

        {/* Utiliser le TextInput pour la saisie de texte */}
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="white"
          value={value}
          secureTextEntry={icon === "lock" && !isPasswordVisible}
          onChangeText={handleTextChange}
        />

        {/* Ajouter l'icône FontAwesome à droite */}
        {icon === "lock" ? (
          <FontAwesome
            name={isPasswordVisible ? "eye" : "eye-slash"}
            size={24}
            color="white"
            style={styles.eyeIcon}
            onPress={togglePasswordVisibility}
          />
        ) : null}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row", // Disposer les éléments horizontalement
    alignItems: "center", // Centrer les éléments verticalement
    minWidth: "60%",
    height: 40,
    marginBottom: 10,
    borderColor: "white",
    borderWidth: 2,
    borderRadius: 6,
    paddingVertical: 5, // Ajouter un peu de marge verticale
    paddingHorizontal: 10, // Ajouter un peu de marge horizontale
  },
  icon: {
    marginRight: 10, // Marge à droite de l'icône
  },
  eyeIcon: {
    marginRight: 5,
    marginLeft: 10, // Marge à gauche de l'icône "eye"
  },
  input: {
    fontSize: 18,
    flex: 1, // Occuper tout l'espace restant
    color: "white",
  },
});

