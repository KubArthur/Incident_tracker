import * as Notifications from "expo-notifications";

export const requestNotificationPermission = async () => {
  const { status } = await Notifications.getPermissionsAsync();
  console.log("Notification Permission Status:", status);

  if (status !== "granted") {
    const { status: newStatus } = await Notifications.requestPermissionsAsync();
    console.log("New Permission Status:", newStatus);

    if (newStatus !== "granted") {
      alert("La permission de notification a été refusée.");
      return false;
    }
  }

  return true;
};

export const scheduleNotification = async () => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Nouvelle incident",
      body: "Un nouvelle incident a été remonté.",
    },
    trigger: null,
  });
};
