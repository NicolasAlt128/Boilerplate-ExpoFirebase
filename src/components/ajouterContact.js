import React, { Component } from 'react';
import { AppRegistry, View, Image, Button, Text, SafeAreaView, FlatList, StyleSheet, Dimensions, ScrollView, TextInput, TouchableOpacity} from 'react-native';
import { Icon } from 'react-native-elements';
import { NavigationContainer, useNavigation } from '@react-navigation/native';

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

class AjouterContact extends Component {

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
          <Text>Ajouter Contact</Text>
        </View>

        </View>
      </View>
    );
  }
}

export default AjouterContact;
