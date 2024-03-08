import { Asset } from "expo-asset";
import Test from "../../assets/animal.png";
import Test0 from "../../assets/animal.png";

export default function useMarkersRenderer(
  todoCheck,
  statsEnable,
  periodes,
  pickerValue
) {
  const filteredTodoCheck = statsEnable
    ? todoCheck.filter((item) => {
        const year = new Date(item.timestamp).getFullYear().toString();
        return periodes.text !== undefined
          ? periodes.text.includes(year.toString())
          : null;
      })
    : todoCheck.filter(
        (item) => !pickerValue.text || item.type === pickerValue.text
      );

  const markers = filteredTodoCheck.map((item) => {
    let imageSource;
    switch (item.type) {
      case "Animal errant":
        imageSource = {Test};
        break;
      case "Animal mort":
        imageSource = Test0;
        break;
      case "Dégradations et incidents":
        imageSource = Asset.fromModule(require("../../assets/event.png")).uri;
        break;
      case "Dépôt sauvage":
        imageSource = Asset.fromModule(require("../../assets/waste.png")).uri;
        break;
      case "Éclairage public":
        imageSource = Asset.fromModule(require("../../assets/light.png")).uri;
        break;
      case "Inondation":
        imageSource = Asset.fromModule(require("../../assets/flood.png")).uri;
        break;
      case "Voiture ventouse":
        imageSource = Asset.fromModule(require("../../assets/car.png")).uri;
        break;
      default:
        imageSource = Asset.fromModule(require("../../assets/divers.png")).uri;
    }

    const location = item.location || "";
    const [latitude, longitude] = location.split(";");

    return {
      id: item.id,
      coordinates: [parseFloat(latitude), parseFloat(longitude)],
      imagePath: imageSource,
    };
  });

  return markers;
}
