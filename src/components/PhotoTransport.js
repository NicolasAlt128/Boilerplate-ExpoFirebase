import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { Icon } from 'react-native-elements';
import * as firebase from 'firebase';
import React from 'react';
import {
  ScrollView,
  ActivityIndicator,
  Button,
  Clipboard,
  Image,
  Share,
  StatusBar,
  StyleSheet,
  Text,
  View, TouchableOpacity
} from 'react-native';
import * as ImageManipulator from 'expo-image-manipulator';

import { CONFIG } from './const/firebaseConfig';

import { formulaireMissionStyles, modalStyles } from './styles';

if (!firebase.apps.length) {
  firebase.initializeApp(CONFIG);
}

export default class PhotoTransport extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      idMission:this.props.route.params.idMission,
      date:this.props.route.params.date,

      nom:this.props.route.params.nom,
      lieuDepart:this.props.route.params.lieuDepart,
      lieuArrive:this.props.route.params.lieuArrive,

      description:this.props.route.params.description,
      url:[],
      infoPhoto:{
        name:null,
        pathFile:null
      },
      infoPhotoArray:[]
    }
    console.log("this state photo transport", this.state)
  }

  componentDidMount(){
    this.getImage();
    this.props.navigation.addListener('focus', () => {
      this.getImage();
    });
  }

  getImage = () => {
      let storagePath = firebase.storage().ref().child('Transport/'+this.state.idMission);

      storagePath.list().then(result => {
        result.items.forEach( all => {
          firebase.storage().ref().child(all.fullPath)
          .getDownloadURL().then( result => {
            let array = this.state.url;
            let arrayPhotoInfo = this.state.infoPhotoArray;

            if(!array.includes(result)){
              array.push(result)
              this.setState({ url: array });
            }

            if ( !arrayPhotoInfo.some(e => e.name === all.name && e.pathFile === result) ) {
                this.state.infoPhoto = { name: all.name, pathFile: result };
                arrayPhotoInfo.push( this.state.infoPhoto );
                this.setState({ infoPhotoArray: arrayPhotoInfo });
              }
          })
        })
       }).catch((error)=> {
         console.log(error);
         alert(error)
       });
  }

  deleteImage = (name) => {
    var imageRef = firebase.storage().ref().child('Transport/'+this.state.idMission+'/'+name);
    imageRef.delete().then(res => {
      let myArray = this.state.infoPhotoArray;
      myArray = myArray.filter(function( obj ) {
        return obj.name !== name;
      });
      this.setState({infoPhotoArray: myArray})
    }).catch(function(error) {
      console.log('err', error)
    });
  }

  showImage() {
    return this.state.infoPhotoArray.map((data) => {
      return (
        <TouchableOpacity onLongPress={() => this.deleteImage(data.name)}>
          <Text>{data.name}</Text>
          <Image key={data} style={{height:80, width:80, margin:2}} source={{uri: data.pathFile}}/>
        </TouchableOpacity>
      )
    })
  }

  ajouterMission = async ( idMission, nom, date, lieuDepart, lieuArrive, description ) => {
    console.log("AJOUTER TRNASPORT", description)
    let typeMission = "Transport";
    await firebase.database().ref('Missions/'+idMission).set({ typeMission, idMission, nom, date, lieuDepart, lieuArrive, description })
    .then(()=>{
      this.props.navigation.navigate('Planning');
    }).catch(err => {
      console.log("Err", err)
    })
  }

  render() {

    return (
      <View style={formulaireMissionStyles.containerChoice}>
        <ScrollView style={{ paddingLeft:15, paddingRight:15}}>
            <View style={{flexDirection:'row', justifyContent:'flex-start', margin:30, flexWrap:'wrap', flexShrink:1}}>
              { typeof this.state.url !== 'undefined' && this.state.url.length > 0 ? this.showImage() : null }
            </View>
            <TouchableOpacity
              style={formulaireMissionStyles.selectChoice2}
              onPress={() => this.props.navigation.navigate('AjouterPhotoTransport', {idMission: this.state.idMission})}>
              <Icon type='material' name='arrow-forward-ios' color="#0886f8" size={22} style={formulaireMissionStyles.iconForm}/>
              <Text style={{flex:1, fontSize:18, textAlign:'center', color:'white'}}>Ajouter une photo</Text>
              <Icon color='white' type='material' name='arrow-forward-ios' size={22} style={formulaireMissionStyles.iconForm}/>
            </TouchableOpacity>

            <View style={{justifyContent:'flex-start', alignSelf:'center', margin:20}}>
              <Text style={{fontSize:22}}>Ou</Text>
            </View>

            <TouchableOpacity onPress={() => this.ajouterMission(this.state.idMission, this.state.nom, this.state.date, this.state.lieuDepart, this.state.lieuArrive, this.state.description) } style={formulaireMissionStyles.selectChoice2}>
              <Icon type='material' name='arrow-forward-ios' color="#0886f8" size={22} style={formulaireMissionStyles.iconForm}/>
              <Text style={{flex:1, fontSize:18, textAlign:'center', color:'white'}}>Enregistrer la mission</Text>
              <Icon color='white' type='material' name='arrow-forward-ios' size={22} style={formulaireMissionStyles.iconForm}/>
            </TouchableOpacity>

        </ScrollView>
        <StatusBar barStyle="default" />
      </View>
    );
  }
}
