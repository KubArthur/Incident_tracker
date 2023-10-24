import React from "react";
import { View } from "react-native";
import Icon from "../components/templates/IconTemplates";

export default function LogPage({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Icon theme="home" onPress={() => navigation.navigate("Home")} />
    </View>
  );
}
