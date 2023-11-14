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
    display: "flex",
    marginBottom: 60,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    margin: 10,
    width: 160,
    height: 113,
  },
});
