import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './style/Ranking.css';
import trivia from '../images/trivia.png';

class Ranking extends React.Component {
  state = {
    players: [],
  };

  componentDidMount() {
    const storedData = localStorage.getItem('ranking');
    console.log(storedData);
    const data = storedData ? JSON.parse(storedData) : [];
    this.setState({
      players: data,
    });
  }

  render() {
    const { players } = this.state;
    return (
      <div className="main-ranking">
        <img src={ trivia } alt="trivia imagem" />
        <div className="ranking-game">
          <h1 data-testid="ranking-title">Ranking</h1>
          <div className="players">
            {
              players.map((player, index) => (
                <div key={ index }>
                  <h4 data-testid={ `player-name-${index}` }>
                    { player.userName }
                  </h4>
                  <p>
                    &#11088;
                    {' '}
                    <span data-testid={ `player-score-${index}` }>
                      { player.score }
                    </span>
                    {' '}
                    pontos
                  </p>
                </div>
              ))
            }
          </div>
          <button
            type="button"
            data-testid="btn-go-home"
            onClick={ () => {
              const { history } = this.props;
              history.push('/');
            } }
          >
            Play Again
          </button>
        </div>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  userName: state.player.userName,
  score: state.player.score,
});

export default connect(mapStateToProps)(Ranking);
