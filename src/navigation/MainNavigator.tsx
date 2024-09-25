import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { mergedStacks } from "./ScreenCollections";
import { WSProvider } from "../utils/WSProvider";

const Stack = createNativeStackNavigator();

const MainNavigator = () => {
  return (
    <WSProvider>
      <Stack.Navigator
        screenOptions={() => ({
          headerShown: false,
        })}
        initialRouteName="SplashScreen"
      >
        {mergedStacks.map((item, index) => {
          return (
            <Stack.Screen
              key={index}
              name={item.name}
              component={item.component}
            />
          );
        })}
      </Stack.Navigator>
    </WSProvider>
  );
};

export default MainNavigator;
