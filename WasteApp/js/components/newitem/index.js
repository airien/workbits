import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Header, Title, Content, Button, Icon , View, Text, List, ListItem} from 'native-base';

import { openDrawer } from '../../actions/drawer';
import styles from './styles';
import realm from './realm';

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
  }
 componentWillMount() {
    this.initDb();
  }
  initDb() {
    var self = this;
    // Find all documents in the collection
    let dairyItems = realm.objects('Dairy');

    // Sort Hondas by mileage
    let sortedDairyItems = dairyItems.sorted('id');
    self.setState({
      dairy:sortedDairyItems
    });
  }
  clearDb() {
      var self = this;
      realm.write(() => {
          let allBooks = realm.objects('Dairy');
          realm.delete(allBooks); // Deletes all books
          alert("all gone! "+allBooks.length);
          self.initDb() 
      });
  }
  delete(id)
  {
    var self = this;
      if(id || id === 0)
      {
            realm.write(() => {
              let item = realm.objects('Dairy').filtered('id = "'+id+'"');
              realm.delete(item); // Deletes all books
              self.initDb() 
            });
      }      

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
        <List>
              <ListItem style={styles.listItem}>
              <Text style={styles.listText}  key={index} > {data.type.toUpperCase()}  {data.date}</Text>
              <Button style={styles.ikonknapp} onPress={() => this.delete(data.id)}><Icon name="ios-trash" style={styles.icon} /></Button>
              </ListItem>
          </List>
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

          <Button block style={styles.mb} onPress={() => this.replaceAt('newitem')}>{menuItems.newitem}</Button>

      <View>
      
     {this.listOfItems(this.state.dairy)}
      </View>
      
    <Text>  {this.state.err}</Text>



          
        </Content>
      </Container>
    );
  }
}
//<Button block style={styles.mb} onPress={() => this.clearDb()}>Clear</Button>
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

