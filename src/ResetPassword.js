import React, { useState } from "react";
import { StatusBar, ImageBackground, View, StyleSheet } from "react-native";
import Button from "../components/templates/Button";
import Popup from "../components/templates/Popup";
import Input from "../components/templates/Input";
import Fade from "../components/effects/Fade";
import { auth, sendPasswordResetEmail } from "../config";

export default function ResetPassword({ navigation }) {
  const [popupVisible, setPopupVisible] = useState(false);
  const [email, setEmail] = useState("");

  const changePassword = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setPopupVisible(true);
      })
      .catch((error) => {
        console.error("Erreur lors du reset :", error.message);
      });
  };

  return (
    <ImageBackground
      source={require("../assets/map_hulluch.jpg")}
      style={styles.container}
    >
      <View style={styles.overlay}>
        <View style={styles.interface}>
          <Fade>
            <Input
              placeholder="Email"
              onChangeText={(text) => setEmail(text)}
              icon="person"
            />
          </Fade>
          <Fade>
            <Button
              label="Changer"
              theme="secondary"
              onPress={changePassword}
            />
          </Fade>
          <Fade>
            <Button
              label="Retour"
              theme="secondary_popup"
              onPress={() => navigation.navigate("Login")}
            />
          </Fade>
        </View>
      </View>
      <StatusBar style="auto" />
      <Popup
        isVisible={popupVisible}
        alert="Demande envoyé !"
        label="Un mail vous a été envoyé à l'adresse saisie."
        onClose={() => navigation.navigate("Login")}
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
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    margin: 10,
    width: 160,
    height: 113,
  },
});
