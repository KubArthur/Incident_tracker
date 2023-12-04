import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Board from "./src/Board";
import Form from "./src/Form";
import Home from "./src/Home";
import Camera from "./src/Camera";
import Login from "./src/Login";
import Registration from "./src/Registration";
import {
  ref,
  orderByChild,
  startAt,
  query,
  onValue,
  endAt,
  equalTo,
} from "firebase/database";
import mySingleton from "./components/Singleton";
import { auth, db } from "./config"; // Assurez-vous que le chemin est correct

const Stack = createNativeStackNavigator();

function App() {
  const [ini, setIni] = useState(true);
  const [user, setUser] = useState();
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const onAuthStateChanged = (user) => {
      setUser(user);
      if (ini) setIni(false);
    };

    const fetchUserRole = async () => {
      if (user) {
        const userId = user.uid;
        const starCountRef = ref(db, `users/${userId}/role`);

        onValue(starCountRef, (snapshot) => {
          const role = snapshot.val();
          mySingleton.setRole(role);
          setUserRole(role);
        });
      }
    };

    const subscriber = auth.onAuthStateChanged(onAuthStateChanged);
    fetchUserRole();

    return () => {
      subscriber();
    };
  }, [ini, user]); // Ajoutez les dépendances appropriées ici

  if (!user) {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Registration"
          component={Registration}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    );
  }

  if (userRole === "admin") {
    return (
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Log"
          component={Board}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Form"
          component={Form}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Camera"
          component={Camera}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    );
  }

  if (userRole === "user") {
    return (
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Form"
          component={Form}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Camera"
          component={Camera}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    );
  }
}

export default () => {
  return (
    <NavigationContainer>
      <App />
    </NavigationContainer>
  );
};
