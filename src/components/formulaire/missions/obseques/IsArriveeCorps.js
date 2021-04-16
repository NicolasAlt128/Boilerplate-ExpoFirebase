import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

import * as firebase from 'firebase';

import { formulaireMissionStyles } from '../../../styles';

class IsArriveeCorps extends Component {
  constructor(props){
    super(props);
    if (!firebase.apps.length) firebase.initializeApp(config);
  }

  goToNextStep = (arriveeCorps) => {

    //ARRIVÉE DE CORPS & CÉRÉMONIE -> ALORS GO VERS FORMULAIRE CÉRÉMONIE SANS MISE EN BIERE
    if (arriveeCorps === true && this.props.route.params.ceremonie === true ){
        this.props.navigation.navigate("ObsequesSecondScreen",
        {
          typeMission: this.props.route.params.typeMission,
          ceremonie : this.props.route.params.ceremonie, 
          typeObseques: this.props.route.params.typeObseques,
          arriveeCorps: arriveeCorps,
          nom:this.props.route.params.nom,
          prenom:this.props.route.params.prenom
        });
    }

    if (arriveeCorps === true && this.props.route.params.ceremonie === false){

      if(this.props.route.params.typeObseques == 'Crémation'){
        console.log("ARRIVE ??", arriveeCorps)
        this.props.navigation.navigate("InfoCrema",
        {
          typeMission: this.props.route.params.typeMission,
          ceremonie : this.props.route.params.ceremonie,
          typeObseques: this.props.route.params.typeObseques,
          arriveeCorps: arriveeCorps,
          nom:this.props.route.params.nom,
          prenom:this.props.route.params.prenom
        });
      }else{
        this.props.navigation.navigate("InfoCimetiere",
        {
          typeMission: this.props.route.params.typeMission,
          ceremonie : this.props.route.params.ceremonie,
          typeObseques: this.props.route.params.typeObseques,
          arriveeCorps: arriveeCorps,
          nom:this.props.route.params.nom,
          prenom:this.props.route.params.prenom
        });
      }
    }

    //PAS ARRIVÉE DE CORPS & PAS CÉRÉMONIE -> ALORS GO VERS FORMULAIRE MISE EN BIERE
    if (arriveeCorps === false && this.props.route.params.ceremonie === false){
      this.props.navigation.navigate("InfoBiereFermeture",
      {
        typeMission: this.props.route.params.typeMission,
        ceremonie : this.props.route.params.ceremonie,
        typeObseques: this.props.route.params.typeObseques,
        arriveeCorps: arriveeCorps,
        nom:this.props.route.params.nom,
        prenom:this.props.route.params.prenom
      });
    }

    //PAS ARRIVÉE DE CORPS & CÉRÉMONIE -> ALORS GO VERS FORMULAIRE MISE EN BIERE 
    if (arriveeCorps === false && this.props.route.params.ceremonie === true){
      this.props.navigation.navigate("InfoBiereFermeture",
      {
        typeMission: this.props.route.params.typeMission,
        ceremonie : this.props.route.params.ceremonie,
        typeObseques: this.props.route.params.typeObseques,
        arriveeCorps: arriveeCorps,
        nom:this.props.route.params.nom,
        prenom:this.props.route.params.prenom
      });
    }
  }

  render() {
       return(
          <View style={formulaireMissionStyles.containerChoice}>

            <View style={{justifyContent:'center', paddingLeft:15, paddingRight:15 }}>
              <View style={{justifyContent:'center', alignItems:'center', marginTop:25}}>
                <Text style={{fontSize:20, fontWeight:'bold'}}>Est-ce une arrivée de corps ?</Text>
              </View>

              <TouchableOpacity onPress={() => this.goToNextStep(true)} style={formulaireMissionStyles.selectChoice}>
                <View style={formulaireMissionStyles.iconForm}/>
                <Text style={{flex:1, fontSize:18, textAlign:'center', color:'white'}}>Oui</Text>
                <Icon type='material' color="white" name='arrow-forward-ios' size={22} style={formulaireMissionStyles.iconForm}/>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => this.goToNextStep(false)} style={formulaireMissionStyles.selectChoice}>
                <View style={formulaireMissionStyles.iconForm}/>
                <Text style={{flex:1, fontSize:18, textAlign:'center', color:'white'}}>Non</Text>
                <Icon type='material' color="white" name='arrow-forward-ios' size={22} style={formulaireMissionStyles.iconForm}/>
              </TouchableOpacity>

            </View>

          </View>
       );
   }
}

export default IsArriveeCorps;
