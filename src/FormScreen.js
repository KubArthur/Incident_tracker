import React, { useState, useEffect } from "react";
import { View, StyleSheet, ImageBackground } from "react-native";
import Icon from "../components/templates/IconTemplates";
import Dropdown from "../components/templates/DropdownTemplates";
import Input from "../components/templates/InputTemplates";
import Button from "../components/templates/ButtonTemplates";
import { db } from "../config";
import { ref, set } from "firebase/database";
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
} from "expo-location";

export default function FormPage({ navigation }) {
  const [pickerValue, setPickerValue] = useState("");
  const [inputValues, setInputValues] = useState("");
  const [location, setLocation] = useState(null);

  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1; // Les mois commencent à 0 (janvier)
  const day = currentDate.getDate();
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();

  const code = `${hours}${minutes}${day}${month}${year}`;

  const handlePickerChange = (text) => {
    setPickerValue((prevValues) => ({
      ...prevValues,
      text,
    }));
  };

  const handleTextInputChange = (key, value) => {
    setInputValues((prevValues) => ({
      ...prevValues,
      [key]: value,
    }));
  };

  useEffect(() => {
    (async () => {
      const { status } = await requestForegroundPermissionsAsync();

      if (status !== "granted") {
        navigation.navigate("Home");
        return;
      }

      const location = await getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  const addDataOn = () => {
    set(ref(db, "posts/" + "incidents/" + code), {
      type: pickerValue,
      date: `${day}/${month}/${year}`,
      location: location,
      inputValues: inputValues,
    });
  };

  return (
    <ImageBackground
      source={require("../assets/map_hulluch.jpg")} // Provide the path to your local image
      style={styles.container}
    >
      <View style={styles.overlay}>
        <View style={styles.interface}>
          <Icon theme="home" onPress={() => navigation.navigate("Home")} />
          <Dropdown
            theme="incidentDropdown"
            onChangePicker={(value) => handlePickerChange(value)}
          />
          <View style={styles.separator} />
          <Input
            placeholder="Input 1"
            onChangeText={(text) => handleTextInputChange("a", text)}
          />
          <Input
            placeholder="Input 2"
            onChangeText={(text) => handleTextInputChange("b", text)}
          />
          <View style={styles.separator} />
          <View style={styles.fixToText}>
            <Button theme="second" onPress={addDataOn} label="Envoyer" />
            <Button
              theme="second"
              onPress={() => navigation.navigate("Home")}
              label="Annuler"
            />
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
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
