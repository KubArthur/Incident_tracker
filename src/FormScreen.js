import React, { useState, useEffect } from "react";
import { View, StyleSheet, ImageBackground } from "react-native";
import Icon from "../components/templates/IconTemplates";
import Dropdown from "../components/templates/DropdownTemplates";
import Input from "../components/templates/InputTemplates";
import Button from "../components/templates/ButtonTemplates";
import { getCurrentPositionAsync } from "expo-location";
import { format } from "date-fns";
import useConfigTypes from "../components/db/GetConfigTypes";
import FadeInView from "../components/effects/Fade";
import { sendDataToFirebase } from "../components/db/SendDataToFirebase";

export default function FormPage({ navigation }) {
  const [pickerValue, setPickerValue] = useState("");
  const [inputValues, setInputValues] = useState("");
  const [location, setLocation] = useState(null);
  const [bascule, setBascule] = useState(0);

  const code = format(new Date(), "ddMMyyyyHHmmss");
  const date = format(new Date(), "dd/MM/yyyy");

  const { typeData, todoData } = useConfigTypes();

  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const [capturedImage, setCapturedImage] = useState(null);

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

  const updateLocation = async () => {
    try {
      let location = await getCurrentPositionAsync({});
      location = location.coords.latitude + ";" + location.coords.longitude;
      setLocation(location);
    } catch (error) {
      console.error("Error getting location:", error);
      alert("As you wish!");
      navigation.navigate("Home");
    }
  };

  useEffect(() => {
    updateLocation();
    const intervalId = setInterval(updateLocation, 100);
    return () => clearInterval(intervalId);
  }, []);

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
              <FadeInView key={pickerValue + placeholder}>
                <Input
                  key={placeholder}
                  placeholder={placeholder}
                  onChangeText={(text) =>
                    handleTextInputChange(placeholder, text)
                  }
                />
              </FadeInView>
            );
          });
        }
      }
    });
  });

  const sendData = async () => {
    sendDataToFirebase(
      pickerValue,
      inputValues,
      location,
      capturedImage,
      code,
      date,
      navigation,
      setUploading,
      setImage
    );
  };

  return (
    <ImageBackground
      source={require("../assets/map_hulluch.jpg")} // Provide the path to your local image
      style={styles.container}
    >
      <View style={styles.overlay}>
        <View style={styles.interface}>
          <FadeInView key={pickerValue.text + "I0"}>
            <Icon theme="home" onPress={() => navigation.navigate("Home")} />
          </FadeInView>
          <FadeInView key={pickerValue.text + "H0"}>
            <Dropdown
              theme="incidentDropdown"
              onChangePicker={(value) => handlePickerChange(value)}
              options={typeData} // Utilisez le tableau d'options mis à jour
              setValue={pickerValue}
            />
          </FadeInView>
          {pickerValue.text === null || bascule === 0 ? null : (
            <>
              <FadeInView key={pickerValue.text + "S0"}>
                <View style={styles.separator} />
              </FadeInView>
              {conditionalInputs}
              <FadeInView key={pickerValue.text + "S1"}>
                <View style={styles.separator} />
              </FadeInView>
              <FadeInView key={pickerValue.text + "B0"}>
                <View style={styles.fixToText}>
                  <Button
                    theme="second"
                    onPress={() =>
                      navigation.navigate("Camera", { setCapturedImage })
                    }
                    label="Camera"
                  />
                  <Button theme="second" onPress={sendData} label="Envoyer" />
                </View>
              </FadeInView>
            </>
          )}
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
    width: 200,
    borderBottomWidth: 1,
    borderBottomColor: "white",
  },
  fixToText: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
