import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  Modal,
  SafeAreaView,
  StatusBar,
  Platform,
} from "react-native";
import Icon from "../components/templates/Icons";
import Dropdown from "../components/templates/Dropdowns";
import { db } from "../config";
import { ref, set } from "firebase/database";
import useConfigTypes from "../components/db/GetConfig";
import customMapStyle from "../components/templates/MapStyle";
import useTodoCheck from "../components/db/GetReports";
import FadeInView from "../components/effects/Fade";
import useMarkersRenderer from "../components/templates/Markers";
import Report from "../components/templates/Reports";
import Button from "../components/templates/Buttons";
import { format, sub } from "date-fns";
import StatsBoard from "../components/templates/StatsBoard";
import MapComponent from "../components/Map";



export default function LogPage({ navigation }) {
  const [calloutBox, setCalloutBox] = useState(false);
const [selectedMarkerId, setSelectedMarkerId] = useState(null);
const [monthValue, setMonthValue] = useState("");
const [yearValue, setYearValue] = useState([]);
const { typeData } = useConfigTypes();
const [selectedImage, setSelectedImage] = useState(null);
const [photoVisible, setPhotoVisible] = useState(false);
const [dropdownVisible, setDropdownVisible] = useState(false);
const [settingsEnable, setSettingsEnable] = useState(false);
const default_date = sub(new Date(), { weeks: 4 });
const [resetCounter, setResetCounter] = useState(0);
const mapRef = useRef(null);
const [pickerValue, setPickerValue] = useState("");
const [timeline, setTimeline] = useState(new Date(default_date).getTime());
const [archiveEnable, setArchiveEnable] = useState(false);
const [statsEnable, setStatsEnable] = useState(false);

const { todoCheck } = useTodoCheck(
  statsEnable,
  archiveEnable,
  pickerValue,
  timeline
);

  const handleResetMap = () => {
    setResetCounter((prevCounter) => prevCounter + 1);

    const markerIdToZoom = 2;

    if (mapRef.current) {
      mapRef.current.postMessage(markerIdToZoom.toString());
    }
  };

  const handleMessage = (data) => {
    
    if (data !== "resetComplete") {
      setSelectedMarkerId(data);
      setCalloutBox(true);
    }
  };

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

  const upData = () => {
    set(ref(db, `reports/${selectedMarkerId}/read`), true);
  };

  const markers = useMarkersRenderer(
    todoCheck,
    statsEnable,
    yearValue,
    pickerValue
  );

  return (
    <SafeAreaView style={styles.container}>
      <View key={resetCounter} style={styles.board}>
        <MapComponent
          key={resetCounter}
          ref={mapRef}
          markers={markers}
          onMessage={handleMessage}
          resetCounter={resetCounter}
        />
        <Button title="Reset Map" onPress={handleResetMap} />

        {todoCheck.length === 0 && !statsEnable ? (
          <View style={styles.calloutBox}>
            <FadeInView key="C0">
              <Text style={styles.dataBox}>
                Aucune nouvelle remontée d'incident !
              </Text>
            </FadeInView>
          </View>
        ) : statsEnable ? (
          <StatsBoard todoCheck={todoCheck} periodes={yearValue} />
        ) : !selectedMarkerId ? (
          <View style={styles.calloutBox}>
            <FadeInView key="C1">
              <Text style={styles.dataBox}>
                Sélectionner un incident sur la carte...
              </Text>
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
            <View
              style={[styles.panel, Platform.OS === "ios" && { marginTop: 20 }]}
            >
              <Icon theme="center-focus-strong" onPress={handleResetMap} />
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
                    : (setStatsEnable(true),
                      setPickerValue(""),
                      setYearValue([]))
                }
                effect={statsEnable}
              />
              <Icon
                theme="toolBar"
                onPress={() =>
                  settingsEnable
                    ? (setSettingsEnable(false), setDropdownVisible(false))
                    : (setSettingsEnable(true), setDropdownVisible(true))
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
                    <View marginBottom={10}>
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
    </SafeAreaView>
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
  board: {
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
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(20, 20, 20, 1)",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
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
