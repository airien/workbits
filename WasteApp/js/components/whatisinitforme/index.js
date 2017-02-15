
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image,View, ListView } from 'react-native';
import { Container, Header, Title, Content, Text, H3, Button, Icon, Footer, FooterTab , Card } from 'native-base';

import { openDrawer } from '../../actions/drawer';
import myTheme from '../../themes/base-theme';
import styles from './styles';

import Hyperlink from 'react-native-hyperlink'
var whatsinit = require('../../data/whatsinit.json');
var menuItems = require('../../data/sidebar.json');
class WhatIsInItForMe extends Component {
  static propTypes = {
    openDrawer: React.PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
    };
  }
renderItems()
{
   return whatsinit.texts.map((item,index)=>
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
    return (<Hyperlink onPress={ url => goToUrl(url) }>
    <Text style={ { fontSize: 15 } }>{item.value}</Text>
  </Hyperlink>);
  }
  else if(item.type === "point")
  {
    return(<Text>{'\u2022 {item.value}'}</Text>);
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
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
});

export default connect(mapStateToProps, bindAction)(WhatIsInItForMe);
