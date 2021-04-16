import React, { Component } from 'react';
import { FlatList, Button, TouchableWithoutFeedback, TouchableOpacity, Keyboard, View, Text, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';
import { formulaireMissionStyles } from './styles';
import * as firebase from 'firebase';

class Assignation extends Component {
  constructor(props){
    super(props);
    this.state = {
      idMission: this.props.route.params.idMission || null,
      isFetching:false,
      data:null,
      isModalVisible:false,
      userId:null,
      selectUser:[]
    }
    console.log("THIS.PROPS", this.props)
  }

  componentDidMount(){
    this.getUsers();
    this._refreshList = this.props.navigation.addListener('focus', () => {
      this.getUsers();
    });
  }

  getUsers = () => {
    this.setState({isFetching:true});
    const visit = (obj, fn) => {
      const values = Object.values(obj);
      values.forEach(val => val && typeof val === "object" ? visit(val, fn) : fn(val))
    }
    firebase.database()
    .ref('/Utilisateurs/')
    .once('value')
    .then(snapshot => {
      let sortList = Object.values(snapshot.val())
        this.setState({ data: sortList });
        this.setState({ isFetching:false });
    }).catch(err => {
      this.setState({ isFetching:false });
    });
  }

  returnUpper = (text) => {
    if(typeof text === 'string'){
      var newTxt = text.toUpperCase();
      return newTxt
    }
  }

  setUserId(prenom, nom){
    let userId = prenom.charAt(0) + nom;
    userId = userId.toLowerCase();
    this.setState({userId: userId});
  }

  goToNextStep = () => {
    let formattedDateCeremonie;
    let route;
    let prefixe;

    if(this.props.route.params.dateCeremonie === null){
      formattedDateCeremonie = this.props.route.params.dateCremation;
    }else{
      formattedDateCeremonie = this.props.route.params.dateCeremonie
    }

    for(let i=0; i < formattedDateCeremonie.length; i++){
      if(formattedDateCeremonie.includes("/")){
        formattedDateCeremonie = formattedDateCeremonie.replace( "/", "");
      }
    }

    switch(this.props.route.params.typeMission){
      case 'Obsèques':
        route = 'PhotoObseques';
        prefixe = 'O_';
        break;
      case 'Gravure':
        route = 'PhotoGravure';
        prefixe = 'G_';
        break;
      case 'Ouverture':
        route = 'PhotoOuverture';
        prefixe = 'C_';
      case 'Transport':
        route = 'PhotoTransport';
        prefixe = 'T_';
        break;
      case 'Marbrerie':
        route = 'PhotoMarbrerie';
        prefixe = 'M_';
        break;
      default:
        console.log("Erreur")
        break;
    }

    let idMission = prefixe+formattedDateCeremonie+'-'+this.props.route.params.nom;

    this.props.navigation
    .navigate(route,
    {
      idMission: idMission,
      ceremonie: this.props.route.params.ceremonie,
      typeObseques: this.props.route.params.typeObseques,
      arriveeCorps: this.props.route.params.arriveeCorps,
      heureFermeture: this.props.route.params.heureFermeture,
      heureMiseEnBiere: this.props.route.params.heureMiseEnBiere,
      dateMiseBiere: this.props.route.params.dateMiseBiere,
      lieuMiseBiere: this.props.route.params.lieuMiseBiere,
      isPolice:  this.props.route.params.isPolice,
      nom: this.props.route.params.nom,
      prenom:this.props.route.params.prenom,
      villeCeremonie: this.props.route.params.villeCeremonie,
      dateCeremonie: this.props.route.params.dateCeremonie,
      heureCeremonie: this.props.route.params.heureCeremonie,
      observationCeremonie: this.props.route.params.observationCeremonie,
      observationCimetiere: this.props.route.params.observations,
      villeCimetiere: this.props.route.params.villeCimetiere,
      typeSepulture: this.props.route.params.typeSepulture,
      ouverture: this.props.route.params.ouverture,
      userMission: this.state.selectUser,
      dateCremation:this.props.route.params.dateCremation,
      heureCremation:this.props.route.params.heureCremation,
      heureCremationFormattee:this.props.route.params.heureCremationFormattee,
      dateCremationFormattee:this.props.route.params.dateCremationFormattee,
      villeCrematorium: this.props.route.params.villeCrematorium
    })
  };

  selectUser(user){
      let array = this.state.selectUser;
      if(!array.includes(user)){
        array.push(user);
        this.setState({ selectUser: array })
        console.log("ADD", this.state.selectUser);
      }else{
        array = array.filter(item => item !== user)
        this.setState({selectUser: array.filter(item => item !== user)})
      }
  }

  render() {

    const Item = ({nom, prenom}) => (
        <TouchableOpacity>
          <View style={{ backgroundColor:'white', flexDirection:'row', justifyContent:'space-between', alignItems:'center', borderBottomWidth:1, borderBottomColor:'#dcdcdc'}}>
            <View style={{margin:15, flexDirection:'column'}}>
              <Text style={{fontSize:16, fontWeight:'bold'}}>{this.returnUpper(prenom)} {this.returnUpper(nom)}</Text>
            </View>
            <TouchableOpacity style={{ alignItems:'center' }} onPress={() => this.selectUser(prenom)}>
                <Icon color='#033664' reverse={ this.state.selectUser.includes(prenom) ? true : false }
                raised={ true } style={{ margin:2, justifyContent:'center', alignItems: 'center', marginHorizontal:5}}
                type='material' name='check' size={23}/>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      )

      
    const renderItem = ({ item }) => (
        <Item
          nom = { item.nom }
          prenom = { item.prenom }
          role = { item.role }
          telephone = { item.telephone }
          email = { item.email }
          mdp = { item.mdp } />
      );

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

          <View style={formulaireMissionStyles.container}>

            <View style={{justifyContent:'center'}}>
                {/* <Button title='Test' onPress={()=> console.log("TEST", this.state.selectUser)}/> */}

              <View style={{justifyContent:'center', alignItems:'center', marginTop:25, marginBottom:25, marginHorizontal:15}}>
                <Text style={{fontSize:18, fontWeight:'bold', textAlign:'center'}}>Sélectionner le ou les membres de la mission</Text>
              </View>

              <FlatList
                data={this.state.data}
                extraData={this.state.selectUser}
                renderItem={renderItem}
                keyExtractor={(item, index) => {
                            return item.nom;
                        }}
                onRefresh={this.getUsers}
                refreshing={this.state.isFetching}
                />
            </View>

            <TouchableOpacity onPress={() => this.goToNextStep()}
                style={formulaireMissionStyles.buttonForm}>
              <Text style={{fontSize:16, margin:30, color:"white"}}>Valider</Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
    );
  }
}

export default Assignation;
