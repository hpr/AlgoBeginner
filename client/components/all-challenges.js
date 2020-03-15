import React from 'react';
import {connect} from 'react-redux';
import {getChallenges} from '../store';
import {Link} from 'react-router-dom';

class AllChallenges extends React.Component {
  async componentDidMount() {
    await this.props.getChallenges();
  }
  render() {
    const {challenges} = this.props;
    return (
      <div>
        <ul className="cards">
          {challenges.map(c => (
            <li className="cards__item" key={c.id}>
              <Link to={`/challenges/${c.id}`}>
                <div className="card">
                  <div className="card__content">
                    <div className="card__title">{c.name}</div>
                    <p className="card__text">{c.description}</p>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = state => ({
  challenges: state.challenges
});

const mapDispatch = dispatch => ({
  getChallenges: () => dispatch(getChallenges())
});

export default connect(mapState, mapDispatch)(AllChallenges);
