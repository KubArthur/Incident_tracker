import React, { useState } from "react";
import Dropdown from "react-native-input-select";

export default function DropdownTemplates({
  theme,
  onChangePicker,
  options,
  setValue,
}) {
  const [typeIncident, setTypeIncident] = useState(setValue.text);

  const handlePickerChange = (value) => {
    if (onChangePicker) {
      onChangePicker(value);
    }
  };

  return theme === "incidentDropdown" ? (
    <Dropdown
      placeholder="Sélectionner un incident"
      options={options.map((option) => ({
        label: option,
        value: option,
      }))}
      selectedValue={typeIncident}
      onValueChange={(value) => {
        setTypeIncident(value);
        handlePickerChange(value);
      }}
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
  ) : null;
}