import React, { Component } from 'react';
import { View, Image, Text, ScrollView, TouchableOpacity, Button} from 'react-native';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import Modal from 'react-native-modal';
import { detailsMissionStyles, formulaireMissionStyles,modalStyles } from './styles';
import * as firebase from 'firebase';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';

  function ButtonGallery(props) {
    const navigation = useNavigation();
    return (
      <View style={{position:'absolute', bottom:5, right:10, zIndex: 99}}>
        <Icon
          style={{ alignSelf:'flex-end' }}
          name="photo-library"
          type="material"
          color="#0886f8"
          reverse={true}
          raised={true}
          size={22}
          onPress={() => navigation.navigate('GalleryMission', {gallery: props.gallery})}>
        </Icon>
      </View>
    );
}

function GravureBox(props) {
  const navigation = useNavigation();
  return (
    <View style={detailsMissionStyles.infoBox}>
      <View style={{flexDirection:'row'}}>
        <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{color:'black',paddingLeft:10, margin:5, fontSize:16, fontWeight: "bold"}}>{props.typeMission}</Text>
        </View>
        {/* <TouchableOpacity
          onPress={ () => navigation.navigate('EditCeremonie',
          { idMission : this.props.route.params.idMission,
            type: this.props.route.params.type,
            nomFamille: this.props.route.params.nomFamille,
            dateMission: this.props.route.params.dateMission,
            heureMission: this.props.route.params.heureMission,
            villeCeremonie: this.props.route.params.villeCeremonie}) } style={{backgroundColor:"#033664", borderTopRightRadius:15}}>
          <Icon style={{ margin:5}} name="mode-edit" type="material" color="white" size={22} />
        </TouchableOpacity> */}
      </View>
      <View style={{backgroundColor:'white',paddingTop:10, paddingBottom:10, borderBottomLeftRadius:15, borderBottomRightRadius:15}}>
        <View style={{flexDirection:'row', flexGrow: 1, alignItems: 'center', marginBottom:5}}>
          <View style={{width:50}}><Icon type='font-awesome' name='user' size={22}/></View>
          <View style={{width:70}}><Text style={{fontSize:18, fontWeight:'bold'}}>Famille</Text></View>
          <View><Text style={{fontSize:18}}>{props.nom}</Text></View>
        </View>
        <View style={{flexDirection:'row', flexGrow: 1, alignItems: 'center', marginBottom:5}}>
          <View style={{width:50}}><Icon type='material' name='book-online' size={22}/></View>
          <View style={{width:70}}><Text style={{fontSize:18, fontWeight:'bold'}}>Date</Text></View>
          <Text style={{fontSize:18}}>{props.date}</Text>
        </View>
        <View style={{flexDirection:'row', flexGrow: 1, alignItems: 'center', marginBottom:5}}>
          <View style={{width:50}}><Icon type='material' name='place' size={22}/></View>
          <View style={{width:70}}><Text style={{fontSize:18, fontWeight:'bold'}}>Ville</Text></View>
          <Text style={{fontSize:18}}>{props.lieu}</Text>
        </View>
        <View>
          <View style={{justifyContent: 'center',alignItems: 'center' }}><Text style={{fontSize:16, fontWeight:'bold'}}>Description</Text></View>
          <View style={{flex:1, borderWidth:0.5, borderTopColor:"black", marginHorizontal:10}}></View>
        </View>
        <Text style={{paddingLeft:10, paddingBottom:10, paddingRight:10, paddingTop:5}}>
          {props.description}
        </Text>
      </View>
    </View>
  );
}

