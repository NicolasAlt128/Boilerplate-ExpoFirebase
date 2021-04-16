import React, { Component } from 'react';
import { AppRegistry, View, Image, Button, Text, SafeAreaView, FlatList, StyleSheet, Dimensions, ScrollView, TextInput, TouchableOpacity} from 'react-native';
import { Icon } from 'react-native-elements';
import { NavigationContainer, useNavigation } from '@react-navigation/native';

import * as firebase from 'firebase';

const dimensions = Dimensions.get('window');
const imageHeight = Math.round(dimensions.width * 9 / 16);
const imageWidth = dimensions.width;

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
    nomFamille: 'PONS',
    type: 'CÉRÉMONIE',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
    nomFamille: 'HERMITTE',
    type: 'MARBRERIE',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
    nomFamille: 'BORGES',
    type: 'CÉRÉMONIE',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e98d72',
    title: 'Third Item',
    nomFamille: 'BORGES',
    type: 'TRANSPORT',
  },
];

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
  }
});

class MesMissions extends Component {

  constructor(props){
    super(props);
    this.state = {

    }
  }

  render() {

    return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Mes Mission</Text>
    </View>
    );
  }
}

export default MesMissions;
