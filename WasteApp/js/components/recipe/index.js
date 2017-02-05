import React, { Component } from 'react';

import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Header, Title, Content, Button, Icon, Text } from 'native-base';
var recipeText = require('../../data/recipetext.json');
var menuItems = require('../../data/sidebar.json');
import styles from './styles';
import myTheme from '../../themes/base-theme';
import { openDrawer } from '../../actions/drawer';

const {
  replaceAt,
} = actions;

class Recipe extends Component {
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

  next()
  {
    var s;
    if(this.state.recipe=== recipes.length-1)
      s = 0;
    else 
      s = this.state.recipe+1;
       this.setState({recipe :s});
  }
  previous(){
    var s;
     if(this.state.recipe === 0)
      s= recipes.length-1;
    else 
      s = this.state.recipe-1;

       this.setState({recipe :s});
  }

  replaceAt(route) {
    this.props.replaceAt('recipe', { key: route }, this.props.navigation.key);
  }
  render() {


return (
      <Container theme={myTheme} style={styles.container}>
        <Header>
          <Title>{menuItems.recipe}</Title>

          <Button transparent onPress={this.props.openDrawer}>
            <Icon name="ios-menu" />
          </Button>
        </Header>

        <Content padder>
        <Text style={{paddingBottom:20}}>{recipeText.text}</Text>
          <Button block style={styles.melkeknapp} onPress={() => this.replaceAt('milk')}>Melk</Button>
          <Button block style={styles.osteknapp} onPress={() => this.replaceAt('milk')}>Ost</Button>
          <Button block style={styles.andreknapp} onPress={() => this.replaceAt('milk')}>Andre</Button>
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

export default connect(mapStateToProps, bindAction)(Recipe);
