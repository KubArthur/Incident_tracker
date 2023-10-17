import React, { useState } from "react";
import { View, TextInput, StyleSheet, ImageBackground } from "react-native";
export default function InputTemplates({ placeholder }) {
  const [text1, setText1] = useState("");

  const handleTextChange1 = (text) => {
    setText1(text);
  };

  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      placeholderTextColor="white" // Couleur blanche
      value={text1}
      onChangeText={handleTextChange1}
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
