import React from 'react';
import PropTypes from 'prop-types';
import fetchApi from '../utils/fetchAPi';
import Header from '../components/Header';
import '../App.css';

class Game extends React.Component {
  state = {
    questions: [],
    counter: 0,
    isCorrect: null,
  };

  componentDidMount() {
    this.handleMount();
  }

  shuffledAnswers = (corret, incorret) => {
    const array = [corret, ...incorret];
    const shuffleNumber = 0.5;
    const shuffled = array.sort(() => Math.random() - shuffleNumber);
    return shuffled;
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

  handleAnswerColors = ({ target }) => {
    if (target.className === 'correct') {
      this.setState({ isCorrect: true });
    }
    if (target.className === 'wrong') {
      this.setState({ isCorrect: false });
    }
  };

  render() {
    const { questions, counter, isCorrect } = this.state;
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
              <div data-testid="answer-options">
                {question.correct_answer
                  && question.answers.map((answer, i) => (
                    answer === question.correct_answer ? (
                      <button
                        className="correct"
                        key={ answer }
                        type="button"
                        data-testid="correct-answer"
                        onClick={ (event) => this.handleAnswerColors(event) }
                        style={ isCorrect && { border: '3px solid rgb(6, 240, 15)' } }
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
};

export default Game;
