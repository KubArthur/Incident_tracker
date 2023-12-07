import React, { useState, useRef } from "react";
import {
  StatusBar,
  ImageBackground,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from "react-native";
import Button from "../components/templates/Buttons";
import Popup from "../components/templates/Popups";
import Input from "../components/templates/Inputs";
import Fade from "../components/effects/Fade";
import { auth, sendPasswordResetEmail } from "../config";

export default function ResetPassword({ navigation }) {
  const [popupVisible, setPopupVisible] = useState(false);
  const [email, setEmail] = useState("");
  const inputRef = useRef(null);

  const changePassword = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setPopupVisible(true);
      })
      .catch((error) => {
        console.error("Erreur lors du reset :", error.message);
      });
  };

  const handleInputFocus = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleKeyboardDidShow = () => {
    // Ajuster la position du composant lorsque le clavier est ouvert
    handleInputFocus();
  };

  return (
    <ImageBackground
      source={require("../assets/map_hulluch.jpg")}
      style={styles.container}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : null}
        style={styles.keyboardAvoidingContainer}
      >
        <View style={styles.overlay}>
          <View style={styles.interface}>
            <Fade>
              <Input
                ref={inputRef}
                placeholder="Email"
                onChangeText={(text) => setEmail(text)}
                icon="person"
                onFocus={handleKeyboardDidShow}
              />
            </Fade>
            <Fade>
              <Button
                label="Envoyé"
                theme="secondary"
                onPress={changePassword}
              />
            </Fade>
            <Fade>
              <Button
                label="Retour"
                theme="secondary_alternative"
                onPress={() => navigation.navigate("Login")}
              />
            </Fade>
          </View>
        </View>
      </KeyboardAvoidingView>
      <StatusBar style="auto" />
      <Popup
        isVisible={popupVisible}
        alert="Demande envoyé !"
        label="Un mail a été envoyé à l'adresse saisie."
        onClose={() => navigation.navigate("Login")}
      />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  keyboardAvoidingContainer: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 15, 0.8)",
  },
  interface: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
