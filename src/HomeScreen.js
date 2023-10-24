import React from "react";
import {
  StatusBar,
  ImageBackground,
  View,
  StyleSheet,
  Image,
} from "react-native";
import Button from "../components/templates/ButtonTemplates";

export default function HomePage({ navigation }) {
  return (
    <ImageBackground
      source={require("../assets/map_hulluch.jpg")} // Provide the path to your local image
      style={styles.container}
    >
      <View style={styles.overlay}>
        <View style={styles.interface}>
          <Image
            style={styles.image}
            source={require("../assets/logo_hulluch.png")} // Provide the path to your local image
          />
          <Button
            theme="main"
            label="Journal des incidents"
            onPress={() => navigation.navigate("Log")}
          />
          <Button
            theme="main"
            label="Remonter des incidents"
            onPress={() => navigation.navigate("Form")}
          />
          <Button
            theme="main"
            label="Fermer l'application"
            onPress={() => navigation.navigate("Shutdown")}
          />
        </View>
      </View>
      <StatusBar style="auto" />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 15, 0.8)", // Adjust opacity as needed
  },
  interface: {
    margin: 160,
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
  },
  image: {
    width: 160, // Adjust the dimensions as needed
    height: 113,
    margin: 10,
  },
});
