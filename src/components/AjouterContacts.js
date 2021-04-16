import React, { Component } from 'react';
import { TouchableOpacity, TouchableWithoutFeedback, Keyboard, AppRegistry, View, Image, Text, StyleSheet, Dimensions, ScrollView, TextInput } from 'react-native';
import { Icon } from 'react-native-elements';
import { useNavigation, StackActions } from '@react-navigation/native';
import Modal from 'react-native-modal';

const popAction = StackActions.pop(1);

import { formulaireMissionStyles, modalStyles } from './styles';

import * as firebase from 'firebase';

class AjouterContacts extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: null,
      telephone: null,
      identifiant: null,
      nom: null,
      isModalVisible:false,
      verifyForm:null,
    }
    if (!firebase.apps.length) firebase.initializeApp(config);
  }

  showModalVerificationContact = () => {
    if(!this.state.isModalVisible){
        this.setState({isModalVisible:true})
    }else { this.setState({isModalVisible:false}) }
  }

  ajouterContacts = async (nom, telephone, email) => {


    if(nom == null || telephone == null || email == null){
      this.setState({verifyForm:'miss'});
      this.showModalVerificationContact();
    }else{

      nom = nom.trim();
      telephone = telephone.trim();
      email = email.trim();

      /**************************************/
      /****  VERIFICATION FORMAT EMAIL  *****/
      /**************************************/

      let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (reg.test(email) === false) {
        this.setState({verifyForm:'email'});
        this.showModalVerificationContact()
      }
      else {
        let reg = /^[a-zA-ZÀ-ÖØ-öø-ÿ\s]*$/;
        if(reg.test(nom) === false ){
          console.log("Format nom ou prenom not correct");
          this.setState({ verifyForm: 'nom' })
          this.showModalVerificationContact()
        }else{

          let reg = /^(?:(?:\+|00)33[\s.-]{0,3}(?:\(0\)[\s.-]{0,3})?|0)[1-9](?:(?:[\s.-]?\d{2}){4}|\d{2}(?:[\s.-]?\d{3}){2})$/;
          if(reg.test(telephone) === false){
            this.setState({ verifyForm: 'phone' })
            this.showModalVerificationContact()
          }else{
            let userId = this.state.nom.charAt(0) + this.state.nom;
            userId = userId.trim();
            userId = userId.toLowerCase();

            await firebase.database().ref('Contacts/'+userId).set({
              nom,
              telephone,
              email,
            }).then(data => {
              this.props.navigation.dispatch(popAction);
              console.log("DATA", data);
            }).catch(err => {
              console.log("Err", err)
            })
          }
        }

      }

    }

  }

  verifyForm = (value) => {
    let message;
    switch(value){
      case 'email' :
        message = 'Format de l\'email invalide'
        return message;
      case 'miss' :
        message = 'Des informations manquent. Veuillez remplir tout les champs.'
        return message;
      case 'nom' :
        message = 'Le nom et le prénom ne peuvent contenir uniquement que des lettres et espaces.'
        return message;
      case 'phone' :
        message = 'Le numéro de téléphone a un format incorrect.'
        return message;
    }
  }


  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={formulaireMissionStyles.container}>
        <Modal isVisible={this.state.isModalVisible} >
          <View style={{justifyContent:'space-between', backgroundColor:'white', alignItems:'center'}}>
            <Text style={{fontSize:20, fontWeight:'bold',margin:15}}>ATTENTION</Text>

            <View style={{paddingLeft:15, paddingRight:15, marginBottom:20, alignItems:'center'}}>
              <Text style={{fontSize:14}}>{ this.verifyForm(this.state.verifyForm) }</Text>
            </View>

            <View style={{ width:'100%', flexDirection:'row', marginBottom:10, justifyContent:'space-around', alignItems:'center'}}>
              <TouchableOpacity onPress={this.showModalVerificationContact} style={{ paddingLeft:25, paddingRight:25, paddingTop:5, paddingBottom:5, borderRadius:20, flexDirection:'row', backgroundColor:'#ff7f7f',justifyContent:'center', alignItems:'center', marginBottom:15}}>
                <Text style={{fontSize:18}}>Ok</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
          <View style={{justifyContent:'center', paddingLeft:15, paddingRight:15 }}>
            <View style={formulaireMissionStyles.form}>
              <Icon type='font-awesome' name='user' size={22} style={formulaireMissionStyles.iconForm} />
              <TextInput placeholder="Nom" onChangeText={nom => this.setState({nom: nom})} />
            </View>
            <View style={formulaireMissionStyles.form}>
              <Icon type='material' name='email' size={22} style={formulaireMissionStyles.iconForm} />
              <TextInput autoCompleteType="email" keyboardType='email-address' placeholder="Email" onChangeText={email => this.setState({email: email})} />
            </View>
            <View style={formulaireMissionStyles.form}>
              <Icon type='material' name='phone' size={22} style={formulaireMissionStyles.iconForm} />
              <TextInput placeholder="Téléphone" keyboardType='phone-pad' onChangeText={telephone => this.setState({telephone: telephone})} />
            </View>
          </View>
          <TouchableOpacity
            onPress={() => this.ajouterContacts(this.state.nom, this.state.telephone, this.state.email)}
            style={formulaireMissionStyles.buttonForm}>
            <Text style={{fontSize:16, margin:30, color:"white"}}>Enregistrer</Text>
            <Icon type='font-awesome' name='chevron-right' size={24} color="white"/>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default AjouterContacts;
