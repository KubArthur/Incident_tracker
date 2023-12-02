import React from "react";
import { Marker } from "react-native-maps";

export default function useMarkersRenderer(
  todoCheck,
  handleMarkerPress,
  statsEnable,
  periodes,
  pickerValue
) {
  const filteredTodoCheck = statsEnable
    ? todoCheck.filter((item) => {
        const year = new Date(item.timestamp).getFullYear().toString();
        return periodes.text !== undefined
      ? periodes.text.includes(year.toString())
      : null;
      })
    : todoCheck.filter((item) => !pickerValue.text || item.type === pickerValue.text);

  return filteredTodoCheck.map((item) => {
    let imageSource;
    switch (item.type) {
      case "Inondation":
        imageSource = require("../../assets/flood.png");
        break;
      case "Panne réseau":
        imageSource = require("../../assets/network.png");
        break;
      case "Voiture ventouse":
        imageSource = require("../../assets/car.png");
        break;
      default:
        imageSource = require("../../assets/network.png");
    }

    const location = item.location || "";
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
  });
}
