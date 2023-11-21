import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  Modal,
} from "react-native";
import Icon from "../components/templates/IconTemplates";
import MapView from "react-native-maps";
import Dropdown from "../components/templates/DropdownTemplates";
import { db } from "../config";
import { ref, set } from "firebase/database";
import useConfigTypes from "../components/db/GetConfigTypes";
import customMapStyle from "../components/templates/MapTemplate";
import useTodoCheck from "../components/db/GetReports";
import FadeInView from "../components/effects/Fade";
import useMarkersRenderer from "../components/templates/MarkerTemplates";
import CalloutBox from "../components/templates/ReportTemplates";
import Button from "../components/templates/ButtonTemplates";

export default function LogPage({ navigation }) {
  const [calloutBox, setCalloutBox] = useState(false);
  const [selectedMarkerId, setSelectedMarkerId] = useState(null);
  const [pickerValue, setPickerValue] = useState("");
  const { typeData } = useConfigTypes();
  const { todoCheck } = useTodoCheck();
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handlePickerChange = (text) => {
    setPickerValue((prevValues) => ({
      ...prevValues,
      text,
    }));
  };

  const handleImagePress = (imageUrl) => {
    setSelectedImage(imageUrl);
    setModalVisible(true);
  };

  const handleMarkerPress = (markerId) => {
    setCalloutBox(true);
    setSelectedMarkerId(markerId);
  };

  const upData = () => {
    set(ref(db, `reports/${selectedMarkerId}/read`), true);
  };

  const markersToRender = useMarkersRenderer(
    todoCheck,
    pickerValue,
    handleMarkerPress
  );

  const handleScreenTouch = () => {
    setSelectedMarkerId(null);
  };

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          customMapStyle={customMapStyle}
          toolbarEnabled={false}
          showsUserLocation={false}
          showsCompass={false}
          initialRegion={{
            latitude: 50.48945067381617,
            longitude: 2.8115017153322697,
            latitudeDelta: 0.034087918155222496,
            longitudeDelta: 0.026976652443408966,
          }}
        >
          {markersToRender}
        </MapView>

        {todoCheck.length === 0 ? (
          <View style={styles.calloutBox}>
            <FadeInView key="C0">
              <Text style={styles.dataBox}>Aucune nouvelle remontée !</Text>
            </FadeInView>
          </View>
        ) : calloutBox === false || selectedMarkerId === null ? (
          <View style={styles.calloutBox}>
            <FadeInView key="C1">
              <Text style={styles.dataBox}>Appuiyez sur un marker...</Text>
            </FadeInView>
          </View>
        ) : (
          <CalloutBox
            todoCheck={todoCheck}
            selectedMarkerId={selectedMarkerId}
            handleImagePress={handleImagePress}
            upData={upData}
            setCalloutBox={setCalloutBox}
          />
        )}
      </View>

      <View style={styles.headContainer}>
        <FadeInView key="H0">
          <View style={styles.head}>
            <Icon theme="home" onPress={() => navigation.navigate("Home")} />
            <Dropdown
              theme="incidentDropdown"
              onChangePicker={(value) => handlePickerChange(value)}
              options={typeData}
              setValue={pickerValue}
            />
          </View>
        </FadeInView>
      </View>

      <Modal
        visible={modalVisible}
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <Image
            source={{ uri: selectedImage }}
            style={styles.fullScreenImage}
          />
          <View style={styles.closeButton}>
            <Button
              label="Fermer"
              theme="secondary_small"
              onPress={() => setModalVisible(false)}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  head: {
    marginTop: 30,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  headContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 165,
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
    backgroundColor: "rgba(0, 0, 15, 0.8)",
  },
  container: {
    flex: 1,
  },
  mapContainer: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  calloutBox: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(20, 20, 20, 1)",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  fullScreenImage: {
    width: "100%",
    height: "100%",
    backgroundColor: "black",
  },
  closeButton: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    marginBottom: 65,
    alignItems: "center",
  },
  closeText: {
    color: "#fff",
  },
  dataBox: {
    color: "white",
    fontSize: 16,
    padding: 4,
  },
});
