import React, { useEffect, useState } from "react";
import {
  StatusBar,
  ImageBackground,
  View,
  StyleSheet,
  Image,
} from "react-native";
import Button from "../components/templates/Buttons";
import mySingleton from "../components/Singleton";
import Popup from "../components/templates/Popups";
import Fade from "../components/effects/Fade";
import { signOut } from "firebase/auth"; // Importez la fonction de déconnexion de Firebase auth
import { auth } from "../config";

export default function HomePage({ navigation }) {
  const [popupLabel, setPopupLabel] = useState("");
  const [popupAlert, setPopupAlert] = useState("");
  const [userRole, setUserRole] = useState(mySingleton.getRole());
  const [popupVisible, setPopupVisible] = useState(false);

  useEffect(() => {console.log(mySingleton.getMyBoolean1(), mySingleton.getMyBoolean2(), popupVisible);
    const handleBooleanChanges = () => {
      if (mySingleton.getMyBoolean1()) {
        console.log("Handling boolean changes...");
        setPopupVisible(true);
        setPopupAlert("Erreur permission :");
        setPopupLabel(
          "L'application a besoin de la localisation de l'appareil pour fonctionner."
        );console.log("Handling boolean changes...");
      }
      if (mySingleton.getMyBoolean2()) {
        setPopupVisible(true);
        setPopupAlert("Incident remontée !");
        setPopupLabel("L'incident est bien remontée jusqu'au serveur.");
      }
    };

  mySingleton.subscribe(handleBooleanChanges);

  return () => {
    mySingleton.unsubscribe(handleBooleanChanges);
    console.log("Exiting HomePage useEffect...");
  };
}, []);

useEffect(() => {
  const handleRoleChange = () => {
    setUserRole((prevRole) => {
      if (
        mySingleton.getMyBoolean1() === false &&
        mySingleton.getMyBoolean2() === false
      ) {
        return mySingleton.getRole();
      }
      return prevRole;
    });
  };

mySingleton.subscribe(handleRoleChange);

return () => {
  mySingleton.unsubscribe(handleRoleChange);
  console.log("Exiting HomePage useEffect...");
};
}, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Erreur lors de la déconnexion :", error);
    }
  };
  console.log("Exiting HomePage component...");
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
            {userRole !== "admin" ? (
              <>
                <Button
                  theme="primary"
                  label="Journal des incidents"
                  onPress={() => navigation.navigate("Log")}
                />
                <Button
                  theme="primary"
                  label="Remonter un incident"
                  onPress={() => navigation.navigate("Form")}
                />
                <Button
                  theme="primary"
                  label="Paramètre de stockage"
                  onPress={() => navigation.navigate("Storage")}
                />
                <Button
                  theme="primary"
                  label="Se déconnecter"
                  onPress={handleSignOut}
                />
              </>
            ) : (
              <>
                <Button
                  theme="primary"
                  label="Remonter un incident"
                  onPress={() => navigation.navigate("Form")}
                />
                <Button
                  theme="primary"
                  label="Se déconnecter"
                  onPress={handleSignOut}
                />
              </>
            )}
          </Fade>
        </View>
      </View>

      <Popup
        isVisible={popupVisible}
        alert={popupAlert}
        label={popupLabel}
        onClose={() => {
          setPopupVisible(false);
          mySingleton.setMyBoolean1(false);
          mySingleton.setMyBoolean2(false);
        }}
      />

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
