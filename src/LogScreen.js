import React, { useEffect, useState, useRef } from "react";
import { StyleSheet, View, Text, Image, Modal } from "react-native";
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
import Report from "../components/templates/ReportTemplates";
import Button from "../components/templates/ButtonTemplates";
import { format, sub } from "date-fns";
import StatsBoard from "../components/templates/StatsBoard";

export default function LogPage({ navigation }) {
  const [calloutBox, setCalloutBox] = useState(false);
  const [selectedMarkerId, setSelectedMarkerId] = useState(null);
  const [pickerValue, setPickerValue] = useState("");
  const [monthValue, setMonthValue] = useState("");
  const [yearValue, setYearValue] = useState([]);
  const { typeData } = useConfigTypes();
  const [selectedImage, setSelectedImage] = useState(null);
  const [photoVisible, setPhotoVisible] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [settingsEnable, setSettingsEnable] = useState(false);
  const [statsEnable, setStatsEnable] = useState(false);
  const default_date = sub(new Date(), { weeks: 4 });
  const [timeline, setTimeline] = useState(new Date(default_date).getTime());
  const [archiveEnable, setArchiveEnable] = useState(false);

  const { todoCheck } = useTodoCheck(
    statsEnable,
    archiveEnable,
    pickerValue,
    timeline
  );

  const handlePickerChange = (text) => {
    setPickerValue((prevValues) => ({
      ...prevValues,
      text,
    }));
  };

  const handleYearChange = (text) => {
    setYearValue((prevValues) => ({
      ...prevValues,
      text,
    }));
  };

  const handleImagePress = (imageUrl) => {
    setSelectedImage(imageUrl);
    setPhotoVisible(true);
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
    handleMarkerPress,
    statsEnable,
    yearValue
  );

  const handleScreenTouch = () => {
    setSelectedMarkerId(null);
  };

  const mapRef = useRef(null);

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <MapView
          ref={mapRef}
          style={styles.map}
          customMapStyle={customMapStyle}
          toolbarEnabled={false}
          showsUserLocation={false}
          showsCompass={false}
          initialRegion={{
            latitude: 50.48787067381617,
            longitude: 2.8115017153322697,
            latitudeDelta: 0.034087918155222496,
            longitudeDelta: 0.026976652443408966,
          }}
        >
          {markersToRender}
        </MapView>

        {todoCheck.length === 0 && !statsEnable ? (
          <View style={styles.calloutBox}>
            <FadeInView key="C0">
              <Text style={styles.dataBox}>Aucune nouvelle remontée !</Text>
            </FadeInView>
          </View>
        ) : statsEnable ? (
          <StatsBoard todoCheck={todoCheck} periodes={yearValue} />
        ) : !selectedMarkerId ? (
          <View style={styles.calloutBox}>
            <FadeInView key="C1">
              <Text style={styles.dataBox}>Press un marker...</Text>
            </FadeInView>
          </View>
        ) : selectedMarkerId ? (
          <Report
            todoCheck={todoCheck}
            selectedMarkerId={selectedMarkerId}
            handleImagePress={handleImagePress}
            upData={upData}
            setCalloutBox={setSelectedMarkerId}
          />
        ) : null}
      </View>

      <View style={styles.headContainer}>
        <FadeInView key="H0">
          <View style={styles.head}>
            <View style={styles.panel}>
              <Icon
                theme="center-focus-strong"
                onPress={() => {
                  if (mapRef.current) {
                    mapRef.current.animateToRegion({
                      latitude: 50.48787067381617,
                      longitude: 2.8115017153322697,
                      latitudeDelta: 0.034087918155222496,
                      longitudeDelta: 0.026976652443408966,
                    });
                  }
                }}
              />
              <Icon
                theme="archive-search"
                onPress={() =>
                  archiveEnable
                    ? setArchiveEnable(false)
                    : setArchiveEnable(true)
                }
                effect={archiveEnable}
              />
              <Icon theme="home" onPress={() => navigation.navigate("Home")} />
              <Icon
                theme="stats-chart"
                onPress={() =>
                  statsEnable
                    ? (setStatsEnable(false), setPickerValue(""))
                    : (setStatsEnable(true), setPickerValue(""))
                }
                effect={statsEnable}
              />
              <Icon
                theme="toolBar"
                onPress={() =>
                  settingsEnable
                    ? (setSettingsEnable(false),
                      setDropdownVisible(false))
                    : (setSettingsEnable(true),
                      setDropdownVisible(true))
                }
                effect={settingsEnable}
              />
            </View>
            {dropdownVisible ? (
              <FadeInView key={statsEnable}>
                <View marginBottom={15}>
                  <Dropdown
                    theme="default"
                    onChangePicker={(value) => handlePickerChange(value)}
                    options={typeData}
                    setValue={pickerValue}
                    placeholder="Sélectionner un incident"
                  />
                </View>
                {statsEnable ? (
                  <>
                    <View style={styles.panel} marginBottom={10}>
                      <Text style={{ ...styles.dataBox, marginTop: 10 }}>
                        Période{" "}
                      </Text>
                      <Dropdown
                        theme="years"
                        onChangePicker={(value) => handleYearChange(value)}
                        options={typeData}
                        setValue={yearValue}
                        placeholder="Année"
                      />
                    </View>
                  </>
                ) : null}
              </FadeInView>
            ) : null}
          </View>
        </FadeInView>
      </View>

      <Modal
        visible={photoVisible}
        transparent={true}
        onRequestClose={() => setPhotoVisible(false)}
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
              onPress={() => setPhotoVisible(false)}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  panel: {
    flexDirection: "row",
    justifyContent: "center",
  },
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
