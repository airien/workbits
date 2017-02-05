
const React = require('react-native');
import  { 
  Platform,
  PermissionsAndroid,
  Dimensions
 } from 'react-native';
const { StyleSheet } = React;

module.exports = StyleSheet.create({
  container: {
    backgroundColor: '#FBFAFA',
   
  },
  knapp: {
    backgroundColor: '#8cc739',
    height:45,
  flex:1,
    margin:10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    paddingTop: (Platform.OS === 'android') ? 25 : 5,
  },
  knappContainer:{flex:1,    flexDirection: 'row',    justifyContent: 'center',    alignItems: 'center',},
  icon:{  height: 45, fontSize: 25,  justifyContent: 'center',  alignItems: 'center', },
  imgContainer: {
    borderColor: '#9B9B9B',
    borderWidth: 1 ,
    justifyContent: 'center',
    alignItems: 'center'
  },
  img: {
    borderRadius: 75,
    width: 150,
    height: 150
  },
  preview: {
    flex: 2,
 //   justifyContent: 'flex-end',
    alignItems: 'center',
    height: 150,
    width: Dimensions.get('window').width -50,
    padding: 50
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  },
  mb: {
    marginBottom: 15,
  },
  saveknapp: {
    backgroundColor: '#31c3e7',
    height:45,
    flex:1,
    margin:10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  listItem: {
  flexDirection: 'row',
  paddingBottom:5
  },
  ikonknapp :{
    backgroundColor:'#ff6666',
    width: 30,
    height:30,
    paddingTop: (Platform.OS === 'android') ? 25 : 5
  },
  listText: {
    fontWeight:'bold',
    flex:1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
