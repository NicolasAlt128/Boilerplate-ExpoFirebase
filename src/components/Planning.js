import React, { Component } from 'react';
import { Button, Platform, LogBox, View, Image, Text, SafeAreaView, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Icon } from 'react-native-elements';
import ActionButton from 'react-native-action-button';
import * as firebase from 'firebase';
import functions from 'firebase/functions';
import { CONFIG } from './const/firebaseConfig';
import * as Notifications from "expo-notifications";

import { connect } from 'react-redux';

import ImgMission from './ImgMission.js';

import { planningStyles } from './styles';

LogBox.ignoreLogs(['Setting a timer']);

class Planning extends Component {
  constructor(props){
    LogBox.ignoreAllLogs();
    super(props);
    this.state = {
      listeMissions:null,
      isFetching:false,
      userInfos: this.props.userInfos,
      infoPhotoArray: null,
      infoPhoto: null,
      url:[],
      isMounted:false
    };
    if (!firebase.apps.length) firebase.initializeApp(CONFIG);
  }

  componentDidMount(){
    this.setState({listeMissions: null})
    this.getMissions();
    this._refreshList = this.props.navigation.addListener('focus', () => {
      this.setState({listeMissions: null})
      this.getMissions();
    });
    this.setState({ isMounted: true })
  }

  componentWillUnmount() {
   this._refreshList();
  }

  getImage = (typeMission, idMission) => {
    let storagePath = firebase.storage().ref().child(typeMission + '/' + idMission);
    storagePath.list().then(result => {
      result.items.forEach( all => {
        firebase.storage().ref().child(all.fullPath)
        .getDownloadURL().then( result => {
          return all.fullPath
        })
      })
     }).catch((error)=> {
       console.log(error);
       alert(error)
     });
}

  makeAdminRole = () => {
    firebase.functions()
      .httpsCallable('addAdminRole')()
      .then(response => {
      }).catch(err =>{
        console.log("ERR", err)
      });
  }

  getMissions = () => {
    this.setState({isFetching:true});
    const visit = (obj, fn) => {
      const values = Object.values(obj);
      values.forEach(val => val && typeof val === "object" ? visit(val, fn) : fn(val))
    }
    firebase.database()
    .ref('/Missions/')
    .once('value')
    .then(snapshot => {

      let sortList = Object.values(snapshot.val()).sort((a, b) => (a.formattedDate > b.formattedDate) ? 1 : (a.formattedHeure === b.formattedHeure) ? ((a.formattedHeure > b.formattedHeure) ? 1 : -1) : -1 );
        this.setState({ listeMissions: sortList });
        this.setState({ isFetching:false });
    }).catch(err => {
      this.setState({ isFetching:false });
    });
  }

