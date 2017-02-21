
import React, { Component } from 'react';
import {Image} from 'react-native';
import { connect } from 'react-redux';
import { Container, Header, Title, Content, Text, H3, Button, Icon, Card, CardItem, CheckBox, View } from 'native-base';
import { openDrawer } from '../../actions/drawer';
import myTheme from '../../themes/base-theme';

import Images from '../../../assets/images';

var menuItems = require('../../data/sidebar.json');
import styles from './styles';
var quizfromfile = require('../../data/quiz.json');
class Quiz extends Component {

  static propTypes = {
    openDrawer: React.PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {quiz : quizfromfile.questions, side: -1, ferdig:false, texts: quizfromfile.texts};
  }


  componentDidMount() {
    this.resetState();
  }

  componentWillUnmount() {
  }


  resetState() {
    let q = this.state.quiz;
    for(let i = 0; i < q.length; i++){
        q[i].selected = -1;
    } 
    this.setState({quiz : q, side: -1, score:0,ferdig:false});
  }
   toggleCheck(key, alternative) {
    var q = this.state.quiz;
    var s = this.state.score;
    q[key].selected = alternative;
    this.setState(
      {
        quiz: q
      });
  }
previous(current){
       this.setState(
      {
        side: (this.state.side -1) 
      });
    //  this.render();
}
  next(current)
  {
     this.setState(
      {
        side: (this.state.side +1) 
      });
   //   this.render();
  }
  
  answer(quiz)
  {
    var s = 0;
	  for(let i = 0; i < this.state.quiz.length; i++){
      if(this.state.quiz[i].answer == this.state.quiz[i].selected) {
        s++;
      } 
    } 
    var randomIndex = Math.floor(Math.random() * (this.state.texts.length));
        this.setState(
      {
        score: s,
        ferdig:true,
         randomtext : this.state.texts[randomIndex]
      });
  }
  renderImageItems(imageitems)
  {
    var width = imageitems.length % 3 === 0 ? 100 : 150;
    return imageitems.map((item,index)=>
    {       
      return  ( <Image key={'question'+index} style={{ resizeMode: 'contain', height:75, width: width, padding:20, marginTop:10 }} source={ Images[item]} />);
    });
  }
  renderLimit(score) {
    return quizfromfile.texts.map((item,index)=>
    {       //  {"limit":2,"title":"", "text": "Du er en ‘Food student’! Du kan fortsatt lære en del om matsvinn og hvordan forebygge det"},
        return  (score >= item.low && score <= item.limit ? <Text key={'texts_results'+index}>{item.text}</Text>: <Text  key={'question_res'+index} ></Text>);
    });
  }
  renderAlternative(item) {
      if(item.type === "image")
      {
          return  ( <Image key={'alternative'+item.key} style={{ resizeMode: 'cover', width: null, height:150 }} source={ Images[item.answer]} />);
      }
       return (<Text key={'alternative'+item.key}>{item.answer}</Text>);
  }
  render() {

   if(this.state.side == -1)
   {
      return(
            <Container theme={myTheme} style={styles.container}>
              <Header>
                <Title>{menuItems.quiz}</Title>
                <Button transparent onPress={this.props.openDrawer}>
                  <Icon name="ios-menu" />
                </Button>
              </Header>
            <Content>
            <CardItem>
             <Button key="nextbutton" success large style={styles.mb15} onPress={() => this.next(this.state.side)}>Start</Button>
              <Text> {quizfromfile.start}</Text>      
            </CardItem> 
          </Content>
          </Container>
      ); 
    }
  
    var now = this.state.quiz[this.state.side];
    var images = <Text></Text>;    
    if(now.hasOwnProperty("images") )
    {
      images = this.renderImageItems(now.images)
    }
      var questions = [];
      var answers = [];
      for(let y = 0; y < now.alternatives.length; y++)
      {
        answers.push(
        <CardItem cardBody key={'Alternative_'+this.state.side+'_'+y}>
    <View>{this.renderAlternative(now.alternatives[y])}<CheckBox checked={now.selected == y} onPress={() => this.toggleCheck(this.state.side,y)}/></View>
        </CardItem>
        );
      }
      var questions = (
            <Card key={'card_'+this.state.side} style={[styles.mb, { flex: 0 }]} key={'QuestionCard_'+this.state.side}>
              <CardItem>
                <View style={{flex: 1, flexDirection: 'row',flexWrap: 'wrap' , marginBottom:20}}>{images}</View>
                <Text>{now.question}</Text>
              </CardItem>
                {
                  answers
                }
            </Card>
      );


      if(!this.state.ferdig)
      {
        var button = [];
        if(this.state.side == this.state.quiz.length - 1) {
            button.push(<Button key="endbutton" success large style={styles.mb15} onPress={() => this.answer(this.state.score)}>Ferdig!</Button>); 
        }
        else if(this.state.side == 0)
        {
          button.push(<Button key="nextbutton" success large style={styles.mb15} onPress={() => this.next(this.state.side)}>Neste</Button>);
        }
        else{
          button.push(<Button key="nextbutton" success large style={styles.mb15} onPress={() => this.next(this.state.side)}>Neste</Button>);
          button.push(<Button key="prevbutton" success large style={styles.mb15} onPress={() => this.previous(this.state.side)}>Forrige</Button>);
        }
        return (
            <Container theme={myTheme} style={styles.container}>
              <Header>
                <Title>{menuItems.quiz}</Title>
                <Button transparent onPress={this.props.openDrawer}>
                  <Icon name="ios-menu" />
                </Button>
              </Header>
            <Content>
              {questions}
              <CardItem>
                {button}
              </CardItem>
          </Content>
          </Container>
          );
      }    
      else{
       return( <Container theme={myTheme} style={styles.container}>

              <Header>
                <Title>Header</Title>
                <Button transparent onPress={this.props.openDrawer}>
                  <Icon name="ios-menu" />
                </Button>
              </Header>
            <Content>
              <CardItem>
                  <Button success large style={styles.mb15} onPress={() => this.resetState()}>Begynn på nytt</Button> 
              </CardItem>
              <Text style={{marginLeft:10,paddingTop:50}}>
                Du fikk {this.state.score} poeng!
              </Text>
            <View style={{padding:10}}>{this.renderLimit(this.state.score)}</View>
          </Content>
          </Container>);
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

export default connect(mapStateToProps, bindAction)(Quiz);
