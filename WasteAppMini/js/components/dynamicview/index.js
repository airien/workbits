import React, { Component } from 'react';
import { Image,View, ListView,Linking,BackAndroid } from 'react-native';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';

var menuItems = require('../../data/sidebar.json');
import { Container, Header, Title, Content, Button, Icon, Card, CardItem, Text, Thumbnail, DeckSwiper } from 'native-base';
import { openDrawer } from '../../actions/drawer';
import Hyperlink from 'react-native-hyperlink'
import myTheme from '../../themes/base-theme';
import styles from './styles';
import Images from '../../../assets/images';

const {
  replaceAt,
} = actions;


class DynamicView extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }
    


goToURL(url) 
{
   Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log('Don\'t know how to open URI: ' + url);
      }
    });
  }
renderItem(item, index)
{
  if(item.type === "header")
  {
    return (<Text key={'text_'+index} style={{fontWeight:'bold', fontSize:18, marginTop:10, marginBottom:10}}>{item.value}</Text>);
  }
  else if(item.type === "thumb" ){
    return(<Thumbnail key={'thumb_'+index}  source={ Images[item.value]} />);
  }
  else if(item.type==="icon")
  {
    return <Icon key={'text_'+index} name={item.value} style={{ width: 45, height: 45, justifyContent: 'center' }} />;
  }
   else if(item.type==="image")
  {    
    return (<Image key={'image_'+index} style={{ resizeMode: 'contain', width: null, height:150 }} source={ Images[item.value]}  />);
  }
  else if(item.type === "link"){
    return (<Hyperlink key={'link'+index}  onPress={ url => this.goToURL(url) } linkStyle={ { color: '#2980b9', fontSize: 12 } }>
    <Text style={{ fontSize:12, marginTop:10, marginBottom:10}}>{item.value}</Text>
  </Hyperlink>);
  }
  else if(item.type === "point")
  {
    return(<Text style={{ fontSize:12, marginTop:10, marginBottom:10}} key={'point'+index} >{'\u2022'} {item.value}</Text>);
  }
  else if(item.type === "nav") {
        return(<Button key={'button'+index} block style={styles.mb} onPress={() => this.replaceAt(item.value)}>{menuItems[item.value]}</Button>);
  }
  else {
    return (<Text key={'text_'+index} style={{ fontSize:12, marginTop:5, marginBottom:5}}>{item.value}</Text>);
  }
}
renderItems(listdata)
{
    console.log("got data: "+JSON.stringify(listdata));
   return listdata.map((item,index)=>
  {       
      return this.renderItem(item, index);
  });
}


  replaceAt(route) {
      
     this.props.replaceAt(this.props.name, { key: route }, this.props.navigation.key);
  }
render() {
return (
    <Card style={{padding:10}}>
        {this.renderItems(this.props.data)}
    </Card>
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

export default connect(mapStateToProps, bindAction)(DynamicView);