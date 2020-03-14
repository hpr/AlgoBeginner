import React from 'react';
import {connect} from 'react-redux';
import {getChallenge, tryChallenge} from '../store';

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
    const {challenge, result} = this.props;
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
              challenge.userBests.sort(ub => ub.time).map(ub => (
                <li key={ub.user.id}>
                  {ub.user.email}: {ub.time} ms
                </li>
              ))}
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
  result: state.result
});

const mapDispatch = dispatch => ({
  getChallenge: id => dispatch(getChallenge(id)),
  tryChallenge: (id, code) => dispatch(tryChallenge(id, code))
});

export default connect(mapState, mapDispatch)(SingleChallenge);
