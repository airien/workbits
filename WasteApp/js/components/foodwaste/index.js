
import React, { Component } from 'react';
import { Image,View, ListView,Linking } from 'react-native';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';

import { Container, Header, Title, Content, Button, Icon, Card, CardItem, Text, Thumbnail, DeckSwiper } from 'native-base';
import { openDrawer } from '../../actions/drawer';
import Hyperlink from 'react-native-hyperlink'
var foodwaste = require('../../data/foodwaste.json');
var menuItems = require('../../data/sidebar.json');
import myTheme from '../../themes/base-theme';
import styles from './styles';
var recipeText = require('../../data/recipetext.json');
import Images from '../../../assets/images';
const {
  replaceAt,
} = actions;

class FoodWaste extends Component {

  static propTypes = {
    openDrawer: React.PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  replaceAt(route) {
    this.props.replaceAt('foodwaste', { key: route }, this.props.navigation.key);
  }

renderItems()
{
   return foodwaste.texts.map((item,index)=>
  {        return  this.renderItem(item, index);
  });
}
renderItem(item, index)
{
  if(item.type === "header")
  {
    return (<Text key={'text_'+index} style={{fontWeight:'bold', fontSize:18, marginTop:10, marginBottom:10}}>{item.value}</Text>);
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
    return (<Hyperlink key={'link'+index}  onPress={ url => this.goToURL(url) } linkStyle={ { color: '#2980b9', fontSize: 14 } }>
    <Text style={ { fontSize: 11 } }>{item.value}</Text>
  </Hyperlink>);
  }
  else if(item.type === "point")
  {
    return(<Text key={'point'+index} >{'\u2022'} {item.value}</Text>);
  }
  else if(item.type === "nav") {
        return(<Button key={'button'+index} block style={styles.mb} onPress={() => this.replaceAt(item.value)}>{menuItems[item.value]}</Button>);
  }
  else {
    return (<Text key={'text_'+index} style={{ fontSize:12, marginTop:10, marginBottom:10}}>{item.value}</Text>);
  }
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

  render() {
    return (
      <Container theme={myTheme} style={styles.container}>

        <Header>
          <Title>{menuItems.foodwaste}</Title>
          <Button transparent onPress={this.props.openDrawer}>
            <Icon name="ios-menu" />
          </Button>
        </Header>

        <Content padder>
        <Card style={{padding:10}}>
          {this.renderItems()}
          </Card>
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

export default connect(mapStateToProps, bindAction)(FoodWaste);
