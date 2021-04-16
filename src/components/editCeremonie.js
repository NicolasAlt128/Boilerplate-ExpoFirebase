import React, {useState, Component} from 'react';
import { Alert, TouchableWithoutFeedback, KeyboardAvoidingView, Keyboard, View, Image, Button, Text, SafeAreaView, FlatList, StyleSheet, Dimensions, ScrollView, TextInput, TouchableOpacity} from 'react-native';
import { Icon } from 'react-native-elements';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Modal from 'react-native-modal';

import * as firebase from 'firebase';

class EditCeremonie extends Component {
  constructor(props){
    super(props);
    this.state = {
      typeMission: this.props.route.params.type,
      nomFamille: null,
      dateMission: this.props.route.params.dateMission,
      heureMission: this.props.route.params.heureMission,
      villeCeremonie: null,
      villeCimetiere:'',
      iconName: '',
      text: '',
      date: null,
      mode: 'date',
      show: false,
      formattedDate: null,
      formattedHeure: null,
      isModalVisible:false
    }
    if (!firebase.apps.length) {
      firebase.initializeApp(config);
     }
  }

  componentDidMount(){
    this.setState({nomFamille:this.props.route.params.nomFamille});
    this.setState({villeCeremonie: this.props.route.params.villeCeremonie});
  }

   guidGenerator() {
      var S4 = function() {
         return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
      };
      return (S4()+S4()+"-"+S4()+"-"+S4());
    }

  onChange = (event, selectedDate) => {
    const currentDate = selectedDate || this.state.date;
    this.setState({show: Platform.OS === 'ios'});
    this.setState({date: currentDate});
    if(this.state.mode == 'date'){
      const formattedDate = ("0" + this.state.date.getDate()).slice(-2) + "/" + ("0" + (this.state.date.getMonth() + 1)).slice(-2) + "/" + this.state.date.getFullYear();
      //this.setState({dateMission: this.state.date})
      this.setState({dateMission: formattedDate})
    }else{
      const formattedHeure = ("0" + this.state.date.getHours()).slice(-2) + "h" + ("0" + (this.state.date.getMinutes())).slice(-2);
      //this.setState({heureMission: this.state.date})
      this.setState({heureMission: formattedHeure})
    }
  };

  showMode = (currentMode) => {
    this.setState({show: true});
    this.setState({mode: currentMode});
  };

  showDatepicker = () => {
    this.showMode('date');
  };

  showTimepicker = () => {
    this.showMode('time');
  };

  toggleModal = () => {
    if(!this.state.isModalVisible){
        this.setState({isModalVisible:true})
    }else { this.setState({isModalVisible:false}) }
  };

  modifierMission = async (famille, formattedDate, formattedHeure, type, villeCeremonie) => {
    const idMission = this.props.route.params.idMission;
      switch (type) {
      case 'Cérémonie':
        await firebase.database().ref('Missions/'+idMission).set({
            idMission,
            famille,
            formattedDate,
            formattedHeure,
            type,
            villeCeremonie,
        }).then((data)=>{
          this.props.navigation.navigate('Planning');
        }).catch((error)=>{
          console.log('Error', error)
        });
        break;
    }
  };

  showModalEditMission = () => {
    if(this.state.nomFamille == '' || this.state.villeCeremonie == ''){
      if(!this.state.isModalVisible){
          this.setState({isModalVisible:true})
      }else {
        this.setState({isModalVisible:false})
      }
    } else{
      this.modifierMission(
          this.state.nomFamille,
          this.state.dateMission,
          this.state.heureMission,
          this.state.typeMission,
          this.state.villeCeremonie )
    }
  };

