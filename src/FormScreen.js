import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
} from "react-native";
import Icon from "../components/templates/IconTemplates";
import Dropdown from "../components/templates/DropdownTemplates";
import Button from "../components/templates/ButtonTemplates";
import { getCurrentPositionAsync, LocationAccuracy } from "expo-location";
import useConfigTypes from "../components/db/GetConfigTypes";
import FadeInView from "../components/effects/Fade";
import { sendDataToFirebase } from "../components/db/SendDataToFirebase";
import Popup from "../components/templates/PopupTemplates";
import DynamicFormInputs from "../components/templates/FormFieldsTemplates";
import mySingleton from "../components/Singleton";

export default function FormPage({ navigation }) {
  const [pickerValue, setPickerValue] = useState("");
  const [inputValues, setInputValues] = useState({});
  const [location, setLocation] = useState(null);
  const [bascule, setBascule] = useState(0);

  const timestamp = new Date().getTime();

  const { typeData, todoData } = useConfigTypes();

  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const [capturedImage, setCapturedImage] = useState(null);

  const [popupVisible, setPopupVisible] = useState(false);
  const [popupText, setPopupText] = useState("");
  const [needCheck, setNeedCheck] = useState(0);

  const handlePickerChange = (text) => {
    setPickerValue((prevValues) => ({
      ...prevValues,
      text,
    }));
    setInputValues({});
    const bascule = 1;
    setBascule(bascule);
  };

  useEffect(() => {
    todoData.forEach((item) => {
      Object.values(item).forEach((subItem) => {
        if (subItem.type === pickerValue.text) {
          const dataString = subItem.data;
          if (dataString.includes("*")) {
            let nombreOccurrences = 0;

            for (let i = 0; i < dataString.length; i++) {
              if (dataString[i] === "*") {
                nombreOccurrences++;
              }
            }

            setNeedCheck(nombreOccurrences);
          } else {
            setNeedCheck(0);
          }
        }
      });
      console.log("nombre de * : ", needCheck);
    });
  }, [pickerValue]);

  const handleTextInputChange = (key, value) => {
    setInputValues((prevValues) => ({
      ...prevValues,
      [key]: value,
    }));
  };

  const cancel = () => {
    navigation.navigate("Home");
  };

  const updateLocation = async () => {
    try {
      let location = await getCurrentPositionAsync({
        accuracy: LocationAccuracy.Highest,
      });

      location = location.coords.latitude + ";" + location.coords.longitude;
      setLocation(location);
    } catch (error) {
      console.error("Error getting location:", error);
      mySingleton.setMyBoolean1(true);
      console.log(mySingleton.getMyBoolean1());
      navigation.navigate("Home");
    }
  };

  useEffect(() => {
    updateLocation();
    const intervalId = setInterval(updateLocation, 2000);
    return () => clearInterval(intervalId);
  }, []);

  const sendData = async () => {
    sendDataToFirebase(
      pickerValue,
      inputValues,
      location,
      capturedImage,
      timestamp,
      navigation,
      setUploading,
      setImage,
      setPopupVisible,
      setPopupText,
      needCheck
    );
  };

  return (
    <ImageBackground
      source={require("../assets/map_hulluch.jpg")} // Provide the path to your local image
      style={styles.container}
    >
      <View style={styles.overlay}>
        <View style={styles.interface}>
          <FadeInView key={pickerValue.text + "HO"}>
            <View style={styles.head}>
              <Icon theme="home" onPress={() => navigation.navigate("Home")} />
              <Dropdown
                key="default-drop"
                theme="default"
                onChangePicker={(value) => handlePickerChange(value)}
                options={typeData} // Utilisez le tableau d'options mis à jour
                setValue={pickerValue}
                placeholder="Sélectionner un incident"
              />
            </View>
          </FadeInView>
          {pickerValue.text === null || bascule === 0 ? null : (
            <>
              <FadeInView key={pickerValue.text + "BO"}>
                <View style={styles.body}>
                  <View style={styles.separator} />

                  <DynamicFormInputs
                    pickerValue={pickerValue}
                    handleTextInputChange={handleTextInputChange}
                    data={todoData}
                  />

                  <View style={styles.separator} />

                  <Button
                    theme="secondary_addPhoto"
                    onPress={() =>
                      navigation.navigate("Camera", { setCapturedImage })
                    }
                    label="Prendre une photo"
                  />
                  <Button
                    theme="secondary_send"
                    label="Envoyer"
                    onPress={sendData}
                  />
                </View>
              </FadeInView>
            </>
          )}
        </View>
      </View>

      <Popup
        isVisible={popupVisible}
        label={popupText}
        onClose={() => setPopupVisible(false)}
      />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  head: {
    alignItems: "center",
  },
  body: {
    alignItems: "center",
  },
  container: {
    width: "100%",
    height: "100%",
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
    justifyContent: "center",
  },
  separator: {
    marginTop: 10,
    marginBottom: 20,
    width: 200,
    borderBottomWidth: 1,
    borderBottomColor: "white",
  },
});
