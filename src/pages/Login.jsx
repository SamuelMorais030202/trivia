import React from 'react';

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

  render() {
    const { userEmail, userName } = this.state;
    const number = 3;
    const disabled = userEmail
      .includes('@') && userEmail.includes('.com') && userName.length > number;
    return (
      <div className="page-login">
        <div>
          <h1>Trivia</h1>
          <label htmlFor="name-input">
            Nome:
            <input
              value={ userName }
              name="userName"
              onChange={ this.handleChange }
              type="text"
              id="name-input"
              data-testid="input-player-name"
            />
          </label>
          <label htmlFor="email-input">
            Email:
            <input
              value={ userEmail }
              name="userEmail"
              onChange={ this.handleChange }
              type="text"
              id="email-input"
              data-testid="input-gravatar-email"
            />
          </label>
          <button data-testid="btn-play" disabled={ !disabled }>
            Play
          </button>
          <button>Configurações</button>
        </div>
      </div>
    );
  }
}

export default Login;
