import { useState, useEffect } from "react";
import { ref, orderByChild, startAt, query, onValue } from "firebase/database";
import { db } from "../../config";

const useTodoCheck = () => {
  const [todoCheck, setTodoCheck] = useState([]);

  useEffect(() => {
    // Créer une requête pour filtrer par date
    const filteredQuery = query(
      ref(db, "reports"),
      orderByChild("date"),
      startAt("28/11/2023") // Utilisez la date d'il y a un mois
    );

    onValue(filteredQuery, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const todoCheck = Object.keys(data)
          .map((key) => ({
            id: key,
            ...data[key],
          }))
          .filter((item) => item.read === false || item.read === "false");

        setTodoCheck(todoCheck);
      } else {
        setTodoCheck([]);
      }
    });
  }, []);

  return { todoCheck };
};

export default useTodoCheck;