function TransportBox(props) {
  const navigation = useNavigation();
  return (
    <View style={detailsMissionStyles.infoBox}>
      <View style={{flexDirection:'row'}}>
        <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{color:'black',paddingLeft:10, margin:5, fontSize:16, fontWeight: "bold"}}>{props.typeMission}</Text>
        </View>
        {/* <TouchableOpacity
          onPress={ () => navigation.navigate('EditCeremonie',
          { idMission : this.props.route.params.idMission,
            type: this.props.route.params.type,
            nomFamille: this.props.route.params.nomFamille,
            dateMission: this.props.route.params.dateMission,
            heureMission: this.props.route.params.heureMission,
            villeCeremonie: this.props.route.params.villeCeremonie}) } style={{backgroundColor:"#033664", borderTopRightRadius:15}}>
          <Icon style={{ margin:5}} name="mode-edit" type="material" color="white" size={22} />
        </TouchableOpacity> */}
      </View>
      <View style={{backgroundColor:'white',paddingTop:10, paddingBottom:10, borderBottomLeftRadius:15, borderBottomRightRadius:15}}>
        <View style={{flexDirection:'row', flexGrow: 1, alignItems: 'center', marginBottom:5}}>
          <View style={{width:50}}><Icon type='font-awesome' name='user' size={22}/></View>
          <View style={{width:70}}><Text style={{fontSize:18, fontWeight:'bold'}}>Famille</Text></View>
          <View><Text style={{fontSize:18}}>{props.nom}</Text></View>
        </View>
        <View style={{flexDirection:'row', flexGrow: 1, alignItems: 'center', marginBottom:5}}>
          <View style={{width:50}}><Icon type='material' name='book-online' size={22}/></View>
          <View style={{width:70}}><Text style={{fontSize:18, fontWeight:'bold'}}>Date</Text></View>
          <Text style={{fontSize:18}}>{props.date}</Text>
        </View>
        <View style={{flexDirection:'row', flexGrow: 1, alignItems: 'center', marginBottom:5}}>
          <View style={{width:50}}><Icon type='material' name='place' size={22}/></View>
          <View style={{width:70}}><Text style={{fontSize:18, fontWeight:'bold'}}>Ville</Text></View>
          <Text style={{fontSize:18}}>{props.lieu}</Text>
        </View>
        <View>
          <View style={{justifyContent: 'center',alignItems: 'center' }}><Text style={{fontSize:16, fontWeight:'bold'}}>Description</Text></View>
          <View style={{flex:1, borderWidth:0.5, borderTopColor:"black", marginHorizontal:10}}></View>
        </View>
        <Text style={{paddingLeft:10, paddingBottom:10, paddingRight:10, paddingTop:5}}>
          {props.description}
        </Text>
      </View>
    </View>
  );
}

function ObsequesBox(props){

  function showObservationCeremonie(){
    let array = props.observationCeremonie;
    if(typeof array !== 'undefined'){
      for(let i=0;i<props.observationCeremonie.length;i++){
        return(
          <View>
            { array.map((item, key)=>( <Text key={key}> • { item } </Text> )) }
          </View>
        )
      }
    }else{
      return(
          <Text>Il n'y a aucune observation</Text>
      )
    }
  }

  return(
    <View style={detailsMissionStyles.infoBox}>
      <View style={{flexDirection:'row'}}>
        <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{color:'black',paddingLeft:10, margin:5, fontSize:16, fontWeight: "bold"}}>Obsèques : { props.typeObseques }</Text>
        </View>
        {/*<TouchableOpacity
          onPress={ () => navigation.navigate('EditCeremonie',
          { idMission : this.props.route.params.idMission,
            type: this.props.route.params.type,
            nomFamille: this.props.route.params.nomFamille,
            dateMission: this.props.route.params.dateMission,
            heureMission: this.props.route.params.heureMission,
            villeCeremonie: this.props.route.params.villeCeremonie}) } style={{backgroundColor:"#033664", borderTopRightRadius:15}}>
          <Icon style={{ margin:5}} name="mode-edit" type="material" color="white" size={22} />
        </TouchableOpacity>*/}
      </View>
      <View style={{backgroundColor:'white',paddingTop:10, paddingBottom:10, borderBottomLeftRadius:15, borderBottomRightRadius:15}}>
        <View style={{flexDirection:'row', flexGrow: 1, alignItems: 'center', marginBottom:5}}>
          <View style={{width:50}}><Icon type='font-awesome' name='user' size={22}/></View>
          <View style={{width:70}}><Text style={{fontSize:18, fontWeight:'bold'}}>Famille</Text></View>
          <View><Text style={{fontSize:18}}>{props.nom}</Text></View>
        </View>
        <View style={{flexDirection:'row', flexGrow: 1, alignItems: 'center', marginBottom:5}}>
          <View style={{width:50}}><Icon type='material' name='book-online' size={22}/></View>
          <View style={{width:70}}><Text style={{fontSize:18, fontWeight:'bold'}}>Date</Text></View>
          <Text style={{fontSize:18}}>{props.dateCeremonie}</Text>
        </View>
        <View style={{flexDirection:'row', flexGrow: 1, alignItems: 'center', marginBottom:5}}>
          <View style={{width:50}}><Icon type='font-awesome' name='clock-o' size={22}/></View>
          <View style={{width:70}}><Text style={{fontSize:18, fontWeight:'bold'}}>Heure</Text></View>
          <Text style={{fontSize:18}}>{props.heureCeremonie}</Text>
        </View>
        <View style={{flexDirection:'row', flexGrow: 1, alignItems: 'center', marginBottom:5}}>
          <View style={{width:50}}><Icon type='material' name='place' size={22}/></View>
          <View style={{width:70}}><Text style={{fontSize:18, fontWeight:'bold'}}>Ville</Text></View>
          <Text style={{fontSize:18}}>{props.villeCeremonie}</Text>
        </View>
        <View>
          <View style={{justifyContent: 'center',alignItems: 'center' }}><Text style={{fontSize:16, fontWeight:'bold'}}>Observations</Text></View>
          <View style={{flex:1, borderWidth:0.5, borderTopColor:"black", marginHorizontal:10}}></View>
        </View>
        <Text style={{paddingLeft:10, paddingBottom:10, paddingRight:10}}>
          { props.observationCeremonie !== null || typeof underfined ? showObservationCeremonie() : null }
        </Text>
      </View>
    </View>
  )
}

