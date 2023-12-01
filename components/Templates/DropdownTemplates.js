import React, { useState } from "react";
import { Text, View } from "react-native";
import Dropdown from "react-native-input-select";
import { format, getYear } from "date-fns";

export default function DropdownTemplates({
  theme,
  onChangePicker,
  options,
  setValue,
  placeholder,
}) {
  const [typeIncident, setTypeIncident] = useState(setValue.text);

  const handlePickerChange = (value) => {
    if (onChangePicker) {
      onChangePicker(value);
    }
  };

  const anneeActuelle = getYear(new Date());

  // Créez un tableau d'années à partir de 2023 jusqu'à l'année actuelle
  const annees = [];
  for (let annee = 2023; annee <= anneeActuelle; annee++) {
    annees.push({ label: annee.toString(), value: annee.toString() });
  }

  return theme === "default" ? (
    <Dropdown
      placeholder={placeholder}
      options={options.map((option) => ({
        label: option,
        value: option,
      }))}
      selectedValue={typeIncident}
      onValueChange={(value) => {
        setTypeIncident(value);
        handlePickerChange(value);
      }}
      listHeaderComponent={
        <Text
          style={{
            color: "deepskyblue",
            fontSize: 22,
            textAlign: "center",
            marginBottom: 10,
            fontWeight: "400",
          }}
        >
          {placeholder}
        </Text>
      }
      primaryColor={"deepskyblue"}
      dropdownStyle={{
        backgroundColor: "none",
        paddingVertical: 10,
        paddingHorizontal: 10,
        minHeight: 40,
        borderColor: "white",
        borderRadius: 6,
        borderWidth: 2,
      }}
      dropdownIconStyle={{ top: -100, right: -100 }}
      dropdownContainerStyle={{ marginBottom: 10, width: 220 }}
      modalOptionsContainerStyle={{
        padding: 10,
        paddingBottom: 10,
        backgroundColor: "rgba(150, 150, 150, 1)",
      }}
      modalBackgroundStyle={{
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      }}
      selectedItemStyle={{
        color: "deepskyblue",
        fontWeight: "700",
        fontSize: 18,
      }}
      placeholderStyle={{
        color: "white",
        fontSize: 18,
        fontWeight: "400",
      }}
      checkboxComponentStyles={{
        checkboxSize: 10,
        checkboxStyle: {
          backgroundColor: "deepskyblue",
          borderRadius: 30, // To get a circle - add the checkboxSize and the padding size
          padding: 5,
        },
        checkboxLabelStyle: { color: "white", fontSize: 20 },
      }}
    />
  ) : theme === "months" ? (
    <Dropdown
      placeholder={placeholder}
      options={[
        { label: "Janvier", value: "01" },
        { label: "Février", value: "02" },
        { label: "Mars", value: "03" },
        { label: "Avril", value: "04" },
        { label: "Mai", value: "05" },
        { label: "Juin", value: "06" },
        { label: "Juillet", value: "07" },
        { label: "Août", value: "08" },
        { label: "Septembre", value: "09" },
        { label: "Octobre", value: "10" },
        { label: "Novembre", value: "11" },
        { label: "Décembre", value: "12" },
      ]}
      selectedValue={typeIncident}
      onValueChange={(value) => {
        setTypeIncident(value);
        handlePickerChange(value);
      }}
      listHeaderComponent={
        <Text
          style={{
            color: "deepskyblue",
            fontSize: 22,
            textAlign: "center",
            marginBottom: 10,
            fontWeight: "400",
          }}
        >
          {placeholder}
        </Text>
      }
      primaryColor={"deepskyblue"}
      dropdownStyle={{
        backgroundColor: "none",
        paddingVertical: 10,
        paddingHorizontal: 10,
        minHeight: 40,
        borderColor: "white",
        borderRadius: 6,
        borderWidth: 2,
      }}
      dropdownIconStyle={{ top: -100, right: -100 }}
      dropdownContainerStyle={{ marginBottom: 10, width: 105 }}
      modalOptionsContainerStyle={{
        padding: 10,
        paddingBottom: 10,
        backgroundColor: "rgba(150, 150, 150, 1)",
      }}
      modalBackgroundStyle={{
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      }}
      selectedItemStyle={{
        color: "deepskyblue",
        fontWeight: "700",
        fontSize: 18,
      }}
      placeholderStyle={{
        color: "white",
        fontSize: 18,
        fontWeight: "400",
      }}
      checkboxComponentStyles={{
        checkboxSize: 10,
        checkboxStyle: {
          backgroundColor: "deepskyblue",
          borderRadius: 30, // To get a circle - add the checkboxSize and the padding size
          padding: 5,
        },
        checkboxLabelStyle: { color: "white", fontSize: 20 },
      }}
    />
  ) : theme === "years" ? (
    <Dropdown
      placeholder={placeholder}
      options={[...annees]}
      selectedValue={typeIncident}
      onValueChange={(value) => {
        setTypeIncident(value);
        handlePickerChange(value);
      }}
      listHeaderComponent={
        <Text
          style={{
            color: "deepskyblue",
            fontSize: 22,
            textAlign: "center",
            marginBottom: 10,
            fontWeight: "400",
          }}
        >
          {placeholder}
        </Text>
      }
      primaryColor={"deepskyblue"}
      dropdownStyle={{
        backgroundColor: "none",
        paddingVertical: 10,
        paddingHorizontal: 10,
        minHeight: 40,
        borderColor: "white",
        borderRadius: 6,
        borderWidth: 2,
      }}
      dropdownIconStyle={{ top: -100, right: -100 }}
      dropdownContainerStyle={{ marginBottom: 10, width: 161 }}
      modalOptionsContainerStyle={{
        padding: 10,
        paddingBottom: 10,
        backgroundColor: "rgba(150, 150, 150, 1)",
      }}
      modalBackgroundStyle={{
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      }}
      selectedItemStyle={{
        color: "deepskyblue",
        fontWeight: "700",
        fontSize: 18,
      }}
      placeholderStyle={{
        color: "white",
        fontSize: 18,
        fontWeight: "400",
      }}
      checkboxComponentStyles={{
        checkboxSize: 10,
        checkboxStyle: {
          backgroundColor: "deepskyblue",
          borderRadius: 30, // To get a circle - add the checkboxSize and the padding size
          padding: 5,
        },
        checkboxLabelStyle: { color: "white", fontSize: 20 },
      }}
    />
  ) : null;
}
