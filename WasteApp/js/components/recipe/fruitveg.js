import React, { Component } from 'react';
import { Image,View, ListView, BackAndroid } from 'react-native';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Header, Title, Content, Button, Icon, Card, CardItem, Text, Thumbnail, DeckSwiper } from 'native-base';
var menuItems = require('../../data/sidebar.json');
import myTheme from '../../themes/base-theme';
import { openDrawer } from '../../actions/drawer';
var recipes = require('../../data/fruitveg.json');
var recipeItems = require('../../data/menurecipes.json');
import styles from './styles';
import Hyperlink from 'react-native-hyperlink'
import Images from '../../../assets/images';
import DynamicView from '../dynamicview/';

const {
  replaceAt,
} = actions;

class FruitVeg extends Component {
  static propTypes = {
    openDrawer: React.PropTypes.func,
    replaceAt: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
  }


  replaceAt(route) {
    this.props.replaceAt('fruitveg', { key: route }, this.props.navigation.key);
  }

  render() {
    return (
      <Container theme={myTheme} style={styles.container}>
        <Header>
          <Title>{recipeItems.fruitveg}</Title>
          <Button transparent onPress={this.props.openDrawer}>
            <Icon name="ios-menu" />
          </Button>
        </Header>
        <Content padder>
          <DynamicView data={recipes.texts} name="fruitveg" />
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

export default connect(mapStateToProps, bindAction)(FruitVeg);
