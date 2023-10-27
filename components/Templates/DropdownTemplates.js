import React, { useState, useEffect } from "react";
import Dropdown from "react-native-input-select";

export default function DropdownTemplates({ theme, onChangePicker, options }) {
  const [typeIncident, setTypeIncident] = useState();

  const handlePickerChange = (value) => {
    if (onChangePicker) {
      onChangePicker(value);
    }
  };

  return theme === "incidentDropdown" ? (
    <Dropdown
      placeholder="Le type d'incident..."
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
      dropdownIconStyle={{ top: 15, right: 10, color: "white" }}
      dropdownContainerStyle={{ marginBottom: 10, width: 220 }}
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
    />
  ) : null;
}
