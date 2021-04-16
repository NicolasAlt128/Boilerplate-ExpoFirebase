import React, { Component } from 'react';
import { TouchableOpacity, TouchableWithoutFeedback, Keyboard, AppRegistry, View, Image, Text, StyleSheet, Dimensions, ScrollView, TextInput } from 'react-native';
import { Icon } from 'react-native-elements';
import { useNavigation, StackActions } from '@react-navigation/native';
import Modal from 'react-native-modal';

const popAction = StackActions.pop(1);

import { formulaireMissionStyles, modalStyles } from './styles';

import * as firebase from 'firebase';

class AjouterProfil extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: null,
      telephone: null,
      identifiant: null,
      mdp: null,
      nom: null,
      prenom: null,
      role : parseInt(this.props.route.params.userRole),
      isModalVisible:false,
      verifyForm:null,
    }
    if (!firebase.apps.length) firebase.initializeApp(config);
  }

  showModalVerificationProfil = () => {
    if(!this.state.isModalVisible){
        this.setState({isModalVisible:true})
    }else { this.setState({isModalVisible:false}) }
  }

  ajouterProfil = async (nom, prenom, telephone, email, role) => {


    if(nom == null || prenom == null || telephone == null || email == null){
      this.setState({verifyForm:'miss'});
      this.showModalVerificationProfil();
    }else{

      nom = nom.trim();
      prenom = prenom.trim();
      telephone = telephone.trim();
      email = email.trim();

      /**************************************/
      /****  VERIFICATION FORMAT EMAIL  *****/
      /**************************************/

      let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (reg.test(email) === false) {
        this.setState({verifyForm:'email'});
        this.showModalVerificationProfil()
      }
      else {
        let reg = /^[a-zA-ZÀ-ÖØ-öø-ÿ\s]*$/;
        if(reg.test(nom) === false || reg.test(prenom) === false ){
          console.log("Format nom ou prenom not correct");
          this.setState({ verifyForm: 'nom' })
          this.showModalVerificationProfil()
        }else{

          let reg = /^(?:(?:\+|00)33[\s.-]{0,3}(?:\(0\)[\s.-]{0,3})?|0)[1-9](?:(?:[\s.-]?\d{2}){4}|\d{2}(?:[\s.-]?\d{3}){2})$/;
          if(reg.test(telephone) === false){
            this.setState({ verifyForm: 'phone' })
            this.showModalVerificationProfil()
          }else{
            let userId = this.state.prenom.charAt(0) + this.state.nom;
            userId = userId.trim();
            userId = userId.toLowerCase();
            let mdp = new Date();
            mdp = ("0" + mdp.getDate()).slice(-2) + ("0" + (mdp.getMonth() + 1)).slice(-2) + mdp.getFullYear();
            this.setState({ mdp: mdp });

            await firebase.database().ref('Utilisateurs/'+userId).set({
              nom,
              prenom,
              telephone,
              email,
              mdp,
              role
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
              <TouchableOpacity onPress={this.showModalVerificationProfil} style={{ paddingLeft:25, paddingRight:25, paddingTop:5, paddingBottom:5, borderRadius:20, flexDirection:'row', backgroundColor:'#ff7f7f',justifyContent:'center', alignItems:'center', marginBottom:15}}>
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
              <Icon type='font-awesome' name='user' size={22} style={formulaireMissionStyles.iconForm} />
              <TextInput placeholder="Prénom" onChangeText={prenom => this.setState({prenom: prenom})} />
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
            onPress={() => this.ajouterProfil(this.state.nom, this.state.prenom, this.state.telephone, this.state.email, this.state.role)}
            style={formulaireMissionStyles.buttonForm}>
            <Text style={{fontSize:16, margin:30, color:"white"}}>Enregistrer</Text>
            <Icon type='font-awesome' name='chevron-right' size={24} color="white"/>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default AjouterProfil;
