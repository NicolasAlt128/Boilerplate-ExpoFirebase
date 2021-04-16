import React, { useState, useEffect } from 'react';
import { Keyboard, View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import { Icon } from 'react-native-elements';
import Modal from 'react-native-modal';
import { useNavigation } from '@react-navigation/native';

import { formulaireMissionStyles, modalStyles } from './styles';

const InfoDefunt = (props) => {

  const navigation = useNavigation();

  const [isModalVisible, setModalVisible] = useState(false);
  const [nom, setNomFamille] = useState(null);
  const [prenom, setPrenom] = useState(null);

  const showModalNextStepMission = () => {
      if(nom == null || prenom == null){
        if(!isModalVisible){
          setModalVisible(true);
        }else {
          setModalVisible(false);
        }
      } else {
            switch(props.route.params.typeObseques){
                case 'Inhumation':
                    navigation.navigate("IsCeremonie",
                    { typeObseques : props.route.params.typeObseques,
                      typeMission : props.route.params.typeMission,
                      nom: nom.split(/\s+/).join(''),
                      prenom: prenom.split(/\s+/).join('')});
                    break;
                case 'Inhumation Urne':
                    navigation.navigate("InfoCimetiere",
                    { typeObseques : props.route.params.typeObseques,
                      typeMission : props.route.params.typeMission,
                      nom: nom.split(/\s+/).join(''),
                      prenom: prenom.split(/\s+/).join('')});
                    break;
                case 'Crémation':
                    navigation.navigate("IsCeremonie",
                    { typeObseques : props.route.params.typeObseques,
                      typeMission : props.route.params.typeMission,
                      nom: nom.split(/\s+/).join(''),
                      prenom: prenom.split(/\s+/).join('')});
                    break;
            }
        }
    }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

      <View style={formulaireMissionStyles.container}>

        <View style={{justifyContent:'center', paddingLeft:15, paddingRight:15 }}>
          <Modal isVisible={isModalVisible} >
            <View style={modalStyles.container}>
              <Text style={modalStyles.header}>ATTENTION</Text>
              <View style={modalStyles.text}>
                <Text style={modalStyles.title}>Des informations sont manquantes. Veuillez saisir toutes les informations demandées.</Text>
              </View>
              <View style={modalStyles.buttonContainer}>
                <TouchableOpacity onPress={showModalNextStepMission} style={modalStyles.buttonNo}>
                  <Text style={{color:'white', fontSize:16}}>OK</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          <View style={{justifyContent:'center', alignItems:'center', marginTop:25}}>
                <Text style={{fontSize:20, fontWeight:'bold'}}>Informations du Défunt</Text>
          </View>

          <View style={formulaireMissionStyles.form}>
            <View style={{width:10}}/>
            <TextInput
              style={{flex: 1, flexWrap: 'wrap', paddingRight:10}}
              placeholder=" Saisir le nom du défunt" onChangeText={nom => setNomFamille(nom)}/>
          </View>

          <View style={formulaireMissionStyles.form}>
            <View style={{width:10}}/>
            <TextInput
              style={{flex: 1, flexWrap: 'wrap', paddingRight:10}}
              placeholder=" Saisir le prénom du défunt" onChangeText={prenom => setPrenom(prenom)}/>
          </View>

        </View>

        <TouchableOpacity onPress={() => showModalNextStepMission()}
            style={formulaireMissionStyles.buttonForm}>
          <Text style={{fontSize:16, margin:30, color:"white"}}>Passer à la suite</Text>
          <Icon type='font-awesome' name='chevron-right' size={24} color="white"/>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default InfoDefunt
