import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

//import database from '@react-native-firebase/database';

const firebaseConfig = {
   apiKey: "AIzaSyARg1gpEWe7a0dcgxwAAoUd23xa-1qNNGY",
   authDomain: "testprojet-332ec.firebaseapp.com",
   projectId: "testprojet-332ec",
   storageBucket: "testprojet-332ec.appspot.com",
   messagingSenderId: "81633270369",
   appId: "1:81633270369:web:b358b0fd6597a25ef3a820"
 };



export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app! Oui</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
