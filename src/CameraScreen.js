import React, { useState, useEffect, useRef } from "react";
import { Text, View, StyleSheet, Image, Dimensions } from "react-native";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import Button from "../components/templates/ButtonTemplates";

export default function CameraScreen({ navigation, route }) {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const cameraRef = useRef(null);

  const { setCapturedImage } = route.params;

  useEffect(() => {
    (async () => {
      MediaLibrary.requestPermissionsAsync();
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === "granted");
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef) {
      try {
        const data = await cameraRef.current.takePictureAsync({
          quality: 0.5, // Ajustez la qualité ici (0.1 pour 10% de la qualité d'origine)
        });
        setImage(data.uri);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const savePicture = async () => {
    if (image) {
      try {
        const asset = await MediaLibrary.createAssetAsync(image);
        setCapturedImage(image);
        console.log(image);
        setImage(null);
        navigation.goBack();
        console.log("Done");
      } catch (error) {
        console.log(error);
      }
    }
  };

  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const onCancel = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {!image ? (
        <Camera
          style={styles.camera}
          type={type}
          ref={cameraRef}
          flashMode={flash}
        >
          <View style={styles.controls}>
            <Button label="Retour" theme="second" onPress={onCancel}></Button>
            <Button label="Photo" onPress={takePicture} theme="second" />
            <Button
              label="flash"
              onPress={() =>
                setFlash(
                  flash === Camera.Constants.FlashMode.off
                    ? Camera.Constants.FlashMode.on
                    : Camera.Constants.FlashMode.off
                )
              }
              theme="second"
            />
          </View>
        </Camera>
      ) : (
        <Image source={{ uri: image }} style={styles.image} />
      )}

      <View style={styles.container}>
        {image ? (
          <View style={styles.controls}>
            <Button
              label="Annuler"
              onPress={() => setImage(null)}
              theme="second"
            />
            <Button label="Valider" onPress={savePicture} theme="second" />
          </View>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
  },
  controls: {
    position: "absolute",
    bottom: 0,
    marginBottom: 70,
    flexDirection: "row",
  },
  camera: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },

  image: {
    height: 440,
    width: 320,
    borderRadius: 18,
    marginTop: 100,
  },
});
