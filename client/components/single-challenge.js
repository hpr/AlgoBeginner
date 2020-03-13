import React from 'react';
import {connect} from 'react-redux';
import {getChallenge} from '../store';

class SingleChallenge extends React.Component {
  componentDidMount() {
    this.props.getChallenge(this.props.match.params.id);
  }
  render() {
    const {challenge} = this.props;
    return <div>{challenge.name}</div>;
  }
}

/**
 * CONTAINER
 */
const mapState = state => ({
  challenge: state.challenge
});

const mapDispatch = dispatch => ({
  getChallenge: id => dispatch(getChallenge(id))
});

export default connect(mapState, mapDispatch)(SingleChallenge);
