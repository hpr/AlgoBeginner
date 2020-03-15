import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const GOT_CHALLENGES = 'GOT_CHALLENGES';

/**
 * INITIAL STATE
 */
const initialState = [];

/**
 * ACTION CREATORS
 */
const gotChallenges = challenges => ({type: GOT_CHALLENGES, challenges});

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

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GOT_CHALLENGES:
      return action.challenges;
    default:
      return state;
  }
}
