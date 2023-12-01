import React from "react";
import { View, Text, StyleSheet } from "react-native";

const StatsBoard = ({ todoCheck, periodes }) => {
  // Convertir les timestamps en objets Date
  const itemsWithDate = todoCheck.map((item) => ({
    type: item.type,
    timestamp: item.timestamp,
    date: new Date(item.timestamp),
  }));

  // Trier les éléments par date
  const sortedItems = itemsWithDate.sort((a, b) => a.date - b.date);

  // Filtrer les éléments en fonction de la période spécifiée
  const filteredItems = sortedItems.filter((item) => {
    const year = item.date.getFullYear();
    return year.toString() === periodes.text;
    //return periodes.includes(year.toString());
  });

  // Séparer les éléments par année et par mois
  const groupedItems = filteredItems.reduce((acc, item) => {
    const year = item.date.getFullYear();
    const month = item.date.getMonth() + 1; // Les mois commencent à partir de 0
    if (!acc[year]) {
      acc[year] = {};
    }
    if (!acc[year][month]) {
      acc[year][month] = [];
    }
    acc[year][month].push(item);
    return acc;
  }, {});

  // Obtenir le nombre de types par mois
  const typesPerMonth = Object.keys(groupedItems).reduce((result, year) => {
    result[year] = {};
    Object.keys(groupedItems[year]).forEach((month) => {
      result[year][month] = groupedItems[year][month].length;
    });
    return result;
  }, {});

  console.log("Nombre de types par mois :", typesPerMonth);

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
        height: 180, // Ajustez la hauteur en fonction du nombre d'années
      }}
    >
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
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
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
});
