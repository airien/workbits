import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Header, Title, Content, Button , View, Text, List, ListItem, Image, Icon} from 'native-base';
//import Icon from 'react-native-vector-icons/FontAwesome';
import { openDrawer } from '../../actions/drawer';
import styles from './styles';
import realm from './realm';

import Images from '../../../assets/images';
var menuItems = require('../../data/sidebar.json');
const {
  replaceAt,
} = actions;

class Dairy extends Component {
  
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


  replaceAt(route) {
    this.props.replaceAt('dairy', { key: route }, this.props.navigation.key);
  }
 listOfItems(ingr) {
    return ingr.map((data, index) => {
      return (
      <View  key={'view_'+index+data.id}>
        <List>
              <ListItem style={styles.listItem}>
              <Text style={styles.listText}  key={index} > {data.type.toUpperCase()}  {data.date}</Text>

              <Button style={styles.ikonknapp} onPress={() => this.delete(data.id)}>
              
              <Icon name="ios-checkmark" style={styles.icon} />
              
              </Button>

 
              </ListItem>
          </List>
      </View>
      )
    })}
//             <Button style={styles.ikonknapp} onPress={() => this.delete(data.id)}><Image  style={{ resizeMode: 'contain', height:25, width: 25, padding:20 }} source={ Images.checkmarkgreen} /></Button>
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
     
          <Button block style={styles.mb} onPress={() => this.replaceAt('newitem')}>{menuItems.newItem}</Button>
        <Text>Her kan du registrere melken du har kjøpt. Du kan også angi om du har brukt opp melken. Neste gang du er nødt til å kjøpe melk, kan du sjekke i listen og se hvor mye melk du har. Appen vil også gi deg en påminnelse om at du har en melk som holder på å gå ut på dato, så du husker å drikke den, eller kan bruke den i matlaging eller baking.</Text>
     <View style={{marginTop:20}}>
      {this.listOfItems(this.state.dairy)}
         </View>
        </Content>
      </Container>
    );
  }
}

/**       <Button block style={styles.mb} onPress={() => this.replaceAt('newitem')}>{menuItems.newitem}</Button>
      <View>
     {this.listOfItems(this.state.dairy)}
        </View>
          <Text>  {this.state.err}</Text> */
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

export default connect(mapStateToProps, bindAction)(Dairy);

