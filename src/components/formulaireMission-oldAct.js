import React, { Component } from 'react';
import { Dimensions, STouchableWithoutFeedback, Keyboard, View, Text, TextInput, TouchableOpacity, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import { Icon } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import Modal from 'react-native-modal';

// import FormulaireTransport from './formulaireTransport.js';

import FormulaireCeremonie from './formulaireCeremonie.js';

import TagInput from 'react-native-tags-input';

import * as firebase from 'firebase';

import { formulaireMissionStyles, modalStyles } from './styles';

class FormulaireMission extends Component {
  constructor(props){
    super(props);
    this.state = {
      typeMission:  this.props.route.params.typeMission,
      villeCeremonie: null,
      dateMission:null,
      heureMission:null,
      famille:null,
      date: new Date(1598051730000),
      mode: 'date',
      show: false,
      formattedDate: null,
      formattedHeure: null,
      isModalVisible:false,
      tags: {
        tag: '',
        tagsArray: ['Thierry', 'Daniel', 'Frederique', 'Carine', 'Nicolas']
      },
    }
    if (!firebase.apps.length) firebase.initializeApp(config);
  }

  onChange = (event, selectedDate) => {
    const currentDate = selectedDate || this.state.date;
    this.setState({show: Platform.OS === 'ios', date: currentDate});
    if(this.state.mode == 'date'){
      const formattedDate = ("0" + this.state.date.getDate()).slice(-2) + "/" + ("0" + (this.state.date.getMonth() + 1)).slice(-2) + "/" + this.state.date.getFullYear();
      this.setState({ dateMission: this.state.date, formattedDate: formattedDate });
    }else{
      const formattedHeure = ("0" + this.state.date.getHours()).slice(-2) + "h" + ("0" + (this.state.date.getMinutes())).slice(-2);
      this.setState({ heureMission: this.state.date, formattedHeure: formattedHeure });
    }
  };

  showMode = (currentMode) => { this.setState({show: true, mode: currentMode}); };

  showDatepicker = () => { this.showMode('date'); Keyboard.dismiss(); };

  showTimepicker = () => { this.showMode('time'); Keyboard.dismiss(); };

  showModalNextStepMission = () => {
    if(this.state.famille == null|| this.state.villeCeremonie == null || this.state.dateMission == null || this.state.heureMission == null){
      if(!this.state.isModalVisible){
          this.setState({isModalVisible:true});
      }else {
        this.setState({isModalVisible:false});
      }
    } else {
      // this.props.navigation.navigate('FormulaireMissionStep2',
      this.props.navigation.navigate('FormulaireMissionAdditionnalInfos',
      { nomFamille: this.state.famille,
        villeCeremonie: this.state.villeCeremonie,
        dateMission: this.state.dateMission,
        heureMission: this.state.heureMission,
        typeMission: this.props.route.params.typeMission });
    }
  };

  goToNextStep = async () => {
    await this.setState({isModalVisible:false});
    this.props.navigation.navigate('FormulaireMissionAdditionnalInfos',
    // .navigate('FormulaireMissionStep2',
    { nomFamille: this.state.famille,
      villeCeremonie: this.state.villeCeremonie,
      dateMission: this.state.dateMission,
      heureMission: this.state.heureMission,
      typeMission: this.props.route.params.typeObseques }
    )};

    updateTagState = (state) => {
    this.setState({
      tags: state
    })
  };

  render() {
    console.log("FORMULAIRE MISSION", this.state.typeMission)

   switch(this.state.typeMission){
     case 'Cérémonie' :
       return <FormulaireCeremonie /> ;
       break;
     case 'Transport' :
       return <FormulaireTransport /> ;
       break;
     case 'Cérémonie2' :
       return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

          <View style={formulaireMissionStyles.container}>

            <View style={{justifyContent:'center', paddingLeft:15, paddingRight:15 }}>
              <Modal isVisible={this.state.isModalVisible} >
                <View style={modalStyles.container}>
                  <Text style={modalStyles.header}>ATTENTION</Text>
                  <View style={modalStyles.text}>
                    <Text style={modalStyles.title}>Des informations sont manquantes, souhaitez-vous passer à la suite ?</Text>
                    <Text style={modalStyles.subTitle}>Il vous sera possible de les compléter ultérieurement dans les détails de la mission.</Text>
                  </View>
                  <View style={modalStyles.buttonContainer}>
                    <TouchableOpacity onPress={ () => this.goToNextStep() } style={modalStyles.buttonYes}>
                      <Text>Oui</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.showModalNextStepMission} style={modalStyles.buttonNo}>
                      <Text>Non</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>

                       {/*containerStyle={{width: (Dimensions.get('window').width - 40)}}*/}

              {/*<TagInput
                       updateState={this.updateTagState}
                       tags={this.state.tags}
                       placeholder="Tags..."
                       label='Press comma & space to add a tag'
                       labelStyle={{color: '#fff'}}
                       leftElement={<Icon name={'tag-multiple'} type={'material-community'} color={this.state.tagsText}/>}
                       leftElementContainerStyle={{marginLeft: 3}}

                       inputContainerStyle={formulaireMissionStyles.form}
                       autoCorrect={false}
                       tagStyle={styles.tag}
                       tagTextStyle={styles.tagText}
                       keysForTag={', '}/>*/}

              <View style={formulaireMissionStyles.form}>
                <Icon type='font-awesome' name='user' size={22} style={formulaireMissionStyles.iconForm}/>
                <TextInput placeholder="Saisir le nom de famille" onChangeText={famille => this.setState({famille: famille})}/>
              </View>

              <View style={formulaireMissionStyles.form}>
                <Icon type='material' name='place' size={22} style={formulaireMissionStyles.iconForm} />
                <TextInput placeholder="Saisir la ville de la cérémonie" onChangeText={villeCeremonie => this.setState({villeCeremonie: villeCeremonie})} />
              </View>

              <View style={formulaireMissionStyles.form}>
                <Icon type='material' name='book-online' size={22} style={formulaireMissionStyles.iconForm}/>
                <TouchableOpacity onPress={() => this.showDatepicker()}>
                  <TextInput editable={false} placeholder={' ' + (this.state.dateMission !== null ? this.state.formattedDate : "Sélectionner ici la date de la cérémonie")}/>
                </TouchableOpacity>
              </View>

              <View style={formulaireMissionStyles.form}>
                <Icon type='font-awesome' name='clock-o' size={22} style={formulaireMissionStyles.iconForm}/>
                <TouchableOpacity onPress={() => this.showTimepicker()}>
                  <TextInput editable={false} placeholder={' ' + (this.state.heureMission !== null ? this.state.formattedHeure : " Sélectionner ici l'heure de la cérémonie")}/>
                </TouchableOpacity>
              </View>
              { this.state.show && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={new Date()}
                  mode={this.state.mode}
                  is24Hour={true}
                  display="default"
                  onChange={this.onChange} /> ) }
            </View>

            <TouchableOpacity onPress={() => this.showModalNextStepMission()}
                style={formulaireMissionStyles.buttonForm}>
              <Text style={{fontSize:16, margin:30, color:"white"}}>Passer à la suite</Text>
              <Icon type='font-awesome' name='chevron-right' size={24} color="white"/>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
       );
       break;
   }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
      height: 40,
      borderColor: 'white',
      borderWidth: 1,
      marginTop: 8,
      borderRadius: 5,
      padding: 3,
    },
    tag: {
        backgroundColor: '#fff'
      },
    tagText: {
        color: 'black'
      },
});

export default FormulaireMission;
