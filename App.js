import React from 'react';
import { Text, TouchableOpacity, LogBox } from 'react-native';
import { Icon } from 'react-native-elements';
import { NavigationContainer, useNavigation, getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import CustomDrawerContent from './DrawerCustom.js'

import { Provider } from 'react-redux';
import Store from './Store/configureStore';

import DetailsMission from './src/components/detailsMission.js';
import GalleryMission from './src/components/GalleryMission.js';
import Notifications from './src/components/Notifications.js';
import Planning from './src/components/Planning.js';
import Contacts from './src/components/personnel.js'
import Ajouter from './src/components/ajouter.js'
import AjouterContacts from './src/components/AjouterContacts.js'

import Login from './src/components/login.js';

////////////// Formulaire MISSION OBSEQUES //////////////

import SelectionTypeObseques from './src/components/formulaire/missions/obseques/SelectionTypeObseques.js'
import InfoDefunt from './src/components/infoDefunt'
import IsCeremonie from './src/components/formulaire/missions/obseques/IsCeremonie.js'
import IsArriveeCorps from './src/components/formulaire/missions/obseques/IsArriveeCorps.js'
import ObsequesSecondScreen from './src/components/obsequesSecondScreen.js'
import InfoBiereFermeture from './src/components/formulaire/missions/obseques/InfoBiereFermeture.js'
import ObservationCeremonie from './src/components/formulaire/missions/obseques/ObservationCeremonie.js'
import ObservationsCimetiere from './src/components/formulaire/missions/obseques/ObservationsCimetiere.js'
import ObservationsCremation from './src/components/formulaire/missions/obseques/ObservationsCremation.js'
import InfoCimetiere from './src/components/formulaire/missions/obseques/InfoCimetiere.js'
import PhotoObseques from './src/components/PhotoObseques.js'
import AjouterPhotoObseques from './src/components/AjouterPhotoObseques.js'
import InfoCrema from './src/components/InfoCrema.js'


////////////// Formulaire MISSION MARBRERIE //////////////

import FormulaireMaconnerie from './src/components/FormulaireMaconnerie.js'
import PhotoMaconnerie from './src/components/PhotoMaconnerie.js'
import AjouterPhotoMaconnerie from './src/components/AjouterPhotoMaconnerie.js'

////////////// Formulaire MISSION GRAVURE //////////////

import FormulaireGravure from './src/components/FormulaireGravure.js'
import PhotoGravure from './src/components/PhotoGravure.js'
import AjouterPhotoGravure from './src/components/AjouterPhotoGravure.js'

////////////// Formulaire MISSION TRANSPORT //////////////

import FormulaireTransport from './src/components/FormulaireTransport.js'
import PhotoTransport from './src/components/PhotoTransport.js'
import AjouterPhotoTransport from './src/components/AjouterPhotoTransport.js'

////////////// Formulaire MISSION OUVERTURE //////////////

import FormulaireOuverture from './src/components/FormulaireOuverture.js'
import PhotoOuverture from './src/components/PhotoOuverture.js'
import AjouterPhotoOuverture from './src/components/AjouterPhotoOuverture.js'

//////////////////////////////////////////////////////////

import Assignation from './src/components/Assignation.js'

// import FormulaireMission from './src/components/formulaireMission.js'
import InhumOuCrema from './src/components/inhumOuCrema.js'

import MesMissions from './src/components/mesMissions.js'
import ModalView from './src/components/modal.js'
import EditCeremonie from './src/components/editCeremonie.js'

import ManageUsers from './src/components/ManageUsers.js'
import AjouterProfil from './src/components/AjouterProfil.js'
import DetailsUser from './src/components/DetailsUser.js'

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const ManageUserStack = createStackNavigator();

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
        component={Contacts}/>
{/*        <Tab.Screen
          name="Mes Missions"
          component={MesMissions}/>*/}
    </Tab.Navigator>
  );
}

const HeaderRightPlanning = () => {
  const navigation = useNavigation();
  return ( <Text></Text> );
}

const HeaderRightContacts = () => {
  const navigation = useNavigation();
  return null
}

const HeaderRightMissions = () => {
  return (
    <Text> </Text>
  );
}

