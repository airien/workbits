
import React, { Component } from 'react';
import { Image } from 'react-native';
import { connect } from 'react-redux';
import { Content, Text, List, ListItem, Icon, View } from 'native-base';
var menuItems = require('../../data/sidebar.json');
import navigateTo from '../../actions/sideBarNav';
import sidebarTheme from './sidebar-theme';
import styles from './style';

const drawerCover = require('../../../img/cows.jpg');

class SideBar extends Component {

  static propTypes = {
    navigateTo: React.PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
      shadowOffsetWidth: 1,
      shadowRadius: 4,
    };
  }

  navigateTo(route) {
    this.props.navigateTo(route, 'home');
  }

  render() {
    return (
      <Content
        theme={sidebarTheme}
        style={styles.sidebar}
      >
        <Image source={drawerCover} style={styles.drawerCover}>

        </Image>
        <List>
          <ListItem button iconLeft onPress={() => this.navigateTo('recipe')} >
            <View style={styles.listItemContainer}>
              <View style={[styles.iconContainer, { backgroundColor: '#0209D8', paddingLeft: 14 }]}>
                <Icon name="ios-phone-portrait-outline" style={styles.sidebarIcon} />
              </View>
              <Text style={styles.text}>{menuItems.recipe}</Text>
            </View>
          </ListItem>
          <ListItem button iconLeft onPress={() => this.navigateTo('newitem')}>
            <View style={styles.listItemContainer}>
              <View style={[styles.iconContainer, { backgroundColor: '#4DCAE0' }]}>
                <Icon name="ios-notifications-outline" style={styles.sidebarIcon} />
              </View>
              <Text style={styles.text}>{menuItems.newitem}</Text>
            </View>
          </ListItem>
          <ListItem button iconLeft onPress={() => this.navigateTo('foodwaste')} >
            <View style={styles.listItemContainer}>
              <View style={[styles.iconContainer, { backgroundColor: '#5cb85c', paddingLeft: 10 }]}>
                <Icon name="md-radio-button-off" style={styles.sidebarIcon} />
              </View>
              <Text style={styles.text}>{menuItems.foodwaste}</Text>
            </View>
          </ListItem>
              <ListItem button iconLeft onPress={() => this.navigateTo('whatisinitforme')} >
            <View style={styles.listItemContainer}>
              <View style={[styles.iconContainer, { backgroundColor: '#877C00' }]}>
                <Icon name="md-radio-button-on" style={styles.sidebarIcon} />
              </View>
              <Text style={styles.text}>{menuItems.whatisinitforme}</Text>
            </View>
          </ListItem>
          <ListItem button iconLeft onPress={() => this.navigateTo('quiz')} >
            <View style={styles.listItemContainer}>
              <View style={[styles.iconContainer, { backgroundColor: '#877CA6' }]}>
                <Icon name="ios-keypad" style={styles.sidebarIcon} />
              </View>
              <Text style={styles.text}>{menuItems.quiz}</Text>
            </View>
          </ListItem>
       
        </List>
      </Content>
    );
  }
}

function bindAction(dispatch) {
  return {
    navigateTo: (route, homeRoute) => dispatch(navigateTo(route, homeRoute)),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
});

export default connect(mapStateToProps, bindAction)(SideBar);
