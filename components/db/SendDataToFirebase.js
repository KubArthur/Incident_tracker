import { db, storage } from "../../config";
import { ref, set } from "firebase/database";
import * as FileSystem from "expo-file-system";
import {
  ref as refStorage,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

const sendDataToFirebase = async (
  pickerValue,
  inputValues,
  location,
  image,
  timestamp,
  navigation,
  setUploading,
  setImage,
  setPopupVisible,
  setPopupText
) => {
  if (!pickerValue.text) {
    setPopupVisible(true);
    setPopupText("Sélectionnez un type d'incident.");
    return;
  }

  const isEmpty = Object.entries(inputValues).some(([key, value]) => {
    return key.endsWith("*") && value === "";
  });

  if (isEmpty) {
    setPopupVisible(true);
    setPopupText("Assurez-vous que tous les champs d'entrée sont remplis.");
    return;
  }

  if (!location) {
    setPopupVisible(true);
    setPopupText(
      "Erreur de géolocalisation. Veuillez réessayer en appuyant de nouveau sur Envoyer."
    );
    return;
  }

  if (!image) {
    setPopupVisible(true);
    setPopupText("Prenez une photo en appuyant Camera ");
    return;
  }

  setPopupVisible(true);
  setPopupText("traitement...");

  try {
    setUploading(true);

    // Obtenir des informations sur le fichier image
    const { uri } = await FileSystem.getInfoAsync(image);
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = () => {
        resolve(xhr.response);
      };
      xhr.onerror = (e) => {
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });

    // Créer une référence dans le stockage Firebase
    const filename = image.substring(image.lastIndexOf("/") + 1);
    const storageRef = refStorage(storage, filename);

    // Mettre le fichier image dans le stockage
    await uploadBytes(storageRef, blob);

    // Récupérer la référence de l'image dans le stockage
    const downloadURL = await getDownloadURL(storageRef);

    // Ajouter les données à la base de données Firebase
    set(ref(db, "reports/" + timestamp), {
      type: pickerValue.text,
      timestamp: timestamp,
      location: location,
      inputValues: inputValues,
      image: downloadURL, // Ajouter le lien de téléchargement de l'image
      read: "false",
    });

    // Terminer le processus d'envoi
    setUploading(false);

    // Réinitialiser l'état de l'image
    setImage(null);

    // Naviguer vers l'écran d'accueil
    navigation.navigate("Home");
  } catch (error) {
    console.error(error);
    setUploading(false);
  }
};

export { sendDataToFirebase };
