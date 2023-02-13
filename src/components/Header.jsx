import React from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import estrela from '../images/estrela.png';

class Header extends React.Component {
  render() {
    const { name, email, score } = this.props;
    const hashEmail = md5(email).toString();
    return (
      <header className="header">
        <div className="user">
          <img
            src={ `https://www.gravatar.com/avatar/${hashEmail}` }
            alt="avatar"
            data-testid="header-profile-picture"
            className="user-image"
          />
          <p
            data-testid="header-player-name"
          >
            { name }
          </p>
        </div>
        <p data-testid="header-score" className="score">
          <img src={ estrela } alt="icone de uma estrela" className="estrela" />
          <span>Pontos:</span>
          { score }
        </p>
      </header>
    );
  }
}
const mapStateToProps = (state) => ({
  name: state.player.userName,
  email: state.player.userEmail,
  score: state.player.score,
});

Header.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};
export default connect(mapStateToProps)(Header);
