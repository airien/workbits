
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image,View, ListView } from 'react-native';
import { Container, Header, CardItem,Thumbnail,Title, Content, Text, H3, Button, Icon, Footer, FooterTab , Card, Picker } from 'native-base';

var Item = Picker.Item;
import { openDrawer } from '../../actions/drawer';
import myTheme from '../../themes/base-theme';
import styles from './styles';

import Images from '../../../assets/images';
import DynamicView from '../dynamicview/';
import Hyperlink from 'react-native-hyperlink'
var whatsinit = require('../../data/whatsinit.json');
var menuItems = require('../../data/sidebar.json');
class WhatIsInItForMe extends Component {
  static propTypes = {
    openDrawer: React.PropTypes.func,
  }

 constructor(props){
    super(props)
    this.state = {
        resultwater: 0,
        resultco2: 0,
        resultcost: 0,
        resultcar:0,
        type : '',
        times: 0,
        count:0
    };
  }

  componentDidMount() {
    this.init();
  }
  init(){
    this.setState({
        resultwater: 0,
        resultco2: 0,
        resultcar:0,
        resultcost: 0,
        type : '',
        times: 0,
        count:0
    });
}

calculateResultCost(times,type)
{
  if(!times || !type)
  return 0;
  var vann = 0;
  switch(type) {
    case "melk":
    vann = 102 * times;
    break;
    case "yoghurt":
    vann = 90 * times;
    break;
    case "fløte":
    vann = 102 * times;
    break;
    case "rømme":
    vann = 60 * times;
    break;
    case "ost":
    vann = 144 * times;
    break;
  }
  return vann;
}
calculateResultWater(times,type)
{
  if(!times || !type)
  return 0;
  var vann = 0;
  switch(type) {
    case "melk":
    vann = 6120;
    break;
    case "yoghurt":
    vann = 8568;
    break;
    case "fløte":
    vann = 12852;
    break;
    case "rømme":
    vann = 5141;
    break;
    case "ost":
    vann = 4767;
    break;
  }
  return vann;
}
calculateResultco2(times,type)
{
  if(!times || !type)
  return 0;
  var co2 = 0;
  switch(type) {
    case "melk":
      co2= 7.2*times;
    break;
    case "yoghurt":
      co2= 6*times;
    break;
    case "fløte":
      co2= 14.4*times;
    break;
    case "rømme":
      co2= 3.6*times;
    break;
    case "ost":
      co2= 13.2*times;
    break;
  }
  return co2;
}
calculateResultcar(times,type)
{
  if(!times || !type)
  return 0;
  var bil = 0;
  switch(type) {
    case "melk":
    bil = 36;
    break;
    case "yoghurt":
    bil = 30;
    break;
    case "fløte":
    bil = 72;
    break;
    case "rømme":
    bil = 18;
    break;
    case "ost":
    bil = 66;
    break;
  }
  return bil;
}

