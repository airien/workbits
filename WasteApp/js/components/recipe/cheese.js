import React, { Component } from 'react';
import { Image,View, ListView,BackAndroid } from 'react-native';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Header, Title, Content, Button, Icon, Card, CardItem, Text, Thumbnail, DeckSwiper } from 'native-base';
var menuItems = require('../../data/sidebar.json');
import myTheme from '../../themes/base-theme';
import { openDrawer } from '../../actions/drawer';
var recipes = require('../../data/ost.json');
var recipeItems = require('../../data/menurecipes.json');
import styles from './styles';
import Hyperlink from 'react-native-hyperlink'
import Images from '../../../assets/images';
import DynamicView from '../dynamicview/';
import AndroidBackButton from "react-native-android-back-button"

const {
  replaceAt,
} = actions;

class Cheese extends Component {
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
    this.props.replaceAt('cheese', { key: route }, this.props.navigation.key);
  }

  render() {
    return (
      <Container theme={myTheme} style={styles.container}>
 <AndroidBackButton
          onPress={() => {this.replaceAt("recipe"); }}
        />

        <Header>
          <Title>{recipeItems.cheese}</Title>
          <Button transparent onPress={this.props.openDrawer}>
            <Icon name="ios-menu" />
          </Button>
        </Header>

        <Content padder>
          <DynamicView data={recipes.texts} name="cheese" />
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

export default connect(mapStateToProps, bindAction)(Cheese);
