
import React, { Component } from 'react';
import { BackAndroid, StatusBar, NavigationExperimental } from 'react-native';
import { connect } from 'react-redux';
import { Drawer } from 'native-base';
import { actions } from 'react-native-navigation-redux-helpers';

import { closeDrawer } from './actions/drawer';

import Home from './components/home/';
import Recipe from './components/recipe/';
import Cheese from './components/recipe/cheese';

import Other from './components/recipe/other';
import Milk from './components/recipe/milkrecipe';
import SourMilk from './components/recipe/sourmilk';
import Bread from './components/recipe/bread';
import FruitVeg from './components/recipe/fruitveg';
import Meat from './components/recipe/meat';


import Dairy from './components/newitem/index';
import NewItem from './components/newitem/ny';
import FoodWaste from './components/foodwaste/';
import WhatIsInItForMe from './components/whatisinitforme/';
import Quiz from './components/quiz/';

import SplashPage from './components/splashscreen/';
import SideBar from './components/sidebar';
import statusBarColor from './themes/base-theme';

const {
  popRoute,
  replaceAt
} = actions;

const {
  CardStack: NavigationCardStack,
} = NavigationExperimental;

class AppNavigator extends Component {

  static propTypes = {
    drawerState: React.PropTypes.string,
    replaceAt: React.PropTypes.func,
    popRoute: React.PropTypes.func,
    closeDrawer: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
      routes: React.PropTypes.array,
    }),
  }
  replaceAt(current, route) {
    this.props.replaceAt(current, { key: route }, this.props.navigation.key);
  }
  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', () => {
      const routes = this.props.navigation.routes;
      
    if(routes[routes.length - 1].key === "bread" 
    || routes[routes.length - 1].key === "fruitveg"
    || routes[routes.length - 1].key === "meat"
    || routes[routes.length - 1].key === "milk"
    || routes[routes.length - 1].key === "other"
    || routes[routes.length - 1].key === "sourmilk"
    || routes[routes.length - 1].key === "cheese")
    {

    //  this.props.popRoute(this.props.nacigation.key);
      this.replaceAt(routes[routes.length - 1].key,"recipe");
      return true;
    }
    

      if (routes[routes.length - 1].key === 'home') {
        return false;
      }


      this.props.popRoute(this.props.navigation.key);
      return true;
    });
  }

  componentDidUpdate() {
    if (this.props.drawerState === 'opened') {
      this.openDrawer();
    }

    if (this.props.drawerState === 'closed') {
      this._drawer.close();
    }
  }

  popRoute() {
    this.props.popRoute();
  }

  openDrawer() {
    this._drawer.open();
  }

  closeDrawer() {
    if (this.props.drawerState === 'opened') {
      this.props.closeDrawer();
    }
  }

  _renderScene(props) { // eslint-disable-line class-methods-use-this
    switch (props.scene.route.key) {
      case 'splashscreen':
        return <SplashPage />;
      case 'home':
        return <Home />;
      case 'milk':
        return <Milk />;
      case 'recipe':
        return <Recipe />;
      case 'waffles':
        return <Other recipe="0"/>;
      case 'croutons':
        return <Other recipe="3"/>;
      case 'italian':
        return <Other recipe="4"/>;
      case 'smoothie':
        return <Other recipe="5"/>;
      case 'soup':
        return <Other recipe="5"/>;
      case 'other':
        return <Other recipe="0"/>;
      case 'cheese':
        return <Cheese />;
      case 'sourmilk':
        return <SourMilk />;
      case 'bread':
        return <Bread />;
      case 'fruitveg':
        return <FruitVeg />;
      case 'meat':
        return <Meat />;
      case 'dairy':
        return <Dairy />;
      case 'newitem':
        return <NewItem />;
      case 'foodwaste':
        return <FoodWaste />;
      case 'whatisinitforme':
        return <WhatIsInItForMe />;
      case 'quiz':
        return <Quiz />;
      default :
        return <Home />;
    }
  }

  render() {
    return (
      <Drawer
        ref={(ref) => { this._drawer = ref; }}
        type="overlay"
        tweenDuration={150}
        content={<SideBar navigator={this._navigator} />}
        tapToClose
        acceptPan={false}
        onClose={() => this.closeDrawer()}
        openDrawerOffset={0.2}
        panCloseMask={0.2}
        styles={{
          drawer: {
            shadowColor: '#000000',
            shadowOpacity: 0.8,
            shadowRadius: 3,
          },
        }}
        tweenHandler={(ratio) => {  // eslint-disable-line
          return {
            drawer: { shadowRadius: ratio < 0.2 ? ratio * 5 * 5 : 5 },
            main: {
              opacity: (2 - ratio) / 2,
            },
          };
        }}
        negotiatePan
      >
        <StatusBar
          backgroundColor={statusBarColor.statusBarColor}
          barStyle="default"
        />
        <NavigationCardStack
          navigationState={this.props.navigation}
          renderOverlay={this._renderOverlay}
          renderScene={this._renderScene}
        />
      </Drawer>
    );
  }
}

const bindAction = dispatch => ({
  closeDrawer: () => dispatch(closeDrawer()),
  popRoute: key => dispatch(popRoute(key)), 
  replaceAt: (routeKey, route, key) => dispatch(replaceAt(routeKey, route, key))
});

const mapStateToProps = state => ({
  drawerState: state.drawer.drawerState,
  navigation: state.cardNavigation,
});

export default connect(mapStateToProps, bindAction)(AppNavigator);
