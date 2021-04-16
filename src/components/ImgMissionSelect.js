import React from 'react';
import { View, Image, Text } from 'react-native';
import { planningStyles } from './styles';

const ImgMissionSelect = (props) => {
  return (
    <View style={{ justifyContent:'space-between', alignItems:'center', borderBottomRightRadius: 15 }}>
      <View style={{flex:1, borderColor:'#828282', borderWidth:1, borderTopLeftRadius: 15, backgroundColor:'#c4c4c4', height:95, width:95, justifyContent:'center', alignItems:'center'}}>
        <Text>Aucune</Text>
        <Text>photo</Text>
      </View>
      <View style={{flex:1, backgroundColor:"#333333", width:'100%', alignItems:'center', borderBottomLeftRadius: 15, borderRightWidth:1, borderRightColor:'#828282'}}>
        <Text style={{fontSize:20, color:'white'}}>{ props.date }</Text>
      </View>
    </View>
  );
}

export default ImgMissionSelect;
