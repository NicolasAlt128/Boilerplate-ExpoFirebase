import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';

import { LoginNavigator, DrawerNavigation } from './StackNavigation';

const Stack = createStackNavigator();

const App = () => {
  return(
    <NavigationContainer>
      <LoginNavigator />
    </NavigationContainer>
  );
}

export default App;
