import React, { useEffect, useState } from "react";
import {
  StatusBar,
  ImageBackground,
  View,
  StyleSheet,
  Image,
  BackHandler,
} from "react-native";
import Button from "../components/templates/Button";
import mySingleton from "../components/Singleton";
import Popup from "../components/templates/Popup";

export default function Registration({ navigation }) {
  return (
    <ImageBackground
      source={require("../assets/map_hulluch.jpg")}
      style={styles.container}
    >
      <View style={styles.overlay}>
        <View style={styles.interface}>
          <Image
            style={styles.image}
            source={require("../assets/logo_hulluch.png")}
          />
        </View>
      </View>
      <StatusBar style="auto" />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
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
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    margin: 10,
    width: 160,
    height: 113,
  },
});