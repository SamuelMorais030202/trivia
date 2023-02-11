import React from 'react';
import { connect } from 'react-redux';
// import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends React.Component {
  render() {
    const { assertions } = this.props;
    const lowestScoreFeedback = 3;

    return (
      <div>
        <Header />
        <p data-testid="feedback-text">
          {assertions < lowestScoreFeedback
            ? 'Could be better...' : 'Well Done!'}
        </p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.user.userName,
  email: state.user.userEmail,
  assertions: state.player.assertions,
  score: state.player.score,
});

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Feedback);
