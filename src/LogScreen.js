import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import Icon from "../components/templates/IconTemplates";
import MapView, { Marker } from "react-native-maps";
import Dropdown from "../components/templates/DropdownTemplates";
import Button from "../components/templates/ButtonTemplates";
import { db } from "../config";
import { ref, set } from "firebase/database";
import useConfigTypes from "../components/db/ConfigTypes";
import customMapStyle from "../components/templates/MapTemplate";
import useTodoCheck from "../components/db/Reports";
import FadeInView from "../components/effects/Fade";

export default function LogPage({ navigation }) {
  const [calloutBox, setCalloutBox] = useState(false);
  const [selectedMarkerId, setSelectedMarkerId] = useState(null);
  const [pickerValue, setPickerValue] = useState("");
  const { typeData } = useConfigTypes();
  const { todoCheck } = useTodoCheck();

  const handlePickerChange = (text) => {
    setPickerValue((prevValues) => ({
      ...prevValues,
      text,
    }));
  };

  const handleMarkerPress = (markerId) => {
    setCalloutBox(true);
    setSelectedMarkerId(markerId);
  };

  const upData = () => {
    set(ref(db, `reports/${selectedMarkerId}/read`), true);
  };

  console.log(todoCheck);

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          customMapStyle={customMapStyle}
          initialRegion={{
            latitude: 50.4834252,
            longitude: 2.8178466,
            latitudeDelta: 0.05,
            longitudeDelta: 0.02,
          }}
        >
          {todoCheck
            .filter(
              (item) => !pickerValue.text || item.type === pickerValue.text
            ) // Filtre les marqueurs en fonction du type
            .map((item) => {
              let imageSource;

              switch (item.type) {
                case "Inondation":
                  imageSource = require("../assets/pin_inondation.png");
                  break;
                case "Panne réseau":
                  imageSource = require("../assets/pin_panne_reseau.png");
                  break;
                case "Voiture ventouse":
                  imageSource = require("../assets/pin_voiture_ventouse.png");
                  break;
                // Ajoutez d'autres cas au besoin
                default:
                  imageSource = require("../assets/splash.png"); // Fichier par défaut
              }

              const location = item.location || ""; // Ajoutez cette ligne pour éviter le problème
              const [latitude, longitude] = location.split(";");

              return (
                <Marker
                  key={item.id}
                  coordinate={{
                    latitude: parseFloat(latitude),
                    longitude: parseFloat(longitude),
                  }}
                  image={imageSource}
                  onPress={() => handleMarkerPress(item.id)}
                />
              );
            })}
        </MapView>

        {todoCheck.length === 0 ? (
          <View style={styles.calloutBoxNoReport}>
            <Text style={styles.dataBox}>Aucune donnée disponible</Text>
          </View>
        ) : calloutBox === false || selectedMarkerId === null ? (
          <View style={styles.calloutBoxDefault}>
            <Text style={styles.dataBox}>Veuillez sélectionner une donnée</Text>
          </View>
        ) : (
          <View
            style={{
              ...styles.calloutBoxReport,
              height:
                Object.keys(
                  todoCheck.filter((item) => item.id === selectedMarkerId)[0]
                    ?.inputValues || {}
                ).length > 2
                  ? 219
                  : Object.keys(
                      todoCheck.filter(
                        (item) => item.id === selectedMarkerId
                      )[0]?.inputValues || {}
                    ).length > 1
                  ? 182
                  : 155,
            }}
          >
            <FadeInView key={selectedMarkerId + "B0"}>
              {todoCheck
                .filter((item) => item.id === selectedMarkerId)
                .map((item) => (
                  <View key={item.id}>
                    <Text style={styles.titleBox}>
                      {item.type}, {item.date}
                    </Text>
                    {Object.keys(item.inputValues).map((key) => (
                      <Text style={styles.dataBox} key={key}>
                        {key}: {item.inputValues[key]}
                      </Text>
                    ))}
                  </View>
                ))}
            </FadeInView>
            <FadeInView key={selectedMarkerId + "B1"}>
              <View style={styles.bottomButton}>
                <Button
                  theme="second"
                  label="archiver"
                  onPress={() => {
                    upData();
                    setCalloutBox(false);
                  }}
                />
              </View>
            </FadeInView>
          </View>
        )}
      </View>

      <View style={styles.headContainer}>
        <FadeInView key="H0">
          <View style={styles.head}>
            <Icon theme="home" onPress={() => navigation.navigate("Home")} />
            <Dropdown
              theme="incidentDropdown"
              onChangePicker={(value) => handlePickerChange(value)}
              options={typeData} // Utilisez le tableau d'options mis à jour
              setValue={pickerValue}
            />
          </View>
        </FadeInView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  head: {
    marginTop: 30,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  headContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 165,
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
    backgroundColor: "rgba(0, 0, 10, 1)",
  },
  container: {
    flex: 1,
  },
  mapContainer: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  calloutBoxReport: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 10, 1)",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  titleBox: {
    color: "white",
    fontSize: 18,
    padding: 4,
  },
  dataBox: {
    color: "white",
    fontSize: 16,
    padding: 4,
  },
  bottomButton: {
    marginTop: 15,
  },
  calloutBoxDefault: {
    position: "absolute",
    bottom: 0,
    left: 0,
    height: 60,
    right: 0,
    padding: 10,
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 10, 1)",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  calloutBoxNoReport: {
    position: "absolute",
    bottom: 0,
    left: 0,
    height: 60,
    right: 0,
    padding: 10,
    alignItems: "center",
    backgroundColor: "rgba(0, 100, 10, 0.5)",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});
