import React, { Component } from 'react';
import { AppRegistry, View, Image, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

const dimensions = Dimensions.get('window');
const imageHeight = Math.round(dimensions.width * 9 / 16);
const imageWidth = dimensions.width;

const styles = StyleSheet.create({
  container: {
    flexDirection:'column',
  },
  image: {
    resizeMode:'cover',
    width: '100%',
    height: 130,
    zIndex: 1,
  },
  infoBox: {
    flex: 1,
    backgroundColor: '#d6daef',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, marginTop:15
  },
});

function ButtonGallery() {
  const navigation = useNavigation();

  return (
    <View style={{position:'absolute', bottom:5, right:10, zIndex: 99}}>
      <Icon
        style={{ alignSelf:'flex-end' }}
        name="photo-library"
        type="material"
        color="#033664"
        reverse={true}
        raised={true}
        size={22}
        onPress={() => navigation.navigate('GalleryPhotoMission')}>
      </Icon>
    </View>
  );
}

class DetailsMission extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: 'first',
      plusInfos: false
    }
  }

  showPlusInfos = (bool) => {

    if(bool == true){
      this.setState({ showPlusInfos: false})
    } else{
      this.setState({ showPlusInfos: true})
    }

  };

  render() {
    return (
      <View style={{paddingBottom:33}}>
        <ScrollView style={styles.container}>

          <View>
            <Image
                  style={styles.image}
                  source={require('../img/test.jpg')}
            />
            <ButtonGallery/>
          </View>

          <View style={{paddingLeft:15, paddingRight:15}}>
            <View style={styles.infoBox}>
              <View style={{flexDirection:'row'}}>
                <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                  <Text style={{color:'black',paddingLeft:10, margin:5, fontSize:16, fontWeight: "bold"}}>Cérémonie</Text>
                </View>
                <View style={{backgroundColor:"#033664"}}>
                  <Icon style={{ margin:5}} name="mode-edit" type="material" color="white" size={22} />
                  </View>
              </View>
              <View style={{backgroundColor:'white',paddingTop:10, paddingBottom:10}}>
                <View style={{flexDirection:'row', flexGrow: 1, alignItems: 'center', marginBottom:5}}>
                  <View style={{width:50}}><Icon type='font-awesome' name='user' size={22}/></View>
                  <View style={{width:70}}><Text style={{fontSize:18, fontWeight:'bold'}}>Famille</Text></View>
                  <View><Text style={{fontSize:18}}>Hermitte</Text></View>
                </View>
                <View style={{flexDirection:'row', flexGrow: 1, alignItems: 'center', marginBottom:5}}>
                  <View style={{width:50}}><Icon type='material' name='book-online' size={22}/></View>
                  <View style={{width:70}}><Text style={{fontSize:18, fontWeight:'bold'}}>Date</Text></View>
                  <Text style={{fontSize:18}}>24/02/1994</Text>
                </View>
                <View style={{flexDirection:'row', flexGrow: 1, alignItems: 'center', marginBottom:5}}>
                  <View style={{width:50}}><Icon type='font-awesome' name='clock-o' size={22}/></View>
                  <View style={{width:70}}><Text style={{fontSize:18, fontWeight:'bold'}}>Heure</Text></View>
                  <Text style={{fontSize:18}}>10h30</Text>
                </View>
                <View style={{flexDirection:'row', flexGrow: 1, alignItems: 'center', marginBottom:5}}>
                  <View style={{width:50}}><Icon type='material' name='place' size={22}/></View>
                  <View style={{width:70}}><Text style={{fontSize:18, fontWeight:'bold'}}>Ville</Text></View>
                  <Text style={{fontSize:18}}>Briançon</Text>
                </View>
                <View>
                  <View style={{justifyContent: 'center',alignItems: 'center' }}><Text style={{fontSize:16, fontWeight:'bold'}}>Observations</Text></View>
                  <View style={{flex:1, borderWidth:0.5, borderTopColor:"black", marginHorizontal:10}}></View>
                </View>
                <Text style={{paddingLeft:10, paddingBottom:10, paddingRight:10}}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                  enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                  aliquip ex ea commodo consequat.
                </Text>
              </View>
            </View>

            <View style={styles.infoBox}>
              <View style={{flexDirection:'row'}}>
                <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                  <Text style={{color:'black',paddingLeft:10, margin:5, fontSize:16, fontWeight: "bold"}}>Cimétière</Text>
                </View>
                <View style={{backgroundColor:"#033664"}}>
                  <Icon style={{ margin:5}} name="mode-edit" type="material" color="white" size={22} />
                  </View>
              </View>
              <View style={{backgroundColor:'white',paddingTop:10, paddingBottom:10}}>
                <View style={{flexDirection:'row', flexGrow: 1, alignItems: 'center', marginBottom:5}}>
                  <View style={{width:50}}><Icon type='material' name='place' size={22}/></View>
                  <View style={{width:70}}><Text style={{fontSize:18, fontWeight:'bold'}}>Lieu</Text></View>
                  <View><Text style={{fontSize:18}}>Pont de Cervières</Text></View>
                </View>
                <View style={{flexDirection:'row', flexGrow: 1, alignItems: 'center', marginBottom:5}}>
                  <View style={{width:50}}><Image style={{marginLeft:10, width:30, height:30}} source={require('../img/caveau.png')} /></View>
                  <View style={{width:70}}><Text style={{fontSize:18, fontWeight:'bold'}}>Type</Text></View>
                  <Text style={{fontSize:18}}>Caveau</Text>
                </View>
                <View style={{flexDirection:'row', flexGrow: 1, alignItems: 'center', marginBottom:5}}>
                <View style={{width:50}}><Image style={{marginLeft:10, width:30, height:30}} source={require('../img/ouverture.png')} /></View>
                  <View style={{width:70}}><Text style={{fontSize:15, fontWeight:'bold'}}>Ouverture</Text></View>
                  <Text style={{fontSize:18}}>Thierry</Text>
                </View>
                <View>
                  <View style={{justifyContent: 'center',alignItems: 'center' }}><Text style={{fontSize:16, fontWeight:'bold'}}>Observations</Text></View>
                  <View style={{flex:1, borderWidth:0.5, borderTopColor:"black", marginHorizontal:10}}></View>
                </View>
                <Text style={{paddingLeft:10, paddingBottom:10, paddingRight:10,paddingTop:10}}>
                - Porte fragile{"\n"}
                - Une bache est nécessaire pour recouvrir un cercueil abîmé
                </Text>
              </View>
            </View>

            <Text style={{ fontSize:20, marginTop:5 }}>CÉRÉMONIE</Text>
            <View
              style={{
                borderBottomColor: 'black',
                borderBottomWidth: 1,
                marginRight:70
              }}
            />
            <Text style={{ alignSelf:'center', fontSize:24, fontWeight:'bold',marginRight:15}}>FAMILLE PONS</Text>

            <View style={{flexDirection:'column'}}>

              <View style={{flexDirection:'row', marginTop:15}}>
                <Icon
                  type='font-awesome'
                  name='clock-o'
                  />
                <Text style={{fontSize:20, fontWeight:'bold', marginLeft:5}}>10h30</Text>
              </View>

              <View style={{flexDirection:'row', marginTop:15}}>
                <Icon
                  type='material'
                  name='place'
                  />
                <Text style={{fontSize:20, fontWeight:'bold', marginLeft:5}}>BRIANÇON</Text>
              </View>

            </View>

          </View>
          <View style={{paddingLeft:15}}>

            <Text style={{ fontSize:20, marginTop:15 }}>CIMETIÈRE</Text>
            <View
              style={{
                borderBottomColor: 'black',
                borderBottomWidth: 1,
                marginRight:70
              }}
            />

            <View style={{flexDirection:'column'}}>

              <View style={{flexDirection:'row', marginTop:15}}>
                <Icon
                  type='material'
                  name='place'
                  />
                <Text style={{fontSize:20, fontWeight:'bold', marginLeft:5}}>PONT DE CERVIERES</Text>
              </View>

              <View style={{flexDirection:'row', marginTop:15}}>
                <Image
                  style={{width:30, height:30}}
                  source={require('../img/caveau.png')}
                  />
                <Text style={{fontSize:20, fontWeight:'bold', marginLeft:5}}>CAVEAU</Text>
              </View>

              <View style={{flexDirection:'row', marginTop:15}}>
                <Image
                  style={{width:35, height:35}}
                  source={require('../img/ouverture.png')}
                  />
                <Text style={{fontSize:20, fontWeight:'bold', marginLeft:5}}>Ouverture par Mickael</Text>
              </View>

            </View>

          </View>

          <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
            <Text style={{ fontSize:20, marginTop:15, paddingLeft:15 }}>PLUS D'INFOS</Text>
            <Icon
              type='material'
              name={this.state.showPlusInfos ? 'arrow-drop-up' : 'arrow-drop-down'}
              size={30}
              style={{marginRight:20}}
              onPress={() => this.showPlusInfos(this.state.showPlusInfos)}
              />
          </View>
          <View
            style={{
              borderBottomColor: 'black',
              borderBottomWidth: 1,
              marginRight:70,
              marginBottom:20,
              marginLeft:15
            }}
          />

          <Text>{this.state.showPlusInfos ? 'SHOW' : 'PAS MONTRER'}</Text>

        </ScrollView>
        <View style={{backgroundColor:'#033664', borderWidth:0, height:33}}>
          <View style={{flexDirection:'row'}}>
          <Icon
            type='material'
            name='person'
            size={28}
            color='white'
            />
            <Text style={{fontSize:18, color:'white', marginTop:3, marginLeft:2}}>| Daniel, Thierry, Carine, Sandrine</Text>
          </View>
        </View>
      </View>
    );
  }
}

export default DetailsMission;
