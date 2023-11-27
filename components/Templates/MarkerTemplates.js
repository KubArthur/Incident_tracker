import React from "react";
import { Marker } from "react-native-maps";
import Icon from "./IconTemplates";

export default function useMarkersRenderer(todoCheck, pickerValue, handleMarkerPress) {
  return todoCheck
    .filter((item) => !pickerValue.text || item.type === pickerValue.text)
    .map((item) => {
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
          imageSource = require("../../assets/car.png");
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