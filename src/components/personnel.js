import React, { Component } from 'react';
import { TouchableOpacity, FlatList, View, Text } from 'react-native';
import { Icon } from 'react-native-elements';;
import ActionButton from 'react-native-action-button';
import Modal from 'react-native-modal';
import * as Linking from 'expo-linking';
import { modalStyles } from './styles';

import * as firebase from 'firebase';

import { connect } from 'react-redux';
import { ActivityIndicator } from 'react-native';

class Contacts extends Component {

  constructor(props){
    super(props);
    this.state = {
      isFetching:false,
      data:null,
      isModalVisible:false,
      userId:null,
      listContact: [],
      listUser: [],
      nomSelect:null,
    }
  }

  componentDidMount(){
    this.setState({isFetching: false})
    this.getContacts();
    this._refreshList = this.props.navigation.addListener('focus', () => {
      this.getContacts();
    });
  }

  deleteContact = () => {
    firebase.database().ref('/Contacts/'+this.state.userId)
    .remove()
    .then((data) => {
      this.getContacts();
    }).catch((err) => {
      console.log(err);
    });

    if(!this.state.isModalVisible){
        this.setState({isModalVisible:true})
    }else { this.setState({isModalVisible:false}) }
  }

  getContacts = () => {
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
        this.setState({ listUser: sortList });

    }).catch(err => {
      this.setState({ isFetching:false });
    });

    firebase.database()
    .ref('/Contacts/')
    .once('value')
    .then(snap => {
      this.setState({listContact: Object.values(snap.val())})
      this.setState({data: this.state.listUser.concat(this.state.listContact)})
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
          fixNativeFeedbackRadius={Platform.OS === 'ios' ? false : true}
          onPress={() => this.props.navigation.navigate('AjouterContacts')}>
          </ActionButton>
      )
    }

  }

  returnUpper = (text) => {
    if(typeof text === 'string'){
      var newTxt = text.toUpperCase();
      return newTxt
    }
  }

  setUserId(nom){
    let userId = nom.charAt(0) + nom;
    userId = userId.trim();
    userId = userId.toLowerCase();
    this.setState({userId: userId});
    this.setState({ nomSelect: nom })
  }

  showModalDeleteContact = (nom) => {
    if(!this.state.isModalVisible){
        this.setUserId(nom)
        this.setState({isModalVisible:true})
    }else { this.setState({isModalVisible:false}) }
  }

  formatNumber(f){
    if(f !== null && typeof f !== 'undefined'){
      var parts = f.match(/.{1,2}/g);
      var new_value = parts.join(".");
    }
    return new_value;
  }

  render() {

    const Item = ({nom, prenom, telephone, role}) => (
      <View>
        <View style={{ backgroundColor:'white', flexDirection:'row', justifyContent:'space-between', alignItems:'center', borderBottomWidth:1, borderBottomColor:'#dcdcdc'}}>
          <View style={{margin:15, flexDirection:'column'}}>
            <Text style={{fontSize:16, fontWeight:'bold'}}>{this.returnUpper(prenom)} {this.returnUpper(nom)}</Text>
            <TouchableOpacity onPress={() => Linking.openURL(`tel:${telephone}`) }
              style={{flex:1, flexDirection:'row',  alignSelf: 'flex-start', alignItems:'center', backgroundColor:'#0886f8',padding:5,borderRadius:20}}>
              <Icon color="white" type='material' name="phone" size={14} style={{marginLeft:10, marginRight:5}}/>
              <Text style={{ color:'white', fontSize:16, marginRight:10}}>{this.formatNumber(telephone)}</Text>
            </TouchableOpacity>
          
          </View>

          { 
                this.props.userInfos.role == 1 || this.props.userInfos.role == 2 ?

                role ? null :

                <View style={{ justifyContent:'center', flexDirection:'row'}}>
                <TouchableOpacity style={{  alignItems:'center' }} onPress={() => console.log()}>
                  <Icon reverse={false} raised={true} style={{ justifyContent:'center', alignItems: 'center', marginHorizontal:15}} type='material' name="mode-edit" size={18}/>
                </TouchableOpacity>
                <TouchableOpacity style={{ alignItems:'center'}} onPress={() => this.showModalDeleteContact(nom)}>
                  <Icon reverse={false} raised={true} style={{ margin:2, justifyContent:'center', alignItems: 'center', marginHorizontal:5}} type='material' name='delete' size={18}/>
                </TouchableOpacity>
              </View>
                      
                      : null
          }

        </View>
      </View>
    )

    const renderItem = ({ item }) => (
      <Item
        nom = { item.nom }
        prenom = { item.prenom }
        role = { item.role }
        telephone = { item.telephone }
        email = { item.email }/>
    );

    return (
      <View style={{justifyContent:'space-between', flex:1}}>
        <Modal isVisible={this.state.isModalVisible} >
          <View style={modalStyles.container}>
            <Text style={{fontSize:20, fontWeight:'bold',margin:15}}>ATTENTION</Text>

            <View style={{paddingLeft:15, paddingRight:15, marginBottom:20, alignItems:'center'}}>
              <View style={{flexDirection:'row', alignItems:'flex-start'}}>
                <Text style={{fontSize:16}}>Vous êtes sur le point de supprimer le contact '{this.state.nomSelect}'.</Text>
              </View>
              <Text style={{fontSize:16, fontStyle:'italic'}}>Confirmez-vous votre choix ?</Text>
            </View>

            <View style={{ width:'100%', flexDirection:'row', marginBottom:10, justifyContent:'space-around', alignItems:'center'}}>
              <TouchableOpacity onPress={ () => this.deleteContact()} style={modalStyles.buttonYes}>
                <Text style={{color:'white',fontSize:16}}>Oui</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.showModalDeleteContact} style={modalStyles.buttonNo}>
                <Text style={{color:'white',fontSize:16}}>Non</Text>
              </TouchableOpacity>
            </View>
          </View>
      </Modal>

      {
        this.state.isFetching ?
        <View style={{flex:1, justifyContent:'center', alignSelf:'center', alignItems:'center', textAlign:'center'}}>
          <ActivityIndicator size="large" color="#033664" />
        </View> :
                <FlatList
                data={this.state.data}
                extraData={this.state}
                renderItem={renderItem}
                keyExtractor={(item, index) => {
                  return index.toString();
                }}
                onRefresh={this.getUsers}
                refreshing={this.state.isFetching}
              />
      }
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
export default connect(mapStateToProps)(Contacts);
