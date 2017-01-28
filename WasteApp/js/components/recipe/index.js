import React, { Component } from 'react';
import { Image } from 'react-native';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Header, Title, Content, Button, Icon, Card, CardItem, Text, Thumbnail } from 'native-base';
var recipes = require('../../data/recipe.json');
var menuItems = require('../../data/sidebar.json');
import styles from './styles';

import { openDrawer } from '../../actions/drawer';
const logo = require('../../../img/cowlogo.png');

   const cardImage = require('../../../img/Milk-Tart2.jpg');

const {
  replaceAt,
} = actions;


class Recipe extends Component {

  static propTypes = {
    openDrawer: React.PropTypes.func,
  }

  replaceAt(route) {
    this.props.replaceAt('recipe', { key: route }, this.props.navigation.key);
  }

    render() {
	var recipeList = [];

	for(let i = 0; i < recipes.length; i++){
    var textList = [];
    for(let y = 0; y < recipes[i].texts.length; y++)
    {
      textList.push(<Text key="{i}_{y}">{recipes[i].texts[y]}</Text>)
    }
   var imageSrc = recipes[i].image;
    var recipe = recipes[i];
		recipeList.push(
          <Card style={[styles.mb, { flex: 0 }]} key={'card_'+i}>
            <CardItem>
              <Text>{recipe.name}</Text>
            </CardItem>
            <CardItem cardBody>
              <Image style={{ resizeMode: 'cover', width: null, height:200 }} source={ { uri: imageSrc}} />
              {
                textList 
              }
              <Button transparent style={{ marginLeft: -7 }} textStyle={{ color: '#87838B' }}>
                <Icon name="logo-github" />
                <Text>{recipe.points} stars</Text>
              </Button>
            </CardItem>
          </Card>
		)
	}

    return (
    <Container style={styles.container}>
   
       <Header>
          <Title>{menuItems.recipe}</Title>
          <Button transparent onPress={this.props.openDrawer}>
            <Icon name="ios-menu" />
          </Button>
        </Header>

        <Content padder>
        <Text>Recipes</Text>
        {recipeList}

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

export default connect(mapStateToProps, bindAction)(Recipe);
