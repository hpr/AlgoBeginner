import React from 'react';
import {connect} from 'react-redux';
import {
  addChallenge,
  getChallenges,
  deleteChallenge,
  addAssertion
} from '../store';
import {Link} from 'react-router-dom';

class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      challengeForm: {
        name: '',
        functionName: '',
        description: ''
      },
      deleteChallengeForm: {
        id: ''
      },
      assertionForm: {
        challengeId: '',
        name: '',
        input: '',
        output: ''
      }
    };
    this.addChallengeOnChange = this.addChallengeOnChange.bind(this);
    this.addChallengeOnSubmit = this.addChallengeOnSubmit.bind(this);
    this.deleteChallengeOnChange = this.deleteChallengeOnChange.bind(this);
    this.deleteChallengeOnSubmit = this.deleteChallengeOnSubmit.bind(this);
    this.assertionChange = this.assertionChange.bind(this);
    this.assertionSubmit = this.assertionSubmit.bind(this);
  }
  async componentDidMount() {
    await this.props.getChallenges();
    this.setState({
      deleteChallengeForm: {
        ...this.state.deleteChallengeForm,
        id:
          this.props.challenges.length > 0 ? this.props.challenges[0].id : null
      }
    });
    this.setState({
      assertionForm: {
        ...this.state.assertionForm,
        challengeId:
          this.props.challenges.length > 0 ? this.props.challenges[0].id : null
      }
    });
  }
  addChallengeOnChange(evt) {
    this.setState({
      challengeForm: {
        ...this.state.challengeForm,
        [evt.target.name]: evt.target.value
      }
    });
  }
  addChallengeOnSubmit(evt) {
    evt.preventDefault();
    this.props.addChallenge(this.state.challengeForm);
  }
  deleteChallengeOnChange(evt) {
    this.setState({
      deleteChallengeForm: {
        ...this.state.deleteChallengeForm,
        [evt.target.name]: evt.target.value
      }
    });
  }
  deleteChallengeOnSubmit(evt) {
    evt.preventDefault();
    this.props.deleteChallenge(this.state.deleteChallengeForm.id);
  }
  assertionChange(evt) {
    this.setState({
      assertionForm: {
        ...this.state.assertionForm,
        [evt.target.name]: evt.target.value
      }
    });
  }
  assertionSubmit(evt) {
    evt.preventDefault();
    const challengeId = this.state.assertionForm.challengeId;
    let form = {...this.state.assertionForm};
    delete form.challengeId;
    this.props.addAssertion(challengeId, form);
  }
  render() {
    const {user, challenges} = this.props;
    if (!user.isAdmin) {
      return <div>Not Authorized</div>;
    }
    return (
      <div>
        <h1>Add Challenge</h1>
        <form onSubmit={this.addChallengeOnSubmit}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            onChange={this.addChallengeOnChange}
            value={this.state.challengeForm.name}
          />
          <label htmlFor="functionName">Function Name:</label>
          <input
            type="text"
            name="functionName"
            onChange={this.addChallengeOnChange}
            value={this.state.challengeForm.functionName}
          />
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            name="description"
            onChange={this.addChallengeOnChange}
            value={this.state.challengeForm.description}
          />
          <button type="submit">Add Challenge</button>
        </form>
        <h1>Add Assertion</h1>
        <form onSubmit={this.assertionSubmit}>
          <label htmlFor="challengeId">Challenge to add assertion to:</label>
          <select
            name="challengeId"
            onChange={this.assertionChange}
            value={this.state.assertionForm.challengeId}
          >
            {challenges &&
              challenges.map(c => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
          </select>
          <label htmlFor="name">Assertion Name:</label>
          <input
            type="text"
            name="name"
            onChange={this.assertionChange}
            value={this.state.assertionForm.name}
          />
          <label htmlFor="input">Input:</label>
          <input
            type="text"
            name="input"
            onChange={this.assertionChange}
            value={this.state.assertionForm.input}
          />
          <label htmlFor="output">Expected Output:</label>
          <input
            type="text"
            name="output"
            onChange={this.assertionChange}
            value={this.state.assertionForm.output}
          />
          <button type="submit">Add Assertion</button>
        </form>
        <h1>Delete Challenge</h1>
        <form onSubmit={this.deleteChallengeOnSubmit}>
          <label htmlFor="id">Challenge to delete:</label>
          <select
            name="id"
            onChange={this.deleteChallengeOnChange}
            value={this.state.deleteChallengeForm.id}
          >
            {challenges &&
              challenges.map(c => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
          </select>
          <button type="submit">Delete Challenge</button>
        </form>
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = state => ({
  user: state.user,
  challenges: state.challenges
});

const mapDispatch = dispatch => ({
  addChallenge: form => dispatch(addChallenge(form)),
  getChallenges: () => dispatch(getChallenges()),
  deleteChallenge: id => dispatch(deleteChallenge(id)),
  addAssertion: (challengeId, form) => dispatch(addAssertion(challengeId, form))
});

export default connect(mapState, mapDispatch)(Admin);
