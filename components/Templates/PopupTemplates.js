import React, { useState, useEffect } from "react";
import { Modal, View, Text, StyleSheet } from "react-native";
import Button from "./ButtonTemplates";

export default function CustomPopup({ isVisible, label, onClose }) {
  const [loadingText, setLoadingText] = useState("Loading");
  const loadingStates = ["lll", "|ll", "l|l", "ll|"];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setLoadingText((prevText) => {
        // Alternez entre les états du texte
        const currentIndex = loadingStates.indexOf(prevText);
        const nextIndex =
          currentIndex < loadingStates.length - 1 ? currentIndex + 1 : 0;
        return loadingStates[nextIndex];
      });
    }, 300);

    return () => clearInterval(intervalId);
  }, []);

  return label === "traitement..." ? (
    <Modal visible={isVisible} transparent={true}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.popup}>
            <Text style={styles.label}>
              Veuillez patienter pendant la remontée de l'incident au serveur.
            </Text>
            <Text style={styles.loading}>{loadingText}</Text>
          </View>
        </View>
      </View>
    </Modal>
  ) : (
    <Modal visible={isVisible} transparent={true} onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.popup}>
            <Text style={styles.label}>{label}</Text>
            <View style={styles.button}>
              <Button theme="secondary_popup" label="OK" onPress={onClose} />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  popup: {
    backgroundColor: "rgba(60, 60, 60, 1)",
    borderRadius: 10,
    elevation: 10,
    justifyContent: "center",
    alignItems: "center",
    width: "82%", // Ajoutez cette ligne pour définir la largeur à 80%
  },
  button: {
    position: "absolute",
    bottom: 0, // Ajustez la valeur en conséquence pour définir la distance depuis le bas
    right: 29, // Ajustez la valeur en conséquence pour définir la distance depuis la gauche
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  label: {
    width: "84%",
    fontWeight: "400",
    color: "rgba(200, 200, 200, 1)",
    marginBottom: 45,
    fontSize: 18,
    marginTop: 16,
  },
  loading: {
    alignItems: "right",
    color: "white",
    marginBottom: 10,
    fontSize: 30,
  },
});
