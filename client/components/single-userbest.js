import React from 'react';
import {connect} from 'react-redux';
import {getUserBest} from '../store';
import {Link} from 'react-router-dom';

class SingleUserBest extends React.Component {
  async componentDidMount() {
    await this.props.getUserBest(this.props.match.params.id);
  }
  render() {
    const {userBest} = this.props;
    return (
      <div>
        <h1>{userBest.user ? userBest.user.email : 'Unknown'}'s Solution</h1>
        <p>
          <Link to={`/challenges/${userBest.challengeId}`}>
            Back to Challenge
          </Link>
        </p>
        <div className="editor">
          <textarea
            readOnly={true}
            name="code"
            rows={25}
            cols={80}
            value={userBest.code}
          />
          <p>Timed in: {userBest.time} ms</p>
        </div>
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = state => ({
  userBest: state.userBest
});

const mapDispatch = dispatch => ({
  getUserBest: id => dispatch(getUserBest(id))
});

export default connect(mapState, mapDispatch)(SingleUserBest);
