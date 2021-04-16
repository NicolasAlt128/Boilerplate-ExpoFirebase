import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from 'react-native-elements';

import { MainStackNavigator, ContactStackNavigator } from "./StackNavigator";

import Planning from '../planning.js';
import Personnel from '../personnel.js'
import MesMissions from '../mesMissions.js'

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
           tabBarIcon: ({ focused, color, size }) => {
             let iconName;
             if (route.name === 'Planning') {
               iconName = 'calendar-today';
             } else if (route.name === 'Personnel') {
               iconName = 'contact-phone';
             } else if (route.name === 'Mes Missions') {
               iconName = 'assignment';
             }
             return <Icon name={iconName} type='material' size={size} color={color} />;
           },
         })}
         tabBarOptions={{
           activeTintColor: 'white',
           inactiveTintColor: 'gray',
           activeBackgroundColor: '#033664',
           inactiveBackgroundColor: '#033664',
         }}>
      <Tab.Screen name="Planning" component={MainStackNavigator} />
      <Tab.Screen
        name="Personnel"
        component={Personnel}/>
        <Tab.Screen
          name="Mes Missions"
          component={MesMissions}/>
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
