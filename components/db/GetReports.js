import { useState, useEffect } from "react";
import {
  ref,
  orderByChild,
  startAt,
  query,
  onValue,
  endAt,
  equalTo,
} from "firebase/database";
import { db } from "../../config";

const useTodoCheck = (
  statsEnable,
  archiveEnable,
  pickerValue,
  default_date
) => {
  const [todoCheck, setTodoCheck] = useState([]);

  useEffect(() => {
    let request;
    if (statsEnable) {
      request = query(
        ref(db, "reports"),
        orderByChild("type"),
        equalTo(pickerValue && pickerValue.text ? pickerValue.text : "none")
      );
    } else if (archiveEnable) {
      request = query(
        ref(db, "reports"),
        orderByChild("timestamp"),
        startAt(default_date)
      );
    } else {
      request = query(ref(db, "reports"), orderByChild("read"), equalTo(false));
    }

    onValue(request, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const todoCheck = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));

        setTodoCheck(todoCheck);
      } else {
        setTodoCheck([]);
      }
    });
  }, [pickerValue, archiveEnable, statsEnable]);

  

  return { todoCheck };
};

export default useTodoCheck;
