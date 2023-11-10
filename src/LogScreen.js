import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import Icon from "../components/templates/IconTemplates";
import MapView, { Marker } from "react-native-maps";
import Dropdown from "../components/templates/DropdownTemplates";
import Button from "../components/templates/ButtonTemplates";
import { db } from "../config";
import { ref, set } from "firebase/database";
import { onValue } from "firebase/database";

const customMapStyle = [
  {
    elementType: "geometry",
    stylers: [
      {
        color: "#242f3e",
      },
    ],
  },
  {
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#746855",
      },
    ],
  },
  {
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#242f3e",
      },
    ],
  },
  {
    featureType: "administrative.locality",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#d59563",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "labels.text",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#d59563",
      },
    ],
  },
  {
    featureType: "poi.business",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [
      {
        color: "#263c3f",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#6b9a76",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [
      {
        color: "#38414e",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#212a37",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#9ca5b3",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [
      {
        color: "#746855",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#1f2835",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#f3d19c",
      },
    ],
  },
  {
    featureType: "transit",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "transit",
    elementType: "geometry",
    stylers: [
      {
        color: "#2f3948",
      },
    ],
  },
  {
    featureType: "transit.station",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#d59563",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [
      {
        color: "#17263c",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#515c6d",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#17263c",
      },
    ],
  },
];

export default function LogPage({ navigation }) {
  const [calloutVisible, setCalloutVisible] = useState(false);
  const [selectedMarkerId, setSelectedMarkerId] = useState(null);
  const [todoData, setTodoData] = useState([]);
  const [pickerValue, setPickerValue] = useState("");
  const [uniqueTypes, setUniqueTypes] = useState([]);

  const handlePickerChange = (text) => {
    setPickerValue((prevValues) => ({
      ...prevValues,
      text,
    }));
    console.log("pickerValue:" + JSON.stringify(pickerValue));
  };

  useEffect(() => {
    const starCountRef = ref(db, "reports/");

    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      const todoData = Object.keys(data)
        .map((key) => ({
          id: key,
          ...data[key],
        }))
        .filter((item) => item.read === false || item.read === "false");
      console.log("todoData:" + todoData);
      setTodoData(todoData);
    });
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

      console.log("uniqueTypes:" + uniqueTypes);
      setUniqueTypes(uniqueTypes);
    });
  }, []);

  const handleMarkerPress = (markerId) => {
    setCalloutVisible(true);
    setSelectedMarkerId(markerId);
  };

  const upData = () => {
    set(ref(db, `reports/${selectedMarkerId}/read`), true);
  };

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
          {todoData
            .filter((item) => !pickerValue.text || item.type === pickerValue.text) // Filtre les marqueurs en fonction du type
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
        {calloutVisible === false && selectedMarkerId === null ? (
          <View style={styles.calloutBoxInvisible}></View>
        ) : (
          <View
            style={{
              ...styles.calloutBox,
              height:
                Object.keys(
                  todoData.filter((item) => item.id === selectedMarkerId)[0]
                    ?.inputValues || {}
                ).length > 2
                  ? 219
                  : Object.keys(
                      todoData.filter((item) => item.id === selectedMarkerId)[0]
                        ?.inputValues || {}
                    ).length > 1
                  ? 182
                  : 155,
            }}
          >
            {todoData
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
            <View style={styles.bottomButton}>
              <Button
                theme="second"
                label="archiver"
                onPress={() => upData()}
              ></Button>
            </View>
          </View>
        )}
      </View>
      <View style={styles.headContainer}>
        <View style={styles.head}>
          <Icon theme="home" onPress={() => navigation.navigate("Home")} />
          <Dropdown
            theme="incidentDropdown"
            onChangePicker={(value) => handlePickerChange(value)}
            options={uniqueTypes} // Utilisez le tableau d'options mis à jour
          />
        </View>
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
  calloutBox: {
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
  calloutBoxInvisible: {
    position: "absolute",
    bottom: 0,
    left: 0,
    height: 30,
    right: 0,
    padding: 10,
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 10, 1)",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});
