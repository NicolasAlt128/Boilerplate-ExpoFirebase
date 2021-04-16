import React, { useState, useEffect } from 'react';
import { Keyboard, View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import { Icon } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import Modal from 'react-native-modal';
import { useNavigation } from '@react-navigation/native';

import { formulaireMissionStyles, modalStyles } from './styles';

const FormulaireCeremonie = (props) => {

  const navigation = useNavigation();

  const [isModalVisible, setModalVisible] = useState(false);
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [villeCeremonie, setVilleCeremonie] = useState(null);
  const [dateCeremonie, setDateCeremonie] = useState(null);
  const [heureCeremonie, setHeureCeremonie] = useState(null);
  const [dateCeremonieFormattee, setDateCeremonieFormattee] = useState(null);
  const [heureCeremonieFormattee, setHeureCeremonieFormattee] = useState(null);


  const onChange = (event, selectedDate) => {
    setShow(Platform.OS === 'ios');

    if(mode == 'date'){
      const dateCeremonieFormattee = ("0" + selectedDate.getDate()).slice(-2) + "/" + ("0" + (selectedDate.getMonth() + 1)).slice(-2);
      setDateCeremonie(dateCeremonieFormattee);
      setDateCeremonieFormattee(dateCeremonieFormattee);

    }else{
      const heureCeremonieFormattee = ("0" + selectedDate.getHours()).slice(-2) + "h" + ("0" + (selectedDate.getMinutes())).slice(-2);
      setHeureCeremonie(selectedDate);
      setHeureCeremonieFormattee(heureCeremonieFormattee);

    }
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
    Keyboard.dismiss();
  };

  const showTimepicker = () => {
    showMode('time');
    Keyboard.dismiss();
  };

  const goToNextStep = async () => {
    console.log("SHOW BORDEL VAR", props.ceremonie, props.arriveeCorps)
    await setModalVisible(false);
      navigation.navigate('ObservationCeremonie',
      {
        ceremonie : props.props.ceremonie,
        typeObseques: props.props.typeObseques,
        arriveeCorps: props.props.arriveeCorps,
        typeMission: props.props.typeMission,
        heureFermeture: props.formattedHeureFermeture,
        heureMiseEnBiere: props.formattedHeureBiere,
        dateMiseBiere: props.dateMiseBiere,
        lieuMiseBiere: props.lieuMiseBiere,
        isPolice:  props.props.isPolice,
        nom: props.props.nom,
        prenom: props.props.prenom,
        villeCeremonie: villeCeremonie,
        dateCeremonie: dateCeremonieFormattee,
        heureCeremonie: heureCeremonieFormattee
      });
  };


  const showModalNextStepMission = () => {
    console.log("BORDEL", props)
    if(villeCeremonie == null || dateCeremonie == null || heureCeremonie == null){
      if(!isModalVisible){
        setModalVisible(true);
      }else {
        setModalVisible(false);
      }
    } 
    else {
      goToNextStep();
    }
  };

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
                  <Text>OK</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          <View style={formulaireMissionStyles.form}>
            <Icon type='material' name='place' size={22} style={formulaireMissionStyles.iconForm} />
            <TextInput
             style={{flex: 1, flexWrap: 'wrap', paddingRight:10}} placeholder="Saisir la ville de la cérémonie" onChangeText={villeCeremonie => setVilleCeremonie(villeCeremonie)} />
          </View>

          <View style={formulaireMissionStyles.form}>
            <Icon type='material' name='book-online' size={22} style={formulaireMissionStyles.iconForm}/>
            <TouchableOpacity onPress={showDatepicker}>
              <TextInput
                editable={false}
                placeholderTextColor={dateCeremonie !== null ? "black" : "#9e9e9e"}
                placeholder={(dateCeremonie !== null ? "Date de la cérémonie : " + dateCeremonieFormattee : "Sélectionner ici la date de la cérémonie")}/>
            </TouchableOpacity>
          </View>

          <View style={formulaireMissionStyles.form}>
            <Icon type='font-awesome' name='clock-o' size={22} style={formulaireMissionStyles.iconForm}/>
            <TouchableOpacity onPress={showTimepicker}>
              <TextInput
                editable={false}
                placeholderTextColor={heureCeremonie !== null ? "black" : "#9e9e9e"}
                placeholder={(heureCeremonie !== null ? "Heure de la cérémonie : " + heureCeremonieFormattee : " Sélectionner ici l'heure de la cérémonie")}/>
            </TouchableOpacity>
          </View>
          { show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={new Date()}
              mode={mode}
              is24Hour={true}
              display="default"
              onChange={onChange} /> ) }
        </View>

        <TouchableOpacity onPress={showModalNextStepMission}
            style={formulaireMissionStyles.buttonForm}>
          <Text style={{fontSize:16, margin:30, color:"white"}}>Passer à la suite</Text>
          <Icon type='font-awesome' name='chevron-right' size={24} color="white"/>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default FormulaireCeremonie;
