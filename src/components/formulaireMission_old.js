import React, {useState, Component} from 'react';
import { AppRegistry, View, Image, Button, Text, SafeAreaView, FlatList, StyleSheet, Dimensions, ScrollView, TextInput, TouchableOpacity} from 'react-native';
import { Icon } from 'react-native-elements';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';

import FormulaireTransport from './formulaireTransport.js';
import FormulaireMaconnerie from './formulaireMaconnerie.js';

import * as firebase from 'firebase';

const dimensions = Dimensions.get('window');
const imageHeight = Math.round(dimensions.width * 9 / 16);
const imageWidth = dimensions.width;

const styles = StyleSheet.create({
  container: {
    flexDirection:'column',
  },
  image: {
    width: '100%',
    backgroundColor:'#cccccc',
    padding:30,
  }
});

class FormulaireMission extends Component {
  constructor(props){
    super(props);
    this.state = {
      typeMission:  this.props.route.params.typeMission,
      villeCeremonie: '',
      villeCimetiere:'',
      dateMission:'',
      famille:'',
      iconName: '',
      text: '',
      date: new Date(1598051730000),
      mode: 'date',
      show: false
    }
    if (!firebase.apps.length) {
      firebase.initializeApp(config);
     }
  }

   guidGenerator() {
      var S4 = function() {
         return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
      };
      return (S4()+S4()+"-"+S4()+"-"+S4());
    }

  insertMissionData = (famille, date, type, villeCeremonie, villeCimetiere) => {
    this.state.famille, this.state.dateMission, this.state.typeMission, this.state.villeCeremonie, this.state.villeCimetiere

    console.log("famille", famille)
    //let idMission = date+'-'+famille;

    // console.log("idMission", idMission)
    console.log("type:", type, this.state.typeMission)

    switch (type) {
      case 'Cérémonie':
        let idMission = 'C_'+date+'-'+famille;
        firebase.database().ref('Missions/'+idMission).set({
            idMission,
            famille,
            date,
            type,
            villeCeremonie,
            villeCimetiere
        }).then((data)=>{
            //success callback
            console.log('data ' , data)
        }).catch((error)=>{
            //error callback
            console.log('error ' , error)
        });
        break;
      case 'Maçonnerie':
        firebase.database().ref('Missions/Maçonnerie/'+idMission).set({
            famille,
            date,
            type,
            villeCeremonie,
            villeCimetiere
        }).then((data)=>{
            //success callback
            console.log('data ' , data)
        }).catch((error)=>{
            //error callback
            console.log('error ' , error)
        });
      case 'Transport':
        firebase.database().ref('Missions/Transport/'+idMission).set({
            famille,
            date,
            type,
            villeCeremonie,
            villeCimetiere
        }).then((data)=>{
            //success callback
            console.log('data ' , data)
        }).catch((error)=>{
            //error callback
            console.log('error ' , error)
        });
        break;
    }
  };

  showData(dateData){
    /*var data = dateData;
    data = JSON.parse(data);

    data.forEach(function(m){
       console.info(m); // Object { who="Craig"}
       console.info(m[0]); // now not sure who to get it if who changes to name
   });*/

   //dateData.map(s => ({s}))
  }

  onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    // if(Platform.OS === 'ios'){
    //   this.setState({show: 'ios'})
    // }else{
    //
    // }
    console.log("Test", Platform.OS === 'ios')
    // this.setShow(Platform.OS === 'ios');
    // this.setDate(currentDate);
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

