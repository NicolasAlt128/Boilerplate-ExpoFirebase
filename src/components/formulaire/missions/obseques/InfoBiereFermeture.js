import React, { Component } from 'react';
import { TouchableWithoutFeedback, Keyboard, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import SwitchCustom from 'expo-custom-switch';

import * as firebase from 'firebase';

import { formulaireMissionStyles } from '../../../styles';

class InfoBiereFermeture extends Component {
  constructor(props){
    super(props);
    this.state = {
      villeCeremonie: this.props.route.params.villeCeremonie || null,
      dateMission: this.props.route.params.dateCeremonie || null,
      heureMission: this.props.route.params.heureCeremonie || null,
      nom: this.props.route.params.nom,
      prenom: this.props.route.params.prenom,

      dateMiseBiere:null,
      dateMiseBiereFormattee:null,
      heureMiseEnBiere: null,
      lieuMiseBiere:null,
      dateFermeture:null,
      heureFermeture: null,
      typeHeure:null,
      formattedHeureBiere:null,
      formattedHeureFermeture:null,

      isPolice: false,

      show:null,
      mode:null
    }
    console.log('bordel infobiere', this.props.route.params.ceremonie)
    if (!firebase.apps.length) firebase.initializeApp(config);
  }

  onChange = (event, selectedDate) => {
    const currentDate = selectedDate || this.state.date;
    this.setState({show: Platform.OS === 'ios', date: currentDate});

    if(this.state.mode == 'date'){
      const dateMiseBiereFormattee = ("0" + selectedDate.getDate()).slice(-2) + "/" + ("0" + (selectedDate.getMonth() + 1)).slice(-2) + "/" + selectedDate.getFullYear();
      this.setState({dateMiseBiereFormattee: dateMiseBiereFormattee})
      this.setState({dateMiseBiere: dateMiseBiereFormattee})
    }else{
      if(this.state.typeHeure == "MiseBiere"){
        const formattedHeureBiere = ("0" + this.state.date.getHours()).slice(-2) + "h" + ("0" + (this.state.date.getMinutes())).slice(-2);
        this.setState({ heureMiseEnBiere: this.state.date, formattedHeureBiere: formattedHeureBiere });
      }else{
        const formattedHeureFermeture = ("0" + this.state.date.getHours()).slice(-2) + "h" + ("0" + (this.state.date.getMinutes())).slice(-2);
        this.setState({ heureFermeture: this.state.date, formattedHeureFermeture: formattedHeureFermeture });
      }
    }

  };

  showMode = async  (currentMode) => {
    await this.setState({show: true, mode: currentMode})
  };

  showTimepicker = (type) => { this.showMode('time'); this.setState({typeHeure: type}) };

  showDatepicker = (type) => { this.showMode('date')};

  goToNextStep = () => {

    var route = this.props.route.params.ceremonie ? 'ObsequesSecondScreen' : 'InfoCimetiere';
    if(this.props.route.params.typeObseques == "Crémation"){
      route = 'InfoCrema'
    }

    this.props.navigation
    .navigate(route,
    {
      ceremonie : this.props.route.params.ceremonie,
      typeObseques: this.props.route.params.typeObseques,
      arriveeCorps: this.props.route.params.arriveeCorps,
      nom: this.state.nom,
      prenom: this.state.prenom,
      villeCeremonie: this.state.villeCeremonie,
      dateMission: this.state.dateMission,
      heureMission: this.state.heureMission,
      typeMission: this.props.route.params.typeMission,
      heureFermeture: this.state.formattedHeureFermeture,
      heureMiseEnBiere: this.state.formattedHeureBiere,
      dateMiseBiere: this.state.dateMiseBiere,
      lieuMiseBiere: this.state.lieuMiseBiere,
      isPolice: this.state.isPolice
     }
    )};

  render() {
       return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

          <View style={formulaireMissionStyles.container}>

          { this.state.show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={new Date()}
              mode={this.state.mode}
              is24Hour={true}
              display="default"
              onChange={this.onChange} /> ) }

            <View style={{justifyContent:'center', paddingLeft:15, paddingRight:15 }}>

              <View style={{justifyContent:'center', alignItems:'center', marginTop:25}}>
                <Text style={{fontSize:18, fontWeight:'bold'}}>Informations Mise en bière</Text>
              </View>

              <View style={formulaireMissionStyles.form}>
                <Icon type='material' name='book-online' size={22} style={formulaireMissionStyles.iconForm}/>
                <TouchableOpacity onPress={() => this.showDatepicker()}>
                  <TextInput
                    editable={false}
                    placeholderTextColor={this.state.dateMiseBiere !== null ? "black" : "#9e9e9e"}
                    placeholder={(this.state.dateMiseBiere !== null ? "Date : " + this.state.dateMiseBiereFormattee : "Sélectionner ici la date de la mise en bière")}/>
                </TouchableOpacity>
              </View>

              <View style={formulaireMissionStyles.form}>
                <Icon type='font-awesome' name='clock-o' size={22} style={formulaireMissionStyles.iconForm}/>
                <TouchableOpacity onPress={() => this.showTimepicker('MiseBiere')}>
                  <TextInput
                    editable={false}
                    placeholderTextColor={this.state.heureMiseEnBiere !== null ? "black" : "#9e9e9e"}
                    placeholder={(this.state.heureMiseEnBiere !== null ? "Mise en bière : " + this.state.formattedHeureBiere : "Sélectionner ici l'heure de la mise en bière")}/>
                </TouchableOpacity>
              </View>

              <View style={formulaireMissionStyles.form}>
                <Icon type='material' name='place' size={22} style={formulaireMissionStyles.iconForm} />
                <TextInput placeholder="Saisir le lieu de la mise en bière" onChangeText={lieuMiseBiere => this.setState({lieuMiseBiere: lieuMiseBiere})} />
              </View>

              <View style={{justifyContent:'center', alignItems:'center', marginTop:25}}>
                <Text style={{fontSize:18, fontWeight:'bold'}}>Informations Fermeture</Text>
              </View>

              <View style={formulaireMissionStyles.form}>
                <Icon type='font-awesome' name='clock-o' size={22} style={formulaireMissionStyles.iconForm}/>
                <TouchableOpacity onPress={() => this.showTimepicker('Fermeture')}>
                  <TextInput
                    editable={false}
                    placeholderTextColor={this.state.heureFermeture !== null ? "black" : "#9e9e9e"}
                    placeholder={(this.state.heureFermeture !== null ? "Fermeture : " + this.state.formattedHeureFermeture : "Sélectionner ici l'heure de la fermeture")}/>
                </TouchableOpacity>
              </View>

              <View style={formulaireMissionStyles.formText}>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                  <View style={{flex:1, flexDirection:'row'}}>
                    <Icon type='material' name='local-police' size={22} style={formulaireMissionStyles.iconForm} />
                    <Text style={{fontWeight:'bold'}}>Scellés par la police</Text>
                  </View>
                  <View>
                    <SwitchCustom
                        value={this.state.isPolice}
                        style={{ transform: [{ scaleX: .8 }, { scaleY: .8 }], borderColor:'#cdcdcd', borderWidth:1, borderRadius:25, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 1, shadowRadius: 5, elevation: 2 }}
                        onChange={(isPolice) => this.setState({isPolice: isPolice})}
                        rightColor="#0886f8"
                        leftColor="#787878"
                        iconRight={{
                          name: 'check',
                          color: '#fff',
                          style: {
                            height: 22,
                            width: 22,
                          },
                        }}
                        iconLeft={{
                          name: 'close',
                          style: {
                            height: 22,
                            width: 22,
                          },
                        }}
                      />
                  </View>
                </View>
              </View>

            </View>

            <TouchableOpacity onPress={() => this.goToNextStep()}
                style={formulaireMissionStyles.buttonForm}>
              <Text style={{fontSize:16, margin:30, color:"white"}}>Passer à la suite</Text>
              <Icon type='font-awesome' name='chevron-right' size={24} color="white"/>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
       );
  }
}

export default InfoBiereFermeture;
