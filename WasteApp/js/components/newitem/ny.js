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
import schema from './realm';
import DatePicker from './datepicker';
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
var PushNotification = require('react-native-push-notification');
import realm from './realm';

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
    var count = realm.objects('Dairy').length
    self.setState({
                    count: count,
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

        this.openOCR();
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
        alert("boo");
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
        if(dataString.length > 7)
        {
     
            var first = dataString.substring(0,1);
            var second = dataString.substring(2,3);
            var third = dataString.substring(6,7);
            this.setState({
                hasScanned: true,
                date: first + '.'+second+'.'+'20'+third
            });
        }         
    
    };

    writeToDb(state){
        realm.write(() => {
            var i = realm.objects('Dairy').length;
            let item = realm.create('Dairy', {id: i, type: state.type, date: state.date});
        });
    }

    onError = (error) => {
        console.error(error);
        alert(error);
    };
    saveItem(state)
    {
      var self = this;
      if(state.type && state.date)
      {
        if(state.date.length === 10)
        {
            var now = new Date();
            var first = parseInt(state.date.substring(0,2));
            var second = parseInt(state.date.substring(3,5))-1;
            var third = parseInt(state.date.substring(6,10));
            var date = new Date();
            date.setDate(first);
            date.setMonth(second);
            date.setFullYear(third,second,first);
            date.setHours(now.getHours());
            date.setMinutes(now.getMinutes());
            date.setSeconds(now.getSeconds()+5);
          //  alert(date.toLocaleString());
            
            PushNotification.localNotificationSchedule({
                id:state.id,
                type:state.type,
                message: "Din "+state.type+" holder på å gå ut!", // (required)
                date: date
            });
        }
        self.writeToDb(state);
         self.replaceAt('dairy');
      }
      else{
        alert("fyll inn informasjon!");
      }
    }
    render() {
        const {
            day,month,year, type,date
        } = this.state;

        return (
      <Container theme={myTheme} style={styles.container}>
        <Header>
          <Title>{menuItems.newitem}</Title>

          <Button transparent onPress={this.props.openDrawer}>
            <Icon name="ios-menu" />
          </Button>
        </Header>

        <Content padder>

      <View style={{marginTop:15, marginBottom:15}}>

      </View>


      <View style={styles.knappContainer}>
        <DatePicker
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
      <Item label="Melk" value="melk" />
      <Item label="Yoghurt" value="yoghurt" />
      <Item label="Fløte" value="fløte" />
      <Item label="Rømme" value="rømme" />
      <Item label="Ost" value="ost" />
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

 PushNotification.configure({
    // (optional) Called when Token is generated (iOS and Android)
    onRegister: function(token) {
        console.log( 'TOKEN:', token );
    },

    // (required) Called when a remote or local notification is opened or received
    onNotification: function(notification) {
        //alert("notification: "+ JSON.stringify(notification) )
      //  dispatch(replaceAt("newitem", { key: "milk"}, "newitem"));//{ key: route }, this.props.navigation.key
        replaceAt('newitem', { key: notification.type.toLowerCase() }, "newitem");
        console.log( 'NOTIFICATION:', JSON.stringify(notification) );
    },

    // ANDROID ONLY: GCM Sender ID (optional - not required for local notifications, but is need to receive remote push notifications) 
    senderID: "YOUR GCM SENDER ID",

    // IOS ONLY (optional): default: all - Permissions to register.
    permissions: {
        alert: true,
        badge: true,
        sound: true
    },

    // Should the initial notification be popped automatically
    // default: true
    popInitialNotification: true,

    /**
      * (optional) default: true
      * - Specified if permissions (ios) and token (android and ios) will requested or not,
      * - if not, you must call PushNotificationsHandler.requestPermissions() later
      */
    requestPermissions: true,
});

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

