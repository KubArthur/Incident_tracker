import React from "react";
import { Modal, View, Text, StyleSheet } from "react-native";
import Button from "./ButtonTemplates";

export default function CustomPopup({ isVisible, label, onClose }) {
  return (
    <Modal visible={isVisible} transparent={true} onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.popup}>
            <Text style={{ color: "white", marginBottom: 20}}>{label}</Text>
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
    margin: 20,
  },
  popup: {
    backgroundColor: "rgba(20, 20, 20, 1)",
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
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});
