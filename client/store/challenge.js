import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const GOT_CHALLENGE = 'GOT_CHALLENGE';

/**
 * INITIAL STATE
 */
const initialState = {};

/**
 * ACTION CREATORS
 */
const gotChallenge = challenge => ({type: GOT_CHALLENGE, challenge});

/**
 * THUNK CREATORS
 */
export const getChallenge = id => async dispatch => {
  try {
    const {data} = await axios.get(`/api/challenges/${id}`);
    dispatch(gotChallenge(data));
  } catch (err) {
    console.error(err);
  }
};

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GOT_CHALLENGE:
      return action.challenge;
    default:
      return state;
  }
}
