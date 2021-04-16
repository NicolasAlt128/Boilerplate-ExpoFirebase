import { Icon } from 'react-native-elements';
import * as firebase from 'firebase';
import React from 'react';
import {
  ScrollView,
  Image,
  StatusBar,
  Text,
  View, TouchableOpacity
} from 'react-native';

import { CONFIG } from './const/firebaseConfig';

import { formulaireMissionStyles } from './styles';

if (!firebase.apps.length) {
  firebase.initializeApp(CONFIG);
}

export default class PhotoObseques extends React.Component {

  constructor(props){
    super(props);
    this.state = {

      observationCeremonie : this.props.route.params.observationCeremonie  || null,
      observationCimetiere : this.props.route.params.observationCimetiere || null,
      villeCimetiere : this.props.route.params.villeCimetiere || null,
      typeSepulture : this.props.route.params.typeSepulture || null,
      ouverture : this.props.route.params.ouverture || null,
      ceremonie : this.props.route.params.ceremonie,
      typeObseques: this.props.route.params.typeObseques || null,
      arriveeCorps: this.props.route.params.arriveeCorps,
      heureFermeture: this.props.route.params.heureFermeture || null,
      heureMiseEnBiere: this.props.route.params.heureMiseEnBiere || null,
      dateMiseBiere: this.props.route.params.dateMiseBiere || null,
      lieuMiseBiere: this.props.route.params.lieuMiseBiere || null,
      isPolice:  this.props.route.params.isPolice,

      nom: this.props.route.params.nom,
      prenom:this.props.route.params.prenom,
      villeCeremonie: this.props.route.params.villeCeremonie || null,
      dateCeremonie: this.props.route.params.dateCeremonie || null,
      heureCeremonie: this.props.route.params.heureCeremonie || null,

      dateCremation:this.props.route.params.dateCremation || null,
      heureCremation:this.props.route.params.heureCremation || null,
      heureCremationFormattee:this.props.route.params.heureCremationFormattee || null,
      dateCremationFormattee:this.props.route.params.dateCremationFormattee || null,
      villeCrematorium: this.props.route.params.villeCrematorium || null,

      userMission: this.props.route.params.userMission ||null,
      

      idMission:this.props.route.params.idMission  || null,

      url:[],
      infoPhoto:{
        name:null,
        pathFile:null
      },
      infoPhotoArray:[]
    }
    console.log("PhotoObseques ", this.props.route.params)
  }

  componentDidMount(){
    this.getImage();
    this.props.navigation.addListener('focus', () => {
      this.getImage();
    });
  }

  getImage = () => {
      let storagePath = firebase.storage().ref().child('Obseques/'+this.state.idMission);

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
    var imageRef = firebase.storage().ref().child('Obseques/'+this.state.idMission+'/'+name);
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
        <View key={data.name} style={{borderWidth:1, borderColor:'#515151', margin:2}} onPress={() => this.deleteImage(data.name)}>
          <Image key={data} style={{ height:100, width:100, zIndex:1}} source={{uri: data.pathFile}}/>
          <TouchableOpacity onPress={() => this.deleteImage(data.name)} style={{ position:'absolute', top:1, right:1, zIndex: 99}}>
            <Icon color='#DC143C' type='font-awesome-5' name='trash' size={15} reverse={true} reverse={true}/>
          </TouchableOpacity>
        </View>
      )
    })
  }

  ajouterMission = async (
    idMission,
    ceremonie,
    typeObseques,
    arriveeCorps,
    heureFermeture,
    heureMiseEnBiere,
    dateMiseBiere,
    lieuMiseBiere,
    isPolice,
    nom,
    prenom,
    villeCeremonie,
    dateCeremonie,
    heureCeremonie,
    observationCeremonie,
    observationCimetiere,
    villeCimetiere,
    typeSepulture,
    ouverture,
    userMission,
    dateCremation,
    heureCremation,
    heureCremationFormattee,
    dateCremationFormattee,
    villeCrematorium,
   ) => {


    console.log("TEST ARGUMENTS",
    idMission,
    ceremonie,
    typeObseques,
    arriveeCorps,
    heureFermeture,
    heureMiseEnBiere,
    dateMiseBiere,
    lieuMiseBiere,
    isPolice,
    nom,
    prenom,
    villeCeremonie,
    dateCeremonie,
    heureCeremonie,
    observationCeremonie,
    observationCimetiere,
    villeCimetiere,
    typeSepulture,
    ouverture,
    userMission,
    dateCremation,
    heureCremation,
    heureCremationFormattee,
    dateCremationFormattee,
    villeCrematorium)


    let typeMission = "Obseques";
    await firebase.database().ref('Missions/'+idMission).set({
      typeMission,
      idMission,
      ceremonie,
      typeObseques,
      arriveeCorps,
      heureFermeture,
      heureMiseEnBiere,
      dateMiseBiere,
      lieuMiseBiere,
      isPolice,
      nom,
      prenom,
      villeCeremonie,
      dateCeremonie,
      heureCeremonie,
      observationCeremonie,
      observationCimetiere,
      villeCimetiere,
      typeSepulture,
      ouverture,
      userMission,
      dateCremation,
      heureCremation,
      heureCremationFormattee,
      dateCremationFormattee,
      villeCrematorium,
    }).then(()=>{
      this.props.navigation.navigate('Planning');
    }).catch((error)=>{
      console.log("err", error)
    });
  }

  render() {

    return (
      <View style={formulaireMissionStyles.containerChoice}>
        <ScrollView style={{ paddingLeft:15, paddingRight:15}}>
            <View style={{flexDirection:'row', justifyContent:'flex-start', margin:30, flexWrap:'wrap', flexShrink:1}}>
              { typeof this.state.url !== 'undefined' && this.state.url.length > 0 ? this.showImage() : null }
            </View>
            <TouchableOpacity
              style={formulaireMissionStyles.button}
              onPress={() => this.props.navigation.navigate('AjouterPhotoObseques', {idMission: this.state.idMission})}>
              <Icon color='white' type='font-awesome-5' name='image' size={22} style={formulaireMissionStyles.iconButton}/>
              <Text style={{flex:1, fontSize:18, textAlign:'center', color:'white'}}>Ajouter une photo</Text>
              <Icon color='white' type='material' name='arrow-forward-ios' size={22} style={formulaireMissionStyles.iconButton}/>
            </TouchableOpacity>

            <View style={{justifyContent:'flex-start', alignSelf:'center', margin:20}}>
              <Text style={{fontSize:18, color:'#515151'}}>OU</Text>
            </View>

            <TouchableOpacity
            onPress={() => this.ajouterMission(
              this.state.idMission,
              this.state.ceremonie,
              this.state.typeObseques,
              this.state.arriveeCorps,
              this.state.heureFermeture,
              this.state.heureMiseEnBiere,
              this.state.dateMiseBiere,
              this.state.lieuMiseBiere,
              this.state.isPolice,
              this.state.nom,
              this.state.prenom,
              this.state.villeCeremonie,
              this.state.dateCeremonie,
              this.state.heureCeremonie,
              this.state.observationCeremonie,
              this.state.observationCimetiere,
              this.state.villeCimetiere,
              this.state.typeSepulture,
              this.state.ouverture,
              this.state.userMission,
              this.state.dateCremation,
              this.state.heureCremation,
              this.state.heureCremationFormattee,
              this.state.dateCremationFormattee,
              this.state.villeCrematorium,
            )} style={formulaireMissionStyles.button}>
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
