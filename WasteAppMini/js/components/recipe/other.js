import React, { Component } from 'react';
import { Image,View, ListView ,BackAndroid} from 'react-native';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Header, Title, Content, Button, Icon, Card, CardItem, Text, Thumbnail, DeckSwiper } from 'native-base';
var menuItems = require('../../data/sidebar.json');
import myTheme from '../../themes/base-theme';
import { openDrawer } from '../../actions/drawer';
var recipes = require('../../data/otherrecipe.json');
var recipeItems = require('../../data/menurecipes.json');
import styles from './styles';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import Images from '../../../assets/images';
import AndroidBackButton from "react-native-android-back-button"

const {
  replaceAt,
} = actions;

class Other extends Component {
  constructor(props) {
    super(props);

    if(!props.recipe)
      props.recipe = 0;
    this.state = {
      recipe: parseInt(props.recipe)
    };
  }
  static propTypes = {
    openDrawer: React.PropTypes.func,
    replaceAt: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
  }
  componentDidMount() {
    var self = this;
    BackAndroid.addEventListener('hardwareBackPress', () => {
    self.replaceAt("recipe");
      return true;
    });
  }

  componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress', () => {
    self.replaceAt("recipe");
      return true;
    });
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
    this.props.replaceAt('other', { key: route }, this.props.navigation.key);
  }

  listOfIngredients(ingr) {

    return ingr.map((data, index) => {
      return (
       <Text key={index}>{data}</Text>
      )
    })

}

renderSwipeys(index)
{
  return recipes.map((item,index)=>
  {
        return  this.renderSwipey(item, index);
  })
}

renderThumb(item) {
  if((typeof item !== 'undefined')&& (typeof item.image !== 'undefined'))
  {
    return <Thumbnail source={ Images[item.image]} />
  }  
    
}
renderImg(item) {
  if((typeof item !== 'undefined')&& (typeof item.image !== 'undefined'))
   {
     return  <Image style={{ resizeMode: 'cover', width: null, height:200 }} source={ Images[item.image]} />
   }
}
renderSwipey(item, index)
{
  if(typeof item === 'undefined')
    return (<Text>Item is null: {index}</Text>);
        
        
        return ( <Card key={index} style={{ elevation: 3 }}>
                                <CardItem>
                              {this.renderThumb(item)}
                          
                                    <Text style={{fontWeight:'bold', fontSize:18, marginTop:10, marginBottom:10}}>{item.name}</Text>
                                </CardItem>
                                <CardItem>
                                {this.renderImg(item)}
                                 
                                </CardItem>
                                <CardItem>
                                {this.listOfIngredients(item.texts)}
                                </CardItem>
                                <CardItem>
                                    <Icon name="ios-heart" style={{ color: '#ED4A6A' }} />
                                    <Text>{item.name}</Text>
                                </CardItem>
                            </Card>)
}
  render() {

   const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 200
    };
return (
      <Container theme={myTheme} style={styles.container}>
 <AndroidBackButton
          onPress={() => {this.replaceAt("recipe"); }}
        />
       <Header>
          <Title>{recipeItems.oppskrift}</Title>
          <Button transparent onPress={this.props.openDrawer}>
            <Icon name="ios-menu" />
          </Button>
        </Header>
                <Content>
                    <GestureRecognizer
        onSwipeLeft={(state) => this.previous()}
        onSwipeRight={(state) => this.next()}
        config={config}
        style={{
          flex: 1,
          backgroundColor: this.state.backgroundColor
        }}
        >
        {this.renderSwipey(recipes[this.state.recipe],this.state.recipe)}
        </GestureRecognizer>

          <Button block style={styles.mb} onPress={() => this.replaceAt('recipe')}>Oversikt</Button>
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

export default connect(mapStateToProps, bindAction)(Other);
