/**
 * ./index.js
 * @author  Jonathan Palma <tanpalma04@gmail.com> 
 */
'use strict';
import { connect } from 'react-redux';
import { Container, Header, Title, Content, Icon, Picker } from 'native-base';
import { openDrawer } from '../../actions/drawer';
//import styles from './styles';
import React, { Component } from 'react';
import RNTesseractOcr from 'react-native-tesseract-ocr';

import {
  AppRegistry,
  Dimensions,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import Camera from 'react-native-camera';

class NewItem extends Component {
  
  constructor(props, context){
    super(props, context);
    this.state = { ocrResult: null , update: null}; 
}

  

  static propTypes = {
    openDrawer: React.PropTypes.func,
  }


  replaceAt(route) {
    this.props.replaceAt('newitem', { key: route }, this.props.navigation.key);
  }

  takePicture() {
    this.camera.capture()
      .then((data) => {
        console.log(data)
        this.setState({ update: JSON.stringify(data) });
      RNTesseractOcr.startOcr(data.path, "LANG_SWEDISH")
  .then((result) => {
            this.setState({ ocrResult: result });
            console.log("OCR Result: ", result);
  })
  .catch((err) => {

    this.setState({ update: "OCR Error: " + err });
    console.log("OCR Error: ", err);
  })
  .done();    
    })
      .catch(err => {
    
      this.setState({ update: "OCR Error: " + err });
      console.error(err)
    });
  }



  render() {
    return(
      <View style={styles.container}>
   

        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}>
          <Text style={styles.capture} onPress={this.takePicture.bind(this)}>[CAPTURE]</Text>
        </Camera>

        <Text>OCR Result: {this.state.ocrResult}</Text>


        <Text>Status: {this.state.update}</Text>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
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
  }
});

function bindAction(dispatch) {
  return {
    openDrawer: () => dispatch(openDrawer()),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
});

export default connect(mapStateToProps, bindAction)(NewItem);

