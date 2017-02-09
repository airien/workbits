
import React, { Component } from 'react';
import { Image,View, ListView } from 'react-native';
import { connect } from 'react-redux';

import { Container, Header, Title, Content, Button, Icon, Card, CardItem, Text, Thumbnail, DeckSwiper } from 'native-base';
import { openDrawer } from '../../actions/drawer';
import myTheme from '../../themes/base-theme';
import styles from './styles';

import Images from '../../../assets/images';

class Home extends Component {

  static propTypes = {
    openDrawer: React.PropTypes.func,
  }

render() {
  return(
          
    <Container theme={myTheme} style={styles.container}>

        <Header>
          <Title>Foodsaver</Title>
          <Button transparent onPress={this.props.openDrawer}>
            <Icon name="ios-menu" />
          </Button>
        </Header>

        <Content padder>
        <Image source={Images.frontpage} style={styles.imageContainer}>
          
        </Image>
      </Content>
      </Container>
  );
}
}
function bindActions(dispatch) {
  return {
    openDrawer: () => dispatch(openDrawer()),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
});

export default connect(mapStateToProps, bindActions)(Home);
