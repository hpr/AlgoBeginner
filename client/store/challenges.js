import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const GOT_CHALLENGES = 'GOT_CHALLENGES';
const ADDED_CHALLENGE = 'ADDED_CHALLENGE';
const DELETED_CHALLENGE = 'DELETED_CHALLENGE';
const ADDED_ASSERTION = 'ADDED_ASSERTION';

/**
 * INITIAL STATE
 */
const initialState = [];

/**
 * ACTION CREATORS
 */
const gotChallenges = challenges => ({type: GOT_CHALLENGES, challenges});
const addedChallenge = challenge => ({type: ADDED_CHALLENGE, challenge});
const deletedChallenge = id => ({type: DELETED_CHALLENGE, id});
const addedAssertion = (challengeId, assertion) => ({
  type: ADDED_ASSERTION,
  challengeId,
  assertion
});

/**
 * THUNK CREATORS
 */
export const getChallenges = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/challenges');
    dispatch(gotChallenges(data));
  } catch (err) {
    console.error(err);
  }
};

export const addChallenge = form => async dispatch => {
  try {
    const {data} = await axios.post('/api/challenges', form);
    dispatch(addedChallenge(data));
  } catch (err) {
    console.error(err);
  }
};

export const deleteChallenge = id => async dispatch => {
  try {
    const {data} = await axios.delete(`/api/challenges/${id}`);
    dispatch(deletedChallenge(id));
  } catch (err) {
    console.error(err);
  }
};

export const addAssertion = (challengeId, form) => async dispatch => {
  try {
    const {data} = await axios.post(
      `/api/challenges/${challengeId}/addAssertion`,
      form
    );
    dispatch(addedAssertion(challengeId, data));
  } catch (err) {
    console.error(err);
  }
};

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GOT_CHALLENGES:
      return action.challenges;
    case ADDED_CHALLENGE: {
      const challengesCopy = [...state];
      challengesCopy.push(action.challenge);
      return challengesCopy;
    }
    case DELETED_CHALLENGE: {
      return state.filter(c => c.id !== action.id);
    }
    default:
      return state;
  }
}
