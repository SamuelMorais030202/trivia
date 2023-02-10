import React from 'react';
import PropTypes from 'prop-types';
import fetchApi from '../utils/fetchAPi';

class Game extends React.Component {
  state = {
    questions: [],
    counter: 0,
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

  render() {
    const { questions, counter } = this.state;
    return (
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
              {question.answers.map((answer) => (
                <button
                  key={ answer }
                  type="button"
                  data-testid={
                    answer === question.correct_answer ? 'correct-answer'
                      : `wrong-answer-${index}`
                  }
                >
                  {answer}
                </button>
              ))}
            </div>
          </div>
        ))}
      </form>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Game;
