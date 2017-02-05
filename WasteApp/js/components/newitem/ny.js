import React, { Component, Permissions } from 'react';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Header, Title, Content, Button, Icon , View, Text, Picker} from 'native-base';
import  { 
  Platform,
  PermissionsAndroid
 } from 'react-native';
import { openDrawer } from '../../actions/drawer';
import styles from './styles';


import AnylineOCR from 'anyline-ocr-react-native-module';
import DatePicker from './datepicker';
import Result from './Result';
import config from './config';
import {
  AppRegistry,
  Dimensions,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';

import Moment from 'moment';
import myTheme from '../../themes/base-theme';
var menuItems = require('../../data/sidebar.json');
var Item = Picker.Item;

var Datastore = require('react-native-local-mongodb')
  , db = new Datastore({ filename: 'asyncStorageKey', autoload: true });

const {
  replaceAt,
} = actions;

class NewItem extends Component {
   constructor(props){
    super(props)
    this.state = {
        hasScanned: false,
        result: '',
        day:'',
        month:'',
        year:'', 
        type : '',
        count:0,
        date:Moment(new Date()).format('DD.MM.YYYY')
    };
  }

  static propTypes = {
    openDrawer: React.PropTypes.func,
    replaceAt: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
  }

  replaceAt(route) {
    this.props.replaceAt('newitem', { key: route }, this.props.navigation.key);
  }

  componentDidMount() {
    this.init();
  }
init(){
    var self = this;
    self.setState({
                    count: 0,
                });
        db.count({}, function (err, count) {    
                self.setState({
                    count: count,
                });
        });
}
    openOCR = () => {
        AnylineOCR.setupScanViewWithConfigJson(
            JSON.stringify(config),
            'ANYLINE_OCR',
            this.onResult,
            this.onError
        );
    };
  onValueChange(value: string) {
    this.setState({
      type: value,
    });
  }
    requestCameraPermission = async() => {


        try {
            const granted = await PermissionsAndroid.requestPermission(
                PermissionsAndroid.PERMISSIONS.CAMERA
            );
            alert("result: "+JSON.stringify(granted));
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('Camera permission allowed');
                this.openOCR();
            } else {
                console.log("Camera permission denied");
            }
        } catch (err) {
            console.warn(err);
        }
    };

    hasCameraPermission = async() => {
        try {
            const result = await PermissionsAndroid.checkPermission(
                PermissionsAndroid.PERMISSIONS.CAMERA);
            return result;
        } catch (err) {
            console.warn(err);
        }
    };

    checkCameraPermissionAndOpen = () => {
        this.hasCameraPermission().then((hasCameraPermission) => {
            console.log('hasCameraPermission result is ' + hasCameraPermission);
            if (hasCameraPermission) {
                console.log('Opening OCR directly');
                this.openOCR();
            } else {
                this.requestCameraPermission();
            }
        });
    };

    onResult = (dataString) => {
        const data = JSON.parse(dataString);
        alert(dataString);
        this.setState({
            hasScanned: true,
            day: data.reading
        });
    };

    onError = (error) => {
        console.error(error);
        alert(error);
    };
    saveItem(state){
        var self = this;
      if(state.type && state.date)
      {
        alert("saving item! "+state.count);  
            db.insert({id: state.count, date:state.date, type:state.type}, function (err, newDoc) {   
                self.replaceAt('dairy');
            });


      }
      else{
        alert("fyll inn informasjon!");
      }
    }
    render() {
        const {
            day,month,year, type,date
        } = this.state;

        const platformText = (Platform.OS === 'android') ?
            (<Button style={styles.knapp} onPress={this.checkCameraPermissionAndOpen}><Icon name="ios-camera-outline" style={styles.icon} /></Button>) :
            (<Button style={styles.knapp}  onPress={this.openOCR}><Icon name="ios-camera-outline" style={styles.icon} /></Button>);
            
     
        return (
      <Container theme={myTheme} style={styles.container}>
        <Header>
          <Title>{menuItems.newitem}</Title>

          <Button transparent onPress={this.props.openDrawer}>
            <Icon name="ios-menu" />
          </Button>
        </Header>

        <Content padder>
       

      <View style={styles.knappContainer}>
      {platformText}  
      </View>
      <View style={{marginTop:15, marginBottom:15}}>

      </View>


      <View style={styles.knappContainer}>
        <DatePicker
        style={{width: 200}}
        date={this.state.date}
        mode="date"
        placeholder="Velg dato"
        format="DD.MM.YYYY"
        minDate="2016-01-01"
        confirmBtnText="Ok"
        cancelBtnText="Avbryt"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0
          },
          dateInput: {
            marginLeft: 36
          }
          // ... You can check the source to find the other keys.
        }}
        onDateChange={(date) => {this.setState({date: date})}}
      />

      </View>
      <Picker
      iosHeader="Type"
      mode="dropdown"
      selectedValue={this.state.type}
      onValueChange={this.onValueChange.bind(this)}>
      <Item label="Velg type..." value="" />
      <Item label="Ost" value="ost" />
      <Item label="Melk" value="melk" />
      <Item label="Annet" value="annet" />
      </Picker>

      <View style={styles.knappContainer}>
        <Button style={styles.saveknapp} onPress={() => {this.saveItem(this.state);}}>Lagre</Button>
      </View>
        </Content>
      </Container>

        );
    }
}

function bindAction(dispatch) {
  return {
    openDrawer: () => dispatch(openDrawer()),
    replaceAt: (routeKey, route, key) => dispatch(replaceAt(routeKey, route, key)),
  };
}
const mapStateToProps = state => ({
  navigation: state.cardNavigation,
});

export default connect(mapStateToProps, bindAction)(NewItem);
