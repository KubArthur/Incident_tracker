// File: useTodoCheck.js
import { useState, useEffect } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "../../config";

const useTodoCheck = () => {
  const [todoCheck, setTodoCheck] = useState([]);

  useEffect(() => {
    const starCountRef = ref(db, "reports/");

    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      const todoCheck = Object.keys(data)
        .map((key) => ({
          id: key,
          ...data[key],
        }))
        .filter((item) => item.read === false || item.read === "false");

      setTodoCheck(todoCheck);
    });
  }, []);

  return { todoCheck };
};

export default useTodoCheck;
