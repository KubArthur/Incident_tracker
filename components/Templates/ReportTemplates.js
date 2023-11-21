import React from "react";
import { View, Text, StyleSheet } from "react-native";
import FadeInView from "../effects/Fade";
import Button from "../templates/ButtonTemplates";

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
            ? 308
            : Object.keys(item?.inputValues || {}).length > 4
            ? 301
            : Object.keys(item?.inputValues || {}).length > 3
            ? 274
            : Object.keys(item?.inputValues || {}).length > 2
            ? 247
            : Object.keys(item?.inputValues || {}).length > 1
            ? 222
            : 195,
      }}
    >
      <FadeInView key={selectedMarkerId}>
        {item && (
          <View key={item.id}>
            <Text style={styles.titleBox}>
              {item.type}, {item.date}
            </Text>
            {Object.keys(item.inputValues).map((key) => (
              <Text style={styles.dataBox} key={key}>
                {key}: {item.inputValues[key]}
              </Text>
            ))}
            <View style={{ marginTop: 10 }}>
              <Button
                label="Ouvrir l'image"
                theme="secondary_picture"
                onPress={() => handleImagePress(item.image)}
              />
            </View>
          </View>
        )}
        <Button
          theme="secondary_archive"
          label="archiver"
          onPress={() => {
            upData();
            setCalloutBox(false);
          }}
        />
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
  },
});
