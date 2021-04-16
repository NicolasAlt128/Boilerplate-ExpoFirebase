import { StyleSheet } from 'react-native';

const planningStyles = StyleSheet.create({
  planningContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor:'#e9e9e9',
  },
  itemView: {
    flexDirection: 'row',
    margin:10,
    borderRadius:20,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 3,
    marginBottom:8,
  },
  nomFamille: {
    marginTop:2,
    fontSize: 18,
    fontWeight:'bold'
  },
  typeMission: {
    marginLeft:5,
    marginTop:2,
    fontSize: 20,
    fontWeight:'bold',
  },
  heure: {
    marginHorizontal:7,
    marginTop:2,
    fontSize: 30,
    fontWeight:'100',
    alignSelf:'flex-end'
  },
  image: {
    width: 95,
    height: 95,
    resizeMode: 'cover',
    borderTopLeftRadius: 15
  },
  typeMission: {
    flex:1,
    flexDirection:'row',
    justifyContent:'center',
    backgroundColor:'#e7874e'
  }
});

const detailsMissionStyles = StyleSheet.create({
  detailsMissionContainer: {
    flexDirection:'column',
  },
  infoBox: {
    flex: 1,
    borderRadius:15,
    backgroundColor: '#d6daef',
    shadowColor: "#000",
    shadowOffset: {
    width: 0,
    height: 2,
  },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom:15,
  },
  image: {
    resizeMode:'cover',
    width: '100%',
    height: 130,
    zIndex: 1,
  },
});

const formulaireMissionStyles = StyleSheet.create({
  container: {
    flex:1,
    flexDirection:'column',
    justifyContent:'space-between',
    backgroundColor:'#e9e9e9'
  },
  containerChoice: {
    flex:1,
    flexDirection:'column',
    justifyContent:'space-between',
    backgroundColor:'#e9e9e9'
  },
  containerO: {
    flex:1,
    flexDirection:'column',
    backgroundColor:'#e9e9e9' 
  },
  form: {
    flexDirection:'row',
    alignItems: 'center',
    height: 35,
    width:'100%',
    borderRadius: 15,
    backgroundColor:'white',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 2,
    marginTop:30
  },
  formMulti: {
    paddingLeft:15,
    height: 150,
    width:'100%',
    borderRadius: 15,
    backgroundColor:'white',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 2,
    marginTop:30,
    marginBottom:30
  },
  formConnection: {
    flexDirection:'row',
    alignItems: 'center',
    height: 35,
    width:'100%',
    borderRadius: 15,
    backgroundColor:'white',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 2,
    marginTop:15
  },
  formText: {
    flexDirection:'row',
    alignItems: 'center',
    height: 35,
    width:'100%',
    marginTop:30
  },
  selectChoice: {
    flexDirection:'row',
    alignItems: 'center',
    justifyContent:'center',
    height: 35,
    width:'100%',
    borderRadius: 15,
    backgroundColor:'#0886f8',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 2,
    marginTop:30
  },
  selectChoice2: {
    flexDirection:'row',
    alignItems: 'center',
    justifyContent:'center',
    height: 35,
    width:'100%',
    borderRadius: 15,
    backgroundColor:'#0886f8',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 2,
  },
  button: {
    paddingTop:15,
    paddingBottom:15,
    flexDirection:'row',
    alignSelf: 'flex-end',
    alignItems:'center',
    justifyContent:'center',
    width:'100%',
    backgroundColor:'#0886f8',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 3,
  },
  addButton: {
    padding:10,
    flexDirection:'row',
    alignSelf: 'center',
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#0886f8',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 3,
  },
  iconButton: {
    width:50,
    justifyContent:'center'
  },
  formTag: {
    flexDirection:'row',
    alignItems: 'center',
    height: 35,
    width:'90%',
    borderRadius: 15,
    backgroundColor:'white',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 2,
    marginTop:30
  },
  formTextarea: {
    paddingLeft:10,
    flexDirection:'row',
    alignItems: 'center',
    width:'100%',
    borderRadius: 2,
    backgroundColor:'white',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 2,
    marginTop:30
  },
  picker: {
    height: 35,
    borderRadius: 2,
    backgroundColor:'white',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 2,
    marginTop:30
  },
  iconForm: {
    width:50,
    // justifyContent:'center'
  },
  buttonForm: {
    padding:10,
    borderRadius:15,
    flexDirection:'row',
    height:40,
    marginHorizontal:60,
    backgroundColor:'#00b300',
    justifyContent:'center',
    alignItems:'center',
    marginBottom:15,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 2
  },
  seConnecterOld: {
    padding:10,
    borderRadius:20,
    flexDirection:'row',
    height:40,
    marginHorizontal:30,
    backgroundColor:'#0886f8',
    justifyContent:'center',
    alignItems:'center',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 2
  },
  seConnecter: {
    padding:10,
    flexDirection:'row',
    height:40,
    marginHorizontal:30,
    backgroundColor:'#0886f8',
    justifyContent:'center',
    alignItems:'center',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 2
  },
  placeholderPicker: {
    fontSize:10,
    height: 50, width: '87%',
    color: "#9e9e9e",  // PLACE HOLDER COLOR
    alignItems:'flex-start',
    flex:1,
    transform: [
     { scaleX: 0.9 },
     { scaleY: 0.9 },
    ]
  },
  pickerItem: {
    height: 50, width: '87%',
    color: "black",  // PLACE HOLDER COLOR
    alignItems:'flex-start',
    flex:1,
    transform: [
     { scaleX: 0.9 },
     { scaleY: 0.9 },
    ]
  }
});

const modalStyles = StyleSheet.create({
  container: {
    borderRadius: 10,
    overflow: 'hidden',
    justifyContent:'space-between',
    backgroundColor:'white',
    alignItems:'center'
  },
  header: {
    fontSize:20,
    fontWeight:'bold',
    margin:15
  },
  text: {
    paddingLeft:15,
    paddingRight:15,
    marginBottom:20,
    alignItems:'center'
  },
  title: {
    fontSize:16
  },
  subTitle: {
    fontSize:16,
    fontStyle:'italic'
  },
  buttonContainer: {
    width:'100%',
    flexDirection:'row',
    marginBottom:10,
    justifyContent:'space-around',
    alignItems:'center'
  },
  buttonOK:{
    paddingTop:10,
    paddingBottom:10,
    paddingLeft:20,
    paddingRight:20,
    flexDirection:'row',
    height:40,
    marginHorizontal:30,
    backgroundColor:'#0886f8',
    justifyContent:'center',
    alignItems:'center',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 2
  },
  buttonYes: {
    borderRadius:15,
    backgroundColor:'#008000',
    paddingTop:10,
    paddingBottom:10,
    paddingLeft:20,
    paddingRight:20,
    flexDirection:'row',
    height:40,
    marginHorizontal:30,
    justifyContent:'center',
    alignItems:'center',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 2
  },
  buttonNo: {
    borderRadius:15,
    backgroundColor:'#DC143C',
    paddingTop:10,
    paddingBottom:10,
    paddingLeft:20,
    paddingRight:20,
    flexDirection:'row',
    height:40,
    marginHorizontal:30,
    justifyContent:'center',
    alignItems:'center',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 2
  }
});

export { planningStyles, detailsMissionStyles, formulaireMissionStyles, modalStyles };
