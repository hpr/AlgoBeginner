import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const TRIED_CHALLENGE = 'TRIED_CHALLENGE';

/**
 * INITIAL STATE
 */
const initialState = {};

/**
 * ACTION CREATORS
 */
const triedChallenge = result => ({type: TRIED_CHALLENGE, result});

/**
 * THUNK CREATORS
 */
export const tryChallenge = (id, code) => async dispatch => {
  try {
    const {data} = await axios.post(`/api/challenges/${id}`, {code});
    dispatch(triedChallenge(data));
  } catch (err) {
    console.error(err);
  }
};

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case TRIED_CHALLENGE:
      return action.result;
    default:
      return state;
  }
}
