import React, { Component } from 'react';
import { Dimensions, Keyboard, View, Text, TextInput, TouchableOpacity, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import { Icon } from 'react-native-elements';

import TagInput from 'react-native-tags-input';

import * as firebase from 'firebase';

import { formulaireMissionStyles, modalStyles } from './styles';

class InhumOuCrema extends Component {
  constructor(props){
    super(props);
    this.state = {
      typeObseques:null
    }
    if (!firebase.apps.length) firebase.initializeApp(config);
  }

  goToNextStep = (type) => {
    this.props.navigation.navigate("ObsequesSecondScreen", {typeObseques : type});
  }

  render() {
       return(
          <View style={formulaireMissionStyles.containerChoice}>
            <View style={{justifyContent:'center', paddingLeft:15, paddingRight:15 }}>
              <View style={{justifyContent:'center', alignItems:'center', marginTop:25}}>
                <Text style={{fontSize:20, fontWeight:'bold'}}>Est-ce une inhumation ou une crémation ?</Text>
              </View>
            </View>
          </View>
       );
   }
}

export default InhumOuCrema;
