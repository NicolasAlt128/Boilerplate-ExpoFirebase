import React from 'react';
import { View } from 'react-native';
import { Icon } from 'react-native-elements';

class HeaderRight extends React.Component {
  render(){
    return(
      <View style={{ flex:1, flexDirection:'row' }}>
        <Icon
          style={{ paddingRight: 10 }}
          name="place"
          type="material"
          color="#fff"
        />
      </View>
    );
  }
}

export default HeaderRight;
