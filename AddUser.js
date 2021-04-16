import { StatusBar, Picker } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import * as firebase from 'firebase';

const config={
  apiKey: "AIzaSyARg1gpEWe7a0dcgxwAAoUd23xa-1qNNGY",
  authDomain: "testprojet-332ec.firebaseapp.com",
  projectId: "testprojet-332ec",
  storageBucket: "testprojet-332ec.appspot.com",
  messagingSenderId: "81633270369",
  appId: "1:81633270369:web:b358b0fd6597a25ef3a820",
  databaseURL:"https://testprojet-332ec-default-rtdb.firebaseio.com/"
}


 export default class App extends React.Component {

   constructor(props) {
     super(props);
     this.state = {
       identifiant: 'nalarcon',
       mdp: 'pwd',
       email: 'nicolas.alarcon14@gmail.com',
       role:1,
       nom:'Alarçon',
       prenom:'Nicolas',
     };
     if (!firebase.apps.length) {
       firebase.initializeApp(config);
      }
   }

   test = (identifiant, mdp, email, role, nom, prenom) => {
      firebase.database().ref('Utilisateurs/'+this.state.nom).set({
        identifiant,
        mdp,
        email,
        role,
        nom,
        prenom,
      }).then((data)=>{
          //success callback
          console.log('data ' , data)
      }).catch((error)=>{
          //error callback
          console.log('error ' , error)
      });
    }

   render(){
     return (
       <View style={styles.container}>
        <StatusBar style="auto" />
        <Text>Ajouter un compte</Text>
        <Button
          onPress={() => this.test(
            this.state.identifiant,
            this.state.mdp,
            this.state.email,
            this.state.role,
            this.state.nom,
            this.state.prenom)} title="Envoyer" />
      </View>
     );
   }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
