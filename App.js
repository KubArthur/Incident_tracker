import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LogPage from "./components/Pages/LogPage";
import FormPage from "./components/Pages/FormPage";
import HomePage from "./components/Pages/HomePage";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomePage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Log"
          component={LogPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Form"
          component={FormPage}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
