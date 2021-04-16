import React from "react";
import { NavigationContainer, useNavigation, getFocusedRouteNameFromRoute  } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-elements';

import Login from './src/components/login.js';
import Planning from './src/components/Planning.js';

const Tab = createBottomTabNavigator();

const TabNavigation = () => {

  function getHeaderTitle(route) {
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Planning';
    switch (routeName) {
      case 'Planning':
        return 'Planning';
      case 'Contact':
        return 'Contact';
      case 'Mes Missions':
        return 'Mes Missions';
    }
  }

  function getHeaderRight(route) {
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'Planning';
      switch (routeName) {
        case 'Planning':
          return <HeaderRightPlanning/>;
        case 'Personnel':
          return <HeaderRightContacts/>;
        case 'DetailsMission':
          return <HeaderRightMissions/>;
        case 'Mes Missions':
          return <HeaderRightMissions/>;
      }
    }

  return(
    <Tab.Navigator
      screenOptions={({ route }) => ({
         tabBarIcon: ({ focused, color, size }) => {
           let iconName;
           if (route.name === 'Planning') {
             iconName = 'calendar-today';
           } else if (route.name === 'Contact') {
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
      <Tab.Screen
      name="Planning"
      component={Planning}
      options={({ navigation, route }) => ({
        title: 'Planning',
        headerStyle: {
          backgroundColor: '#033664',
        },
        headerTitleAlign:'center',
        headerTintColor: '#fff',
        headerRight: () => getHeaderRight(route),
       headerLeft: () => (
         <TouchableOpacity>
           <Icon
             style={{ paddingLeft: 10 }}
             name="menu"
             type="material"
             color="#fff" />
           </TouchableOpacity>
      ),
       headerTitle: getHeaderTitle(route, navigation),
      })}
    />
    </Tab.Navigator>
  );
}

export { TabNavigation };