  showActionButton = () => {
    if(this.props.userInfos.role == 1){
      return(
        <ActionButton
          offsetX={25}
          offsetY={25}
          buttonColor="#0886f8"
          bgColor="rgba(51,51,51,0.9)"
          fixNativeFeedbackRadius={Platform.OS === 'ios' ? false : true}>
            <ActionButton.Item
              textContainerStyle={{flex:1, borderRadius:15, backgroundColor: 'white', borderWidth:0.5, height:30, justifyContent:'center'}}
              textStyle={{flex:1, fontSize:16, fontWeight:'bold'}}
              nativeFeedbackRippleColor={ Platform.OS === 'ios' ? 'rgba(255,255,255,0.75)' : 'rgba(51,51,51,0.2)' }
              buttonColor='#e7874e' title="Ajouter une fiche Obsèques"
              onPress={ () => this.props.navigation.navigate('SelectionTypeObseques', {typeMission: 'Obsèques'}) }>
              <Image style={{width:30, height:30}} source={require('../img/coffin.png')} />
            </ActionButton.Item>
            <ActionButton.Item
              textContainerStyle={{flex:1, borderRadius:15, backgroundColor: 'white', borderWidth:0.5, height:30, justifyContent:'center'}}
              textStyle={{flex:1, fontSize:16, fontWeight:'bold'}}
              nativeFeedbackRippleColor={ Platform.OS === 'ios' ? 'rgba(255,255,255,0.75)' : 'rgba(51,51,51,0.2)' }
              buttonColor='#96CDCD'
              title="Ajouter une fiche Marbrerie"
              onPress={ () => this.props.navigation.navigate('FormulaireMaconnerie', {typeMission: 'Marbrerie'}) }>
              <Image style={{width:30, height:30}} source={require('../img/brouette.png')} />
            </ActionButton.Item>
            <ActionButton.Item
              textContainerStyle={{flex:1, borderRadius:15, backgroundColor: 'white', borderWidth:0.5, height:30, justifyContent:'center'}}
              textStyle={{flex:1, fontSize:16, fontWeight:'bold'}}
              nativeFeedbackRippleColor={ Platform.OS === 'ios' ? 'rgba(255,255,255,0.75)' : 'rgba(51,51,51,0.2)' }
              buttonColor='#CDCDCD'
              title="Ajouter une fiche Gravure"
              onPress={ () => this.props.navigation.navigate('FormulaireGravure', {typeMission: 'Gravure'}) }>
              <Image style={{width:30, height:30}} source={require('../img/gravure.png')} />
            </ActionButton.Item>
            <ActionButton.Item
              textContainerStyle={{flex:1, borderRadius:15, backgroundColor: 'white', borderWidth:0.5, height:30, justifyContent:'center'}}
              textStyle={{flex:1, fontSize:16, fontWeight:'bold'}}
              nativeFeedbackRippleColor={ Platform.OS === 'ios' ? 'rgba(255,255,255,0.75)' : 'rgba(51,51,51,0.2)' }
              buttonColor='#F46868' title="Ajouter une fiche Ouverture"
              onPress={ () => this.props.navigation.navigate('FormulaireOuverture', {typeMission: 'Ouverture'}) }>
              <Image style={{width:30, height:30}} source={require('../img/ouverture.png')} />
            </ActionButton.Item>
            <ActionButton.Item
              textContainerStyle={{flex:1, borderRadius:15, backgroundColor: 'white', borderWidth:0.5, height:30, justifyContent:'center'}}
              textStyle={{flex:1, fontSize:16, fontWeight:'bold'}}
              nativeFeedbackRippleColor={ Platform.OS === 'ios' ? 'rgba(255,255,255,0.75)' : 'rgba(51,51,51,0.2)' }
              buttonColor='#A08DD8' title="Ajouter une fiche Transport"
              onPress={ () => this.props.navigation.navigate('FormulaireTransport', {typeMission: 'Transport'}) }>
              <Image style={{width:50, height:50}} source={require('../img/vehicule.png')} />
            </ActionButton.Item>
          </ActionButton>
      )
    }

  }

  checkType(idMission){
    let type = idMission.charAt(0);

    switch(type){
      case 'O':
        return '#e7874e';
      case 'M':
        return '#96CDCD';
      case 'G':
        return '#CDCDCD'
      case 'T':
        return '#A08DD8'
      case 'C':
        return '#F46868'
    }
  }

