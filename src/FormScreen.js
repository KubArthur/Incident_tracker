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
import { onValue } from "firebase/database";

const currentDate = new Date();
const year = currentDate.getFullYear();
const month = currentDate.getMonth() + 1; // Les mois commencent à 0 (janvier)
const day = currentDate.getDate();
const hours = currentDate.getHours();
const minutes = currentDate.getMinutes();
const seconds = currentDate.getSeconds();
const code = `${hours}${minutes}${day}${month}${year}${seconds}`;

export default function FormPage({ navigation }) {
  const [pickerValue, setPickerValue] = useState("");
  const [inputValues, setInputValues] = useState("");
  const [location, setLocation] = useState(null);
  const [uniqueTypes, setUniqueTypes] = useState([]);
  const [todoData, setTodoData] = useState([]);

  const handlePickerChange = (text) => {
    setPickerValue((prevValues) => ({
      ...prevValues,
      text,
    }));

    todoData.forEach((item) => {
      Object.values(item).forEach((subItem) => {
        if (subItem.type === pickerValue.text) {
          console.log("Ramsey => " + pickerValue.text);
        }
      });
    });
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

  useEffect(() => {
    const starCountRef = ref(db, "config/");

    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      const todoData = Object.keys(data).map((key) => ({
        id: key,
        ...data[key],
      }));

      const types = todoData.map((item) => {
        return Object.values(item).map((subItem) => {
          if (subItem && subItem.type) {
            return subItem.type;
          }
          return null;
        });
      });

      const flatTypes = types.flat(); // Aplatit le tableau
      const filteredTypes = [...new Set(flatTypes)];
      const uniqueTypes = filteredTypes.filter((type) => type !== null);

      setTodoData(todoData);
      setUniqueTypes(uniqueTypes);
    });
  }, []);

  const addDataOn = () => {
    set(ref(db, "reports/" + "incidents/" + code), {
      type: pickerValue,
      date: `${day}/${month}/${year}`,
      location: location,
      inputValues: inputValues,
    });
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
                  handleTextInputChange(key, text)
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
            options={uniqueTypes} // Utilisez le tableau d'options mis à jour
          />
          <View style={styles.separator} />

          {conditionalInputs}

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
