import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { actionClearRedux } from '../redux/actions/index';
import './style/Feedback.css';
import trivia from '../images/trivia.png';

const INITIAL_STORE = {
  user: {
    userName: '',
    userEmail: '',
  },
  player: {
    score: 0,
    assertions: 0,
  },
};
class Feedback extends React.Component {
  handlePlay = () => {
    const { history, dispatch } = this.props;
    history.push('/');
    dispatch(actionClearRedux(INITIAL_STORE));
  };

  handleranking = () => {
    const { history, dispatch } = this.props;
    history.push('/ranking');
    dispatch(actionClearRedux());
  };

  render() {
    const { assertions, score } = this.props;
    const lowestScoreFeedback = 3;
    const testClass = assertions < lowestScoreFeedback ? 'worst' : 'better';

    return (
      <div className="main-feedback">
        <Header />
        <img src={ trivia } alt="trivia imagem" className="img" />
        <div className="feedback">
          <h1
            data-testid="header-text"
          >
            Feedback
          </h1>
          <p data-testid="feedback-text" className={ testClass }>
            {assertions < lowestScoreFeedback
              ? 'Could be better...' : 'Well Done!'}
          </p>
          <p data-testid="feedback-total-question" className="p">
            Você acertou:
            {' '}
            { assertions }
            {' '}
            pontos!
          </p>
          <p data-testid="feedback-total-score" className="p">
            Um total de:
            {' '}
            { score }
            {' '}
            pontos
          </p>
        </div>
        <div className="container-buttons">
          <button
            data-testid="btn-play-again"
            className="again"
            onClick={ () => this.handlePlay() }
          >
            Play Again
          </button>
          <button
            data-testid="btn-ranking"
            className="btn-ranking"
            onClick={ () => this.handleranking() }
          >
            Ranking
          </button>
        </div>
      </div>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
});

export default connect(mapStateToProps)(Feedback);
