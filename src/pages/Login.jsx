import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { actionCreatorAddLogin } from '../redux/actions';
import './style/Login.css';
import trivia from '../images/trivia.png';

class Login extends React.Component {
  state = {
    userName: '',
    userEmail: '',
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  handleClick = async () => {
    const { history, dispatch } = this.props;
    const response = await fetch('https://opentdb.com/api_token.php?command=request');
    const data = await response.json();
    localStorage.setItem('token', data.token);
    dispatch(actionCreatorAddLogin(this.state));
    history.push('/gamer');
  };

  render() {
    const { userEmail, userName } = this.state;
    const { history } = this.props;
    const number = 3;
    const disabled = userEmail
      .includes('@') && userEmail.includes('.com') && userName.length > number;
    return (
      <div className="page-login">
        <img src={ trivia } alt="logo trivia" />
        <div className="form">
          <label htmlFor="name-input" className="label-name">
            <input
              value={ userName }
              placeholder="Nome do jogador"
              name="userName"
              onChange={ this.handleChange }
              type="text"
              id="name-input"
              data-testid="input-player-name"
            />
          </label>
          <label htmlFor="email-input">
            <input
              value={ userEmail }
              placeholder="Email do jogador"
              name="userEmail"
              onChange={ this.handleChange }
              type="text"
              id="email-input"
              data-testid="input-gravatar-email"
            />
          </label>
          <button
            data-testid="btn-play"
            className="play"
            disabled={ !disabled }
            onClick={ () => this.handleClick() }
          >
            Play
          </button>
          <button
            data-testid="btn-settings"
            className="settings"
            type="button"
            onClick={ () => { history.push('/settings'); } }
          >
            Configurações

          </button>
        </div>
      </div>
    );
  }
}
Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Login);