  render() {

   //  const onChange = (event, selectedDate) => {
   //    const currentDate = selectedDate || this.state.date;
   //    this.setState({date: currentDate});
   //    if(this.state.show == true){
   //      this.setState({show:false});
   //    }else{
   //      this.setState({show:true});
   //    }
   //  };
   //
   //  const showMode = (currentMode) => {
   //    this.setState({show: true});
   //    this.setState({mode: currentMode});
   //  };
   //
   //  const showDatepicker = () => {
   //   showMode('date');
   // };
   //
   //  const showTimepicker = () => {
   //   showMode('time');
   // };

   switch(this.state.typeMission){
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
      <View style={{paddingBottom:33}}>
        <ScrollView style={styles.container}>

          <View>
            <View style={styles.image}>
              <View style={{ flexDirection:'row', width: '100%', height: 130, borderWidth:1, borderColor:'#333333', borderStyle: 'dashed', borderRadius : 1, alignItems:'center', justifyContent:'center'}}>
                <Text>Ajouter une photo</Text>
                <Icon
                  style={{ marginLeft:10}}
                  name="photo-library"
                  type="material"
                  color="#033664"
                  size={22}
                  />
              </View>
            </View>
          </View>

          <View style={{paddingLeft:15}}>
            <Text style={{ fontSize:20, marginTop:5 }}>CÉRÉMONIE</Text>
            <View
              style={{
                borderBottomColor: 'black',
                borderBottomWidth: 1,
                marginRight:70
              }}
            />
            <View style={{flexDirection:'row', marginTop:10}}>
              <Text style={{ alignSelf:'center', fontSize:20, fontWeight:'bold',marginRight:15}}>FAMILLE</Text>
            </View>

            <View
              style={{flexDirection:'row',
                      marginLeft:10,
                      borderLeftWidth:1,
                      borderLeftColor:'#333333',
                      height:30,
                      width: 70}}>
              <Text>{this.showData(this.state.date)}</Text>
              {/*<Text style={{marginLeft:10, marginTop:5}}>Heure</Text>*/}
              <TextInput
                style={{ height: 42, width:200, borderColor: 'gray', borderWidth: 1, marginLeft:10}}
                placeholder="Saisir nom famille"
                onChangeText={famille => this.setState({famille: famille})}
              />
              { /*console.log("Date", this.state.date)*/ }
            </View>

            <View style={{flexDirection:'column'}}>

              <View style={{flexDirection:'row',  alignItems: 'center', marginTop:15}}>
                <Icon
                  type='font-awesome'
                  name='clock-o'
                  />
                  <TouchableOpacity onPress={() => this.showTimepicker()}>
                  <Text style={{fontSize:14, fontWeight:'bold', marginLeft:5}}>Sélectionner l'heure de la cérémonie</Text>
                  </TouchableOpacity>
                  {this.state.show && (
                    <DateTimePicker
                      testID="dateTimePicker"
                      value={this.state.date}
                      mode={this.state.mode}
                      is24Hour={true}
                      display="default"
                      onChange={() => this.onChange()}
                    />
                  )}
              </View>

              <View
                style={{flexDirection:'row',
                        marginLeft:10,
                        borderLeftWidth:1,
                        borderLeftColor:'#333333',
                        height:30,
                        width: 70}}>
                <Text>{this.showData(this.state.date)}</Text>
                {/*<Text style={{marginLeft:10, marginTop:5}}>Heure</Text>*/}
                <TextInput
                  style={{ height: 42, width:200, borderColor: 'gray', borderWidth: 1, marginLeft:10}}
                  placeholder="Saisir date"
                  onChangeText={dateMission => this.setState({dateMission: dateMission})}
                />
                { /*console.log("Date", this.state.date)*/ }
              </View>

              <View style={{flexDirection:'row', alignItems: 'center', marginTop:15}}>
                <Icon type='material' name='place'/>
                  <View style={{flexDirection:'row'}}>
                    <Text style={{fontSize:14, fontWeight:'bold', marginLeft:5}}>Saisir la ville de la cérémonie</Text>
                  </View>
              </View>

              <View style={{ flexDirection:'column' }}>
                <View
                  style={{flexDirection:'row',
                          marginLeft:10,
                          borderLeftWidth:1,
                          borderLeftColor:'#333333',
                          height:30,
                          width: 70}}>
                  <TextInput
                    style={{ height: 42, width:200, borderColor: 'gray', borderWidth: 1, marginLeft:10}}
                    placeholder="Saisir une ville"
                    onChangeText={villeCeremonie => this.setState({villeCeremonie: villeCeremonie})}
                  />
                </View>
              </View>

            </View>

          </View>
          <View style={{paddingLeft:15}}>

            <Text style={{ fontSize:20, marginTop:15 }}>CIMETIÈRE</Text>
            <View
              style={{
                borderBottomColor: 'black',
                borderBottomWidth: 1,
                marginRight:70
              }}
            />

            <View style={{flexDirection:'column'}}>

              <View style={{flexDirection:'row', marginTop:15}}>
                <Icon
                  type='material'
                  name='place'
                  />
                  <Text style={{fontSize:14, fontWeight:'bold', marginLeft:5}}>Lieu cimetière</Text>
              </View>

              <View style={{ flexDirection:'column' }}>
                <View
                  style={{flexDirection:'row',
                          marginLeft:10,
                          borderLeftWidth:1,
                          borderLeftColor:'#333333',
                          height:30,
                          width: 70}}>
                  <TextInput
                    style={{ height: 30, width:200, borderColor: 'gray', borderWidth: 1, marginLeft:10}}
                    placeholder="Saisir une ville"
                    onChangeText={villeCimetiere => this.setState({villeCimetiere: villeCimetiere})}
                  />
                </View>
              </View>

              <View style={{flexDirection:'row', marginTop:15}}>
                <Image
                  style={{width:30, height:30}}
                  source={require('../img/caveau.png')}
                  />
                <Text style={{fontSize:20, fontWeight:'bold', marginLeft:5}}>CAVEAU</Text>
              </View>

              <View style={{flexDirection:'row', marginTop:15}}>
                <Image
                  style={{width:35, height:35}}
                  source={require('../img/ouverture.png')}
                  />
                <Text style={{fontSize:20, fontWeight:'bold', marginLeft:5}}>Ouverture par Mickael</Text>
              </View>

            </View>

          </View>

          <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
            <Text style={{ fontSize:20, marginTop:15, paddingLeft:15 }}>PLUS D'INFOS</Text>
            <Icon
              type='material'
              name={this.state.showPlusInfos ? 'arrow-drop-up' : 'arrow-drop-down'}
              size={30}
              style={{marginRight:20}}
              onPress={() => this.showPlusInfos(this.state.showPlusInfos)}
              />
          </View>
          <View
            style={{
              borderBottomColor: 'black',
              borderBottomWidth: 1,
              marginRight:70,
              marginBottom:20,
              marginLeft:15
            }}
          />

          <Text>{this.state.showPlusInfos ? 'SHOW' : 'PAS MONTRER'}</Text>

        </ScrollView>
        <View style={{backgroundColor:'green', borderWidth:0, height:60}}>
          <TouchableOpacity
            onPress={() => this.insertMissionData(this.state.famille, this.state.dateMission, this.state.typeMission, this.state.villeCeremonie, this.state.villeCimetiere)}
            style={{flexDirection:'row', justifyContent:'center'}}>
            <Text style={{fontSize:18, color:'white', marginTop:3, marginRight:5}}>VALIDER</Text>
            <Icon
              type='material'
              name='done'
              size={28}
              color='white'
              />
          </TouchableOpacity>
        </View>
      </View>
    );
   break;
   }

  }
}

export default FormulaireMission;
