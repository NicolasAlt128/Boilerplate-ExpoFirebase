import React, { Component } from 'react';
import { TouchableOpacity, FlatList, AppRegistry, View, Image, Text, StyleSheet, Dimensions, ScrollView, TextInput } from 'react-native';
import { Icon } from 'react-native-elements';
import { StackActions } from '@react-navigation/native';
import ActionButton from 'react-native-action-button';
import Modal from 'react-native-modal';
import { modalStyles } from './styles';

import * as firebase from 'firebase';

import { connect } from 'react-redux';

const popAction = StackActions.pop(1);


class ManageUsers extends Component {
  constructor(props){
    super(props);
    this.state = {
      isFetching:false,
      data:null,
      isModalVisible:false,
      userId:null
    }
  }

  componentDidMount(){
    this.getUsers();
    this._refreshList = this.props.navigation.addListener('focus', () => {
      this.getUsers();
    });
  }

  deleteUser = () => {
    firebase.database().ref('/Utilisateurs/'+this.state.userId)
    .remove()
    .then((data) => {
      this.getUsers();
    }).catch((err) => {
      console.log(err);
    });

    if(!this.state.isModalVisible){
        this.setState({isModalVisible:true})
    }else { this.setState({isModalVisible:false}) }
  }

  getUsers = () => {
    this.setState({isFetching:true});
    const visit = (obj, fn) => {
      const values = Object.values(obj);
      values.forEach(val => val && typeof val === "object" ? visit(val, fn) : fn(val))
    }
    firebase.database()
    .ref('/Utilisateurs/')
    .once('value')
    .then(snapshot => {

      let sortList = Object.values(snapshot.val())
        this.setState({ data: sortList });
        this.setState({ isFetching:false });
    }).catch(err => {
      this.setState({ isFetching:false });
    });
  }

  showActionButton = () => {
    if(this.props.userInfos.role == 1){
      return(
        <ActionButton
          offsetX={25}
          offsetY={25}
          buttonColor="#0886f8"
          bgColor="rgba(51,51,51,0.9)"
          fixNativeFeedbackRadius={Platform.OS === 'ios' ? false : true}>
            <ActionButton.Item
              textContainerStyle={{flex:1, borderRadius:15, backgroundColor: 'white', borderWidth:0.5, height:30, justifyContent:'center'}}
              textStyle={{flex:1, fontSize:16, fontWeight:'bold'}}
              nativeFeedbackRippleColor={ Platform.OS === 'ios' ? 'rgba(255,255,255,0.75)' : 'rgba(51,51,51,0.2)' }
              buttonColor='#a5ca98' title="Ajouter profil DIRECTION"
              onPress={() => this.props.navigation.navigate('AjouterProfil', { userRole : '1' })}>
              <Icon type='font-awesome-5' name='user-shield' size={25}/>
            </ActionButton.Item>
            <ActionButton.Item
              textContainerStyle={{flex:1, borderRadius:15, backgroundColor: 'white', borderWidth:0.5, height:30, justifyContent:'center'}}
              textStyle={{flex:1, fontSize:16, fontWeight:'bold'}}
              nativeFeedbackRippleColor={ Platform.OS === 'ios' ? 'rgba(255,255,255,0.75)' : 'rgba(51,51,51,0.2)' }
              buttonColor='#cca9c5' title="Ajouter profil SECRÉTARIAT"
              onPress={() => this.props.navigation.navigate('AjouterProfil', { userRole : '2' })}>
              <Icon type='font-awesome-5' name='mail-bulk' size={30}/>
            </ActionButton.Item>
            <ActionButton.Item
              textContainerStyle={{flex:1, borderRadius:15, backgroundColor: 'white', borderWidth:0.5, height:30, justifyContent:'center'}}
              textStyle={{flex:1, fontSize:16, fontWeight:'bold'}}
              nativeFeedbackRippleColor={ Platform.OS === 'ios' ? 'rgba(255,255,255,0.75)' : 'rgba(51,51,51,0.2)' }
              buttonColor='#8bb9dd' title="Ajouter profil AGENT FUNÉRAIRE"
              onPress={() => this.props.navigation.navigate('AjouterProfil', { userRole : '3' })}>
              <Icon type='font-awesome-5' name='user-tie' size={30}/>
            </ActionButton.Item>
          </ActionButton>
      )
    }

  }

