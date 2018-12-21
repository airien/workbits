
import React, { Component } from 'react';
import { Image,View, ListView,Linking,BackAndroid } from 'react-native';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Header, Title, Content, Button, Icon, Card, CardItem, Text, Thumbnail, DeckSwiper } from 'native-base';
import { openDrawer } from '../../actions/drawer';
import Hyperlink from 'react-native-hyperlink'
var foodwaste = require('../../data/foodwaste.json');
var menuItems = require('../../data/sidebar.json');
import myTheme from '../../themes/base-theme';
import styles from './styles';
import Images from '../../../assets/images';
import DynamicView from '../dynamicview/';
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
          <DynamicView data={foodwaste.texts} name="foodwaste" />
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
