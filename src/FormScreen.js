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
import { format, addSeconds } from "date-fns";
import useConfigTypes from "../components/db/ConfigTypes";

export default function FormPage({ navigation }) {
  const [pickerValue, setPickerValue] = useState("");
  const [inputValues, setInputValues] = useState("");
  const [location, setLocation] = useState(null);
  const [bascule, setBascule] = useState(0);

  const code = format(new Date(), "HHmmddMMyyyyss");
  const date = format(new Date(), "dd/MM/yyyy");

  const { typeData, todoData } = useConfigTypes();

  const handlePickerChange = (text) => {
    setPickerValue((prevValues) => ({
      ...prevValues,
      text,
    }));
    const bascule = 1;
    setBascule(bascule);
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

      let location = await getCurrentPositionAsync({});
      location = location.coords.latitude + ";" + location.coords.longitude;
      setLocation(location);
    })();
  }, []);

  const addDataOn = () => {
    set(ref(db, "reports/" + code), {
      type: pickerValue.text,
      date: date,
      location: location,
      inputValues: inputValues,
      read: "false",
    });
    navigation.navigate("Home");
  };

  let conditionalInputs = [];

  todoData.forEach((item) => {
    Object.values(item).forEach((subItem) => {
      if (subItem.type === pickerValue.text) {
        const dataString = subItem.data;
        if (dataString) {
          // Vérifier si dataString est défini
          const parts = dataString.split(";");
          parts.forEach((part, index) => {
            const placeholder = part.trim();
            conditionalInputs.push(
              <Input
                key={placeholder}
                placeholder={placeholder}
                onChangeText={(text) =>
                  handleTextInputChange(placeholder, text)
                }
              />
            );
          });
        }
      }
    });
  });

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
            options={typeData} // Utilisez le tableau d'options mis à jour
          />
          <View style={styles.separator} />
          {pickerValue.text === null || bascule === 0 ? (
            <Input
              key="default"
              placeholder="Choisir type"
              onChangeText={(text) => handleTextInputChange("default", text)}
              tag={true}
            />
          ) : (
            conditionalInputs
          )}

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
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 15, 0.8)",
  },
  interface: {
    flex: 1,
    marginBottom: 60,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  separator: {
    marginTop: 10,
    marginBottom: 20,
    width: 220,
    borderBottomWidth: 1,
    borderBottomColor: "white",
  },
  fixToText: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
