import React, { useState } from "react";
import { View, TextInput, StyleSheet, ImageBackground } from "react-native";
import Icon from "../Templates/IconTemplates";
import Dropdown from "../Templates/DropdownTemplates";
import Input from "../Templates/InputTemplates";
import Button from "../Templates/ButtonTemplates";

export default function FormPage({ navigation }) {
  return (
    <ImageBackground
      source={require("../../assets/map_hulluch.jpg")} // Provide the path to your local image
      style={styles.container}
    >
      <View style={styles.overlay}>
        <View style={styles.interface}>
          <Icon theme="home" onPress={() => navigation.navigate("Home")} />
          <Dropdown theme="form" />
          <View style={styles.separator} />
          <Input placeholder="Donnée complémentaire..." />
          <View style={styles.separator} />
          <View style={styles.fixToText}>
            <Button theme="second" disabled="true" onPress={""} label="Envoyer" />
            <Button theme="second" onPress={() => navigation.navigate("Home")} label="Annuler" />
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 15, 0.8)", // Adjust opacity as needed
  },
  interface: {
    margin: 179,
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
  },
  separator: {
    borderBottomWidth: 1, // Épaisseur du trait
    borderBottomColor: "white", // Couleur du trait (ici, blanche)
    width: 220, // Largeur du trait (ajustez selon vos besoins)
    marginBottom: 20, // Espacement entre les `<TextInput />` et le trait
    marginTop: 10,
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
