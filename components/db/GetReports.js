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

const useTodoCheck = (statsEnable, pickerValue) => {
  const [todoCheck, setTodoCheck] = useState([]);

  useEffect(() => {
    let request;
    if (statsEnable) {
      request = query(
        ref(db, "reports"),
        orderByChild("type"),
        equalTo(pickerValue ? pickerValue.text : "none")
      );
    } else {
      request = query(
        ref(db, "reports"),
        orderByChild("read"),
        equalTo("false")
      );
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
  }, [pickerValue]);

  return { todoCheck };
};

export default useTodoCheck;
