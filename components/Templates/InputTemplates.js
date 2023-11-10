import React, { useState } from "react";
import { TextInput, StyleSheet } from "react-native";

export default function InputTemplates({ placeholder, onChangeText, tag }) {
  const [value, setValue] = useState("");

  const handleTextChange = (text) => {
    setValue(text);
    if (onChangeText) {
      onChangeText(text);
    }
  };

  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      placeholderTextColor="white" // Couleur blanche
      value={value}
      onChangeText={handleTextChange}
      editable={tag}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    fontSize: 18,
    width: 220,
    height: 40,
    borderColor: "white",
    borderWidth: 2,
    borderRadius: 6,
    padding: 10,
    marginBottom: 10, // Add spacing between input fields
    color: "white",
  },
});
