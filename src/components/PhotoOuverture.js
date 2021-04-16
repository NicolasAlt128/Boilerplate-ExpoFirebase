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

export default class PhotoOuverture extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      idMission:this.props.route.params.idMission,
      nom: this.props.route.params.nom,
      date:this.props.route.params.date,
      lieu:this.props.route.params.lieu,
      typeSepulture:this.props.route.params.typeSepulture,
      description:this.props.route.params.description,
      url:[],
      infoPhoto:{
        name:null,
        pathFile:null
      },
      infoPhotoArray:[]
    }
  }

  componentDidMount(){
    this.getImage();
    this.props.navigation.addListener('focus', () => {
      this.getImage();
    });
  }

  getImage = () => {
      let storagePath = firebase.storage().ref().child('Ouverture/'+this.state.idMission);

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
    var imageRef = firebase.storage().ref().child('Ouverture/'+this.state.idMission+'/'+name);
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
        <View style={{borderWidth:1, borderColor:'#515151', margin:2}} onPress={() => this.deleteImage(data.name)}>
          <Image key={data} style={{ height:100, width:100, zIndex:1}} source={{uri: data.pathFile}}/>
          <TouchableOpacity onPress={() => this.deleteImage(data.name)} style={{ position:'absolute', top:1, right:1, zIndex: 99}}>
            <Icon color='#DC143C' type='font-awesome-5' name='trash' size={15} reverse={true} reverse={true}/>
          </TouchableOpacity>
        </View>
      )
    })
  }

  ajouterMission = async ( idMission, nom, date, lieu, typeSepulture, description ) => {
    let typeMission = "Ouverture";
    await firebase.database().ref('Missions/'+idMission).set({ typeMission, idMission, nom, date, lieu, typeSepulture, description })
    .then(()=>{
      this.props.navigation.navigate('Planning');
    }).catch(err => {
      console.log("Err", err)
    })
  }

  render() {

    return (
      <View style={ formulaireMissionStyles.containerO }>
        <ScrollView style={{ paddingLeft:20, paddingRight:20}}>
            <View style={{flexDirection:'row', justifyContent:'flex-start', margin:30, flexWrap:'wrap', flexShrink:1}}>
              { typeof this.state.url !== 'undefined' && this.state.url.length > 0 ? this.showImage() : null }
            </View>
            <TouchableOpacity
              style={formulaireMissionStyles.button}
              onPress={() => this.props.navigation.navigate('AjouterPhotoOuverture', {idMission: this.state.idMission})}>
              <Icon color='white' type='font-awesome-5' name='image' size={22} style={formulaireMissionStyles.iconButton}/>
              <Text style={{flex:1, fontSize:18, textAlign:'center', color:'white'}}>Ajouter une photo</Text>
              <Icon color='white' type='material' name='arrow-forward-ios' size={22} style={formulaireMissionStyles.iconButton}/>
            </TouchableOpacity>

            <View style={{justifyContent:'flex-start', alignSelf:'center', margin:20}}>
              <Text style={{fontSize:18, color:'#515151'}}>OU</Text>
            </View>

            <TouchableOpacity
               style={formulaireMissionStyles.button}
               onPress={() => this.ajouterMission(this.state.idMission, this.state.nom, this.state.date, this.state.lieu, this.state.typeSepulture, this.state.description)}>
              <Icon color='white' type='font-awesome-5' name='save' size={22} style={formulaireMissionStyles.iconButton}/>
              <Text style={{flex:1, fontSize:18, textAlign:'center', color:'white'}}>Enregistrer la mission</Text>
              <Icon color='white' type='material' name='arrow-forward-ios' size={22} style={formulaireMissionStyles.iconForm}/>
            </TouchableOpacity>

        </ScrollView>
        <StatusBar barStyle="default" />
      </View>
    );
  }
}
