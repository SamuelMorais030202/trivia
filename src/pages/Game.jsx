import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import fetchApi from '../utils/fetchAPi';
import Header from '../components/Header';
import '../App.css';
import { actionScorePlayer, actionSetAssertions } from '../redux/actions';
import './style/Game.css';
import logo from '../images/trivia.png';

const MAX_QUESTIONS = 5;
const INTERVAL = 1000;
class Game extends React.Component {
  state = {
    questions: [],
    counter: 0,
    answered: null,
    seconds: 30,
    timeOver: false,
    level: 0,
    disableBtn: false,
    assertions: 0,
    nextButton: false,
  };

  componentDidMount() {
    this.handleMount();
    this.decreaseCounter();
  }

  componentDidUpdate() {
    const { seconds, nextButton } = this.state;
    if (seconds <= 0 || nextButton) { this.stopCountdown(); }
  }

  decreaseCounter = () => {
    this.interval = setInterval(() => {
      const { seconds } = this.state;
      this.setState((prevState) => ({ seconds: prevState.seconds - 1 }));
      if (seconds === 0) {
        this.setState({
          timeOver: true,
        });
      }
    }, INTERVAL);
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

  playerScore = async (difficulty, correct, answer) => {
    const { dispatch } = this.props;
    const correctAnswer = answer;
    const currentAnswer = correct;
    const { assertions } = this.state;
    if ((currentAnswer && correctAnswer !== undefined)
    && currentAnswer === correctAnswer) {
      dispatch(actionSetAssertions(assertions + 1));
    }
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

  handleAnswerColors = (difficulty, correct, answer) => {
    this.playerScore(difficulty, correct, answer);
    this.setState({ disableBtn: true });
    this.setState({ timeOver: true });
    this.setState({ answered: true });
    this.setState({
      nextButton: true,
    });
  };

  nextQuestion = () => {
    this.setState({
      seconds: 30,
      disableBtn: false,
      answered: null,
      level: 0,
    });
    this.decreaseCounter();
    this.setState({
      nextButton: false,
    });
  };

  render() {
    const { questions, counter, answered, seconds, disableBtn, nextButton } = this.state;
    return (
      <div className="main-game">
        <Header />
        <form className="form-game">
          {questions.map((_, index) => index === counter && (
            <div key={ questions[counter].category } className="questions">
              <div className="description-quetions">
                <img src={ logo } alt="imagme" />
                <h2 data-testid="question-category" className="question-category">
                  { questions[counter].category}
                </h2>
                <h3 data-testid="question-text" className="question-text">
                  { questions[counter].question}
                </h3>
                <h4 data-testid="timer" className="timer">
                  {seconds}
                  {' '}
                  seconds left
                </h4>
              </div>
              <div data-testid="answer-options" className="options">
                {questions[counter].correct_answer
                  && questions[counter].answers.map((answer, i) => (
                    answer === questions[counter].correct_answer ? (
                      <button
                        className="correct"
                        key={ answer }
                        type="button"
                        data-testid="correct-answer"
                        onClick={ () => this.handleAnswerColors(
                          questions[counter].difficulty,
                          questions[counter].correct_answer,
                          answer,
                        ) }
                        style={ answered && {
                          border: '3px solid rgb(6, 240, 15)',
                          background: 'rgb(6, 240, 15)' } }
                        disabled={ seconds <= 0 || disableBtn }
                      >
                        {answer}
                      </button>
                    ) : (
                      <button
                        className="correct"
                        key={ answer }
                        type="button"
                        data-testid={ `wrong-answer-${i}` }
                        onClick={ () => this.handleAnswerColors() }
                        style={ answered && {
                          border: '3px solid red', background: 'red' } }
                        disabled={ seconds <= 0 || disableBtn }
                      >
                        {answer}
                      </button>
                    )
                  ))}
              </div>
            </div>
          ))}
          {
            nextButton
              && (
                <button
                  data-testid="btn-next"
                  className="next"
                  type="button"
                  onClick={ () => {
                    const { history } = this.props;
                    if (counter === MAX_QUESTIONS - 1) {
                      const { userName, score } = this.props;
                      let userData = localStorage.getItem('ranking');
                      userData = userData ? JSON.parse(userData) : [];
                      userData.push({ userName, score });
                      userData.sort((a, b) => b.score - a.score);
                      localStorage.setItem('ranking', JSON.stringify(userData));
                      history.push('/feedback');
                    } else {
                      this.setState((prevState) => ({ counter: prevState.counter + 1 }));
                      this.nextQuestion();
                    }
                  } }
                >
                  Next
                </button>
              )
          }
        </form>
      </div>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
  userName: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  userName: state.player.userName,
  score: state.player.score,
});

export default connect(mapStateToProps)(Game);
