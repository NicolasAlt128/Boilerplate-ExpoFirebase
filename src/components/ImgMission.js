import React, { useState, useEffect } from 'react';
import { View, Image, Text } from 'react-native';
import { planningStyles } from './styles';
import * as firebase from 'firebase';
import { CONFIG } from './const/firebaseConfig';
import Images from '../img/index';

const ImgMission = (props) => {

  const [imgPath, setImgPath] = useState(null);
  const [iconPath, setIconPath] = useState(null);
  const [iconBG, setIconBG] = useState(null);

  const getImagePath = (typeMission, idMission) => {
    let storagePath = firebase.storage().ref().child(typeMission + '/' + idMission);
    storagePath.list().then(result => {
      result.items.forEach( all => {
        firebase.storage().ref().child(all.fullPath)
        .getDownloadURL().then( result => {
          setImgPath(result);
        })
      })
     }).catch((error)=> {
       console.log(error);
       alert(error)
     });
  }

  const getIconPath = (typeMission) => {
    switch(typeMission){
      case 'Marbrerie':
        setIconPath(Images.brouette);
        setIconBG('rgba(150, 205, 205,0.6)');
        break;
      case 'Gravure':
        setIconPath(Images.gravure)
        setIconBG('rgba(205, 205, 205,0.6)');
        break;
      default:
        setIconPath(Images.coffin)
        setIconBG('rgba(231, 135, 78,0.6)');
        break;
      case 'Transport':
        setIconPath(Images.transport)
        setIconBG('rgba(160, 141, 216,0.6)');
        break;
      case 'Ouverture':
        setIconPath(Images.ouverture);
        setIconBG('rgba(244, 104, 104,0.6)');
        break;
    }
  }

  useEffect(() => {

    let unmounted = false;

    if(!unmounted){
      if (!firebase.apps.length) firebase.initializeApp(CONFIG);
      getImagePath(props.typeMission, props.idMission);
      getIconPath(props.typeMission);
    }

    return () => {unmounted : true} 
  }, []);

  return (
    <View style={{ justifyContent:'space-between', alignItems:'center',
    borderBottomRightRadius: 15,
    borderTopLeftRadius:15,
    borderBottomLeftRadius:15}}>

      { imgPath !== null ?
      <Image style={planningStyles.image} source={{ uri: imgPath }}/>
      : <View style={{ width: 95,
                       height: 95,
                       alignItems:'center',
                       justifyContent:'center',
                       backgroundColor:iconBG,
                       borderTopLeftRadius:15,
                      }}>
          <Image style={iconPath == Images.transport ? {width:100, height:100} : {width:50, height:50}} source={ iconPath } />
        </View> }


      <View style={{flex:1, backgroundColor:"#333333", width:'100%', alignItems:'center', borderBottomLeftRadius: 15, borderRightColor:'#828282'}}>
        <Text style={{fontSize:20, color:'white'}}>{ props.date }</Text>
      </View>
    </View>
  );
}

export default ImgMission;