  render() {

   switch(this.props.route.params.type){
     case 'Transport':
      return(
        <FormulaireTransport />
      )
     break;
     case 'Maçonnerie':
       return(
         <FormulaireMaconnerie />
       )
     break;
     case 'Cérémonie':
       return(
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{flex:1, flexDirection:'column', justifyContent:'space-between'}}>

          <View style={{ paddingBottom:15}}>

          <Modal isVisible={this.state.isModalVisible} >
            <View style={{justifyContent:'space-between', backgroundColor:'white', alignItems:'center'}}>
              <Text style={{fontSize:20, fontWeight:'bold',margin:15}}>ATTENTION</Text>

              <View style={{paddingLeft:15, paddingRight:15, marginBottom:20, alignItems:'center'}}>
                <Text style={{fontSize:16}}>Des informations sont manquantes, souhaitez-vous passer à la suite ?</Text>
                <Text style={{fontSize:16, fontStyle:'italic'}}>Il vous sera possible de les compléter ultérieurement dans les détails de la mission.</Text>
              </View>

              <View style={{ width:'100%', flexDirection:'row', marginBottom:10, justifyContent:'space-around', alignItems:'center'}}>
                <TouchableOpacity onPress={
                  () => this.modifierMission(
                      this.state.nomFamille,
                      this.state.dateMission,
                      this.state.heureMission,
                      this.state.typeMission,
                      this.state.villeCeremonie )} style={{ paddingLeft:25, paddingRight:25, paddingTop:5, paddingBottom:5, borderRadius:20, flexDirection:'row', backgroundColor:'#99EE99',justifyContent:'center', alignItems:'center', marginBottom:15}}>
                  <Text style={{fontSize:18}}>Oui</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.showModalEditMission} style={{ paddingLeft:25, paddingRight:25, paddingTop:5, paddingBottom:5, borderRadius:20, flexDirection:'row', backgroundColor:'#ff7f7f',justifyContent:'center', alignItems:'center', marginBottom:15}}>
                  <Text style={{fontSize:18}}>Non</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

            <View style={{justifyContent:'center', paddingLeft:15, paddingRight:15 }}>

              <View style={{alignItems:'center'}}>
                <Text style={{margin:10, fontSize:26, fontWeight:'bold'}}>Cérémonie</Text>
              </View>

              <View style={{marginTop:10}}>
                    <Text style={{fontSize:18, fontWeight:'bold'}}>Saisir le nom de famille</Text>
                    <View style={{flexDirection:'row', alignItems: 'center', height: 35, width:'100%', borderColor: 'gray', borderWidth: 0.5}}>
                      <Icon type='font-awesome' name='user' size={22} style={{width:50, justifyContent:'center'}}/>
                      <TextInput
                        value={this.state.nomFamille}
                        onChangeText={nomFamille => this.setState({nomFamille: nomFamille})}
                      />
                    </View>
              </View>

               <View style={{ marginTop:10}}>
                    <Text style={{fontSize:18, fontWeight:'bold'}}>Sélectionner la date de la cérémonie</Text>
                    <View style={{flexDirection:'row', alignItems: 'center', height: 35, width:'100%', borderColor: 'gray', borderWidth: 0.5}}>
                    <Icon type='material' name='book-online' size={22} style={{width:50, justifyContent:'center'}}/>
                      <TouchableOpacity onPress={() => this.showDatepicker()}>
                        <TextInput
                          editable={false}
                          placeholder={this.props.route.params.dateMission}
                        />
                      </TouchableOpacity>
                    </View>
              </View>

              <View style={{marginTop:10}}>
                <Text style={{fontSize:18, fontWeight:'bold'}}>Sélectionner l'heure de la cérémonie</Text>
                <View style={{flexDirection:'row', alignItems: 'center', height: 35, width:'100%', borderColor: 'gray', borderWidth: 0.5}}>
                <Icon type='font-awesome' name='clock-o' size={22} style={{width:50, justifyContent:'center'}}/>
                  <TouchableOpacity onPress={() => this.showTimepicker()}>
                    <TextInput
                      editable={false}
                      placeholder={this.props.route.params.heureMission}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {this.state.show && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={new Date()}
                  mode={this.state.mode}
                  is24Hour={true}
                  display="default"
                  onChange={this.onChange}
                />
              )}

              <View style={{ marginTop:10}}>
                <Text style={{fontSize:18, fontWeight:'bold'}}>Saisir la ville de la cérémonie</Text>
                <View style={{flexDirection:'row', alignItems: 'center', height: 35, width:'100%', borderColor: 'gray', borderWidth: 0.5}}>
                  <Icon type='material' name='place' size={22} style={{width:50, justifyContent:'center'}}/>
                  <TextInput
                    value={this.state.villeCeremonie}
                    onChangeText={villeCeremonie => this.setState({villeCeremonie: villeCeremonie})}
                  />
                </View>
              </View>

              <TouchableOpacity
                onPress={ () => this.showModalEditMission()}
                style={{
                  padding:10,
                  borderRadius:20,
                  flexDirection:'row',
                  height:40,
                  marginHorizontal:60,
                  backgroundColor:'#99EE99',
                  justifyContent:'center',
                  alignItems:'center',
                  marginBottom:15}}>
                <Text style={{fontSize:16, margin:30}}>Modifier</Text>
                <Icon type='font-awesome' name='chevron-right' size={24} style={{}}/>
              </TouchableOpacity>

          </View>
        </View>
      </View>
      </TouchableWithoutFeedback>
    );
   break;
   default:
   return(
       <View>
       <Text>Erreur</Text>
       </View>
   )
   }
  }
}

// onPress={() => this.insertMissionData(this.state.famille, this.state.dateMission, this.state.heureMission, this.state.typeMission, this.state.villeCeremonie, this.state.villeCimetiere)}


const styles = StyleSheet.create({
  image: {
    width: '100%',
    backgroundColor:'#cccccc',
    padding:30,
  },
  infoBox: {
    flex: 1,
    backgroundColor: '#d6daef',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginTop:15
  },
});

export default EditCeremonie;
