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
            ? 232
            : 195,
      }}
    >
      <FadeInView key={selectedMarkerId}>
        {item && (
          <>
            <Text style={styles.titleBox}>{item.type},</Text>
            <Text style={styles.dataBox}>
              à {item.timestamp}
            </Text>

            {Object.keys(item.inputValues).map((key) => (
              <Text style={styles.dataBox} key={key}>
                {key}: {item.inputValues[key]}
              </Text>
            ))}
            <View style={styles.button}>
              <View style={{ marginRight: 10 }}>
                <Button
                  label=""
                  theme="secondary_picture"
                  onPress={() => handleImagePress(item.image)}
                />
              </View>
              <View style={{ marginLeft: 10 }}>
                <Button
                  theme="secondary_archive"
                  label=""
                  onPress={() => {
                    upData();
                    setCalloutBox(false);
                  }}
                />
              </View>
            </View>
          </>
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
  button: {
    flexDirection: "row",
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});