function ManageUsersNav(){
  return(
    <ManageUserStack.Navigator>
      <ManageUserStack.Screen
        name="Gestion des utilisateurs"
        component={ManageUsers}
        options={({ navigation, route }) => ({
          title: 'Gestion des utilisateurs',
          headerStyle: {
            backgroundColor: '#033664',
          },
          headerTitleAlign:'center',
          headerTintColor: '#fff',
           headerLeft: () => (
             <TouchableOpacity onPress={() => navigation.goBack()}>
               <Icon
                 style={{ paddingLeft: 10 }}
                 name="arrow-back"
                 type="material"
                 color="#fff" />
               </TouchableOpacity>
          )
        })}/>
        <ManageUserStack.Screen
          name="AjouterProfil"
          component={AjouterProfil}
          options={({ navigation, route }) => ({
            title: 'Ajouter un Profil',
            headerStyle: {
              backgroundColor: '#033664',
            },
            headerTitleAlign:'center',
            headerTintColor: '#fff',
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon
                  style={{ paddingLeft: 10 }}
                  name="arrow-back"
                  type="material"
                   color="#fff" />
              </TouchableOpacity>
            )
          })}/>
      <ManageUserStack.Screen
        name="DetailsUser"
        component={DetailsUser}
        options={({ navigation, route }) => ({
          title: 'Détails de l\'utilisateur',
          headerStyle: {
            backgroundColor: '#033664',
          },
          headerTitleAlign:'center',
          headerTintColor: '#fff',
           headerLeft: () => (
             <TouchableOpacity onPress={() => navigation.goBack()}>
               <Icon
                 style={{ paddingLeft: 10 }}
                 name="arrow-back"
                 type="material"
                 color="#fff" />
               </TouchableOpacity>
          )
        })}/>
    </ManageUserStack.Navigator>
  )
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
      case 'Contacts':
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
          })}
        />
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
          })}
        />
        <Stack.Screen
          name="GalleryMission"
          component={GalleryMission}
          options={{
            title: 'Détails de la mission',
            headerStyle: {
              backgroundColor: '#033664',
            },
            headerTitleAlign:'center',
            headerTintColor: '#fff',
          }}
        />
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
          }}
        />
        <Stack.Screen
          name="AjouterContacts"
          component={AjouterContacts}
          options={{
            title: 'Ajouter un contact',
            headerStyle: {
              backgroundColor: '#033664',
            },
            headerTitleAlign:'center',
            headerTintColor: '#fff',
          }}
        />
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
          }}
        />
        <Stack.Screen
          name="InfoDefunt"
          component={InfoDefunt}
          options={{
            title: 'Obsèques',
            headerStyle: {
              backgroundColor: '#033664',
            },
            headerTitleAlign:'center',
            headerTintColor: '#fff',
          }}
        />

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
          }}
        />
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
          }}
        />
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
          }}
        />
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
          }}
        />
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
          }}
        />
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
          }}
        />
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
          }}
        />
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
          }}
        />
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
          }}
        />
        <Stack.Screen
          name="FormulaireMaconnerie"
          component={FormulaireMaconnerie}
          options={{
            title: 'Maçonnerie',
            headerStyle: {
              backgroundColor: '#033664',
            },
            headerTitleAlign:'center',
            headerTintColor: '#fff',
          }}
        />
        <Stack.Screen
          name="AjouterPhotoMaconnerie"
          component={AjouterPhotoMaconnerie}
          options={{
            title: 'Maçonnerie',
            headerStyle: {
              backgroundColor: '#033664',
            },
            headerTitleAlign:'center',
            headerTintColor: '#fff',
          }}
        />
        <Stack.Screen
          name="PhotoMaconnerie"
          component={PhotoMaconnerie}
          options={{
            title: 'Maçonnerie',
            headerStyle: {
              backgroundColor: '#033664',
            },
            headerTitleAlign:'center',
            headerTintColor: '#fff',
          }}
        />
        <Stack.Screen
          name="PhotoObseques"
          component={PhotoObseques}
          options={{
            title: 'Obsèques',
            headerStyle: {
              backgroundColor: '#033664',
            },
            headerTitleAlign:'center',
            headerTintColor: '#fff',
          }}
        />
        <Stack.Screen
          name="AjouterPhotoObseques"
          component={AjouterPhotoObseques}
          options={{
            title: 'Obsèques',
            headerStyle: {
              backgroundColor: '#033664',
            },
            headerTitleAlign:'center',
            headerTintColor: '#fff',
          }}
        />
        <Stack.Screen
          name="ObservationsCimetiere"
          component={ObservationsCimetiere}
          options={{
            title: 'Cimetière',
            headerStyle: {
              backgroundColor: '#033664',
            },
            headerTitleAlign:'center',
            headerTintColor: '#fff',
          }}
        />
        <Stack.Screen
          name="FormulaireGravure"
          component={FormulaireGravure}
          options={{
            title: 'Gravure',
            headerStyle: {
              backgroundColor: '#033664',
            },
            headerTitleAlign:'center',
            headerTintColor: '#fff',
          }}
        />
        <Stack.Screen
          name="AjouterPhotoGravure"
          component={AjouterPhotoGravure}
          options={{
            title: 'Gravure',
            headerStyle: {
              backgroundColor: '#033664',
            },
            headerTitleAlign:'center',
            headerTintColor: '#fff',
          }}
        />
        <Stack.Screen
          name="PhotoGravure"
          component={PhotoGravure}
          options={{
            title: 'Gravure',
            headerStyle: {
              backgroundColor: '#033664',
            },
            headerTitleAlign:'center',
            headerTintColor: '#fff',
          }}
        />
        <Stack.Screen
          name="FormulaireTransport"
          component={FormulaireTransport}
          options={{
            title: 'Transport',
            headerStyle: {
              backgroundColor: '#033664',
            },
            headerTitleAlign:'center',
            headerTintColor: '#fff',
          }}
        />
        <Stack.Screen
          name="AjouterPhotoTransport"
          component={AjouterPhotoTransport}
          options={{
            title: 'Transport',
            headerStyle: {
              backgroundColor: '#033664',
            },
            headerTitleAlign:'center',
            headerTintColor: '#fff',
          }}
        />
        <Stack.Screen
          name="PhotoTransport"
          component={PhotoTransport}
          options={{
            title: 'Transport',
            headerStyle: {
              backgroundColor: '#033664',
            },
            headerTitleAlign:'center',
            headerTintColor: '#fff',
          }}
        />
        <Stack.Screen
          name="FormulaireOuverture"
          component={FormulaireOuverture}
          options={{
            title: 'Ouverture',
            headerStyle: {
              backgroundColor: '#033664',
            },
            headerTitleAlign:'center',
            headerTintColor: '#fff',
          }}
        />
        <Stack.Screen
          name="AjouterPhotoOuverture"
          component={AjouterPhotoOuverture}
          options={{
            title: 'Ouverture',
            headerStyle: {
              backgroundColor: '#033664',
            },
            headerTitleAlign:'center',
            headerTintColor: '#fff',
          }}
        />
        <Stack.Screen
          name="PhotoOuverture"
          component={PhotoOuverture}
          options={{
            title: 'Ouverture',
            headerStyle: {
              backgroundColor: '#033664',
            },
            headerTitleAlign:'center',
            headerTintColor: '#fff',
          }}
        />
        <Stack.Screen
          name="Assignation"
          component={Assignation}
          options={{
            title: 'Assignation',
            headerStyle: {
              backgroundColor: '#033664',
            },
            headerTitleAlign:'center',
            headerTintColor: '#fff',
          }}
        />
                <Stack.Screen
          name="InfoCrema"
          component={InfoCrema}
          options={{
            title: 'Obsèques',
            headerStyle: {
              backgroundColor: '#033664',
            },
            headerTitleAlign:'center',
            headerTintColor: '#fff',
          }}
        />
        <Stack.Screen
          name="ObservationsCremation"
          component={ObservationsCremation}
          options={{
            title: 'Obsèques',
            headerStyle: {
              backgroundColor: '#033664',
            },
            headerTitleAlign:'center',
            headerTintColor: '#fff',
          }}
        />
      </Stack.Navigator>

  );
}

        /* <Stack.Screen
          name="FormulaireMission"
          component={FormulaireMission}
          options={{
            title: 'Cérémonie',
            headerStyle: {
              backgroundColor: '#033664',
            },
            headerTitleAlign:'center',
            headerTintColor: '#fff',
          }}
        /> */

export default function App(){

  return(
    <Provider store={Store}>
      <NavigationContainer>
        <Drawer.Navigator
          drawerContent={props => <CustomDrawerContent {...props} />}
          drawerStyle={{
          backgroundColor: '#e9e9e9',
        }}>
          <Drawer.Screen
          name="Login"
          component={StackApp}
          options={({ route }) => ({
            swipeEnabled: false,
          })}
          />
          <Drawer.Screen name="Gestion des utilisateurs" component={ManageUsersNav} />
          <Drawer.Screen
          name="Notifications"
          component={Notifications}
          options={({ route }) => ({
            swipeEnabled: false,
          })}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </Provider>
  );

}
