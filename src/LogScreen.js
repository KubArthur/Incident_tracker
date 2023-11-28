import React, { useEffect, useState } from "react";
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
import CalloutBox from "../components/templates/ReportTemplates";
import Button from "../components/templates/ButtonTemplates";
import { format, sub } from "date-fns";

export default function LogPage({ navigation }) {
  const [calloutBox, setCalloutBox] = useState(false);
  const [selectedMarkerId, setSelectedMarkerId] = useState(null);
  const [pickerValue, setPickerValue] = useState("");
  const [monthValue, setMonthValue] = useState("");
  const [yearValue, setYearValue] = useState("");
  const { typeData } = useConfigTypes();
  const [selectedImage, setSelectedImage] = useState(null);
  const [photoVisible, setPhotoVisible] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [settingsEnable, setSettingsEnable] = useState(false);
  const [statsEnable, setStatsEnable] = useState(false);
  const default_date = sub(new Date(), { weeks: 4 });
  const [timeline, setTimeline] = useState(new Date(default_date).getTime());
  const [archiveEnable, setArchiveEnable] = useState(false);

  useEffect(() => {
    if (
      statsEnable &&
      monthValue &&
      monthValue.text &&
      yearValue &&
      yearValue.text
    ) {
      const month = parseInt(monthValue.text, 10);
      const year = parseInt(yearValue.text, 10);

      const timestamp = new Date(year, month - 1, 1).getTime();

      setTimeline(timestamp);
    } else {
      setTimeline(new Date(default_date).getTime());
    }
  }, [statsEnable, monthValue, yearValue]);

  const { todoCheck } = useTodoCheck(statsEnable, pickerValue);

  const handlePickerChange = (text) => {
    setPickerValue((prevValues) => ({
      ...prevValues,
      text,
    }));
  };

  const handleMonthChange = (text) => {
    setMonthValue((prevValues) => ({
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
    setphotoVisible(true);
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
            latitude: 50.48787067381617,
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
              <Text style={styles.dataBox}>Press un marker...</Text>
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
            <View style={styles.panel}>
              <Icon theme="center-focus-strong" onPress={""} />
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
                      setPickerValue(""),
                      setDropdownVisible(false))
                    : (setSettingsEnable(true),
                      setPickerValue(""),
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
                      <Text style={{ ...styles.dataBox, marginTop:10 }}>De</Text>
                      <View marginRight={10} marginLeft={10}>
                        <Dropdown
                          theme="months"
                          onChangePicker={(value) => handleMonthChange(value)}
                          options={typeData}
                          setValue={pickerValue}
                          placeholder="Mois"
                        />
                      </View>
                      <Dropdown
                        theme="years"
                        onChangePicker={(value) => handleYearChange(value)}
                        options={typeData}
                        setValue={pickerValue}
                        placeholder="Année"
                      />
                    </View>
                    <View style={styles.panel} marginBottom={20}>
                      <Text style={{ ...styles.dataBox, marginTop:10 }}> À </Text>
                      <View marginRight={10} marginLeft={10}>
                        <Dropdown
                          theme="months"
                          onChangePicker={(value) => handleMonthChange(value)}
                          options={typeData}
                          setValue={pickerValue}
                          placeholder="Mois"
                        />
                      </View>
                      <Dropdown
                        theme="years"
                        onChangePicker={(value) => handleYearChange(value)}
                        options={typeData}
                        setValue={pickerValue}
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
