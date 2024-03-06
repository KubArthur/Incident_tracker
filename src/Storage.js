import React, { useState, useEffect } from "react";
import { View, Text, ImageBackground, StyleSheet } from "react-native";
import { deletePhotos } from "../components/db/DeleteStorage";
import { getTotalStorageSize } from "../components/db/GetStorageSize";
import Fade from "../components/effects/Fade";
import Button from "../components/templates/Buttons";
import Popup from "../components/templates/Popups";
import Icon from "../components/templates/Icons";

export default function Storage({ navigation }) {
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupLabel, setPopupLabel] = useState("");
  const [popupAlert, setPopupAlert] = useState("");
  const [totalStorageSize, setTotalStorageSize] = useState(0);

  useEffect(() => {
    getTotalStorageSize()
      .then((size) => {
        setTotalStorageSize(size);
      })
      .catch((error) => {
        console.error("Error:", error.message);
      });
  }, []);

  const handleDeletePress = async () => {
    try {
      setPopupVisible(true);
      setPopupAlert("Suppresion des données !");
      setPopupLabel("delete");
      await deletePhotos(new Date("2023-11-22"));
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
            <Text style={styles.dataBox}>Espace occupé dans Storage :</Text>
            <Text style={styles.dataBox}>
              {totalStorageSize.toFixed(2)} MB sur 5000 MB
            </Text>
            <Text style={styles.dataBox}>
              Cliquez sur le bouton ci-dessous si vous souhaitez libérer de
              l'espace ?
            </Text>
          </Fade>
          <Fade>
            <View marginTop={8}>
              <Button
                theme="secondary_small"
                label="Nettoyer"
                onPress={handleDeletePress}
              />
            </View>
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
  dataBox: {
    maxWidth: "65%",
    textAlign: "center",
    color: "white",
    fontSize: 16,
    marginBottom: 20,
  },
  fixToText: {
    flexDirection: "row",
  },
});
