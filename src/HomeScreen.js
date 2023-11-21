import React from "react";
import { StatusBar, ImageBackground, View, StyleSheet, Image, BackHandler } from "react-native";
import Button from "../components/templates/ButtonTemplates";


export default function HomePage({ navigation }) {
  const handleCloseApp = () => {
    BackHandler.exitApp();
  };

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
          <Button
            theme="primary"
            label="Journal des incidents"
            onPress={() => navigation.navigate("Log")}
          />
          <Button
            theme="primary"
            label="Remonter des incidents"
            onPress={() => navigation.navigate("Form")}
          />
          <Button
            theme="primary"
            label="Fermer l'application"
            onPress={handleCloseApp}
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