  onTypeValueChange(value: string) {
    this.setState({
      type: value,
      resultWater: this.calculateResultWater(this.state.times,value),
      resultco2: this.calculateResultco2(this.state.times,value),
      resultcar: this.calculateResultcar(this.state.times,value),
      resultcost: this.calculateResultCost(this.state.times,value)
    });
  }
  onTimesValueChange(value: int) {
    this.setState({
      times: value,
      resultWater: this.calculateResultWater(value,this.state.type),
      resultco2: this.calculateResultco2(value,this.state.type),
      resultcar: this.calculateResultcar(value,this.state.type),
      resultcost: this.calculateResultCost(value,this.state.type)
    });
  }
  render() {
    return (
      <Container theme={myTheme} style={styles.container}>

        <Header>
          <Title>{menuItems.whatisinitforme}</Title>
          <Button transparent onPress={this.props.openDrawer}>
            <Icon name="ios-menu" />
          </Button>
        </Header>

        <Content padder>
      
    <Card style={{padding:10}}>
    <Text key={'text_'+0} style={{fontWeight:'bold', fontSize:18, marginTop:10, marginBottom:2}}>Hvor mye kan due spare hvis du kaster mindre mat?</Text>
   <Text key={'text_'+1} style={{ fontSize:12}}>Vil du vite hvor mye du kan spare hvis du kaster mindre mat, både med tanke på personlig økonomi og miljøet? Kalkulatoren nedenfor hjelper deg å se hvilke gevinster du kan få av å ikke kaste mat. Fyll ut hvor mange ganger i måneden du er nødt å kaste disse produktene (melk, yoghurt, fløte..). Kalkulatoren gjør resten av jobben!*</Text>
   
    <Text>Jeg kaster</Text>
              <Picker
      iosHeader="Type"
      mode="dropdown"
      selectedValue={this.state.type}
      onValueChange={this.onTypeValueChange.bind(this)}>
      <Item label="Velg type..." value="" />
      <Item label="Melk" value="melk" />
      <Item label="Yoghurt" value="yoghurt" />
      <Item label="Fløte" value="fløte" />
      <Item label="Rømme" value="rømme" />
      <Item label="Ost" value="ost" />
      </Picker>
          <Text>Jeg kaster</Text>
              <Picker
      iosHeader="Type"
      mode="dropdown"
      selectedValue={this.state.times}
      onValueChange={this.onTimesValueChange.bind(this)}>
      <Item label="Velg antall ganger..." value="" />
      <Item label="1" value="1" />
      <Item label="2" value="2" />
      <Item label="3" value="3" />
      <Item label="4" value="4" />
      <Item label="5" value="5" />
      </Picker>
      {this.renderResultCost()}
      {this.renderResultCo2Water()}
      {this.renderResultCar()}
      <Text style={{ fontSize:10}}>*Standard pakkestørrelse for produktet. Med antagelse om at ½ av produktet blir kastet.</Text>
         <Text style={{ fontSize:10}}>Kilder: University of Wisconsin; Institution of Mechanical Engineers; Sorgüven, E., & Özilgen, M.; shrinkthatfootprint.com</Text>
   </Card>
          </Content>
      </Container>
    );
  }
  renderResultCost(){
    if(this.state.resultcost){
      return(<Text style={{ fontSize:12}}>Hvis du unngår å kaste dette produktet så ofte, kan du spare {this.state.resultcost} kroner i året</Text>);
    }
    else{
      return(<Text style={{ fontSize:12}}>Hvis du unngår å kaste dette produktet så ofte, kan du spare ... kroner i året</Text>);
    }
  }
  renderResultCo2Water(){
    if(this.state.resultcost){
      return( 
        <CardItem>
        <Thumbnail source={ Images.greenleaf} />
        <Text style={{ fontSize:12}}>og bidra til å forhindre {this.state.resultco2} kg C02 ekv. og</Text>
        <Thumbnail source={ Images.waterdrop} />
        <Text style={{ fontSize:12}}> {this.state.resultWater} liter vann i året</Text>
        </CardItem> );
    }
    else{        
        return (
          <CardItem>
        <Thumbnail source={ Images.greenleaf} />
        <Text style={{ fontSize:12}}>og bidra til å forhindre ... kg C02 ekv. og</Text>
        <Thumbnail source={ Images.waterdrop} />
        <Text style={{ fontSize:12}}> ... liter vann i året</Text>
        </CardItem> );
    }
  }
    renderResultCar(){
    if(this.state.resultcost){
      return(<Text style={{ fontSize:12}}>Det tilsvarer å kjøre {this.state.resultcar} kilometer med bil.</Text>);
    }
    else{
      return(<Text style={{ fontSize:12}}>Det tilsvarer å kjøre ... kilometer med bil.</Text>);
    }
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

export default connect(mapStateToProps, bindAction)(WhatIsInItForMe);
