import React from "react";
import { View, Text, StyleSheet } from "react-native";
import FadeInView from "../effects/Fade";
import Button from "../templates/ButtonTemplates";
import Icon from "./IconTemplates";

const CalloutBox = ({
  todoCheck,
  selectedMarkerId,
  handleImagePress,
  upData,
  setCalloutBox,
}) => {
  const item = todoCheck.find((item) => item.id === selectedMarkerId);

  return (
    <View
      style={{
        ...styles.callout,
        height:
          Object.keys(item?.inputValues || {}).length > 5
            ? 300
            : Object.keys(item?.inputValues || {}).length > 4
            ? 240
            : Object.keys(item?.inputValues || {}).length > 3
            ? 210
            : Object.keys(item?.inputValues || {}).length > 2
            ? 180
            : Object.keys(item?.inputValues || {}).length > 1
            ? 150
            : null,
      }}
    >
      <FadeInView key={selectedMarkerId}>
        {item && (
          <View style={{ flexDirection: "row", flex: 1, alignItems: "center" }}>
            <View style={styles.leftContent}>
              <Text style={styles.titleBox}>{item.type},</Text>
              <Text style={styles.dataBox}>
                le{" "}
                {new Date(item.timestamp).toLocaleString("fr-FR", {
                  year: "numeric",
                  month: "numeric",
                  day: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                })}
              </Text>

              {Object.keys(item.inputValues)
                .reverse()
                .map((key) => {
                  // Vérifier si le dernier caractère est un *
                  const cleanedKey = key.endsWith("*") ? key.slice(0, -1) : key;

                  return (
                    <Text style={styles.dataBox} key={key}>
                      {cleanedKey} : {item.inputValues[key]}
                    </Text>
                  );
                })}
            </View>
            <View style={styles.rightContent}>
              <Icon
                theme="cross"
                onPress={() => {
                  setCalloutBox(false);
                }}
              />
              <Icon
                theme="picture-o"
                onPress={() => handleImagePress(item.image)}
              />
              <Icon
                theme="archive"
                onPress={() => {
                  upData();
                  setCalloutBox(false);
                }}
              />
            </View>
          </View>
        )}
      </FadeInView>
    </View>
  );
};

export default CalloutBox;

const styles = StyleSheet.create({
  callout: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(20, 20, 20, 1)",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  titleBox: {
    color: "white",
    fontSize: 18,
    padding: 4,
  },
  dataBox: {
    color: "white",
    fontSize: 16,
    padding: 4,
    maxWidth: 300,
  },
  leftContent: {
    marginRight: 80,
    minWidth: "70%",
    marginLeft: 15,
  },
  rightContent: {
    position: "absolute",
    top: -30,
    right: 15,
  },
});
