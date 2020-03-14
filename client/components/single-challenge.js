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
      [evt.target.name]: [evt.target.value]
    });
  }
  async onSubmit(evt) {
    evt.preventDefault();
    const result = await this.props.tryChallenge(
      this.props.challenge.id,
      this.state.code
    );
    console.log(result);
  }
  render() {
    const {challenge} = this.props;
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
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = state => ({
  challenge: state.challenge
});

const mapDispatch = dispatch => ({
  getChallenge: id => dispatch(getChallenge(id)),
  tryChallenge: (id, code) => dispatch(tryChallenge(id, code))
});

export default connect(mapState, mapDispatch)(SingleChallenge);