class DetailsMission extends Component {
  constructor(props){
    super(props);
    this.state = {
      idMission:this.props.route.params.idMission,
      typeMission:this.props.route.params.typeMission,
      typeObseques:this.props.route.params.typeObseques,
      isModalVisible:false,
      galleryImage:[]
    }
    console.log("propsa fef", this.props)
    this.props.navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity style={{ justifyContent:'center', paddingRight:10 }} onPress={() => this.execute()}>
          <Icon
            name="share"
            type="material"
            color="#fff"
          />
        </TouchableOpacity>
      ),
    });
  }

  componentDidMount(){
    this.getImage(); 
  }

  showContent = (typeMission) => {
    switch(typeMission){
      case 'Gravure' :
        return <GravureBox
          typeMission={typeMission}
          nom={this.props.route.params.nom}
          date={this.props.route.params.date}
          description={this.props.route.params.description}
          lieu={this.props.route.params.lieu}/>
      case 'Transport' :
        return <TransportBox
          typeMission={typeMission}
          nom={this.props.route.params.nom}
          date={this.props.route.params.date}
          description={this.props.route.params.description}
          lieu={this.props.route.params.lieu}/>
      case 'Obseques' :
        if(this.props.route.params.ceremonie){
          return <ObsequesBox
          typeMission={typeMission}
          nom={this.props.route.params.nom}
          dateCeremonie={this.props.route.params.dateCeremonie}
          heureCeremonie={this.props.route.params.heureCeremonie}
          observationCeremonie={this.props.route.params.observationCeremonie}
          villeCeremonie={this.props.route.params.villeCeremonie}
          ceremonie={this.props.route.params.ceremonie}
          typeObseques={this.props.route.params.typeObseques}/>
        }
    }
  }

  getImage = () => {
    let storagePath = firebase.storage().ref().child(this.props.route.params.typeMission+'/'+this.props.route.params.idMission);
    storagePath.list().then(result => {
      result.items.forEach( all => {
        firebase.storage().ref().child(all.fullPath)
        .getDownloadURL().then( result => {
          let array = this.state.galleryImage;
          if(!array.includes(result)){
             array.push(result)
             this.setState({ galleryImage: array });
          }
        }).catch(err=>{
          console.log("ERR", err)
        })
      })
     }).catch((error)=> {
       console.log(error);
       alert(error)
     });
}

  showModaldeleteMission = () => {
      if(!this.state.isModalVisible){
          this.setState({isModalVisible:true})
      }else { this.setState({isModalVisible:false}) }
  }

  deleteMission = () => {
    firebase.database().ref('/Missions/'+this.props.route.params.idMission)
    .remove()
    .then((data) => {
      this.deleteFolderContents();
      this.props.navigation.navigate('Planning');
    }).catch((err) => {
      console.log(err);
    });
    if(!this.state.isModalVisible){
        this.setState({isModalVisible:true})
    }else { this.setState({isModalVisible:false}) }
  }


  ////////////////////////DELETE FOLDER PHOTO MISSIONS///////////////////////////////////

  deleteFolderContents() {
    const ref = firebase.storage().ref(this.state.typeMission+'/'+this.state.idMission+'/');
    ref.listAll()
      .then(dir => {
        dir.items.forEach(fileRef => {
          this.deleteFile(ref.fullPath, fileRef.name);
        });
        dir.prefixes.forEach(folderRef => {
          this.deleteFolderContents(folderRef.fullPath);
        })
      })
      .catch(error => {
        console.log(error);
      });
  }

  deleteFile(pathToFile, fileName) {
    const ref = firebase.storage().ref(pathToFile);
    const childRef = ref.child(fileName);
    childRef.delete()
  }

  ///////////////////////////////////////////////////////////////////////////////////

  execute = async () => {
    const html =
    "<div style='background: #ffe7e8'><h1> "
    +this.props.route.params.nom+
    "Test</h1><br/>"
    +this.props.route.params.dateMission+
    "</div>";
    const { uri } = await Print.printToFileAsync({ html });
    Sharing.shareAsync(uri);
  }

  ///////////////////////////////////////////////////////////////////////////////////

  showObservationCimetiere(){
    let array = this.props.route.params.observationCimetiere;
    if(typeof array !== 'undefined'){
      for(let i=0;i<this.props.route.params.observationCimetiere.length;i++){
        return(
          <View>
            { array.map((item, key)=>( <Text key={key}> • { item } </Text> )) }
          </View>
        )
      }
    }else{
      return(
          <Text>Il n'y a aucune observation</Text>
      )
    }
  }

  showUserMission(){
    let array = this.props.route.params.userMission;
    if(typeof array !== 'undefined'){
      for(let i=0;i<this.props.route.params.userMission.length;i++){
        return(
          <View style={{flexDirection:'row'}}>
            <Text style={{ color:'white', fontSize:16 }}> • </Text>{ array.map((item)=>(  <Text key={item} style={{ color:'white', fontSize:16 }}>{ item } • </Text> )) }
          </View>
        )
      }
    }else{
      return(
          <Text> </Text>
      )
    }
  }

  render() {
    const navigation = this.props.navigation;

    return (
      <View style={{ flex:1, justifyContent:'space-between'}}>
        <ScrollView style={detailsMissionStyles.detailsMissionContainer}>
          <Modal isVisible={this.state.isModalVisible} >
            <View style={{justifyContent:'space-between', backgroundColor:'white', alignItems:'center'}}>
              <Text style={{fontSize:20, fontWeight:'bold',margin:15}}>ATTENTION</Text>

              <View style={{paddingLeft:15, paddingRight:15, marginBottom:20, alignItems:'center'}}>
                <Text style={{fontSize:16}}>Vous êtes sur le point de supprimer la mission</Text>
                <Text style={{fontSize:16, fontStyle:'italic'}}>Confirmez-vous votre choix ?</Text>
              </View>

              <View style={{ width:'100%', flexDirection:'row', marginBottom:10, justifyContent:'space-around', alignItems:'center'}}>
                <TouchableOpacity onPress={ () => this.deleteMission()} style={modalStyles.buttonYes}>
                <Text style={{color:'white',fontSize:16}}>Oui</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.showModaldeleteMission} style={modalStyles.buttonNo}>
                <Text style={{color:'white',fontSize:16}}>Non</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          <View>
            { this.state.galleryImage.length !== 0 ?
              <Image style={detailsMissionStyles.image}
                     source={{uri: this.state.galleryImage[0]}} /> :
              <View style={{ width: '100%', height: 130, zIndex: 1, backgroundColor:'#c7c7c7', justifyContent:'center', alignItems:'center'}}>
                <Text style={{margin:15, fontSize:14, fontWeight:'bold'}}>Aucune photo n'est disponible</Text>
                <View style={formulaireMissionStyles.addButton}><Text style={{color:'white'}}>Ajouter une photo</Text>
                  <Icon
                      style={{ alignSelf:'flex-end', marginLeft:5, marginRight:5 }}
                      name="photo-library"
                      type="material"
                      color="white"
                      size={22}>
                  </Icon>
                </View>
              </View>
            }
            { this.state.galleryImage.length !== 0 ? <ButtonGallery gallery={this.state.galleryImage}/> : null }
          </View>
          <View style={{paddingLeft:15, paddingRight:15, paddingTop:15}}>



            { this.props.route.params.arriveeCorps ?
            
            <View style={detailsMissionStyles.infoBox}>
              <View style={{flexDirection:'row'}}>
                <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                  <Text style={{color:'black',paddingLeft:10, margin:5, fontSize:16, fontWeight: "bold"}}>Informations</Text>
                </View>
                  <TouchableOpacity style={{backgroundColor:"#033664", borderTopRightRadius:15}}>
                    <Icon style={{ margin:5}} name="mode-edit" type="material" color="white" size={22} />
                  </TouchableOpacity>
              </View>
              <View style={{backgroundColor:'white',paddingTop:10, paddingBottom:10, borderBottomLeftRadius:15, borderBottomRightRadius:15}}>
              <Text style={{marginLeft:15, fontSize:16, fontWeight:'bold'}}>Identité du défunt</Text>
                <View style={{borderWidth:0.5, marginHorizontal:15, marginBottom:10}}/>
                <View style={{flexDirection:'row', flexGrow: 1, alignItems: 'center', marginBottom:5}}>
                  <View style={{width:50}}><Icon type='material' name='person' size={22}/></View>
                  <View><Text style={{fontSize:15, fontWeight:'bold', marginRight:10}}>{this.props.route.params.nom} {this.props.route.params.prenom}</Text></View>
                </View>
              
              </View>
            </View>
            
            :
            
            <View style={detailsMissionStyles.infoBox}>
            <View style={{flexDirection:'row'}}>
              <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{color:'black',paddingLeft:10, margin:5, fontSize:16, fontWeight: "bold"}}>Informations</Text>
              </View>
                <TouchableOpacity style={{backgroundColor:"#033664", borderTopRightRadius:15}}>
                  <Icon style={{ margin:5}} name="mode-edit" type="material" color="white" size={22} />
                </TouchableOpacity>
            </View>
            <View style={{backgroundColor:'white',paddingTop:10, paddingBottom:10, borderBottomLeftRadius:15, borderBottomRightRadius:15}}>
            <Text style={{marginLeft:15, fontSize:16, fontWeight:'bold'}}>Identité du défunt</Text>
              <View style={{borderWidth:0.5, marginHorizontal:15, marginBottom:10}}/>
              <View style={{flexDirection:'row', flexGrow: 1, alignItems: 'center', marginBottom:5}}>
                <View style={{width:50}}><Icon type='material' name='person' size={22}/></View>
                <View><Text style={{fontSize:15, fontWeight:'bold', marginRight:10}}>{this.props.route.params.nom} {this.props.route.params.prenom}</Text></View>
              </View>
              <Text style={{marginLeft:15, fontSize:16, fontWeight:'bold'}}>Mise en Bière</Text>
              <View style={{borderWidth:0.5, marginHorizontal:15, marginBottom:10}}/>
              <View style={{flexDirection:'row', flexGrow: 1, alignItems: 'center', marginBottom:5}}>
                <View style={{width:50}}><Icon type='material' name='book-online' size={22}/></View>
                <View style={{width:70}}><Text style={{fontSize:15, fontWeight:'bold', marginRight:10}}>Date</Text></View>
                <View><Text style={{fontSize:18}}>{this.props.route.params.villeCimetiere}</Text></View>
              </View>
              <View style={{flexDirection:'row', flexGrow: 1, alignItems: 'center', marginBottom:5}}>
                <View style={{width:50}}><Icon type='font-awesome' name='clock-o' size={22}/></View>
                <View style={{width:70}}><Text style={{fontSize:15, fontWeight:'bold', marginRight:10}}>Heure</Text></View>
                <Text style={{fontSize:18}}>{this.props.route.params.typeSepulture}</Text>
              </View>
              <View style={{flexDirection:'row', flexGrow: 1, alignItems: 'center', marginBottom:5}}>
              <View style={{width:50}}><Icon type='material' name='place' size={22}/></View>
                <View style={{width:70}}><Text style={{fontSize:15, fontWeight:'bold', marginRight:10}}>Lieu</Text></View>
                <Text style={{fontSize:18}}>{this.props.route.params.ouverture}</Text>
              </View>
              <Text style={{marginLeft:15, fontSize:16, fontWeight:'bold'}}>Fermeture</Text>
              <View style={{borderWidth:0.5, marginHorizontal:15, marginBottom:10}}/>
              <View style={{flexDirection:'row', flexGrow: 1, alignItems: 'center', marginBottom:5}}>
                <View style={{width:50}}><Icon type='font-awesome' name='clock-o' size={22}/></View>
                <View style={{width:70}}><Text style={{fontSize:15, fontWeight:'bold', marginRight:10}}>Heure</Text></View>
                <View><Text style={{fontSize:18}}>{this.props.route.params.villeCimetiere}</Text></View>
              </View>
              {
                this.props.route.params.isPolice ?

              <View style={{flex:1, flexDirection:'row'}}>
                    <Icon type='material' name='local-police' size={22} style={formulaireMissionStyles.iconForm} />
                    <Text style={{fontWeight:'bold', fontSize:15,}}>Scellés par la police</Text>
              </View> :
              null
              }
            </View>
          </View>

            }

            { this.showContent(this.state.typeMission) }

            { this.state.typeMission == 'Obseques' && this.state.typeObseques !== 'Crémation' ?

            <View style={detailsMissionStyles.infoBox}>
              <View style={{flexDirection:'row'}}>
                <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                  <Text style={{color:'black',paddingLeft:10, margin:5, fontSize:16, fontWeight: "bold"}}>Cimetière</Text>
                </View>
                  <TouchableOpacity style={{backgroundColor:"#033664", borderTopRightRadius:15}}>
                    <Icon style={{ margin:5}} name="mode-edit" type="material" color="white" size={22} />
                  </TouchableOpacity>
              </View>
              <View style={{backgroundColor:'white',paddingTop:10, paddingBottom:10, borderBottomLeftRadius:15, borderBottomRightRadius:15}}>

              {

                this.props.route.params.ceremonie ? null :

                <View>
                  <View style={{flexDirection:'row', flexGrow: 1, alignItems: 'center', marginBottom:5}}> 
                  <View style={{width:50}}><Icon type='material' name='book-online' size={22}/></View>
                  <View style={{width:70}}><Text style={{fontSize:18, fontWeight:'bold'}}>Date</Text></View>
                  <View><Text style={{fontSize:18}}>{this.props.route.params.dateCeremonie}</Text></View>
                </View>
                <View style={{flexDirection:'row', flexGrow: 1, alignItems: 'center', marginBottom:5}}>
                  <View style={{width:50}}><Icon type='font-awesome' name='clock-o' size={22}/></View>
                  <View style={{width:70}}><Text style={{fontSize:18, fontWeight:'bold'}}>Heure</Text></View>
                  <View><Text style={{fontSize:18}}>{this.props.route.params.heureCeremonie }</Text></View>
                </View>
              </View>

              }

                <View style={{flexDirection:'row', flexGrow: 1, alignItems: 'center', marginBottom:5}}>
                  <View style={{width:50}}><Icon type='material' name='place' size={22}/></View>
                  <View style={{width:70}}><Text style={{fontSize:18, fontWeight:'bold'}}>Lieu</Text></View>
                  <View><Text style={{fontSize:18}}>{this.props.route.params.villeCimetiere}</Text></View>
                </View>
                <View style={{flexDirection:'row', flexGrow: 1, alignItems: 'center', marginBottom:5}}>
                  <View style={{width:50}}><Image style={{marginLeft:10, width:30, height:30}} source={require('../img/caveau.png')} /></View>
                  <View style={{width:70}}><Text style={{fontSize:18, fontWeight:'bold'}}>Type</Text></View>
                  <Text style={{fontSize:18}}>{this.props.route.params.typeSepulture}</Text>
                </View>
                <View style={{flexDirection:'row', flexGrow: 1, alignItems: 'center', marginBottom:5}}>
                <View style={{width:50}}><Image style={{marginLeft:10, width:30, height:30}} source={require('../img/ouverture.png')} /></View>
                  <View style={{width:70}}><Text style={{fontSize:15, fontWeight:'bold'}}>Ouverture</Text></View>
                  <Text style={{fontSize:18}}>{this.props.route.params.ouverture}</Text>
                </View>
                <View>
                  <View style={{justifyContent: 'center',alignItems: 'center' }}><Text style={{fontSize:16, fontWeight:'bold'}}>Observations</Text></View>
                  <View style={{flex:1, borderWidth:0.5, borderTopColor:"black", marginHorizontal:10}}></View>
                </View>
                <Text style={{paddingLeft:10, paddingBottom:10, paddingRight:10}}>
                  { this.props.route.params.observationCimetiere !== null || typeof underfined ? this.showObservationCimetiere() : null }
                </Text>
              </View>
            </View>

            :

            null

            }

            {
              this.state.typeMission == 'Obseques' && this.state.typeObseques == 'Crémation' ?
              
              <View style={detailsMissionStyles.infoBox}>
              <View style={{flexDirection:'row'}}>
                <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                  <Text style={{color:'black',paddingLeft:10, margin:5, fontSize:16, fontWeight: "bold"}}>Informations Crémation</Text>
                </View>
                  <TouchableOpacity style={{backgroundColor:"#033664", borderTopRightRadius:15}}>
                    <Icon style={{ margin:5}} name="mode-edit" type="material" color="white" size={22} />
                  </TouchableOpacity>
              </View>
              <View style={{backgroundColor:'white',paddingTop:10, paddingBottom:10, borderBottomLeftRadius:15, borderBottomRightRadius:15}}>
              <Text style={{marginLeft:15, fontSize:16, fontWeight:'bold'}}>Identité du défunt</Text>
                <View style={{borderWidth:0.5, marginHorizontal:15, marginBottom:10}}/>
                <Text style={{marginLeft:15, fontSize:16, fontWeight:'bold'}}>Mise en Bière</Text>
                <View style={{borderWidth:0.5, marginHorizontal:15, marginBottom:10}}/>
                <View style={{flexDirection:'row', flexGrow: 1, alignItems: 'center', marginBottom:5}}>
                  <View style={{width:50}}><Icon type='material' name='book-online' size={22}/></View>
                  <View style={{width:70}}><Text style={{fontSize:15, fontWeight:'bold', marginRight:10}}>Date</Text></View>
                  <View><Text style={{fontSize:18}}>{this.props.route.params.villeCimetiere}</Text></View>
                </View>
                <View style={{flexDirection:'row', flexGrow: 1, alignItems: 'center', marginBottom:5}}>
                  <View style={{width:50}}><Icon type='font-awesome' name='clock-o' size={22}/></View>
                  <View style={{width:70}}><Text style={{fontSize:15, fontWeight:'bold', marginRight:10}}>Heure</Text></View>
                  <Text style={{fontSize:18}}>{this.props.route.params.typeSepulture}</Text>
                </View>
                <View style={{flexDirection:'row', flexGrow: 1, alignItems: 'center', marginBottom:5}}>
                <View style={{width:50}}><Icon type='material' name='place' size={22}/></View>
                  <View style={{width:70}}><Text style={{fontSize:15, fontWeight:'bold', marginRight:10}}>Lieu</Text></View>
                  <Text style={{fontSize:18}}>{this.props.route.params.ouverture}</Text>
                </View>
                <Text style={{marginLeft:15, fontSize:16, fontWeight:'bold'}}>Fermeture</Text>
                <View style={{borderWidth:0.5, marginHorizontal:15, marginBottom:10}}/>
                <View style={{flexDirection:'row', flexGrow: 1, alignItems: 'center', marginBottom:5}}>
                  <View style={{width:50}}><Icon type='font-awesome' name='clock-o' size={22}/></View>
                  <View style={{width:70}}><Text style={{fontSize:15, fontWeight:'bold', marginRight:10}}>Heure</Text></View>
                  <View><Text style={{fontSize:18}}>{this.props.route.params.villeCimetiere}</Text></View>
                </View>
              </View>
            </View>
              
              : null
            }

            <TouchableOpacity onPress={() => this.showModaldeleteMission()}
            style={{
              borderRadius:15,
              backgroundColor:'#DC143C',
              paddingTop:10,
              paddingBottom:10,
              paddingLeft:20,
              paddingRight:20,
              flexDirection:'row',
              height:40,
              marginHorizontal:30,
              marginBottom:15,
              justifyContent:'center',
              alignItems:'center',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 1,
              shadowRadius: 5,
              elevation: 2
            }}>
              <Icon color='white' type='material' name='delete' size={24}/>
              <Text style={{fontSize:16, color:'white'}}>Supprimer la mission</Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
        <View style={{MarginTop:33, backgroundColor:'#033664', borderWidth:0, height:33}}>
          <View style={{flexDirection:'row', flexGrow: 1, alignItems: 'center'}}>
          <Icon
            style={{margin:3}}
            type='font-awesome'
            name='users'
            size={22}
            color='white'
            />
            {this.showUserMission()}
          </View>
        </View>
      </View>
    );
  }
}

export default DetailsMission;
