import React from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const { name, email, score } = this.props;
    const hashEmail = md5(email).toString();
    return (
      <div>
        <img
          src={ `https://www.gravatar.com/avatar/${hashEmail}` }
          alt="avatar"
          data-testid="header-profile-picture"
        />
        <p
          data-testid="header-player-name"
        >
          { name }
        </p>
        <p data-testid="header-score">
          {' '}
          Placar :
          {' '}
          { score }
          {' '}
        </p>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  name: state.user.userName,
  email: state.user.userEmail,
  score: state.player.score,
});

Header.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};
export default connect(mapStateToProps)(Header);
