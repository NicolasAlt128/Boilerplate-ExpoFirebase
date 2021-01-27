import { StatusBar } from 'expo-status-bar';
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
       test: "oui",
       test1: "non"
     };

     firebase.initializeApp(config);
   }

   test(data1, data2){
     firebase.database().ref('produit').set({
       data1,
       data2
     }).then((data)=>{
         //success callback
         console.log('data ' , data)
     }).catch((error)=>{
         //error callback
         console.log('error ' , error)
     });
     console.log("ok")
   }

   render(){
     return (
       <View style={styles.container}>
         <Text>Open up App.js to start working on your app! Oui</Text>
         <StatusBar style="auto" />
         <Button onPress={() => this.test(this.state.test, this.state.test1)} title="TEST" />
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
