// File: useUniqueTypes.js
import { useState, useEffect } from "react";
import { onValue, ref } from "firebase/database";
import { db } from "../../config";

const useConfigTypes = () => {
  const [typeData, setTypeData] = useState([]);
  const [todoData, setTodoData] = useState([]);

  useEffect(() => {
    const starCountRef = ref(db, "config/");

    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      const todoData = Object.keys(data).map((key) => ({
        id: key,
        ...data[key],
      }));

      const types = todoData.map((item) => {
        return Object.values(item).map((subItem) => {
          if (subItem && subItem.type) {
            return subItem.type;
          }
          return null;
        });
      });

      const flatTypes = types.flat();
      const filteredTypes = [...new Set(flatTypes)];
      const uniqueTypes = filteredTypes.filter((type) => type !== null);

      setTypeData(uniqueTypes);
      setTodoData(todoData);
    });
  }, []);

  return { typeData, todoData };
};

export default useConfigTypes;
