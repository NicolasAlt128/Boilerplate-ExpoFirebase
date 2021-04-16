import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

import * as firebase from 'firebase';

import { formulaireMissionStyles } from '../../../styles';

class IsCeremonie extends Component {
  constructor(props){
    super(props);
    if (!firebase.apps.length) firebase.initializeApp(config);
    console.log("PROP ISARRIVEE", this.props)
  }

  goToNextStep = (val) => {
    this.props.navigation.navigate("IsArriveeCorps",
    {
      typeMission: this.props.route.params.typeMission,
      ceremonie : val,
      typeObseques: this.props.route.params.typeObseques,
      nom:this.props.route.params.nom,
      prenom:this.props.route.params.prenom
    });
  }

  render() {
       return(
          <View style={formulaireMissionStyles.containerChoice}>

            <View style={{justifyContent:'center', paddingLeft:15, paddingRight:15 }}>
              <View style={{justifyContent:'center', alignItems:'center', marginTop:25}}>
                <Text style={{fontSize:20, fontWeight:'bold'}}>Y-a t'il une cérémonie de prévue ?</Text>
              </View>

              <TouchableOpacity onPress={() => this.goToNextStep(true)} style={formulaireMissionStyles.selectChoice}>
                <View style={formulaireMissionStyles.iconForm}/>
                <Text style={{flex:1, fontSize:18, textAlign:'center', color:'white'}}>Oui</Text>
                <Icon color='white' type='material' name='arrow-forward-ios' size={22} style={formulaireMissionStyles.iconForm}/>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => this.goToNextStep(false)} style={formulaireMissionStyles.selectChoice}>
                <View style={formulaireMissionStyles.iconForm}/>
                <Text style={{flex:1, fontSize:18, textAlign:'center', color:'white'}}>Non</Text>
                <Icon color='white' type='material' name='arrow-forward-ios' size={22} style={formulaireMissionStyles.iconForm}/>
              </TouchableOpacity>

            </View>

          </View>
       );
   }
}

export default IsCeremonie;
