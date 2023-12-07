import React, { useState } from "react";
import { StatusBar, ImageBackground, View, StyleSheet } from "react-native";
import Button from "../components/templates/Buttons";
import Popup from "../components/templates/Popups";
import Input from "../components/templates/Inputs";
import Fade from "../components/effects/Fade";
import { auth, signInWithEmailAndPassword } from "../config";

export default function Login({ navigation }) {
  const [popupVisible, setPopupVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Erreur lors de la connexion :", error.message);
      setPopupVisible(true);
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
            <Input
              placeholder="Email"
              onChangeText={(text) => setEmail(text)}
              icon="person"
            />
            <Input
              placeholder="Mot de passe"
              onChangeText={(text) => setPassword(text)}
              icon="lock"
            />
          </Fade>
          <Fade>
            <Button
              label="Se connecter"
              theme="secondary"
              onPress={() => loginUser(email, password)}
            />
          </Fade>
          <Fade>
            <Button
              label="Vous n'avez pas de compte ?"
              theme="secondary_alternative"
              onPress={() => navigation.navigate("Registration")}
            />
          </Fade>
          <Fade>
            <Button
              label="Mot de passe oublié ?"
              theme="secondary_alternative"
              onPress={() => navigation.navigate("ResetPassword")}
            />
          </Fade>
        </View>
      </View>
      <StatusBar style="auto" />
      <Popup
        isVisible={popupVisible}
        alert="Erreur connection :"
        label="Veuillez vérifier l'adresse mail et le mot de passe."
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
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    margin: 10,
    width: 160,
    height: 113,
  },
});
