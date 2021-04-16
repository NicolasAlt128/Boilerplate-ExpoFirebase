import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import * as firebase from 'firebase';
import { formulaireMissionStyles } from '../../../styles';

class SelectionTypeObseques extends Component {
  constructor(props){
    super(props);
    if (!firebase.apps.length) firebase.initializeApp(config);
  }

  goToNextStep = (type) => {
    this.props.navigation.navigate("InfoDefunt",
    { typeObseques : type,
      typeMission : this.props.route.params.typeMission});
    }

  render() {
       return(
          <View style={formulaireMissionStyles.containerChoice}>

            <View style={{justifyContent:'center', paddingLeft:15, paddingRight:15 }}>
              <View style={{justifyContent:'center', alignItems:'center', marginTop:25}}>
                <Text style={{fontSize:20, fontWeight:'bold'}}>Sélectionner le type d'obsèques :</Text>
              </View>

              <View style={{justifyContent:'center', alignItems:'center'}}>

                <TouchableOpacity onPress={() => this.goToNextStep("Inhumation")} style={formulaireMissionStyles.selectChoice}>
                  <View style={formulaireMissionStyles.iconForm}/>
                  <Text style={{flex:1, fontSize:18, textAlign:'center', color:'white'}}>Inhumation</Text>
                  <Icon type='material' color='white' name='arrow-forward-ios' size={22} style={formulaireMissionStyles.iconForm}/>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.goToNextStep("Crémation")} style={formulaireMissionStyles.selectChoice}>
                  <View style={formulaireMissionStyles.iconForm}/>
                  <Text style={{flex:1, fontSize:18, textAlign:'center', color:'white'}}>Crémation</Text>
                  <Icon type='material' color='white' name='arrow-forward-ios' size={22} style={formulaireMissionStyles.iconForm}/>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.goToNextStep("Inhumation Urne")} style={formulaireMissionStyles.selectChoice}>
                  <View style={formulaireMissionStyles.iconForm}/>
                  <Text style={{flex:1, fontSize:18, textAlign:'center', color:'white'}}>Inhumation urne</Text>
                  <Icon type='material' color='white' name='arrow-forward-ios' size={22} style={formulaireMissionStyles.iconForm}/>
                </TouchableOpacity>

              </View>

            </View>

          </View>
       );
   }
}

export default SelectionTypeObseques;
