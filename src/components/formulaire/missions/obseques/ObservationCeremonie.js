import React, { Component } from 'react';
import { TouchableWithoutFeedback, Keyboard, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

import * as firebase from 'firebase';

import { formulaireMissionStyles } from '../../../styles';
import { ScrollView } from 'react-native-gesture-handler';

class ObservationCeremonie extends Component {
  constructor(props){
    super(props);
    this.state = {
      observations: [],
      observation:null,
      isAdded:false,
      uniqueValue: 1,

      ceremonie : this.props.route.params.ceremonie,
      typeObseques: this.props.route.params.typeObseques,
      arriveeCorps: this.props.route.params.arriveeCorps,
      heureFermeture: this.props.route.params.heureFermeture,
      heureMiseEnBiere: this.props.route.params.heureMiseEnBiere,
      dateMiseBiere: this.props.route.params.dateMiseBiere,
      lieuMiseBiere: this.props.route.params.lieuMiseBiere,
      isPolice:  this.props.route.params.isPolice,

      nom: this.props.route.params.nom,
      prenom:this.props.route.params.prenom,
      villeCeremonie: this.props.route.params.villeCeremonie,
      dateCeremonie: this.props.route.params.dateCeremonie,
      heureCeremonie: this.props.route.params.heureCeremonie
    }
    console.log("OBSRVATION CEEMONIE", this.state.isPolice)
  }

  forceRemount = () => {
   this.setState({uniqueValue: uniqueValue + 1});
 }

  goToNextStep = () => {

    this.props.navigation
    .navigate('InfoCimetiere',
    {
      typeMission: this.props.route.params.typeMission,
      ceremonie : this.state.ceremonie,
      typeObseques: this.state.typeObseques,
      arriveeCorps: this.state.arriveeCorps,
      heureFermeture: this.state.heureFermeture,
      heureMiseEnBiere: this.state.heureMiseEnBiere,
      dateMiseBiere: this.state.dateMiseBiere,
      lieuMiseBiere: this.state.lieuMiseBiere,
      isPolice:  this.state.isPolice,
      nom: this.state.nom,
      prenom: this.state.prenom,
      villeCeremonie: this.state.villeCeremonie,
      dateCeremonie: this.state.dateCeremonie,
      heureCeremonie: this.state.heureCeremonie,
      observationCeremonie: this.state.observations
    })
  };

    updateObservation = (observation) => {
      this.setState({isAdded:true})
      if(observation !== null) {this.state.observations.push(observation)}
      Keyboard.dismiss();
    }

    deleteObservation = (remarque, index) => {

        let value = remarque

        let arr = this.state.observations;

        arr = arr.filter(item => item !== value)

        this.setState({ observations: arr.filter(item => item !== value) });
    }

    onChangeObservation = async (observation) => {
      await this.setState({isAdded:false});
      this.setState({observation: observation})
    }

    updateScreen(){

      if(!this.state.observations.length ){
        return(
          <View style={{justifyContent:'center', alignItems:'center'}}>
          </View>
        )
      }else{
        return(this.state.observations.map((item, index) =>
        <View key={index} style={{marginBottom:10}}>
          <View style={{flexDirection:'row', justifyContent:'space-between'}}>
            <View style={{flex:1, flexDirection:'row', alignItems:'center', width:'90%', backgroundColor:'white', padding:2, borderRadius:15, shadowOffset: { width: 1, height: 1 },
            shadowColor:"black",
            shadowOpacity: 1,
            shadowRadius: 5,
            elevation: 2, marginRight:10}}>
              <Icon type='material' name='lens' size={10} style={{marginLeft:5}} />
              <Text style={{padding:10}} key={index}>{item}</Text>
            </View>
            <View style={{justifyContent:'center'}}>
              <TouchableOpacity key={this.state.uniqueValue}
                style={{ justifyContent:'center', alignItems:'center'}} onPress={() => this.deleteObservation(item, index)}>
                <Icon type='material' color='white' name='delete' size={22} style={{marginLeft:10, backgroundColor:'red', padding:5, borderRadius:20, shadowOffset: { width: 1, height: 1 },
                shadowColor:"black",
                shadowOpacity: 1,
                shadowRadius: 5,
                elevation: 4}}/>
              </TouchableOpacity>
            </View>
          </View>
        </View>))
      }
    }

  render() {

   switch("Cérémonie"){
     case 'Cérémonie' :
       return(
         <ScrollView>
        <TouchableWithoutFeedback style={{justifyContent:'space-between'}} onPress={Keyboard.dismiss}>

          <View style={{justifyContent:'space-between'}}>

            <View style={{justifyContent:'center', paddingLeft:15, paddingRight:15 }}>

              <View style={{justifyContent:'center', alignItems:'center', marginTop:25}}>
                <Text style={{fontSize:18, fontWeight:'bold'}}>Observations</Text>
              </View>

              <View style={{ justifyContent:'center', alignItems:'center', marginTop:20}}>
                  <Text style={{fontStyle:'italic'}}> Ex : "Drapeau Ancien combattant à apporter", "Les compositions restent à l'église", etc.</Text>
              </View>

                <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginBottom:15,}}>
                  <View style={formulaireMissionStyles.formTag}>
                    <Icon type='material' name='article' size={22} style={formulaireMissionStyles.iconForm} />
                    <TextInput
                      style={{flex: 1, flexWrap: 'wrap', paddingRight:10}}
                      value={ (this.state.isAdded ? '' : this.state.observation)}
                      placeholder="Saisir une observation"
                      onChangeText={ () => this.setObservation() }
                      onChangeText={observation => this.onChangeObservation(observation)} />
                  </View>
                  <TouchableOpacity
                    style={{
                      shadowOffset: { width: 1, height: 1 },
                      shadowColor:"black",
                      shadowOpacity: 1,
                      shadowRadius: 5,
                      elevation: 4,
                      borderRadius:25, marginLeft:10, padding:5,backgroundColor:'#0886f8', justifyContent:'center', alignItems:'center', marginTop:30}} onPress={() => this.updateObservation(this.state.observation)}>
                    <Icon type='material' color='white' name='add' size={22}/>
                  </TouchableOpacity>
                </View>

                { this.updateScreen() }

            </View>

            <TouchableOpacity onPress={() => this.goToNextStep()}
                style={formulaireMissionStyles.buttonForm}>
              <Text style={{fontSize:16, margin:30, color:"white"}}>Passer à la suite</Text>
              <Icon type='font-awesome' name='chevron-right' size={24} color="white"/>
            </TouchableOpacity>

          </View>

        </TouchableWithoutFeedback>
        </ScrollView>
       );
       break;
   }
  }
}

export default ObservationCeremonie;