  infoMission(
    idMission,
    ceremonie,
    typeObseques,
    arriveeCorps,
    typeMission,
    heureFermeture,
    heureMiseEnBiere,
    dateMiseBiere,
    lieuMiseBiere,
    isPolice,
    nom,
    villeCeremonie,
    dateCeremonie,
    heureCeremonie,
    observations,
    villeCimetiere,
    typeSepulture,
    ouverture,
    date,
    lieu,
    intitule,
    lieuDepart,
    lieuArrive,
    observationCeremonie,
    observationCimetiere ){
    let type = idMission.charAt(0);

    switch(type){
      case 'O':
        return(
          <View style={{ flex:1, flexDirection:'column', width:'100%'}}>

            <View style={{flex:1, flexDirection:'row', justifyContent:'center', alignItems:'center', backgroundColor: this.checkType(idMission) ,borderTopRightRadius: 15}}>
              <Text style={planningStyles.nomFamille}>{ typeObseques || typeMission }</Text>
            </View>

            <View style={{flex:1, flexDirection:'row', alignItems:'flex-start', marginTop:2}}>
              <View style={{width:35}}><Icon type='font-awesome' name='user' size={20}/></View>
              <View style={{width:90}}><Text style={{fontSize:16, fontWeight:'bold'}}>Famille</Text></View>
              <View><Text style={{fontSize:16}}>{ nom }</Text></View>
            </View>

            <View style={{flex:1, flexDirection:'row', alignItems:'flex-start'}}>
              <View style={{width:35}}><Icon type='font-awesome' name='clock-o' size={20}/></View>
              <View style={{width:90}}><Text style={{fontSize:16, fontWeight:'bold'}}>Cérémonie</Text></View>
              <Text style={{fontSize:16}}>{ heureCeremonie }</Text>
            </View>

            <View style={{flex:1, flexDirection:'row', alignItems:'flex-start'}}>
              <View style={{width:35}}><Icon type='material' name='place' size={20}/></View>
              <View style={{width:90}}><Text style={{fontSize:16, fontWeight:'bold'}}>Ville</Text></View>
              <Text style={{fontSize:16}}>{ villeCeremonie }</Text>
            </View>
          </View>
        )
      case 'M':
        return (
          <View style={{ flex:1, flexDirection:'column', width:'100%'}}>

          <View style={{flex:1, flexDirection:'row', justifyContent:'center', alignItems:'center', backgroundColor: this.checkType(idMission) ,borderTopRightRadius: 15}}>
            <Text style={planningStyles.nomFamille}>{ typeObseques || typeMission }</Text>
          </View>
          
          <View style={{flex:1, flexDirection:'row', justifyContent:'center', alignItems:'center', marginTop:2}}>
            <View style={{paddingLeft:10, paddingRight:10}}><Text numberOfLines={1} ellipsizeMode="tail" style={{fontSize:18, fontWeight:'bold', textDecorationLine: 'underline'}}>{ intitule }</Text></View>
          </View>

          <View style={{flex:1, flexDirection:'row', alignItems:'flex-start', marginTop:2}}>
            <View style={{width:50}}><Icon type='font-awesome' name='user' size={20}/></View>
            <View style={{width:70}}><Text style={{fontSize:16, fontWeight:'bold'}}>Famille</Text></View>
            <View><Text style={{fontSize:16}}>{ nom }</Text></View>
          </View>

          <View style={{flex:1, flexDirection:'row', alignItems:'flex-start'}}>
            <View style={{width:50}}><Icon type='material' name='place' size={20}/></View>
            <View style={{width:70}}><Text style={{fontSize:16, fontWeight:'bold'}}>Ville</Text></View>
            <Text style={{fontSize:16}}>{ lieu }</Text>
          </View>
        </View>
        );
      case 'G':
        return (
          <View style={{ flex:1, flexDirection:'column', width:'100%'}}>
            <View style={{flex:1, flexDirection:'row', justifyContent:'center', alignItems:'center', backgroundColor: this.checkType(idMission) ,borderTopRightRadius: 15}}>
              <Text style={planningStyles.nomFamille}>{ typeObseques || typeMission }</Text>
            </View>

            <View style={{flex:1, flexDirection:'row', alignItems:'flex-start', marginTop:2}}>
              <View style={{width:50}}><Icon type='font-awesome' name='user' size={20}/></View>
              <View style={{width:70}}><Text style={{fontSize:16, fontWeight:'bold'}}>Famille</Text></View>
              <View><Text style={{fontSize:16}}>{ nom }</Text></View>
            </View>

            <View style={{flex:1, flexDirection:'row', alignItems:'flex-start'}}>
              <View style={{width:50}}><Icon type='font-awesome' name='clock-o' size={20}/></View>
              <View style={{width:70}}><Text style={{fontSize:16, fontWeight:'bold'}}>Heure</Text></View>
              <Text style={{fontSize:16}}>{ heureCeremonie }</Text>
            </View>

            <View style={{flex:1, flexDirection:'row', alignItems:'flex-start'}}>
              <View style={{width:50}}><Icon type='material' name='place' size={20}/></View>
              <View style={{width:70}}><Text style={{fontSize:16, fontWeight:'bold'}}>Ville</Text></View>
              <Text style={{fontSize:16}}>{ villeCeremonie || lieu  }</Text>
            </View>
          </View>
        );
        case 'C':
          return (
            <View style={{ flex:1, flexDirection:'column', width:'100%'}}>
              <View style={{flex:1, flexDirection:'row', justifyContent:'center', alignItems:'center', backgroundColor: this.checkType(idMission) ,borderTopRightRadius: 15}}>
                <Text style={planningStyles.nomFamille}>{ typeObseques || typeMission }</Text>
              </View>
  
              <View style={{flex:1, flexDirection:'row', alignItems:'flex-start', marginTop:2}}>
                <View style={{width:50}}><Icon type='font-awesome' name='user' size={20}/></View>
                <View style={{width:70}}><Text style={{fontSize:16, fontWeight:'bold'}}>Famille</Text></View>
                <View><Text style={{fontSize:16}}>{ nom }</Text></View>
              </View>
  
              <View style={{flex:1, flexDirection:'row', alignItems:'flex-start'}}>
                <View style={{width:50}}><Icon type='font-awesome' name='clock-o' size={20}/></View>
                <View style={{width:70}}><Text style={{fontSize:16, fontWeight:'bold'}}>Heure</Text></View>
                <Text style={{fontSize:16}}>{ heureCeremonie }</Text>
              </View>
  
              <View style={{flex:1, flexDirection:'row', alignItems:'flex-start'}}>
                <View style={{width:50}}><Icon type='material' name='place' size={20}/></View>
                <View style={{width:70}}><Text style={{fontSize:16, fontWeight:'bold'}}>Ville</Text></View>
                <Text style={{fontSize:16}}>{ villeCeremonie || lieu  }</Text>
              </View>
            </View>
          );
        case 'T':
          return (
            <View style={{ flex:1, flexDirection:'column', width:'100%'}}>
              <View style={{flex:1, flexDirection:'row', justifyContent:'center', alignItems:'center', backgroundColor: this.checkType(idMission) ,borderTopRightRadius: 15}}>
                <Text style={planningStyles.nomFamille}>{ typeObseques || typeMission }</Text>
              </View>
  
              <View style={{flex:1, flexDirection:'row', alignItems:'flex-start', marginTop:2}}>
                <View style={{width:50}}><Icon type='font-awesome' name='user' size={20}/></View>
                <View style={{width:70}}><Text style={{fontSize:16, fontWeight:'bold'}}>Famille</Text></View>
                <View><Text style={{fontSize:16}}>{ nom }</Text></View>
              </View>
  
              {/* <View style={{flex:1, flexDirection:'row', alignItems:'flex-start'}}>
                <View style={{width:50}}><Icon type='font-awesome' name='clock-o' size={20}/></View>
                <View style={{width:70}}><Text style={{fontSize:16, fontWeight:'bold'}}>Heure</Text></View>
                <Text style={{fontSize:16}}>{ heureCeremonie }</Text>
              </View> */}
  
              <View style={{flex:1, flexDirection:'row', alignItems:'flex-start'}}>
                <View style={{width:50}}><Icon type='material' name='place' size={20}/></View>
                <View style={{width:70}}><Text style={{fontSize:16, fontWeight:'bold'}}>Depart</Text></View>
                <Text style={{fontSize:16}}>{ lieuDepart  }</Text>
              </View>

              <View style={{flex:1, flexDirection:'row', alignItems:'flex-start'}}>
                <View style={{width:50}}><Icon type='font-awesome-5' name='flag-checkered' size={20}/></View>
                <View style={{width:70}}><Text style={{fontSize:16, fontWeight:'bold'}}>Arrivé</Text></View>
                <Text style={{fontSize:16}}>{ lieuArrive  }</Text>
              </View>
            </View>
          );
      default :
        return null;
    }
  }

