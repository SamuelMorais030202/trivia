import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import fetchApi from '../utils/fetchAPi';
import Header from '../components/Header';
import '../App.css';

import { actionScorePlayer } from '../redux/actions';

class Game extends React.Component {
  state = {
    questions: [],
    counter: 0,
    isCorrect: null,
    seconds: 30,
    timeOver: false,
    level: 0,
  };

  // componentDidMount() {
  // this.handleMount();
  /* this.timer(); */
  /* const number = 1000;
    this.interval = setInterval(() => {
      this.setState((prevState) => ({
        seconds: prevState.seconds - 1,
      }));
    }, number);
  } */
  componentDidMount() {
    this.handleMount();
    this.decreaseCounter();
  }

  componentDidUpdate() {
    this.stopCountdown();
  }

  /* timer = () => {
    const number = 1000;
    this.interval = setInterval(() => {
      this.setState((prevState) => ({
        seconds: prevState.seconds - 1,
      }));
    }, number);
  }; */
  decreaseCounter = () => {
    const interval = 1000;
    this.interval = setInterval(() => {
      const { seconds } = this.state;
      if (seconds > 0) {
        this.setState((prevState) => ({ seconds: prevState.seconds - 1 }));
      } else {
        this.setState({
          timeOver: true,
        });
      }
    }, interval);
  };

  shuffledAnswers = (corret, incorret) => {
    const array = [corret, ...incorret];
    const shuffleNumber = 0.5;
    const shuffled = array.sort(() => Math.random() - shuffleNumber);
    return shuffled;
  };

  stopCountdown = () => {
    const { timeOver } = this.state;
    if (timeOver === true) {
      clearInterval(this.interval);
    }
  };

  handleMount = async () => {
    const num = 3;
    const { history } = this.props;
    const token = localStorage.getItem('token');
    const URL = `https://opentdb.com/api.php?amount=5&token=${token}`;
    const getQuestions = await fetchApi(URL);
    const shuffledResults = getQuestions.results.map((result) => {
      const answers = this.shuffledAnswers(
        result.correct_answer,
        result.incorrect_answers,
      );
      return { ...result, answers };
    });
    if (getQuestions.response_code === num) {
      localStorage.removeItem(token);
      history.push('/');
    } else {
      this.setState({
        questions: shuffledResults,
      });
    }
  };

  playerScore = async (difficulty) => {
    const { dispatch } = this.props;
    const levelValue = difficulty;
    if (levelValue === 'hard') await this.setState({ level: 3 });
    if (levelValue === 'medium') await this.setState({ level: 2 });
    if (levelValue === 'easy') await this.setState({ level: 1 });
    const { level, seconds } = this.state;
    const num = 10;
    const number = level > 0 ? num : 0;
    const calculation = number + (level * seconds);
    dispatch(actionScorePlayer(calculation));
  };

  handleAnswerColors = ({ target }, difficulty) => {
    this.playerScore(difficulty);
    if (target.className === 'correct') {
      this.setState({ isCorrect: true });
    }
    if (target.className === 'wrong') {
      this.setState({ isCorrect: false });
    }
  };

  render() {
    const { questions, counter, isCorrect, seconds } = this.state;
    return (
      <>
        <Header />
        <form>
          {questions.map((question, index) => index === counter && (
            <div key={ question.category }>
              <h2 data-testid="question-category">
                { question.category}
              </h2>
              <h3 data-testid="question-text">
                { question.question}
              </h3>
              <h1>
                {seconds}
                {' '}
                seconds left
              </h1>
              <div data-testid="answer-options">
                {question.correct_answer
                  && question.answers.map((answer, i) => (
                    answer === question.correct_answer ? (
                      <button
                        className="correct"
                        key={ answer }
                        type="button"
                        data-testid="correct-answer"
                        onClick={ (event) => this
                          .handleAnswerColors(event, question.difficulty) }
                        style={ isCorrect && { border: '3px solid rgb(6, 240, 15)' } }
                        disabled={ seconds <= 0 }
                      >
                        {answer}
                      </button>
                    ) : (
                      <button
                        className="correct"
                        key={ answer }
                        type="button"
                        data-testid={ `wrong-answer-${i}` }
                        onClick={ (event) => this.handleAnswerColors(event) }
                        style={ isCorrect && { border: '3px solid red' } }
                        disabled={ seconds <= 0 }
                      >
                        {answer}
                      </button>
                    )
                  ))}
              </div>
            </div>
          ))}
        </form>
      </>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Game);
