import React, { Component } from 'react';
import { TouchableWithoutFeedback, TouchableOpacity, Keyboard, View, Text, ScrollView, TextInput } from 'react-native';
import { Icon } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import { formulaireMissionStyles } from './styles';


class FormulaireMaconnerie extends Component {
  constructor(props){
    super(props);
    this.state = {
      idMission: null,
      intitule:null,
      date:null,
      dateFormattee:null,
      description:null,
      nom:null,
      show:null,
      mode:null
    }
  }

    onChange = (event, selectedDate) => {
      const currentDate = selectedDate || this.state.date;
      this.setState({show: Platform.OS === 'ios', date: currentDate});

      const dateFormattee = ("0" + selectedDate.getDate()).slice(-2) + "/" + ("0" + (selectedDate.getMonth() + 1)).slice(-2);
      this.setState({dateFormattee: dateFormattee})
      this.setState({date: dateFormattee})
      console.log("date", this.state.dateFormattee, this.state.date)
    };

    showMode = async  (currentMode) => {
      await this.setState({show: true, mode: currentMode})
    };

    showDatepicker = (type) => { this.showMode('date')};

    goToNextStep = () => {
      let dateBDD = this.state.dateFormattee;
      for(let i=0; i < dateBDD.length; i++){
        if(dateBDD.includes("/")){
          dateBDD = dateBDD.replace( "/", "");
          console.log("STEPPPP",dateBDD )
        }
      }

      let idMission = 'M_'+dateBDD+'-'+this.state.nom;
      this.props.navigation
      .navigate('PhotoMaconnerie',
      {
        idMission:idMission,
        intitule:this.state.intitule,
        nom:this.state.nom,
        date:this.state.date,
        lieu:this.state.lieu,
        description:this.state.description,
      })
    };

  render() {
    return (
      <ScrollView>
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
                <Text style={{fontSize:18, fontWeight:'bold'}}>Intitulé de la mission</Text>
              </View>

              <View style={formulaireMissionStyles.form}>
                <Icon type='material' name='keyboard-arrow-right' size={22} style={formulaireMissionStyles.iconForm} />
                <TextInput placeholder="Ex : Granite à poser, entourage..." onChangeText={intitule => this.setState({intitule: intitule})} />
              </View>

              <View style={{justifyContent:'center', alignItems:'center', marginTop:25}}>
                <Text style={{fontSize:18, fontWeight:'bold'}}>Description</Text>
              </View>

              <View style={formulaireMissionStyles.form}>
                <Icon type='material' name='person' size={22} style={formulaireMissionStyles.iconForm} />
                <TextInput placeholder="Saisir le nom de famille" onChangeText={nom => this.setState({nom: nom})} />
              </View>


              <View style={formulaireMissionStyles.form}>
                <Icon type='material' name='book-online' size={22} style={formulaireMissionStyles.iconForm}/>
                <TouchableOpacity onPress={() => this.showDatepicker()}>
                  <TextInput
                    editable={false}
                    placeholderTextColor={this.state.date !== null ? "black" : "#C7C7CD"}
                    placeholder={(this.state.date !== null ? "Date : " + this.state.dateFormattee : " Sélectionner ici la date de la mission")}/>
                </TouchableOpacity>
              </View>

              <View style={formulaireMissionStyles.form}>
                <Icon type='material' name='place' size={22} style={formulaireMissionStyles.iconForm} />
                <TextInput placeholder="Saisir le lieu du chantier" onChangeText={lieu => this.setState({lieu: lieu})} />
              </View>

              <View style={formulaireMissionStyles.formMulti}>
                <TextInput
                  multiline
                  numberOfLines={4}
                  editable
                  placeholder="Saisir une description"
                  onChangeText={description => this.setState({description: description})} />
              </View>


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
  }
}

export default FormulaireMaconnerie;
