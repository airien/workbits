import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Header, Title, Content, Button, Icon , View, Text} from 'native-base';

import { openDrawer } from '../../actions/drawer';
import styles from './styles';

var Datastore = require('react-native-local-mongodb')
  , db = new Datastore({ filename: 'asyncStorageKey', autoload: true });

var menuItems = require('../../data/sidebar.json');
const {
  replaceAt,
} = actions;

class NHList extends Component {
   constructor(props){
    super(props);
    this.state = {
        dairy:[]
    };
    this.initDb();
  }
 componentWillMount() {
    this.initDb();
  }
  initDb() {
    var self = this;
    // Find all documents in the collection
    db.find({}).sort({ id: 1 }).exec(function (err, docs) {
        self.setState({
          dairy:docs,
          err:err
        });
      self.render();
    });
  }
  clearDb() {
    var self = this;
    db.remove({}, { multi: true }, function (err, numRemoved) { self.setState({
        dairy:[]   
      });
     alert("all gone! "+numRemoved);
    });
  }
  static propTypes = {
    openDrawer: React.PropTypes.func,
    replaceAt: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
  }
 listOfItems(ingr) {

    return ingr.map((data, index) => {
      return (
      <View  key={'view_'+index+data.id}>
       <Text  key={index} >{data.id}. {data.date} - {data.type}</Text>
      </View>
      )
    })}
  replaceAt(route) {
    this.props.replaceAt('dairy', { key: route }, this.props.navigation.key);
  }

  render() {
    return (
      <Container style={styles.container}>
        <Header>
          <Title>{menuItems.dairy}</Title>

          <Button transparent onPress={this.props.openDrawer}>
            <Icon name="ios-menu" />
          </Button>
        </Header>

        <Content padder>


      <View>
      
     {this.listOfItems(this.state.dairy)}
      </View>
      
    <Text>  {this.state.err}</Text>
          <Button block style={styles.mb} onPress={() => this.replaceAt('newitem')}>{menuItems.newitem}</Button>

          <Button block style={styles.mb} onPress={() => this.clearDb()}>Clear</Button>


          
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

export default connect(mapStateToProps, bindAction)(NHList);

