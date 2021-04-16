import { StatusBar, Picker } from 'expo-status-bar';
import React from 'react';
import { Text, TouchableOpacity, LogBox } from 'react-native';
import { Icon } from 'react-native-elements';
import { NavigationContainer, useNavigation, getFocusedRouteNameFromRoute  } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import DetailsMission from './src/components/detailsMission.js';
import GalleryPhotoMission from './src/components/gallery.js';
import Rechercher from './src/components/rechercher.js';
import Calendrier from './src/components/calendar.js';
import Planning from './src/components/Planning.js';
import Personnel from './src/components/personnel.js'
import Ajouter from './src/components/ajouter.js'
import AjouterContact from './src/components/ajouterContact.js'

import Login from './src/components/login.js';

////////////// Formulaire MISSION OBSEQUES //////////////

import SelectionTypeObseques from './src/components/formulaire/missions/obseques/SelectionTypeObseques.js'
import IsCeremonie from './src/components/formulaire/missions/obseques/IsCeremonie.js'
import IsArriveeCorps from './src/components/formulaire/missions/obseques/IsArriveeCorps.js'
import ObsequesSecondScreen from './src/components/obsequesSecondScreen.js'
import InfoBiereFermeture from './src/components/formulaire/missions/obseques/InfoBiereFermeture.js'
import ObservationCeremonie from './src/components/formulaire/missions/obseques/ObservationCeremonie.js'
import InfoCimetiere from './src/components/formulaire/missions/obseques/InfoCimetiere.js'

/////////////////////////////////////////////////////////

import FormulaireMission from './src/components/formulaireMission.js'
import InhumOuCrema from './src/components/inhumOuCrema.js'

import MesMissions from './src/components/mesMissions.js'
import ModalView from './src/components/modal.js'
import EditCeremonie from './src/components/editCeremonie.js'

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

LogBox.ignoreLogs(['Setting a timer']);

function Home() {
  return (
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
      <Tab.Screen name="Planning" component={Planning} />
      <Tab.Screen
        name="Contact"
        component={Personnel}/>
        <Tab.Screen
          name="Mes Missions"
          component={MesMissions}/>
    </Tab.Navigator>
  );
}

const HeaderRightPlanning = () => {
  const navigation = useNavigation();
  return ( <Text></Text> );
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
    <Text> </Text>
  );
}

function StackApp() {

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

  return (
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={({ navigation, route }) => ({
            title: 'Connexion',
            headerStyle: {
              backgroundColor: '#033664',
            },
            headerTitleAlign:'center',
            headerTintColor: '#fff',
            headerShown: false
          })}/>
        <Stack.Screen
          name="Planning"
          component={Home}
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
          options={({ navigation, route }) => ({
            title: 'Détails de la mission',
            headerStyle: {
              backgroundColor: '#033664',
            },
            headerTitleAlign:'center',
            headerTintColor: '#fff',
          })}/>
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
                name="SelectionTypeObseques"
                component={SelectionTypeObseques}
                options={{
                  title: 'Obsèques',
                  headerStyle: {
                    backgroundColor: '#033664',
                  },
                  headerTitleAlign:'center',
                  headerTintColor: '#fff',
                }}/>
                <Stack.Screen
                  name="IsCeremonie"
                  component={IsCeremonie}
                  options={{
                    title: 'Obsèques',
                    headerStyle: {
                      backgroundColor: '#033664',
                    },
                    headerTitleAlign:'center',
                    headerTintColor: '#fff',
                  }}/>
                  <Stack.Screen
                    name="IsArriveeCorps"
                    component={IsArriveeCorps}
                    options={{
                      title: 'Obsèques',
                      headerStyle: {
                        backgroundColor: '#033664',
                      },
                      headerTitleAlign:'center',
                      headerTintColor: '#fff',
                    }}/>
                <Stack.Screen
                  name="ObsequesSecondScreen"
                  component={ObsequesSecondScreen}
                  options={{
                    title: 'Cérémonie',
                    headerStyle: {
                      backgroundColor: '#033664',
                    },
                    headerTitleAlign:'center',
                    headerTintColor: '#fff',
                  }}/>
                  <Stack.Screen
                    name="InhumOuCrema"
                    component={InhumOuCrema}
                    options={{
                      title: 'InhumOuCrema',
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
            title: 'Cérémonie',
            headerStyle: {
              backgroundColor: '#033664',
            },
            headerTitleAlign:'center',
            headerTintColor: '#fff',
          }}/>
          <Stack.Screen
            name="InfoBiereFermeture"
            component={InfoBiereFermeture}
            options={{
              title: 'Informations',
              headerStyle: {
                backgroundColor: '#033664',
              },
              headerTitleAlign:'center',
              headerTintColor: '#fff',
            }}/>
          <Stack.Screen
            name="ObservationCeremonie"
            component={ObservationCeremonie}
            options={{
              title: 'Cérémonie',
              headerStyle: {
                backgroundColor: '#033664',
              },
              headerTitleAlign:'center',
              headerTintColor: '#fff',
            }}/>

      <Stack.Screen
        name="InfoCimetiere"
        component={InfoCimetiere}
        options={{
          title: 'Cimetière',
          headerStyle: {
            backgroundColor: '#033664',
          },
          headerTitleAlign:'center',
          headerTintColor: '#fff',
        }}/>
        <Stack.Screen
          name="Modal"
          component={ModalView}
          options={{
            title: 'Modal',
            headerStyle: {
              backgroundColor: '#033664',
            },
            headerTitleAlign:'center',
            headerTintColor: '#fff',
          }}/>
          <Stack.Screen
            name="EditCeremonie"
            component={EditCeremonie}
            options={{
              title: 'Modification',
              headerStyle: {
                backgroundColor: '#033664',
              },
              headerTitleAlign:'center',
              headerTintColor: '#fff',
            }}/>
      </Stack.Navigator>

  );
}

export default function App(){

  return(
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen
        name="Login"
        component={StackApp}
        options={({ route }) => ({
          swipeEnabled: false,
        })}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
