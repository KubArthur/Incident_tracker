import { useEffect } from "react";
import { ref, orderByChild, query, onValue, equalTo } from "firebase/database";
import { db } from "../../config";
import mySingleton from "../Singleton";

const notificationHandler = async (callback) => {
  const request = query(
    ref(db, "reports"),
    orderByChild("read"),
    equalTo(false)
  );

  onValue(request, (snapshot) => {
    const data = snapshot.val();
    const unreadNotificationsExist = data && Object.keys(data).length > 0;
    if (unreadNotificationsExist === null) {
      mySingleton.setNotificationCheck(false);
    } else {
      mySingleton.setNotificationCheck(true);
    }
  });
};

export default notificationHandler;
