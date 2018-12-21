
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image,View, ListView } from 'react-native';
import { Container, Header, CardItem,Thumbnail,Title, Content, Text, H3, Button, Icon, Footer, FooterTab , Card, Picker } from 'native-base';

var Item = Picker.Item;
import { openDrawer } from '../../actions/drawer';
import myTheme from '../../themes/base-theme';
import styles from './styles';

import Images from '../../../assets/images';
import DynamicView from '../dynamicview/';
import Hyperlink from 'react-native-hyperlink'
var whatsinit = require('../../data/whatsinit.json');
var menuItems = require('../../data/sidebar.json');
class WhatIsInItForMe extends Component {
  static propTypes = {
    openDrawer: React.PropTypes.func,
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
          <DynamicView data={whatsinit.texts} name="foodwaste" />
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
