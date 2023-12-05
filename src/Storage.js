// FileDeletionButton.js
import React, { useState } from "react";
import { View, Alert, ImageBackground, StyleSheet } from "react-native";
import { deletePhotos } from "../components/db/DeletePhotos";
import Fade from "../components/effects/Fade";
import Button from "../components/templates/Button";
import Icon from "../components/templates/Icon";
import Popup from "../components/templates/Popup";

export default function Storage({ navigation }) {
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupLabel, setPopupLabel] = useState("");
  const [popupAlert, setPopupAlert] = useState("");

  const handleDeletePress = async () => {
    try {
      setPopupVisible(true);
      setPopupAlert("Suppresion des données !");
      setPopupLabel("delete");
      await deletePhotos(new Date("2023-11-18")); // Remplacez la date par la date souhaitée
      setPopupVisible(true);
      setPopupAlert("Terminé !");
      setPopupLabel("Fichiers supprimés avec succès.");
    } catch (error) {
      console.error(
        "Erreur lors de la suppression des fichiers :",
        error.message
      );
      setPopupVisible(true);
      setPopupAlert("Erreur :");
      setPopupLabel("Erreur lors de la suppression des fichiers.");
    }
  };

  return (
    <ImageBackground
      source={require("../assets/map_hulluch.jpg")}
      style={styles.container}
    >
      <View style={styles.overlay}>
        <View style={styles.interface}>
          <Fade>
            <Icon theme="home" onPress={() => navigation.navigate("Home")} />
          </Fade>
          <Fade>
            <Button
              theme="secondary"
              label="Nettoyer storage"
              onPress={handleDeletePress}
            />
          </Fade>
        </View>
      </View>

      <Popup
        isVisible={popupVisible}
        alert={popupAlert}
        label={popupLabel}
        onClose={() => setPopupVisible(false)}
      />
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
