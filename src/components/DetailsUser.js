import React, { Component } from 'react';
import { TouchableOpacity, TouchableWithoutFeedback, Keyboard, AppRegistry, View, Image, Text, StyleSheet, Dimensions, ScrollView, TextInput } from 'react-native';
import { Icon } from 'react-native-elements';
import { useNavigation, StackActions } from '@react-navigation/native';
import Modal from 'react-native-modal';

const popAction = StackActions.pop(1);

import { formulaireMissionStyles, modalStyles } from './styles';

import * as firebase from 'firebase';

class DetailsUser extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: this.props.route.params.email,
      telephone: this.props.route.params.telephone,
      identifiant: null,
      mdp: this.props.route.params.mdp,
      nom: this.props.route.params.nom,
      prenom: this.props.route.params.prenom,
      role : this.props.route.params.role,
    }
  }

  returnUpper = (text) => {
    if(typeof text === 'string'){
      var newTxt = text.toUpperCase();
      return newTxt
    }
  }

  returnLower = (text) => {
    if(typeof text === 'string'){
      var newTxt = text.toLowerCase();
      return newTxt
    }
  }

  showRole = (role) => {
    switch(role){
      case 1 :
        return "Direction"
      case 2 :
        return "Sécrétariat"
      case 3 :
        return "Agent Funéraire"
      default :
        return "ERROR"
    }
  }

  setUserId(){
    let userId = this.state.prenom.charAt(0) + this.state.nom;
    userId = userId.toLowerCase();
    this.setState({identifiant: userId});
  }

  componentDidMount(){
    this.setUserId();
  }

  formatNumber(f){
    if(f !== null && typeof f !== 'undefined'){
      var parts = f.match(/.{1,2}/g);
      var new_value = parts.join(".");
      console.log("TEST", new_value)
    }
    return new_value;
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

        <View style={formulaireMissionStyles.container}>

          <View style={{ paddingLeft:5, paddingRight:5 }}>

            <View style={{ justifyContent:'center', alignItems:'center', marginTop:15, marginBottom:15}}>
              <Text style={{fontWeight:'bold', fontSize:20}}>{ this.state.prenom } { this.returnUpper(this.state.nom) }</Text>
              <Text style={{fontSize:18, fontStyle:'italic'}}>{this.showRole(this.state.role)}</Text>
            </View>

            <View style={{flexDirection:'row', alignItems:'center', marginTop:15}}>
              <View style={{flexDirection:'row', alignItems:'center'}}>
                <Icon type='font-awesome' name='user' size={22} style={formulaireMissionStyles.iconForm} />
                <Text style={{fontWeight:'bold', fontSize:16}}>Identifiant : </Text>
              </View>
              <Text style={{marginLeft:10, fontSize:16}}>{ this.state.identifiant }</Text>
            </View>

            <View style={{flexDirection:'row', alignItems:'center', marginTop:15}}>
              <View style={{flexDirection:'row', alignItems:'center'}}>
                <Icon type='font-awesome' name='lock' size={22} style={formulaireMissionStyles.iconForm} />
                <Text style={{fontWeight:'bold', fontSize:16}}>Mot de passe : </Text>
              </View>
              <Text style={{marginLeft:10, fontSize:16}}>{ this.state.mdp }</Text>
            </View>

            <View style={{flexDirection:'row', alignItems:'center', marginTop:15}}>
              <View style={{flexDirection:'row', alignItems:'center'}}>
                <Icon type='material' name='email' size={22} style={formulaireMissionStyles.iconForm} />
              </View>
              <Text style={{marginLeft:10, fontSize:16}}>{ this.returnLower(this.state.email) }</Text>
            </View>

            <View style={{flexDirection:'row', alignItems:'center', marginTop:15}}>
              <View style={{flexDirection:'row', alignItems:'center'}}>
                <Icon type='material' name='phone' size={22} style={formulaireMissionStyles.iconForm} />
              </View>
              <Text style={{marginLeft:10, fontSize:16}}>{ this.formatNumber(this.state.telephone) }</Text>
            </View>

          </View>

        </View>

      </TouchableWithoutFeedback>
    );
  }
}

export default DetailsUser;
