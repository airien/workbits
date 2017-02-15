import React, { Component } from 'react';
import { Image,View, ListView } from 'react-native';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Header, Title, Content, Button, Icon, Card, CardItem, Text, Thumbnail, DeckSwiper } from 'native-base';
var menuItems = require('../../data/sidebar.json');
import myTheme from '../../themes/base-theme';
import { openDrawer } from '../../actions/drawer';
var recipes = require('../../data/sourmilk.json');
import styles from './styles';
import Hyperlink from 'react-native-hyperlink'

const {
  replaceAt,
} = actions;

class SourMilk extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipe: 0
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
    this.props.replaceAt('sourmilk', { key: route }, this.props.navigation.key);
  }

renderItems()
{
   return recipes.texts.map((item,index)=>
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
    return (
      <Image key={'image_'+index} style={{ resizeMode: 'cover', width: null, height:150 }} source={ { uri: item.value}} />
    
      );
  }

  else if(item.type === "link"){
    return (<Hyperlink  key={'link'+index} onPress={ url => goToUrl(url) } linkStyle={ { color: '#2980b9', fontSize: 13 } }>
    <Text style={ { fontSize: 12 } }>{item.value}</Text>
  </Hyperlink>);
  }
  else if(item.type === "point")
  {
    return(<Text  key={'point'+index}>{'\u2022 {item.value}'}</Text>);
  }
  else {
    return (<Text key={'text_'+index} style={{ fontSize:12, marginTop:10, marginBottom:10}}>{item.value}</Text>);
  }
}


  render() {
    return (
      <Container theme={myTheme} style={styles.container}>

        <Header>
          <Title>{menuItems.whatisinitforme}</Title>
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

export default connect(mapStateToProps, bindAction)(SourMilk);