  render() {
    const navigation = this.props.navigation;

    const EmptyList = () => (
      <View style={{flex:1, backgroundColor:'#e9e9e9'}}>
        <View style={{justifyContent:'center', alignItems:'center'}}>
          <View style={{padding:20, borderStyle: 'dashed', borderRadius: 25, borderWidth: 1, marginTop:'50%', justifyContent:'center', alignItems:'center'}}>
            <Text style={{fontSize:20}}>Aucune mission n'est planifiée</Text>
          </View>
        </View>
        { this.showActionButton() }
        </View>
    );

    const Item = ({
      idMission,
      ceremonie,
      typeObseques,
      arriveeCorps,
      typeMission,
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
      villeCimetiere,
      typeSepulture,
      ouverture,
      date,
      lieu,
      intitule,
      lieuDepart,
      lieuArrive,
      description,
      observationCeremonie,
      observationCimetiere,
      userMission
    }) => (
        <TouchableOpacity
          style={planningStyles.itemView}
          onPress={() => navigation.navigate('DetailsMission',
          {
            idMission: idMission,
            ceremonie: ceremonie,
            typeObseques: typeObseques,
            arriveeCorps: arriveeCorps,
            typeMission: typeMission,
            heureFermeture: heureFermeture,
            heureMiseEnBiere: heureMiseEnBiere,
            dateMiseBiere: dateMiseBiere,
            lieuMiseBiere: lieuMiseBiere,
            isPolice: isPolice,
            nom: nom,
            prenom: prenom,
            villeCeremonie: villeCeremonie,
            dateCeremonie: dateCeremonie,
            heureCeremonie: heureCeremonie,
            villeCimetiere: villeCimetiere,
            typeSepulture: typeSepulture,
            ouverture: ouverture,
            date: date,
            lieu: lieu,
            lieuDepart: lieuDepart,
            lieuArrive: lieuArrive,
            description: description,
            observationCeremonie: observationCeremonie,
            observationCimetiere:  observationCimetiere,
            userMission: userMission,
          })}>
          <View style={{flex:1, flexDirection:'row', justifyContent:'space-between', backgroundColor:'white', borderTopRightRadius: 15, borderTopLeftRadius: 15, borderBottomRightRadius: 15, borderBottomLeftRadius: 15}}>
            
            <ImgMission typeMission={typeMission} idMission={idMission} date={dateCeremonie || date}/>

              { this.state.isMounted ? this.infoMission(
                      idMission,
                      ceremonie,
                      typeObseques,
                      arriveeCorps,
                      typeMission,
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
                      villeCimetiere,
                      typeSepulture,
                      ouverture,
                      date,
                      lieu,
                      intitule,
                      lieuDepart,
                      lieuArrive,
                      description,
                      observationCeremonie,
                      observationCimetiere,
                      userMission
              ) : null }

          </View>
       </TouchableOpacity>
    );

    const renderItem = ({ item }) => (
      <Item
        idMission = { item.idMission }
        ceremonie = { item.ceremonie }
        typeObseques = { item.typeObseques }
        arriveeCorps = { item.arriveeCorps }
        typeMission = { item.typeMission }
        heureFermeture = { item.heureFermeture }
        heureMiseEnBiere = { item.heureMiseEnBiere }
        dateMiseBiere = { item.dateMiseBiere }
        lieuMiseBiere = { item.lieuMiseBiere }
        isPolice = { item.isPolice }
        nom = { item.nom }
        prenom = { item.prenom }
        villeCeremonie = { item.villeCeremonie }
        dateCeremonie = { item.dateCeremonie }
        heureCeremonie = { item.heureCeremonie }
        villeCimetiere = { item.villeCimetiere }
        typeSepulture = { item.typeSepulture }
        ouverture = { item.ouverture }
        date = { item.date }
        lieu = { item.lieu }
        intitule = { item.intitule }
        lieuDepart = { item.lieuDepart }
        lieuArrive = { item.lieuArrive }
        description = { item.description }
        observationCeremonie = { item.observationCeremonie }
        observationCimetiere = { item.observationCimetiere }
        userMission = { item.userMission }
        />
    );

      if(this.state.isFetching){

        while(this.state.isFetching){
          return(
            <View style={{flex:1, justifyContent:'center', alignSelf:'center', alignItems:'center', textAlign:'center'}}>
              <ActivityIndicator size="large" color="#033664" />
            </View>
          )
        }

      }else{
        if(this.state.listeMissions !== null){
          return(
              <SafeAreaView style={planningStyles.planningContainer}>
                <FlatList
                  ListEmptyComponent={EmptyList}
                  data={this.state.listeMissions}
                  renderItem={renderItem}
                  keyExtractor={(item, index) => {
                            return item.idMission;
                          }}
                  onRefresh={this.getMissions}
                  refreshing={this.state.isFetching}
                />

                { this.showActionButton() }

              </SafeAreaView>
          );
        }else{
          return(
              <EmptyList />
            )
        }


    }
  }
}

const mapStateToProps = (state) => {
  return {
    userInfos: state.userInfos
  };
}
export default connect(mapStateToProps)(Planning);
