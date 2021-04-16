import React, { Component } from 'react';
import { AppRegistry, View, Image, Text, StyleSheet, Dimensions, ScrollView, TextInput } from 'react-native';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';


const dimensions = Dimensions.get('window');
const imageHeight = Math.round(dimensions.width * 9 / 16);
const imageWidth = dimensions.width;

const styles = StyleSheet.create({
  container: {
    flexDirection:'column',
  },
  image: {
    resizeMode:'cover',
    width: '100%',
    height: 130,
    zIndex: 1,
  }
});


class FormulaireTransport extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: 'testtt',
      plusInfos: false
    }
  }

  showPlusInfos = (bool) => {

    if(bool == true){
      this.setState({ showPlusInfos: false})
    } else{
      this.setState({ showPlusInfos: true})
    }

  };

  render() {
    return (
      <View style={{paddingBottom:33}}>
        <Text>Formulaire Transport</Text>
      </View>
    );
  }
}

export default FormulaireTransport;
