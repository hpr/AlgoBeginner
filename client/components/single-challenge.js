import React from 'react';
import {connect} from 'react-redux';
import {getChallenge, tryChallenge} from '../store';
import {Link} from 'react-router-dom';

class SingleChallenge extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: ''
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  async componentDidMount() {
    await this.props.getChallenge(this.props.match.params.id);
    this.setState({
      code: `function ${this.props.challenge.functionName}(input) {\n\n}`
    });
  }
  onChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  }
  async onSubmit(evt) {
    evt.preventDefault();
    await this.props.tryChallenge(this.props.challenge.id, this.state.code);
    await this.props.getChallenge(this.props.match.params.id);
  }
  render() {
    const {challenge, result, user} = this.props;
    let myTime = 0;
    if (challenge.userBests) {
      const myBest = challenge.userBests.find(
        ub => ub.user && ub.user.id === user.id
      );
      if (myBest) {
        myTime = myBest.time;
      }
    }
    return (
      <div>
        <h1>{challenge.name}</h1>
        <p>{challenge.description}</p>
        <form onSubmit={this.onSubmit}>
          <div className="editor">
            <textarea
              name="code"
              rows={25}
              cols={80}
              value={this.state.code}
              onChange={this.onChange}
            />
            <button type="submit">Submit</button>
          </div>
        </form>
        {result.id === challenge.id && (
          <div>
            <p>Time: {result.time} ms</p>
            <p>{result.pass ? 'PASS!' : 'Fail...'}</p>
          </div>
        )}
        <div>
          <h2>Leaderboard</h2>
          <ol>
            {challenge.userBests &&
              challenge.userBests.sort((a, b) => a.time - b.time).map(
                ub =>
                  ub.user ? (
                    <li key={ub.user.id}>
                      {ub.user.email}: {ub.time} ms{' '}
                      {ub.time <= myTime && (
                        <Link to={`/userbests/${ub.id}`}>
                          <button>View Code</button>
                        </Link>
                      )}
                    </li>
                  ) : (
                    ''
                  )
              )}
          </ol>
        </div>
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = state => ({
  challenge: state.challenge,
  result: state.result,
  user: state.user
});

const mapDispatch = dispatch => ({
  getChallenge: id => dispatch(getChallenge(id)),
  tryChallenge: (id, code) => dispatch(tryChallenge(id, code))
});

export default connect(mapState, mapDispatch)(SingleChallenge);
