import React from "react";
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

import { createStackNavigator } from "@react-navigation/stack";

import DetailsMission from '../detailsMission.js';
import GalleryPhotoMission from '../gallery.js';
import Rechercher from '../rechercher.js';
import Calendrier from '../calendar.js';
import Planning from '../planning.js';
import Personnel from '../personnel.js'
import Ajouter from '../ajouter.js'
import AjouterContact from '../ajouterContact.js'
import FormulaireMission from '../formulaireMission.js'
import FormulaireMissionStep2 from '../formulaireMission_step2.js'
import MesMissions from '../mesMissions.js'

import { NavigationContainer, useNavigation, getFocusedRouteNameFromRoute  } from '@react-navigation/native';


const Stack = createStackNavigator();

const screenOptionStyle = {
  headerStyle: {
    backgroundColor: "#9AC4F8",
  },
  headerTintColor: "white",
  headerBackTitle: "Back",
};

const HeaderRightPlanning = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity style={{ justifyContent:'center', paddingRight:10 }} onPress={() => navigation.navigate('Ajouter')}>
      <Icon
        name="add"
        type="material"
        color="#fff"
      />
      <Text style={{color:'white'}}>Ajouter</Text>
    </TouchableOpacity>
  );
}

const HeaderRightContacts = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity style={{ justifyContent:'center', paddingRight:10 }} onPress={() => navigation.navigate('AjouterContact')}>
      <Icon
        name="add"
        type="material"
        color="#fff"
      />
      <Text style={{color:'white'}}>Ajouter</Text>
    </TouchableOpacity>
  );
}

const HeaderRightMissions = () => {
  return (
    <Text></Text>
  );
}

const MainStackNavigator = () => {

  function getHeaderTitle(route) {
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Planning';
    switch (routeName) {
      case 'Planning':
        return 'Planning';
      case 'Personnel':
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
      case 'Mes Missions':
        return <HeaderRightMissions/>;
    }
  }

  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen
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
           <TouchableOpacity onPress={() => navigation.openDrawer()}>
             <Icon
               style={{ paddingLeft: 10 }}
               name="menu"
               type="material"
               color="#fff" />
             </TouchableOpacity>
        ),
         headerTitle: getHeaderTitle(route, navigation),
        })}
        initialParams={{ itemId: 42 }}

      />
      <Stack.Screen
        name="DetailsMission"
        component={DetailsMission}
        options={{
          title: 'Détails de la mission',
          headerStyle: {
            backgroundColor: '#033664',
          },
          headerTitleAlign:'center',
          headerTintColor: '#fff',
        }}/>
      <Stack.Screen
        name="GalleryPhotoMission"
        component={GalleryPhotoMission}
        options={{
          title: 'Détails de la mission',
          headerStyle: {
            backgroundColor: '#033664',
          },
          headerTitleAlign:'center',
          headerTintColor: '#fff',
        }}/>
        <Stack.Screen
          name="Ajouter"
          component={Ajouter}
          options={{
            title: 'Créer une mission',
            headerStyle: {
              backgroundColor: '#033664',
            },
            headerTitleAlign:'center',
            headerTintColor: '#fff',
          }}/>
        <Stack.Screen
          name="AjouterContact"
          component={AjouterContact}
          options={{
            title: 'Ajouter un contact',
            headerStyle: {
              backgroundColor: '#033664',
            },
            headerTitleAlign:'center',
            headerTintColor: '#fff',
          }}/>
        <Stack.Screen
          name="FormulaireMission"
          component={FormulaireMission}
          options={{
            title: 'Formulaire Mission',
            headerStyle: {
              backgroundColor: '#033664',
            },
            headerTitleAlign:'center',
            headerTintColor: '#fff',
          }}/>

      <Stack.Screen
        name="FormulaireMissionStep2"
        component={FormulaireMissionStep2}
        options={{
          title: 'Informations Cimetière',
          headerStyle: {
            backgroundColor: '#033664',
          },
          headerTitleAlign:'center',
          headerTintColor: '#fff',
        }}/>
    </Stack.Navigator>
  );
}

const ContactStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="About" component={About} />
    </Stack.Navigator>
  );
}

export { MainStackNavigator, ContactStackNavigator };
