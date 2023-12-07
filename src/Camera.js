import React, { useState, useEffect, useRef } from "react";
import { Text, View, StyleSheet, Image, ImageBackground } from "react-native";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import Button from "../components/templates/Buttons";
import Icon from "../components/templates/Icons";
import FadeInView from "../components/effects/Fade";
import mySingleton from "../components/Singleton";

export default function CameraScreen({ navigation, route }) {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const cameraRef = useRef(null);

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
          quality: 0.3,
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
        mySingleton.setPhotoPath(image);
        setImage(null);
        navigation.goBack();
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
    <ImageBackground
      source={require("../assets/map_hulluch.jpg")} // Provide the path to your local image
      style={styles.container_0}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          {!image ? (
            <Camera
              style={styles.camera}
              type={type}
              ref={cameraRef}
              flashMode={flash}
            >
              <View style={styles.controls}>
                <Button
                  label="Retour"
                  theme="secondary_small"
                  onPress={onCancel}
                ></Button>
                <View style={styles.icon}>
                  <Icon onPress={takePicture} theme="camera" />
                </View>
                <Button
                  label="flash"
                  onPress={() =>
                    setFlash(
                      flash === Camera.Constants.FlashMode.off
                        ? Camera.Constants.FlashMode.on
                        : Camera.Constants.FlashMode.off
                    )
                  }
                  theme="secondary_flash"
                  effect={flash}
                />
              </View>
            </Camera>
          ) : image ? (
            <>
              <FadeInView key="id_default-0">
                <View style={styles.imageContainer}>
                  <Image source={{ uri: image }} style={styles.image} />
                </View>
                <View style={styles.controlContainer}>
                  <Button
                    label="Ajouter cette photo"
                    onPress={savePicture}
                    theme="secondary_addPhoto"
                  />
                  <Button
                    label="Recommencer"
                    onPress={() => setImage(null)}
                    theme="secondary_cameraRetake"
                  />
                </View>
              </FadeInView>
            </>
          ) : null}
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  container_0: {
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
  controls: {
    position: "absolute",
    bottom: 0,
    marginBottom: 60,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingHorizontal: 30,
  },
  controlContainer: {
    flex: 1 / 3,
    alignItems: "center",
  },
  camera: {
    width: "100%",
    height: "100%",
  },
  imageContainer: {
    flex: 1,
    paddingTop: 58,
  },
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
  icon: {
    margin: 20, // Ajustez la marge à la valeur souhaitée
  },
});
