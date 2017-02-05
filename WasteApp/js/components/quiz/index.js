
import React, { Component } from 'react';
import {Image} from 'react-native';
import { connect } from 'react-redux';
import { Container, Header, Title, Content, Text, H3, Button, Icon, Card, CardItem, CheckBox } from 'native-base';
import { openDrawer } from '../../actions/drawer';
import myTheme from '../../themes/base-theme';
var menuItems = require('../../data/sidebar.json');
import styles from './styles';
var quizfromfile = require('../../data/quiz.json');
class Quiz extends Component {

  static propTypes = {
    openDrawer: React.PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {quiz : quizfromfile.questions, side: 0, ferdig:false, texts: quizfromfile.texts};
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
    this.setState({quiz : q, side: 0, score:0,ferdig:false});
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

  render() {

   var now = this.state.quiz[this.state.side];
   if(!now)
   {
//feilsitiasjon
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
              <Text> {this.state.side}</Text>      
              <Text>{JSON.stringify(this.state.quiz)}</Text>
            </CardItem> 
          </Content>
          </Container>
      ); 
    }
    var imageSrc;
    if(now.hasOwnProperty("image") )
      imageSrc = now.image;
    var image = <Text></Text>;
    if(imageSrc)
        image = <Image style={{ resizeMode: 'cover', width: null, height:200 }} source={ { uri: imageSrc}} />
      var questions = [];
      var answers = [];
      for(let y = 0; y < now.alternatives.length; y++)
      {
        answers.push(
        <CardItem cardBody key={'Alternative_'+this.state.side+'_'+y}>
          <Text>{now.alternatives[y].answer}</Text>
          <CheckBox checked={now.selected == y} onPress={() => this.toggleCheck(this.state.side,y)}/>
        </CardItem>
        );
      }
      questions.push(
            <Card style={[styles.mb, { flex: 0 }]} key={'QuestionCard_'+this.state.side}>
              <CardItem>
                {image}
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
            button.push(<Button success large style={styles.mb15} onPress={() => this.answer(this.state.score)}>Ferdig!</Button>); 
        }
        else if(this.state.side == 0)
        {
          button.push(<Button success large style={styles.mb15} onPress={() => this.next(this.state.side)}>Neste</Button>);
        }
        else{
          button.push(<Button success large style={styles.mb15} onPress={() => this.next(this.state.side)}>Neste</Button>);
          button.push(<Button success large style={styles.mb15} onPress={() => this.previous(this.state.side)}>Forrige</Button>);
        }
        return (
            <Container theme={myTheme} style={styles.container}>

              <Header>
                <Title>Header</Title>
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
              <Text style={{marginLeft:10,paddingTop:50}}>
                Du fikk {this.state.score} poeng!

              </Text>
              <Text style={{marginLeft:10, paddingBottom:50}}>{this.state.randomtext}</Text>
              <CardItem>
                  <Button success large style={styles.mb15} onPress={() => this.resetState()}>Begynn på nytt</Button> 
              </CardItem>
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
