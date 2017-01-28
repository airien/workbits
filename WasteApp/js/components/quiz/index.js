
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Header, Title, Content, Text, H3, Button, Icon, Card, CardItem, CheckBox } from 'native-base';

import { openDrawer } from '../../actions/drawer';
import myTheme from '../../themes/base-theme';
import styles from './styles';
var quizfromfile = require('../../data/quiz.json');
class Quiz extends Component {

  static propTypes = {
    openDrawer: React.PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {quiz : quizfromfile};
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

  answer(quiz)
  {
    var s = 0;
	for(let i = 0; i < this.state.quiz.length; i++){
    if(this.state.quiz[i].answer == this.state.quiz[i].selected) {
      s++;
    } 
  }
    alert("Your score: "+s);
  }

  render() {
  var questions = [];
	for(let i = 0; i < this.state.quiz.length; i++){
    var answers = [];
    for(let y = 0; y < this.state.quiz[i].alternatives.length; y++)
    {
      answers.push(
      <CardItem cardBody key={'Alternative_'+i+'_'+y}>
        <Text>{this.state.quiz[i].alternatives[y].answer}</Text>
        <CheckBox checked={this.state.quiz[i].selected == y} onPress={() => this.toggleCheck(i,y)}/>
      </CardItem>
      );
    }
    questions.push(
          <Card style={[styles.mb, { flex: 0 }]} key={'QuestionCard_'+i}>
            <CardItem>
              <Text>{this.state.quiz[i].question}</Text>
            </CardItem>
              {
                answers
              }
          </Card>
      
    );
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
              <Button success large style={styles.mb15} onPress={() => this.answer(this.state.score)}> Finish Quiz</Button>
            </CardItem>
    </Content>
    </Container>
    );
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
