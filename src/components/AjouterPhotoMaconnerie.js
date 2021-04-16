import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import * as firebase from 'firebase';
import React from 'react';
import { Icon } from 'react-native-elements';
import {
  StatusBar,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import * as ImageManipulator from 'expo-image-manipulator';
import { StackActions } from '@react-navigation/native';

import { CONFIG } from './const/firebaseConfig';

const popAction = StackActions.pop(1);

if (!firebase.apps.length) {
  firebase.initializeApp(CONFIG);
}

export default class AjouterPhotoMaconnerie extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      idMission:this.props.route.params.idMission,

      image: null,
      uploading: false,
      url:null
    }
  }

  async componentDidMount() {
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    await Permissions.askAsync(Permissions.CAMERA);
  }

  async uploadImageAsync(uri) {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function() {
        resolve(xhr.response);
      };
      xhr.onerror = function(e) {
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      xhr.send(null);
    });

    let uuid = this.create_UUID()
    let pathFile = 'Marbrerie'+'/'+this.state.idMission+'/'+uuid+'.jpg';

    var storageRef = firebase.storage().ref();
    var maconnerieRef = storageRef.child(pathFile);

    const snapshot = await maconnerieRef.put(blob);

    const result = maconnerieRef.getDownloadURL().then(function(url){
      return url
    });
    blob.close();
    return result;
  }

  create_UUID = () => {
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = (dt + Math.random()*16)%16 | 0;
      dt = Math.floor(dt/16);
      return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
  }

  resizeImage = async (image) => {
      const manipResult = await ImageManipulator.manipulateAsync(
        image.uri,
        [{ resize: { width: image.width * 0.5, height: image.height * 0.5 } }],
        { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }
      );
      await this.uploadImageAsync(manipResult.uri)
      .then( data => {
        console.log("Data", data);
        this.props.navigation.dispatch(popAction);
      }).catch(err => {
        console.log("Err", err);
      })
    }

  _handleImagePicked = async pickerResult => {
    try {
      this.setState({ uploading: true });

      if (!pickerResult.cancelled) {
        this.resizeImage(pickerResult)
      }
    } catch (e) {
      alert('Upload failed');
    } finally {
      this.setState({ uploading: false });
    }
  };

  _takePhoto = async () => {
    let pickerResult = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    this._handleImagePicked(pickerResult);
  };

  _pickImage = async () => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    this._handleImagePicked(pickerResult);
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

      <View style={{flexDirection:'row'}}>
        <TouchableOpacity onPress={this._takePhoto} style={{width:150, borderRadius:15, padding:10, flexDirection:'column', margin:5, justifyContent:'center', alignItems:'center', backgroundColor:'#0886f8'}}>
          <Icon type='material' name='photo-camera' color="white" size={50}/>
          <Text style={{fontSize:14, color:'white', textAlign:'center'}}>Prendre une photo</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this._pickImage} style={{width:150,borderRadius:15, padding:10, flexDirection:'column', margin:5,  justifyContent:'center', alignItems:'center', backgroundColor:'#0886f8'}}>
          <Icon type='material' name='perm-media' color="white" size={50}/>
          <Text style={{fontSize:14, color:'white', textAlign:'center'}}>Sélectionner une photo</Text>
        </TouchableOpacity>
      </View>

        <StatusBar barStyle="default" />
      </View>
    );
  }
}
