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
            <Text style={styles.label}>
              Une fois terminée, vous serez rédirigé sur la page d'accueil.
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
            <Button theme="secondary_small" label="Fermer" onPress={onClose} />
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
    margin: 40,
  },
  popup: {
    backgroundColor: "rgba(30, 30, 30, 1)",
    padding: 30,
    borderRadius: 10,
    elevation: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  label: {
    color: "white",
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'justify',
  },
  loading: {
    color: "white",
    marginBottom: 10,
    fontSize: 30,
  },
});
