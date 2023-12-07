import React from "react";
import Dropdown from "./Dropdowns";
import Input from "./Inputs";

export default function DynamicFormInputs({
  pickerValue,
  handleTextInputChange,
  data,
}) {
  const conditionalInputs = [];

  data.forEach((item) => {
    Object.values(item).forEach((subItem) => {
      if (subItem.type === pickerValue.text) {
        const dataString = subItem.data;
        if (dataString) {
          const parts = dataString.split(";");
          parts.forEach((part, index) => {
            const placeholder = part.trim();

            if (placeholder.includes("[")) {
              const bracketIndex = placeholder.indexOf("[");
              const dropholder = placeholder.substring(0, bracketIndex).trim();
              const array = JSON.parse(
                "[" + placeholder.substring(bracketIndex + 1)
              );
              conditionalInputs.push(
                <Dropdown
                  key={index}
                  theme="default"
                  onChangePicker={(value) =>
                    handleTextInputChange(dropholder, value)
                  }
                  options={array}
                  placeholder={dropholder}
                  setValue=""
                />
              );
            } else {
              conditionalInputs.push(
                <Input
                  key={index}
                  placeholder={placeholder}
                  onChangeText={(text) =>
                    handleTextInputChange(placeholder, text)
                  }
                />
              );
            }
          });
        }
      }
    });
  });

  return <>{conditionalInputs}</>;
}