  showRole = (role) => {
    switch(role){
      case 1 :
        return "Direction"
      case 2 :
        return "Sécrétariat"
      case 3 :
        return "Agent Funéraire"
      default :
        return "ERROR"
    }
  }

  returnUpper = (text) => {
    if(typeof text === 'string'){
      var newTxt = text.toUpperCase();
      return newTxt
    }
  }

  setUserId(prenom, nom){
    let userId = prenom.charAt(0) + nom;
    userId = userId.toLowerCase();
    this.setState({userId: userId});
  }

  showModalDeleteProfil = (prenom, nom) => {
    if(!this.state.isModalVisible){
        this.setUserId(prenom, nom)
        this.setState({isModalVisible:true})
    }else { this.setState({isModalVisible:false}) }
  }

  render() {

    const Item = ({nom, prenom, role, telephone, email, mdp}) => (
      <TouchableOpacity
      onPress={() => this.props.navigation.navigate('DetailsUser', {nom: nom, prenom: prenom, role: role, telephone: telephone, email: email, mdp: mdp})}
      >
        <View style={{ backgroundColor:'white', flexDirection:'row', justifyContent:'space-between', alignItems:'center', borderBottomWidth:1, borderBottomColor:'#dcdcdc'}}>
          <View style={{margin:15, flexDirection:'column'}}>
            <Text style={{fontSize:16, fontWeight:'bold'}}>{this.returnUpper(prenom)} {this.returnUpper(nom)}</Text>
            <Text style={{fontStyle:'italic', fontSize:16}}>{this.showRole(role)}</Text>
          </View>
          <View style={{ justifyContent:'center', flexDirection:'row'}}>
            <TouchableOpacity style={{  alignItems:'center' }} onPress={() => console.log()}>
              <Icon reverse={false} raised={true} style={{ justifyContent:'center', alignItems: 'center', marginHorizontal:15}} type='material' name="mode-edit" size={23}/>
            </TouchableOpacity>
            <TouchableOpacity style={{ alignItems:'center'}} onPress={() => this.showModalDeleteProfil(prenom, nom)}>
              <Icon reverse={false} raised={true} style={{ margin:2, justifyContent:'center', alignItems: 'center', marginHorizontal:5}} type='material' name='delete' size={23}/>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    )

    const renderItem = ({ item }) => (
      <Item
        nom = { item.nom }
        prenom = { item.prenom }
        role = { item.role }
        telephone = { item.telephone }
        email = { item.email }
        mdp = { item.mdp } />
    );

    return (
      <View style={{justifyContent:'space-between', flex:1}}>
        <Modal isVisible={this.state.isModalVisible} >
          <View style={modalStyles.container}>
            <Text style={{fontSize:20, fontWeight:'bold',margin:15}}>ATTENTION</Text>

            <View style={{paddingLeft:15, paddingRight:15, marginBottom:20, alignItems:'center'}}>
              <View style={{flexDirection:'row', alignItems:'flex-start'}}>
                <Text style={{fontSize:16}}>Vous êtes sur le point de supprimer le profil '{this.state.userId}'</Text>
              </View>
              <Text style={{fontSize:16, fontStyle:'italic'}}>Confirmez-vous votre choix ?</Text>
            </View>

            <View style={{ width:'100%', flexDirection:'row', marginBottom:10, justifyContent:'space-around', alignItems:'center'}}>
              <TouchableOpacity onPress={ () => this.deleteUser()} style={modalStyles.buttonYes}>
                <Text style={{color:'white', fontSize:18}}>Oui</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.showModalDeleteProfil} style={modalStyles.buttonNo}>
                <Text style={{color:'white', fontSize:18}}>Non</Text>
              </TouchableOpacity>
            </View>
          </View>
      </Modal>
        <FlatList
          data={this.state.data}
          renderItem={renderItem}
          keyExtractor={(item, index) => {
            return index.toString();
          }}
          onRefresh={this.getUsers}
          refreshing={this.state.isFetching}
        />

        { this.showActionButton() }
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userInfos: state.userInfos
  };
}
export default connect(mapStateToProps)(ManageUsers);
