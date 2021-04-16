import { StatusBar } from 'expo-status-bar';
import React from 'react';
// import { StyleSheet, Text, View, Button } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import { Container, Item, Form, Input, Button, Label } from "native-base";
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
           authenticated: false,
           email: "",
           password: ""
         };
         if (!firebase.apps.length) {
           firebase.initializeApp(config);
          }

   }

   __isTheUserAuthenticated = () => {
     let user = firebase.auth().currentUser;
     console.log("USER", user)
     // let user = firebase.auth().currentUser.uid;
     // if (user) {
     //   console.log(tag,  user);
     //   this.setState({ authenticated: true });
     // } else {
     //   this.setState({ authenticated: false });
     // }
  }

   SignUp = (email, password) => {
    try {
      firebase.auth().createUserWithEmailAndPassword(email, password);
    } catch (error) {
      console.log(error.toString(error));
    }
   };

   SignIn = (email, password) => {
    try {
      firebase.auth().signInWithEmailAndPassword(email, password);
      firebase.auth().onAuthStateChanged(user => {
         alert(user.email);
      })
    } catch (error) {
          console.log(error.toString(error));
        }
      };

   render(){
     this.__isTheUserAuthenticated();
     if(this.state.authenticated==false){
       return(
         <Container style={styles.container}>
               <Form>
                 <Item floatingLabel>
                   <Label>Email</Label>
                   <Input autoCapitalize="none" autoCorrect={false} onChangeText={email => this.setState({ email })} />
                 </Item>
                 <Item floatingLabel>
                   <Label>Password</Label>
                   <Input
                     secureTextEntry={true}
                     autoCapitalize="none"
                     autoCorrect={false}
                     onChangeText={password => this.setState({ password })}
                   />
                 </Item>
                 <Button full rounded onPress={() => this.SignIn(this.state.email, this.state.password)}>
                   <Text>SignIn</Text>
                 </Button>
                 <Button full rounded success style={{ marginTop: 20 }} onPress={() => this.SignUp(this.state.email, this.state.password)}>
                  <Text>Signup</Text>
                 </Button>
               </Form>
         </Container>
       );
     }else{
       return (
         <View>
          <Text>Not Logged</Text>
         </View>
       );
     }
   }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    justifyContent: "center"
  }
});
