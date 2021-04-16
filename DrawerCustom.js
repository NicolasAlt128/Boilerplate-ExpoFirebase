import React, { Component } from 'react';
import {  TouchableNativeFeedback,
  Linking, Platform, LogBox, View, Image, Button, Text, SafeAreaView, FlatList, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { useRoute, getFocusedRouteNameFromRoute } from '@react-navigation/native';

import { createDrawerNavigator,
         DrawerItem,
         DrawerContentScrollView,
         DrawerItemList } from '@react-navigation/drawer';
import { TouchableHighlight } from 'react-native-gesture-handler';


chooseIcon = (route) => {
  switch(route){
    case 'Gestion des utilisateurs':
      return 'group';

    case 'Notifications':
      return 'bell';

    default:
      return 'add';
  }
}

class CustomDrawerContent extends Component{
  constructor(props){
    super(props);
    this.state = {

    }
  }

  logout = async () => {
    this.props.navigation.navigate('Login',{screen:'Login'})
  };

  render(){

    const Header = (props) => {
      let array = Object.values(props)
      let prenom = " "
      let nom = ""
      if(array[0] !== null){
        prenom = array[0].prenom;
        nom = array[0].nom;
      }
      return(
        <View style={{backgroundColor:'#333333', padding:20}}>
          <View style={{flexDirection:'row', justifyContent:'flex-end', alignItems:'flex-end'}}>
            <Text style={{color:'white', fontSize:20}}>{prenom} </Text>
            <Text style={{color:'white', fontSize:24, fontWeight:'bold'}}>{nom}</Text>
          </View>
          <TouchableOpacity onPress={() => this.logout()}
            style={{marginTop:25, flexDirection:'row', borderRadius:10, justifyContent:'center', backgroundColor:'white', marginHorizontal:10, paddingTop:10, paddingBottom:10}}>
            <Icon type='font-awesome' color='#333333' name='sign-out' size={20}/>
            <Text style={{marginLeft:10, fontWeight:'bold'}}>Se déconnecter</Text>
          </TouchableOpacity>
        </View>
      )
    }

    return (
      <DrawerContentScrollView
        style={{backgroundColor:'#033664'}}
        {...this.props}>
        <Header props={this.props.userInfos}/>
        {this.props.state.routeNames.map((route, idx) => {
         if (route === 'Login') return null;
         const focused = idx === this.props.state.index;
         return (
           <TouchableOpacity
             key={route}
             onPress={() => this.props.navigation.navigate(route)}>
             <View style={{flexDirection:'row', marginBottom:2, backgroundColor: 'rgba(255,255,255,0.2)', padding:15, alignItems:'center'}}>
             <Icon type='font-awesome' color="white" name={chooseIcon(route)} size={20}/>
               <Text
                 style={{ marginLeft:10, fontSize:18,
                   color: focused ? '#fff' : '#fff'
                 }}>
                 {route}
               </Text>
             </View>
           </TouchableOpacity>
         );
       })}
      </DrawerContentScrollView>
    );
  }

}

const mapStateToProps = (state) => {
  return {
    userInfos: state.userInfos
  };
}

export default connect(mapStateToProps)(CustomDrawerContent)
