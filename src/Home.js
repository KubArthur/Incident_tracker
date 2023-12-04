import React, { useEffect, useState } from "react";
import {
  StatusBar,
  ImageBackground,
  View,
  StyleSheet,
  Image,
  BackHandler,
} from "react-native";
import Button from "../components/templates/Button";
import mySingleton from "../components/Singleton";
import Popup from "../components/templates/Popup";
import Fade from "../components/effects/Fade";
import { signOut } from "firebase/auth"; // Importez la fonction de déconnexion de Firebase auth
import { auth } from "../config";

export default function HomePage({ navigation }) {
  const handleCloseApp = async () => {
    await handleSignOut();
    BackHandler.exitApp();
  };
  const [popupVisible, setPopupVisible] = useState(false);

  useEffect(() => {
    const handleMyBooleanChange = () => {
      if (mySingleton.getMyBoolean1()) {
        setPopupVisible(true);
      }
      if (mySingleton.getMyBoolean2()) {
        setPopupVisible(true);
      }
    };

    mySingleton.subscribe(handleMyBooleanChange);

    return () => {
      mySingleton.unsubscribe(handleMyBooleanChange);
    };
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Erreur lors de la déconnexion :", error);
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
            <Image
              style={styles.image}
              source={require("../assets/logo_hulluch.png")}
            />
          </Fade>
          <Fade>
            {mySingleton.getRole() === "admin" ? (
              <Button
                theme="primary"
                label="Journal des incidents"
                onPress={() => navigation.navigate("Log")}
              />
            ) : null}

            <Button
              theme="primary"
              label="Remonter des incidents"
              onPress={() => navigation.navigate("Form")}
            />
            <Button
              theme="primary"
              label="Fermer l'application"
              onPress={handleSignOut}
            />
          </Fade>
        </View>
      </View>
      {mySingleton.getMyBoolean1() ? (
        <>
          <Popup
            isVisible={popupVisible}
            alert="Erreur permission :"
            label="L'application a besoin de la localisation de l'appareil pour fonctionner."
            onClose={() => setPopupVisible(false)}
          />
          {mySingleton.setMyBoolean1(false)}
        </>
      ) : mySingleton.getMyBoolean2() ? (
        <>
          <Popup
            isVisible={popupVisible}
            alert="Incident remontée !"
            label="L'incident est bien remontée jusqu'au serveur."
            onClose={() => setPopupVisible(false)}
          />
          {mySingleton.setMyBoolean2(false)}
        </>
      ) : null}
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
