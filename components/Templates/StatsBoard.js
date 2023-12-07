import React from "react";
import { View, Text, StyleSheet } from "react-native";

const StatsBoard = ({ todoCheck, periodes }) => {
  const itemsWithDate = todoCheck.map((item) => ({
    type: item.type,
    timestamp: item.timestamp,
    date: new Date(item.timestamp),
  }));

  const sortedItems = itemsWithDate.sort((a, b) => a.date - b.date);

  const filteredItems = sortedItems.filter((item) => {
    const year = item.date.getFullYear();
    return periodes.text !== undefined
      ? periodes.text.includes(year.toString())
      : null;
  });

  const groupedItems = filteredItems.reduce((acc, item) => {
    const year = item.date.getFullYear();
    const month = item.date.getMonth() + 1;
    if (!acc[year]) {
      acc[year] = {};
    }
    if (!acc[year][month]) {
      acc[year][month] = [];
    }
    acc[year][month].push(item);
    return acc;
  }, {});
  
  const typesPerMonth = Object.keys(groupedItems).reduce((result, year) => {
    result[year] = {};
    Object.keys(groupedItems[year]).forEach((month) => {
      result[year][month] = groupedItems[year][month].length;
    });
    return result;
  }, {});

  const monthNames = [
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

  return (
    <View
      style={{
        ...styles.callout,
        height: Object.keys(typesPerMonth).length > 0 ? 65 + 25 * Object.keys(typesPerMonth).length : 50, // Ajustez la hauteur en fonction du nombre d'années
      }}
    >
      {Object.keys(typesPerMonth).length > 0 ? (
        <>
          <View style={styles.tableHeader}>
            <Text style={styles.headerCell}></Text>
            {monthNames.map((monthName, index) => (
              <Text key={index} style={styles.headerCell}>
                {monthName}
              </Text>
            ))}
          </View>
          {Object.keys(typesPerMonth).map((year) => (
            <View key={year} style={styles.tableRow}>
              <Text style={styles.rowHeader}>{year}</Text>
              {monthNames.map((monthName, index) => (
                <Text key={index} style={styles.tableCell}>
                  {typesPerMonth[year][index + 1] || 0}
                </Text>
              ))}
            </View>
          ))}
        </>
      ) : (
        <View style={styles.noStatsContainer}>
          <Text style={styles.noStatsText}>Aucune stats</Text>
        </View>
      )}
    </View>
  );
};

export default StatsBoard;

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
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  tableHeader: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "white",
    paddingBottom: 5,
  },
  headerCell: {
    flex: 1,
    color: "white",
    textAlign: "center",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "white",
    paddingTop: 5,
    paddingBottom: 5,
  },
  rowHeader: {
    color: "white",
    width: 27,
  },
  tableCell: {
    flex: 1,
    color: "white",
    textAlign: "center",
  },
  noStatsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noStatsText: {
    color: "white",
    fontSize: 16,
  },
});
