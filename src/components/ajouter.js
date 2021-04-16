import React, { Component } from 'react';
import { AppRegistry, View, Image, Button, Text, SafeAreaView, FlatList, StyleSheet, Dimensions, ScrollView, TextInput, TouchableOpacity} from 'react-native';
import { Icon } from 'react-native-elements';
import { NavigationContainer, useNavigation } from '@react-navigation/native';

const dimensions = Dimensions.get('window');
const imageHeight = Math.round(dimensions.width * 9 / 16);
const imageWidth = dimensions.width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    flexDirection: 'row',
    backgroundColor: '#b8cccf',
    borderWidth:  1,
    borderColor:'#333333',
  },
  nomFamille:{
    marginTop:2,
    fontSize: 16,
  },
  typeMission:{
    marginLeft:5,
    marginTop:2,
    fontSize: 20,
    fontWeight:'bold',
  },
  heure:{
    marginHorizontal:7,
    marginTop:2,
    fontSize: 30,
    fontWeight:'100',
    alignSelf:'flex-end'
  },
  ville:{
    marginTop:4,
    fontSize: 15,
    bottom:0,
    left:0,
  },
  title: {
    marginHorizontal:2,
    marginTop:2,
    fontSize: 12,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'stretch'
  },
  arrowRight: {
    width: 25,
    height: 25,
    resizeMode: 'stretch',
  },
  roundButton: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    padding: 10,
    borderRadius: 100,
    backgroundColor: 'orange',
    margin:15
  }
});

class Ajouter extends Component {

  constructor(props){
    super(props);
    this.state = {
      choixMision: 'Cérémonie',
      nextStep: false
    }

  }

    setChoixMission = async (mission) => {
    await this.setState({choixMission: mission})
    this.props.navigation.navigate('FormulaireMission', { typeMission: this.state.choixMission });
  }

  render() {

    return (
      <View style={{flex:1, flexDirection:'column', justifyContent:'space-between'}}>
        <View style={{flex:1, justifyContent:'space-between'}}>

        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <View style={{flex:1, flexDirection:'column'}}>
            <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
              <TouchableOpacity onPress={() => this.setChoixMission('Cérémonie')} style={{flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                <View
                  style={styles.roundButton}>
                  <Image style={{width:50, height:50}} source={require('../img/church.png')} />
                </View>
                <Text style={{fontSize:20}}>Cérémonie</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.setChoixMission('Maçonnerie')} style={{flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                <View
                  style={styles.roundButton}>
                  <Image style={{width:50, height:50}} source={require('../img/brouette.png')} />
                </View>
                <Text style={{fontSize:20}}>Maçonnerie</Text>
              </TouchableOpacity>
            </View>
            <View style={{flex:1, flexDirection:'row', justifyContent:'space-around', marginBottom:60}}>
              <TouchableOpacity onPress={() => this.setChoixMission('Transport')} style={{flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                <View
                  style={styles.roundButton}>
                  <Image style={{width:100, height:100}} source={require('../img/vehicule.png')} />
                </View>
                <Text style={{fontSize:20}}>Transport</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                <View
                  style={styles.roundButton}>
                  <Image style={{width:50, height:50}} source={require('../img/ouverture.png')} />
                </View>
                <Text style={{fontSize:20}}>Ouverture</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        </View>
      </View>
    );
  }
}

export default Ajouter;
