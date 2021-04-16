import React, { Component } from 'react';
import { AsyncStorage, Switch, ActivityIndicator, TouchableWithoutFeedback, Keyboard, TextInput, KeyboardAvoidingView, View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import Modal from 'react-native-modal';
import * as firebase from 'firebase';
import { connect } from 'react-redux';
import { formulaireMissionStyles, modalStyles } from './styles';
import { StatusBar } from 'expo-status-bar';

class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      identifiant: null,
      mdp : '',
      isFetching:null,
      userExists: null,
      userId:null,
      rememberMe:false,
      isModalVisible:false
    }
  }

  toggleRememberMe = value => {
    this.setState({ rememberMe: value })
  }

  rememberUser = async () => {
    try {
      let credentials = {
        id:this.state.identifiant,
        mdp:this.state.mdp
      }
      await AsyncStorage.setItem("USER_CREDENTIALS", JSON.stringify(credentials));
    } catch (error) { console.log("ERR", error) }};

  getRememberedUser = async () => {
  try {
    const username = await AsyncStorage.getItem("USER_CREDENTIALS");
    let credentials = JSON.parse(username)
    return credentials;
  } catch (error) { console.log("ERR", error) }};

  forgetUser = async () => {
    try {
      await AsyncStorage.removeItem("USER_CREDENTIALS");
    } catch (error) {
      console.log("ERR", error)
     // Error removing
    }
  };

userExistsCallback = (userId, exists) => {
  this.setState({userId: userId});
  if (exists) {
    firebase.database().ref(`/Utilisateurs/`+userId)
    .once('value').then( snapshot => {
      const userInfos = snapshot.val();
      if (snapshot.val().mdp == this.state.mdp) {

        const action = {type : 'LOGIN', value: { isLogged : true, userInfos: userInfos }};
        this.props.dispatch(action);

        if (this.state.rememberMe === true) this.rememberUser()
        else this.forgetUser()

        this.props.navigation.reset({ index: 0, routes: [{name:'Planning'}] });

      } else { console.log("Wrong pwd") }
    })
  } else {
    this.setState({isModalVisible:true})
    this.setState({isFetching: false});
  }
}

checkIfUserExists = (userId) => {
  this.setState({isFetching: true});
  if(userId !== null){
    userId= userId.trim();
    firebase.database().ref(`/Utilisateurs/`)
    .child(userId).once('value').then(snapshot => {
      this.setState({ userExists : snapshot.val() !== null});
      this.userExistsCallback(userId, this.state.userExists);
    }).catch(err => {
      this.setState({isFetching: false});
      console.log("Err", err)
    });
  }

  }

  async componentDidMount() {
    const credentials = await this.getRememberedUser();
      if(credentials !== null){
        this.setState({
           identifiant: credentials.id || "",
           mdp: credentials.mdp || "",
           rememberMe: credentials ? true : false });
      }
    }

  render() {

    if(this.state.isFetching){

      return(
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.inner}>
              <View style={{alignItems:'center'}}>
              <Image style={{ height:115, resizeMode: 'contain'}} source={require('../img/logo.png')} />
              </View>
                <View>
                <View style={{flex:1, justifyContent:'center', alignSelf:'center', alignItems:'center', textAlign:'center'}}>
                  <ActivityIndicator size="large" color="white" />
                </View>
                </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      )
    }else{
      return(
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}>
        <StatusBar
        animated={true}

        hidden={true} />
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inner}>
            <Modal isVisible={this.state.isModalVisible} >
              <View style={modalStyles.container}>
                <Text style={modalStyles.header}>Oups...</Text>
                <View style={modalStyles.text}>
                  <Text style={modalStyles.title}>L'identifiant ou le mot de passe est incorrect.</Text>
                </View>
                <View style={modalStyles.buttonContainer}>
                  <TouchableOpacity onPress={ () => this.setState({isModalVisible:false}) } style={modalStyles.buttonOK}>
                    <Text style={{color:'white', fontSize:16}}>Réessayer</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
            <View style={{alignItems:'center'}}>
             <Image style={{ height:115, resizeMode: 'contain'}} source={require('../img/logo.png')} />
            </View>
              <View>
                <View style={formulaireMissionStyles.formConnection}>
                  <Icon type='font-awesome' name='user' size={22} style={formulaireMissionStyles.iconForm}/>
                  <TextInput autoCapitalize='none' placeholder="Identifiant" value ={this.state.identifiant} onChangeText={identifiant => this.setState({identifiant: identifiant})}/>
                </View>
                <View style={formulaireMissionStyles.form}>
                  <Icon type='font-awesome' name='lock' size={22} style={formulaireMissionStyles.iconForm}/>
                  <TextInput secureTextEntry={true} value={this.state.mdp} placeholder="Mot de passe" onChangeText={mdp => this.setState({mdp: mdp})}/>
                </View>
                <View style={{flexDirection:'row', alignItems:'center', marginTop:20}}>
                  <Switch

                    value={this.state.rememberMe}
                    onValueChange={(value) => this.toggleRememberMe(value)}
                    /><Text style={{color:'white', marginLeft:15, fontSize:16}}>Se souvenir de moi</Text>
                </View>
              </View>
              <View style={styles.btnContainer}>
                <TouchableOpacity style={formulaireMissionStyles.seConnecter} onPress={() => this.checkIfUserExists(this.state.identifiant)}>
                  <Text style={{fontSize:16, margin:30, color:"white"}}>SE CONNECTER</Text>
                </TouchableOpacity>
              </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: "space-around",
    backgroundColor:'#333333'
  },
  header: {
    fontSize: 36,
    marginBottom: 48
  },
  textInput: {
    height: 40,
    borderColor: "#000000",
    borderBottomWidth: 1,
    marginBottom: 36
  },
  btnContainer: {
    marginTop: 12
  }
});

const mapStateToProps = (state) => {
  return {
    isLogged: state.isLogged,
    userInfos: state.userInfos
  };
}
export default connect(mapStateToProps)(Login);
