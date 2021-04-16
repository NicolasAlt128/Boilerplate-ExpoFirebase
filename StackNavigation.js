import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Login from './src/components/login.js';

import { TabNavigation } from './TabNavigation';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const LoginNavigator = () => {
  return(
    <Drawer.Navigator>
      <Drawer.Screen name="Login" component={Login} />
      <Drawer.Screen name="DrawerNavigation" component={DrawerNavigation} />
    </Drawer.Navigator>
  );
}

const DrawerNavigation = () => {
  return(
    <Drawer.Navigator>
      <Drawer.Screen name="TabNavigation" component={TabNavigation} />
    </Drawer.Navigator>
  );
}

export { LoginNavigator, DrawerNavigation };
