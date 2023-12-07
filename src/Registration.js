import React, { useState } from "react";
import { StatusBar, ImageBackground, View, StyleSheet } from "react-native";
import Button from "../components/templates/Buttons";
import Input from "../components/templates/Inputs";
import Fade from "../components/effects/Fade";
import {
  auth,
  createUserWithEmailAndPassword
} from "../config";

export default function Registration({ navigation }) {
  const [popupVisible, setPopupVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const createUser = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
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
            <Input
              placeholder="Mot de passe"
              onChangeText={(text) => setPassword(text)}
              icon="lock"
            />
          </Fade>
          <Fade>
            <Button label="Créer un compte" theme="secondary" onPress={createUser} />
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
    alignItems: "center",
    justifyContent: "center",
  },
});
