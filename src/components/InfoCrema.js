import React, { Component } from 'react';
import { TouchableWithoutFeedback, Keyboard, View, Image, Text, TextInput, TouchableOpacity, Picker } from 'react-native';
import { Icon } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';

import { formulaireMissionStyles } from './styles';

import * as firebase from 'firebase';

class InfoCrema extends Component {
  constructor(props){
    super(props);
    this.state = {
      ceremonie : this.props.route.params.ceremonie,
      typeObseques: this.props.route.params.typeObseques,
      arriveeCorps: this.props.route.params.arriveeCorps,
      heureFermeture: this.props.route.params.heureFermeture || null,
      heureMiseEnBiere: this.props.route.params.heureMiseEnBiere || null,
      dateMiseBiere: this.props.route.params.dateMiseBiere || null,
      lieuMiseBiere: this.props.route.params.lieuMiseBiere || null,
      isPolice:  this.props.route.params.isPolice,
      nom: this.props.route.params.nom,
      prenom: this.props.route.params.prenom,
      villeCeremonie: this.props.route.params.villeCeremonie || null,
      dateCeremonie: this.props.route.params.dateCeremonie || null,
      heureCeremonie: this.props.route.params.heureCeremonie || null,
      observationCeremonie: this.props.route.params.observationCeremonie || null,

      villeCimetiere: null,
      typeSepulture: " ",
      ouverture: " ",

      dateCremation:null,
      heureCremation:null,
      heureCremationFormattee:null,
      dateCremationFormattee:null,
      villeCrematorium: null,

      show:null,
      mode:null,
      date:null,

      data:null,
      isFetching:false
    }
    console.log("ARRIVE INFO CREMA", this.state.arriveeCorps)
  }

  componentDidMount(){
    this.getUsers();
  }

  goToNextStep = () => {
    this.props.navigation
    .navigate('ObservationsCremation',
    {
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
      observationCeremonie: this.state.observationCeremonie,
      villeCimetiere: this.state.villeCimetiere,
      typeSepulture: this.state.typeSepulture,
      ouverture: this.state.ouverture,
      dateCremation:this.state.dateCremation,
      heureCremation:this.state.heureCremation,
      villeCrematorium: this.state.villeCrematorium
    })
  };

  isPlaceholder = (value) => {
    if(value !== " "){
          return true;
    }else{
        return false
    }
  }

  onChange = (event, selectedDate) => {
    const currentDate = selectedDate || this.state.date;
    this.setState({show: Platform.OS === 'ios', date: currentDate});

    if(this.state.mode == 'date'){
      const dateCremationFormattee = ("0" + selectedDate.getDate()).slice(-2) + "/" + ("0" + (selectedDate.getMonth() + 1)).slice(-2)
      this.setState({dateCremationFormattee: dateCremationFormattee})
      this.setState({dateCremation: dateCremationFormattee})
    }else{
        const formattedHeureCremation = ("0" + selectedDate.getHours()).slice(-2) + "h" + ("0" + (selectedDate.getMinutes())).slice(-2);
        this.setState({ heureCremation: formattedHeureCremation});
        this.setState({formattedHeureCremation: formattedHeureCremation });
    }

  };

  showMode = async  (currentMode) => {
    await this.setState({show: true, mode: currentMode})
  };

  showTimepicker = () => { this.showMode('time')}

  showDatepicker = () => { this.showMode('date')}

  getUsers = () => {
    this.setState({isFetching:true});
    const visit = (obj, fn) => {
      const values = Object.values(obj);
      values.forEach(val => val && typeof val === "object" ? visit(val, fn) : fn(val))
    }
    firebase.database()
    .ref('/Utilisateurs/')
    .once('value')
    .then(snapshot => {
      let sortList = Object.values(snapshot.val())
        this.setState({ data: sortList });
        this.setState({ isFetching:false });
    }).catch(err => {
      this.setState({ isFetching:false });
    });
  }

  showUsers(){
    let array = [];
    if(this.state.data !== null){
      for( let i=0 ; i<this.state.data.length ; i++ ){
        array.push(this.state.data[i].prenom);
      }
        return(
          <Picker
            selectedValue={this.state.ouverture}
            style={ this.isPlaceholder(this.state.ouverture) ? (formulaireMissionStyles.pickerItem) : (
                formulaireMissionStyles.placeholderPicker
              )}
            onValueChange={(itemValue, itemIndex) => this.setState({ ouverture: itemValue })}>
            <Picker.Item color="#9e9e9e" label="Ouverture effectué par" value=" " />
            {array.map((item) => {
                return (<Picker.Item label={item} value={item} key={item}/>) 
            })}
           </Picker>
        )
    }
  }

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

            { this.props.route.params.ceremonie ? null :
            <View>
              <View style={formulaireMissionStyles.form}>
                <Icon type='material' name='book-online' size={22} style={formulaireMissionStyles.iconForm}/>
                <TouchableOpacity onPress={() => this.showDatepicker()}>
                  <TextInput
                    editable={false}
                    placeholderTextColor={this.state.dateCremation !== null ? "black" : "#9e9e9e"}
                    placeholder={(this.state.dateCremation !== null ? "Date de la crémation : " + this.state.dateCremationFormattee : "Sélectionner ici la date de la crémation")}/>
                </TouchableOpacity>
              </View>

              <View style={formulaireMissionStyles.form}>
              <Icon type='font-awesome' name='clock-o' size={22} style={formulaireMissionStyles.iconForm}/>
              <TouchableOpacity onPress={() => this.showTimepicker()}>
                <TextInput
                  editable={false}
                  placeholderTextColor={this.state.heureCremation !== null ? "black" : "#9e9e9e"}
                  placeholder={(this.state.heureCremation !== null ? "Heure de la crémation : " + this.state.formattedHeureCremation : " Sélectionner ici l'heure de la crémation")}/>
              </TouchableOpacity>
              </View>
              </View>
          }

            <View style={formulaireMissionStyles.form}>
              <Icon type='material' name='place' size={22} style={formulaireMissionStyles.iconForm} />
              <TextInput placeholder="Crématorium de" onChangeText={villeCrematorium => this.setState({villeCrematorium: villeCrematorium})} />
            </View>

          </View>
          <TouchableOpacity
            onPress={() => this.goToNextStep()}
            style={formulaireMissionStyles.buttonForm}>
            <Text style={{fontSize:16, margin:30, color:"white"}}>Passer à la suite</Text>
            <Icon type='font-awesome' name='chevron-right' size={24} color="white"/>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    )
   }
 }

export default InfoCrema;
