import React from "react";
import { View, Text } from "react-native";
import { BarChart } from "react-native-chart-kit";

const MonthlyEventChart = ({ datasets }) => {
  const months = [
    "Ja",
    "Fe",
    "Ma",
    "Ap",
    "Ma",
    "Ju",
    "Ju",
    "Au",
    "Se",
    "Oc",
    "No",
    "De",
  ];

  const chartConfig = {
    backgroundGradientFrom: "#fff",
    backgroundGradientTo: "#fff",
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(255, 160, 50, ${opacity})`,
  };

  return (
    <View>
      {/* Superposer plusieurs jeux de données sur le même graphe */}
      <BarChart
        data={{
          labels: months,
          datasets: datasets,
        }}
        width={300}
        height={200}
        yAxisLabel=""
        yAxisSuffix=""
        chartConfig={chartConfig}
        style={{ marginVertical: 8, borderRadius: 16 }}
      />
    </View>
  );
};

export default MonthlyEventChart;
